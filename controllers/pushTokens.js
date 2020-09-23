const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Invoice = require("../models/Invoice");

//@desc     Get all invoices
//@route    GET /api/v1/invoices
//@access   Private
exports.getToken = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Create new  city
//@route    POST /api/v1/invoices
//@access   Private
exports.createToken = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const city = await Invoice.create(req.body);
  res.status(201).json({
    success: true,
    data: city,
  });
});

//@desc     Update city
//@route    PUT /api/v1/invoices/:id
//@access   Private
exports.updateInvoice = asyncHandler(async (req, res, next) => {
  const city = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!city) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: city,
  });
});
