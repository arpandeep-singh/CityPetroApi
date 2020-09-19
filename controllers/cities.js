const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const City = require("../models/City");

//@desc     Get all cities
//@route    GET /api/v1/cities
//@access   Private
exports.getCities = asyncHandler(async (req, res, next) => {
  const cities = await City.find().populate("rate");
  const result = cities.map(function (city) {
    return {
      id: city._id,
      name: city.name,
      basicRate: city.basicRate,
      advRate: city.advRate,
    };
  });
  res.status(200).json({
    success: true,
    count: cities.length,
    data: result,
  });
});

//@desc     Get single city
//@route    GET /api/v1/cities/:id
//@access   Private
exports.getCity = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  if (!city) {
    return next(
      new ErrorResponse(`City not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: city,
  });
});

//@desc     Create new  city
//@route    POST /api/v1/cities
//@access   Private
exports.createCity = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const city = await City.create(req.body);
  res.status(201).json({
    success: true,
    data: city,
  });
});

//@desc     Update city
//@route    PUT /api/v1/cities/:id
//@access   Private
exports.updateCity = asyncHandler(async (req, res, next) => {
  const city = await City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!city) {
    return next(
      new ErrorResponse(`City not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: city,
  });
});

//@desc     Delete city
//@route    Delete /api/v1/cities/:id
//@access   Private
exports.deleteCity = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(
      new ErrorResponse(`City not found with id of ${req.params.id}`, 404)
    );
  }
  city.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc     Add basic rate
//@route    POST /api/v1/cities/:cityId/basic
//@access   Private
exports.addBasicRate = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.params.cityId);
  if (!city) {
    return next(
      new ErrorResponse(`City not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: city,
  });
});
