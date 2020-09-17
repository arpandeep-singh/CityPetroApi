const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Load = require("../models/Load");

//@desc     Get all loads
//@route    GET /api/v1/loads
//@access   Private
exports.getLoads = asyncHandler(async (req, res, next) => {
  const loads = await Load.find();
  res.status(200).json({
    success: true,
    count: loads.length,
    data: loads,
  });
});

//@desc     Get single loads
//@route    GET /api/v1/loads/:id
//@access   Private
exports.getLoad = asyncHandler(async (req, res, next) => {
  const load = await Load.findById(req.params.id);
  if (!load) {
    return next(
      new ErrorResponse(`Load not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: load,
  });
});

//@desc     Create new  load
//@route    POST /api/v1/loads
//@access   Private
exports.createLoad = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const load = await Load.create(req.body);
  res.status(201).json({
    success: true,
    data: load,
  });
});

//@access   Private
exports.updateLoad = asyncHandler(async (req, res, next) => {
  const load = await Load.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!load) {
    return next(
      new ErrorResponse(`Load not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: load,
  });
});

//@desc     Delete load
//@route    Delete /api/v1/loads/:id
//@access   Private
exports.deleteLoad = asyncHandler(async (req, res, next) => {
  const load = await Load.findByIdAndDelete(req.params.id);

  if (!load) {
    return next(
      new ErrorResponse(`Load not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
