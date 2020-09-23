const express = require("express");
const {
  getInvoices,
  getInvoice,
  deleteInvoice,
} = require("../controllers/invoices");
const advancedResults = require("../middleware/advancedResults");
const Invoice = require("../models/Invoice");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(advancedResults(Invoice), getInvoices);
router.route("/:id").get(getInvoice).delete(authorize("admin"), deleteInvoice);

module.exports = router;
