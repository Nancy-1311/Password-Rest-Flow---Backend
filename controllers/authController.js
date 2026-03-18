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

<<<<<<< HEAD
// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

=======
>>>>>>> 4617dc22722364d53cc648f70c3ea164e52f39f3
//  FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

<<<<<<< HEAD
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
=======
    const resetLink = `${process.env.https://password-rest-flow-frontend.vercel.app/}/reset-password/${token}`;
>>>>>>> 4617dc22722364d53cc648f70c3ea164e52f39f3

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

<<<<<<< HEAD
//  RESET PASSWORD
=======
// RESET PASSWORD
>>>>>>> 4617dc22722364d53cc648f70c3ea164e52f39f3
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

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
