import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import { getExpenses, addExpense } from "./services/expenseService";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: "", amount: "", category: "" });
  const [darkMode, setDarkMode] = useState(false);

  // Fetch expenses when the app loads
  useEffect(() => {
    async function fetchData() {
      const data = await getExpenses();
      setExpenses(data);
    }
    fetchData();
  }, []);

  // Handle adding a new expense
  const handleAddExpense = async () => {
    const expense = await addExpense(newExpense);
    setExpenses([...expenses, expense]);
    setNewExpense({ title: "", amount: "", category: "" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? "container dark-mode" : "container"}>
        <h2>Expense Tracker</h2>
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
        <Routes>
          <Route path="/" element={<ExpenseList expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/add" element={<AddExpense onAddExpense={handleAddExpense} />} />
        </Routes>

        {/* Add Expense Form */}
        <div>
          <h3>Add New Expense</h3>
          <input
            type="text"
            placeholder="Title"
            value={newExpense.title}
            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          />
          <button onClick={handleAddExpense}>Add Expense</button>
        </div>
      </div>
    </Router>
  );
}

export default App;

