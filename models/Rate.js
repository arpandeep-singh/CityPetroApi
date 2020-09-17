const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    unique: true,
    required: [true, "City ID is required"],
  },
  basicRate: {
    rateToronto: {
      type: Number,
      required: [true, "Please add rate from Toronto"],
    },
    rateOakville: {
      type: Number,
      required: [true, "Please add rate from Oakville"],
    },
    rateHamilton: {
      type: Number,
      required: [true, "Please add rate from Hamilton"],
    },
    rateNanticoke: {
      type: Number,
      required: [true, "Please add rate from Nanticoke"],
    },
  },
  advRate: {
    rateToronto: {
      type: Number,
      required: [true, "Please add rate from Toronto"],
    },
    rateOakville: {
      type: Number,
      required: [true, "Please add rate from Oakville"],
    },
    rateHamilton: {
      type: Number,
      required: [true, "Please add rate from Hamilton"],
    },
    rateNanticoke: {
      type: Number,
      required: [true, "Please add rate from Nanticoke"],
    },
  },
});

module.exports = mongoose.model("Rate", RateSchema);
