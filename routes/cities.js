const express = require("express");
const {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/cities");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
router
  .route("/")
  .get(protect, getCities)
  .post(protect, authorize("admin"), createCity);
router
  .route("/:id")
  .get(getCity)
  .put(protect, authorize("admin"), updateCity)
  .delete(protect, authorize("admin"), deleteCity);

module.exports = router;
