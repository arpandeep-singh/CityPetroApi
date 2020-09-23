const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.uploadPaperwork = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Paperwork is required`, 400));
  }

  const files = req.files.docs;

  //Accept only images
  const imagefiles = files.filter(function async(file) {
    if (file.mimetype.startsWith("image")) {
      return file.name;
    }
  });

  const paperWork = imagefiles.map(function async(file) {
    //create custom filename

    // const extension = path.parse(file.name).ext
    //   ? path.parse(file.name).ext
    //   : ".jpg";
    file.name = `doc_${req.body.stationID}_${uuidv4()}${
      path.parse(file.name).ext
    }`
      .split(" ")
      .join("-");
    console.log(file.name);
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorResponse(`An error occured while uploading paperwork`, 500)
        );
      }
    });
    return file.name;
  });

  req.body.paperwork = paperWork;
  next();
});
