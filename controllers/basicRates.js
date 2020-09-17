const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BasicRate = require("../models/BasicRate");

//@desc     Get all basic
//@route    GET /api/v1/rates/basic
//@access   Private
exports.getBasicRates = asyncHandler(async (req, res, next) => {
  const rates = await BasicRate.find();
  res.status(200).json({
    success: true,
    count: rates.length,
    data: rates,
  });
});

//@desc     Get single basic rate by city
//@route    GET /api/v1/rates/basic/:cityId
//@access   Private
exports.getBasicRate = asyncHandler(async (req, res, next) => {
  const rate = await BasicRate.find({ city: req.params.cityId });
  if (!rate) {
    return next(
      new ErrorResponse(
        `Basic rate not found with city id of ${req.params.cityId}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: rate,
  });
});

//@desc     Create new  basic rate
//@route    POST /api/v1/rates/basic
//@access   Private
exports.createBasicRate = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const rate = await BasicRate.create(req.body);
  res.status(201).json({
    success: true,
    data: rate,
  });
});

//@desc     Update basic rate
//@route    PUT /api/v1/rates/basic/:id
//@access   Private
exports.updateBasicRate = asyncHandler(async (req, res, next) => {
  const rate = await BasicRate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!rate) {
    return next(
      new ErrorResponse(`City not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: city,
  });
});

//@desc     Delete basic rate
//@route    Delete /api/v1/rates/basic/:id
//@access   Private
exports.deleteBasicRate = asyncHandler(async (req, res, next) => {
  const rate = await BasicRate.findByIdAndDelete(req.params.id);

  if (!rate) {
    return next(
      new ErrorResponse(`Basic Rate not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
