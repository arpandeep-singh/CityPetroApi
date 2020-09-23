const express = require("express");
const {
  register,
  login,
  getMe,
  updatePushToken,
  deletePushToken,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router
  .route("/push-token")
  .post(protect, updatePushToken)
  .delete(protect, deletePushToken);

module.exports = router;
