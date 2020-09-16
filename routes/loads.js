const express = require("express");
const {
  getLoads,
  getLoad,
  createLoad,
  updateLoad,
  deleteLoad,
} = require("../controllers/loads");

const router = express.Router();
router.route("/").get(getLoads).post(createLoad);
router.route("/:id").get(getLoad).put(updateLoad).delete(deleteLoad);

module.exports = router;
