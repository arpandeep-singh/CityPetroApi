const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  sendInvoice,
} = require("../controllers/users");

const User = require("../models/User");

const advancedResults = require("../middleware/advancedResults");
const createInvoice = require("../middleware/invoice");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router
  .route("/invoice/:id")
  .get(
    createInvoice.fetchData,
    createInvoice.createPdf,
    createInvoice.notifyUser,
    sendInvoice
  );

module.exports = router;
