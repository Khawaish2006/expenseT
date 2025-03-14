import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  }, [token, userId]);

  return (
    <AuthContext.Provider value={{ token, userId, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
