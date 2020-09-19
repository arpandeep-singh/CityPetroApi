const express = require("express");
const {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stations");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getStations).post(protect, createStation);
router
  .route("/:id")
  .get(protect, getStation)
  .put(protect, updateStation)
  .delete(protect, deleteStation);

module.exports = router;
