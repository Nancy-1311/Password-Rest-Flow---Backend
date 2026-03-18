require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS CONFIG (IMPORTANT FOR DEPLOYMENT)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));