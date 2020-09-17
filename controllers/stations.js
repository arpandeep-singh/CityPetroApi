const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Station = require("../models/Station");
const City = require("../models/City");

//@desc     Get all stations
//@route    GET /api/v1/stations
//@access   Private
exports.getStations = asyncHandler(async (req, res, next) => {
  const gradePay = "basicRate";
  const stations = await Station.find().populate("city");
  const result = stations.map(function (station) {
    return {
      stationId: station.stationId,
      city: station.city.name,
      rateToronto: station.city[gradePay].rateToronto,
      rateOakville: station.city[gradePay].rateOakville,
      rateHamilton: station.city[gradePay].rateHamilton,
      rateNanticoke: station.city[gradePay].rateNanticoke,
    };
  });
  res.status(200).json({
    success: true,
    count: stations.length,
    data: result,
  });
});

//@desc     Get single stations
//@route    GET /api/v1/stations/:id
//@access   Private
exports.getStation = asyncHandler(async (req, res, next) => {
  const station = await Station.findById(req.params.id);
  if (!station) {
    return next(
      new ErrorResponse(`Station not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: station,
  });
});

//@desc     Create new  station
//@route    POST /api/v1/stations
//@access   Private
exports.createStation = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.body.city);
  if (!city) {
    return next(
      new ErrorResponse(`City not found with id of ${req.body.city}`, 404)
    );
  }
  console.log(req.body);

  const station = await Station.create(req.body);
  res.status(201).json({
    success: true,
    data: station,
  });
});

//@desc     Update station
//@route    PUT /api/v1/stations/:id
//@access   Private
exports.updateStation = asyncHandler(async (req, res, next) => {
  const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!station) {
    return next(
      new ErrorResponse(`Station not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: station,
  });
});

//@desc     Delete station
//@route    Delete /api/v1/stations/:id
//@access   Private
exports.deleteStation = asyncHandler(async (req, res, next) => {
  const station = await Station.findByIdAndDelete(req.params.id);

  if (!station) {
    return next(
      new ErrorResponse(`Station not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
