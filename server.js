const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

const loads = require("./routes/loads");
const cities = require("./routes/cities");
const stations = require("./routes/stations");
const rates = require("./routes/rates");
const basicRates = require("./routes/basicRates");
const advRates = require("./routes/advRates");

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/loads", loads);
app.use("/api/v1/cities", cities);
app.use("/api/v1/stations", stations);
app.use("/api/v1/rates", rates);
app.use("/api/v1/rates/basic", basicRates);
app.use("/api/v1/rates/adv", advRates);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1));
});
