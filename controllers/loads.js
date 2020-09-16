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
  const waitingCharge = req.body.waitingTime * (process.env.WAITING_RATE / 60);
  const splitRate = req.body.splits * process.env.SPLIT_RATE;
  const totalRate = parseInt(req.body.terminalRate) + waitingCharge + splitRate;

  const load = await Load.create({
    ...req.body,
    waitingCharge: waitingCharge,
    totalRate: totalRate,
  });
  res.status(201).json({
    success: true,
    data: load,
  });
});

//@desc     Update load
//@route    PUT /api/v1/loads/:id
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
