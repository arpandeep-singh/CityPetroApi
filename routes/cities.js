const express = require("express");
const {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/cities");

const router = express.Router();
router.route("/").get(getCities).post(createCity);
router.route("/:id").get(getCity).put(updateCity).delete(deleteCity);

module.exports = router;
