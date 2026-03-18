const express = require("express");
const router = express.Router();

const {
  registerUser,
  forgotPassword,
  verifyToken,
  resetPassword
} = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// PASSWORD RESET FLOW
router.post("/forgot-password", forgotPassword);
router.get("/verify/:token", verifyToken);
router.post("/reset-password/:token", resetPassword);

module.exports = router;