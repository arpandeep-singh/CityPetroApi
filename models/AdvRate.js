const mongoose = require("mongoose");

const AdvRateSchema = new mongoose.Schema({
  city: {
    type: String,
    unique: true,
    required: [true, "City Name is required"],
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

module.exports = mongoose.model("AdvRate", AdvRateSchema);
