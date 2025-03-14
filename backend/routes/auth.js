const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/authutils"); // ✅ Import authUtils

const router = express.Router();

// ✅ Signup Route (Register)
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "❌ User not found" });

    // Debugging: Log stored password hash
    console.log("Stored Password Hash:", user.password);
    console.log("Entered Password:", password);

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("❌ Password does not match!");
      return res.status(400).json({ message: "❌ Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("🔥 Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});





module.exports = router;
