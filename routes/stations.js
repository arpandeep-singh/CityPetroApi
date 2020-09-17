const express = require("express");
const {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stations");

const router = express.Router();

router.route("/").get(getStations).post(createStation);
router.route("/:id").get(getStation).put(updateStation).delete(deleteStation);

module.exports = router;
