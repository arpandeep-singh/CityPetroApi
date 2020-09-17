const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AdvRate = require("../models/AdvRate");

//@desc     Get all Adv Rates
//@route    GET /api/v1/rates/adv
//@access   Private
exports.getAdvRates = asyncHandler(async (req, res, next) => {
  const advRates = await AdvRate.find();
  res.status(200).json({
    success: true,
    count: advRates.length,
    data: advRates,
  });
});

//@desc     Get single adv rate by city
//@route    GET /api/v1/rates/basic:cityId
//@access   Private
exports.getAdvRate = asyncHandler(async (req, res, next) => {
  const rate = await AdvRate.find({ city: req.params.cityId });
  if (!rate) {
    return next(
      new ErrorResponse(
        `Adv rate not found with city id of ${req.params.cityId}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: rate,
  });
});

//@desc     Create new  Adv Rate
//@route    POST /api/v1/rates/adv
//@access   Private
exports.createAdvRate = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const advRate = await AdvRate.create(req.body);
  res.status(201).json({
    success: true,
    data: advRate,
  });
});

//@desc     Update Adv Rate
//@route    PUT /api/v1/rates/adv/:id
//@access   Private
exports.updateAdvRate = asyncHandler(async (req, res, next) => {
  const advRate = await AdvRate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!advRate) {
    return next(
      new ErrorResponse(
        `Advanced Rate not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: advRate,
  });
});

//@desc     Delete adv Rate
//@route    Delete /api/v1/rates/adv/:id
//@access   Private
exports.deleteAdvRate = asyncHandler(async (req, res, next) => {
  const advRate = await AdvRate.findByIdAndDelete(req.params.id);

  if (!advRate) {
    return next(
      new ErrorResponse(`City not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
