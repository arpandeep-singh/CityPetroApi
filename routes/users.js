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

router
  .route("/")
  .get(authorize("admin"), advancedResults(User), getUsers)
  .post(authorize("admin"), createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(authorize("admin"), deleteUser);
router
  .route("/invoice/:id")
  .post(
    createInvoice.fetchData,
    createInvoice.createPdf,
    createInvoice.notifyUser,
    sendInvoice
  );

module.exports = router;
