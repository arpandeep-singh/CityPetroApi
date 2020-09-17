const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  stationId: {
    type: String,
    unique: true,
    required: [true, "Station ID is required"],
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    //required: true,
  },
});

module.exports = mongoose.model("Station", StationSchema);
