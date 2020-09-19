const User = require("../models/User");
const Load = require("../models/Load");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const request = require("request");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

exports.fetchData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id ${req.params.id}`, 404)
    );
  }

  req.driver = user;

  let query = Load.find({ user: req.params.id }).select(
    "stationID city terminal totalRate waitingCharge splits date"
  );
  let result = await query;
  if (result.length == 0) {
    return next(
      new ErrorResponse(`The user has 0 loads in specified period`, 400)
    );
  }

  res.loads = result;

  next();
});

exports.createPdf = asyncHandler(async (req, res, next) => {
  res.pdfStatus = false;
  const createRow = (item) => `
  <tr>
    <td>${item.stationID}</td>
    <td>${item.city}</td>
    <td>${item.terminal}</td>
    <td>${item.splits}</td>
    <td>${item.totalRate}</td>
  </tr>
  `;

  const createTable = (rows) => `
  <table>
    <tr>
        <th>Station Id</th>
        <th>City</th>
        <th>Terminal</th>
        <th>Splits</th>
        <th>Rate</th>
    </tr>
    ${rows}
  </table>
  `;

  const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
  `;

  const printPdf = async (html) => {
    // console.log("Starting: Generating PDF Process, Kindly wait ..");
    /** Launch a headleass browser */
    const browser = await puppeteer.launch();
    /* 1- Ccreate a newPage() object. It is created in default browser context. */
    const page = await browser.newPage();
    /* 2- Will open our generated `.html` file in the new Page instance. */

    await page.setContent(html);
    /* 3- Take a snapshot of the PDF */
    const pdf = await page.pdf({
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    /* 4- Cleanup: close browser. */
    await browser.close();
    // console.log("Ending: Generating PDF Process");
    return pdf;
  };

  try {
    /* generate rows */
    const rows = res.loads.map(createRow).join("");
    /* generate table */
    const table = createTable(rows);
    /* generate html */
    const html = createHtml(table);
    const pdf = await printPdf(html);
    const fileName = `${req.driver.name}_${uuidv4()}.pdf`.split(" ").join("_");
    const fileLocation = `${process.env.INVOICE_PATH}/${fileName}`;

    fs.writeFileSync(fileLocation, pdf);

    res.file = fileName;
    console.log(res.file);

    res.pdfStatus = true;
  } catch (error) {
    return next(
      new ErrorResponse(
        `An unexpected error occured while generating invoice ${error}`,
        500
      )
    );
  }
  res.data = {
    success: true,
    count: res.loads.length,
    link: res.file,
    status: res.pdfStatus,
    message: "Invoice generated succesfully",
  };
  next();
});

exports.notifyUser = asyncHandler(async (req, res, next) => {
  request(
    `http://localhost:5000/${res.file}`,
    { encoding: null },
    (err, res, body) => {
      if (err) {
        return err;
      }
      if (body) {
        const textBuffered = Buffer.from(body);

        const msg = {
          to: `${req.driver.email}`,
          from: "citypetro.ca@gmail.com",
          subject: "Your invoice is ready",
          text: `Hello...${req.driver.name}!`,
          html: `<strong>Hello...${req.driver.name}</strong>`,
          attachments: [
            {
              content: textBuffered.toString("base64"),
              filename: `${res.file}`.toString(),
              type: "application/pdf",
              disposition: "attachment",
              contentId: "mytext",
            },
          ],
        };
        // send msg here
        sgMail.send(msg);
      }
      res.data = { ...res.data, fileName: res.file };
      next();
    }
  );
});
