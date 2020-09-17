const mongoose = require("mongoose");

const BasicRateSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    unique: true,
    required: [true, "City ID is required"],
  },
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
});

//Rate Validation
// CitySchema.pre("save", function (next) {
//     this.
//     next();
//   });

module.exports = mongoose.model("BasicRate", BasicRateSchema);
