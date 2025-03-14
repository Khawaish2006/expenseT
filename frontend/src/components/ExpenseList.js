import React, { useEffect } from "react";
import { getExpenses } from "../services/expenseService";

const ExpenseList = ({ expenses, setExpenses }) => {
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data); // ✅ Set fetched expenses
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [setExpenses]);

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <div key={expense._id}>
          <h4>{expense.title} - ${expense.amount}</h4>
          <p>{expense.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
