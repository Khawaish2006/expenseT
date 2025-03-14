import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css"; // Import CSS

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const endpoint = isSignup ? "http://localhost:5000/api/auth/signup" : "http://localhost:5000/api/auth/login";
      const { data } = await axios.post(endpoint, formData);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          {isSignup ? "🎉 Sign Up! 🎈" : "🚀 Login Now! 🔥"}
        </h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="🌟 Full Name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔑 Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">
            {isSignup ? "🚀 Create Account" : "🔓 Login"}
          </button>
        </form>
        <p className="auth-toggle">
          {isSignup ? "Already a member?" : "New here?"}
          <button onClick={toggleForm}>
            {isSignup ? "Login 🔑" : "Sign Up 🎉"}
          </button>
        </p>
      </div>
    </div>
  );
}
