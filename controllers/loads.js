const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Load = require("../models/Load");

//@desc     Get all loads
//@route    GET /api/v1/loads
//@access   Private
exports.getLoads = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  //Add user to body
  req.body.user = req.user.id;
  console.log(req.body.waitingTime);
  const load = await Load.create(req.body);
  console.log(load);
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
  const load = await Load.findById(req.params.id);

  if (!load) {
    return next(
      new ErrorResponse(`Load not found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user is Load owner
  if (load.user.toString() !== req.user.id && req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User is not authorized to delete this load ${req.params.id}`,
        403
      )
    );
  }

  load.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
