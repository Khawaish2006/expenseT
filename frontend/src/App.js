import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/signup';  // Adjust the path if needed
import Login from './components/LoginPage';   // Adjust the path if needed
import Dashboard from './components/Dashboard';  // Adjust the path if needed
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route to the SignUp page */}
        <Route path="/" element={<SignUp />} /> {/* Show SignUp first */}
        {/* Route to the Login page */}
        <Route path="/login" element={<Login />} />
        {/* Route to the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
