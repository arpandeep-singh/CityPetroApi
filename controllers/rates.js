const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Rate = require("../models/Rate");
const City = require("../models/City");

//@desc     Get all rates
//@route    GET /api/v1/rates/
//@access   Private
exports.getRates = asyncHandler(async (req, res, next) => {
  const rates = await Rate.find().populate("city");
  res.status(200).json({
    success: true,
    count: rates.length,
    data: rates,
  });
});

//@desc     Get single  rate by city
//@route    GET /api/v1/rates/:cityId
//@access   Private
exports.getRate = asyncHandler(async (req, res, next) => {
  const rate = await Rate.find({ city: req.params.cityId }).populate("city");
  if (!rate) {
    return next(
      new ErrorResponse(
        ` Rate not found with city id of ${req.params.cityId}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: rate,
  });
});

//@desc     Create new   rate
//@route    POST /api/v1/rates/
//@access   Private
exports.createRate = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.body.city);
  if (!city) {
    return next(
      new ErrorResponse(` City not found with city id of ${req.body.city}`, 404)
    );
  }
  console.log(req.body);
  const rate = await Rate.create(req.body);
  res.status(201).json({
    success: true,
    data: rate,
  });
});

//@desc     Update  rate
//@route    PUT /api/v1/rates/:cityId
//@access   Private
exports.updateRate = asyncHandler(async (req, res, next) => {
  const rate = await Rate.findOneAndUpdate(
    { city: req.params.cityId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!rate) {
    return next(
      new ErrorResponse(`Rate not found with id of ${req.params.cityId}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: rate,
  });
});

//@desc     Delete  rate
//@route    Delete /api/v1/rates/:id
//@access   Private
exports.deleteRate = asyncHandler(async (req, res, next) => {
  const rate = await Rate.findByIdAndDelete(req.params.id);

  if (!rate) {
    return next(
      new ErrorResponse(` Rate not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
