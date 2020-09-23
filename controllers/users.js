const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc     Get all users
//@route    GET /api/v1/users
//@access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get single users
//@route    GET /api/v1/users/:id
//@access   Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    succes: true,
    data: user,
  });
});

//@desc     Create user
//@route    POST /api/v1/users
//@access   Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    succes: true,
    data: user,
  });
});

//@desc     update user
//@route    PUT /api/v1/users/:id
//@access   Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  if (req.user.role == "admin") {
    if (!req.params.id) {
    }
    userID = req.params.id;
  }
  const user = await User.findByIdAndUpdate(userID, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    succes: true,
    data: user,
  });
});

//@desc     update user
//@route    PUT /api/v1/users/:id
//@access   Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({
    succes: true,
    data: {},
  });
});

//@desc     Generate Invoice for user
//@route    POST /api/v1/users/invoice
//@access   Private/Admin
exports.sendInvoice = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.data);
});

//@desc     Get Invoice for users
//@route    GET /api/v1/users/:id/invoice
//@access   Private/Admin
exports.getInvoices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.data);
});
