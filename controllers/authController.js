const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const nodemailer = require("nodemailer");

//  Email Transporter (Production Ready)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

//  FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate random token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token + expiry (10 mins)
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.https://password-rest-flow-frontend.vercel.app/}/reset-password/${token}`;

    // Send Email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click below link to reset password (valid for 10 mins)</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  VERIFY TOKEN
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    res.json({ message: "Token valid" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Clear token
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
