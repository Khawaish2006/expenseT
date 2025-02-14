import React, { useState } from "react";
import { updateExpense, deleteExpense } from "../services/expenseService";
import "./ExpenseList.css"; // Import CSS for styling

const ExpenseList = ({ expenses, setExpenses }) => {
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [editExpense, setEditExpense] = useState({ title: "", amount: "", category: "" });

  // Toggle Expand/Collapse
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle Edit Click
  const handleEditClick = (expense) => {
    setEditingId(expense._id);
    setEditExpense({ title: expense.title, amount: expense.amount, category: expense.category });
  };

  // Handle Update Expense
  const handleUpdateExpense = async (id) => {
    const updatedExpense = await updateExpense(id, editExpense);
    setExpenses(expenses.map(exp => (exp._id === id ? updatedExpense : exp)));
    setEditingId(null); // Exit edit mode
  };

  // Handle Delete Expense
  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(exp => exp._id !== id));
  };

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div className="expense-grid">
          {expenses.map((expense) => (
            <div key={expense._id} className="expense-card">
              <div className="expense-header" onClick={() => toggleExpand(expense._id)}>
                <h4>{expense.title}</h4>
                <p>💰 ${expense.amount}</p>
                <span className="dropdown-icon">{expandedId === expense._id ? "▲" : "▼"}</span>
              </div>

              {expandedId === expense._id && (
                <div className="expense-details">
                  {editingId === expense._id ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editExpense.title}
                        onChange={(e) => setEditExpense({ ...editExpense, title: e.target.value })}
                      />
                      <input
                        type="number"
                        value={editExpense.amount}
                        onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                      />
                      <input
                        type="text"
                        value={editExpense.category}
                        onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                      />
                      <button className="save-btn" onClick={() => handleUpdateExpense(expense._id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <p>📂 Category: {expense.category}</p>
                      <div className="expense-actions">
                        <button className="edit-btn" onClick={() => handleEditClick(expense)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
