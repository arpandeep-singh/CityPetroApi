const express = require("express");
const {
  getRates,
  getRate,
  createRate,
  updateRate,
  deleteRate,
} = require("../controllers/Rates");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
router
  .route("/")
  .get(protect, getRates)
  .post(protect, authorize("admin"), createRate);
router
  .route("/:id")
  .get(protect, getRate)
  .put(protect, authorize("admin"), updateRate)
  .delete(protect, authorize("admin"), deleteRate);

module.exports = router;
