import axios from "axios";

// Use environment variable, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || "https://expenset.onrender.com/api/expenses";

// Fetch all expenses
export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/all`); // Keep /all here
  return response.data;
};

// Add a new expense
export const addExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/add`, expense);
  return response.data;
};

// Update an expense
export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/update/${id}`, expense);
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
