const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link expense to user
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;

