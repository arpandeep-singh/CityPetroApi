const express = require("express");
const {
  getLoads,
  getLoad,
  createLoad,
  updateLoad,
  deleteLoad,
} = require("../controllers/loads");

const Load = require("../models/Load");

const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const { uploadPaperwork } = require("../middleware/fileUpload");

router.use(protect);
router
  .route("/")
  .get(advancedResults(Load, "user"), getLoads)
  .post(uploadPaperwork, createLoad);

router
  .route("/:id")
  .get(getLoad)
  .put(authorize("admin"), updateLoad)
  .delete(deleteLoad);

module.exports = router;
