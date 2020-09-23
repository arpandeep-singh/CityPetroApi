const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Invoice = require("../models/Invoice");

//@desc     Get all invoices
//@route    GET /api/v1/invoices
//@access   Private
exports.getInvoices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get single city
//@route    GET /api/v1/invoices/:id
//@access   Private
exports.getInvoice = asyncHandler(async (req, res, next) => {
  const city = await Invoice.findById(req.params.id);
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

//@desc     Create new  city
//@route    POST /api/v1/invoices
//@access   Private
exports.createInvoice = asyncHandler(async (req, res, next) => {
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

//@desc     Delete city
//@route    Delete /api/v1/invoices/:id
//@access   Private
exports.deleteInvoice = asyncHandler(async (req, res, next) => {
  const city = await Invoice.findById(req.params.id);

  if (!city) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
    );
  }
  city.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc     Add basic rate
//@route    POST /api/v1/invoices/:cityId/basic
//@access   Private
exports.addBasicRate = asyncHandler(async (req, res, next) => {
  const city = await Invoice.findById(req.params.cityId);
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
