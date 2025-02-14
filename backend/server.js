const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Debugging: Log if API routes are hit
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
const expenseRoutes = require('./routes/expenses'); // Ensure this file exists
app.use('/api/expenses', expenseRoutes); // Mount routes

// Default route to check if server is running
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker API is running!");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "❌ Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

