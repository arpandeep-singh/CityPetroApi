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

//Waiting and Split Charges
LoadSchema.pre("save", function (next) {
  this.waitingTime = this.waitingTime ? this.waitingTime : 0;
  this.splits = this.splits ? this.splits : 0;

  this.waitingCharge = Math.round(
    this.waitingTime * (process.env.WAITING_RATE / 60)
  );
  const splitCharges = this.splits * process.env.SPLIT_RATE;
  this.totalRate =
    this.terminalRate + this.waitingCharge + parseInt(splitCharges);
  next();
});

// LoadSchema.pre('save',function(next){

//   next();
// })

module.exports = mongoose.model("Load", LoadSchema);
