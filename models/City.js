const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "City Name is required"],
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
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

CitySchema.pre("remove", async function (next) {
  console.log(`Station being removed from id ${this._id}`);
  // await this.model("Rate").deleteMany({ city: this._id });
  await this.model("Station").deleteMany({ city: this._id });
  next();
});

//Reverse populate with virtuals
// CitySchema.virtual("rate", {
//   ref: "Rate",
//   localField: "_id",
//   foreignField: "city",
//   justOne: true,
// });

module.exports = mongoose.model("City", CitySchema);
