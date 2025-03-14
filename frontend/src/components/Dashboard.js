import React, { useState, useEffect } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [updatedAmount, setUpdatedAmount] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/expenses/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error("Error fetching expenses:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleAddExpense = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const expenseData = { title: expenseTitle, amount: expenseAmount, category: "General" };

    try {
      const response = await fetch("http://localhost:5000/api/expenses/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (response.ok) {
        setExpenses([...expenses, data]);
        setExpenseTitle("");
        setExpenseAmount("");
      } else {
        console.error("Error adding expense:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/expenses/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      } else {
        console.error("Error deleting expense");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setUpdatedAmount(expense.amount);
  };

  const handleUpdateExpense = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/expenses/update/${editingExpense._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: updatedAmount }),
      });

      const data = await response.json();

      if (response.ok) {
        setExpenses(
          expenses.map((exp) => (exp._id === editingExpense._id ? { ...exp, amount: updatedAmount } : exp))
        );
        setEditingExpense(null);
      } else {
        console.error("Error updating expense:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  // 🚀 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    window.location.href = "/login";  // Redirect to login
  };

  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard</h1>
      <h2>Your Expenses 💸</h2>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Title"
          value={expenseTitle}
          onChange={(e) => setExpenseTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddExpense}>➕ Add Expense</button>
      </div>

      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            {editingExpense && editingExpense._id === expense._id ? (
              <>
                <input
                  type="number"
                  value={updatedAmount}
                  onChange={(e) => setUpdatedAmount(e.target.value)}
                />
                <button className="update-btn" onClick={handleUpdateExpense}>✅ Save</button>
              </>
            ) : (
              <>
                <span>💰 {expense.title}: ${expense.amount}</span>
                <div>
                  <button className="edit-btn" onClick={() => handleEditExpense(expense)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteExpense(expense._id)}>❌ Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
   
  );
};

export default Dashboard;
