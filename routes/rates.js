const express = require("express");
const {
  getRates,
  getRate,
  createRate,
  updateRate,
  deleteRate,
} = require("../controllers/Rates");

const router = express.Router();
router.route("/").get(getRates).post(createRate);
router.route("/:id").get(getRate).put(updateRate).delete(deleteRate);

module.exports = router;
