import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      console.error("Login failed:", data.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <h1>💰 Expense Tracker</h1>
        <h2>Track your expenses easily</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="login-btn">Get Started</button>
        </form>
        <p>
          Don't have an account? <a href="/">Sign up here</a>
        </p>
      </div>
      
    </div>
  );
};

export default Login;
