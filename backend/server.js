const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Serve frontend (static HTML/CSS/JS)
app.use(express.static(path.join(__dirname, "../frontend")));

// Match all routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
