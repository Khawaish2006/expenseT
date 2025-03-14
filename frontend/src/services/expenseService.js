import axios from "axios";
const API_URL = "https://yourbackend.com/api/expenses";

// Get token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Store token on login
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Fetch expenses for the logged-in user
export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/all`, getAuthHeaders());
  return response.data;
};

// Add a new expense
export const addExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/add`, expense, getAuthHeaders());
  return response.data;
};

// Update an expense
export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/update/${id}`, expense, getAuthHeaders());
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders());
  return response.data;
};