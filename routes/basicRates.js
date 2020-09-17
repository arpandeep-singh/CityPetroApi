const express = require("express");
const {
  getBasicRates,
  getBasicRate,
  createBasicRate,
  updateBasicRate,
  deleteBasicRate,
} = require("../controllers/basicRates");

const router = express.Router();
router.route("/").get(getBasicRates).post(createBasicRate);
router
  .route("/:id")
  .get(getBasicRate)
  .put(updateBasicRate)
  .delete(deleteBasicRate);

module.exports = router;
