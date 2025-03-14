const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth"); // Import auth middleware
const User = require("../models/User"); // ✅ Import User model

const router = express.Router();



router.post("/set-limit", auth, async (req, res) => {
  try {
    const { limit } = req.body;
    if (!limit) {
      return res.status(400).json({ message: "❌ Limit is required" });
    }

    const userId = req.user; // Get user ID from auth middleware
    console.log("User ID:", userId);
    console.log("Limit to set:", limit);

    // 🔹 Find user and update the monthly limit
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    user.monthlyLimit = limit;
    await user.save();

    res.status(200).json({ message: "✅ Monthly limit set successfully", limit });
  } catch (error) {
    console.error("🔥 Error setting limit:", error);
    res.status(500).json({ message: "❌ Error setting limit", error: error.message });
  }
});


router.get("/get-limit", auth, async (req, res) => {
  try {
      const user = await User.findById(req.user);  // ✅ Get user from token
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ monthlyLimit: user.monthlyLimit });
  } catch (error) {
      res.status(500).json({ message: "Error fetching limit", error });
  }
});


// ✅ CREATE an expense (POST) - Only for logged-in users
router.post("/add", auth, async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const newExpense = new Expense({ 
      userId: req.user,  // Get user ID from auth middleware
      title, 
      amount, 
      category 
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
});

// ✅ GET all expenses (Only for the logged-in user)
router.get("/all", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }); // Get only user’s expenses
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

// ✅ UPDATE an expense (PUT) - Only if user owns the expense
router.put("/update/:id", auth, async (req, res) => {
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user }, // Ensure the expense belongs to the user
      req.body,
      { new: true }
    );
    if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
});

// ✅ DELETE an expense (DELETE) - Only if user owns the expense
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

module.exports = router;
