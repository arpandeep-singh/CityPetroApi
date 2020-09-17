const express = require("express");
const {
  getAdvRates,
  getAdvRate,
  createAdvRate,
  updateAdvRate,
  deleteAdvRate,
} = require("../controllers/AdvRates");

const router = express.Router();
router.route("/").get(getAdvRates).post(createAdvRate);
router.route("/:id").get(getAdvRate).put(updateAdvRate).delete(deleteAdvRate);

module.exports = router;
