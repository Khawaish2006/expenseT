import React, { useState } from "react";
import { addExpense } from "../services/expenseService"; // ✅ Import function

const AddExpense = ({ setExpenses }) => {
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const expense = await addExpense(newExpense);
      setExpenses(prev => [...prev, expense]); // ✅ Update list
      setNewExpense({ title: "", amount: "", category: "" }); // ✅ Reset form
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form onSubmit={handleAddExpense}>
      <input type="text" name="title" value={newExpense.title} placeholder="Title" 
        onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })} required />
      <input type="number" name="amount" value={newExpense.amount} placeholder="Amount" 
        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} required />
      <input type="text" name="category" value={newExpense.category} placeholder="Category" 
        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;

  