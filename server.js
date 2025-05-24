const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scoreRoutes = require("./routes/scoreRoutes"); // NEW
const matchRoutes = require("./routes/matchRoutes");
const liveRoutes = require("./routes/LiveRoutes");
const { ensureDefaultAdmin } = require("./controllers/authController");

dotenv.config(); // Load .env first

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes); // NEW
app.use("/api/matches", matchRoutes);
app.use("/api/live", liveRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Connect DB and initialize default admin
connectDB().then(ensureDefaultAdmin);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
