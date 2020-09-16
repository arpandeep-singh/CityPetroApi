const mongoose = require("mongoose");

const LoadSchema = new mongoose.Schema({
  stationID: {
    type: String,
    required: [true, "Station ID is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  terminalRate: {
    type: Number,
    required: [true, "Rate is required"],
    trim: true,
  },
  waitingTime: Number,
  waitingCharge: Number,
  totalRate: Number,
  comments: String,
  order: String,
  terminal: {
    type: String,
    enum: ["Hamilton", "Nanticoke", "Oakville", "Toronto"],
  },
  splits: Number,
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  uptLink: {
    //TODO: add link validation
    type: String,
    required: [true, "Please add Upt Link"],
  },
  paperwork: [String],
});

module.exports = mongoose.model("Load", LoadSchema);
