import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (storedUsers.length > 0) {
      setUsers(storedUsers); 
    }

    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser({ username });
     
      localStorage.setItem("loggedInUser", JSON.stringify({ username }));
      return true; 
    } else {
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        alert("Invalid password. Please try again.");
      } else {
        alert("User not found. Please register first.");
      }
      return false;
    }
  };

  const register = (username, password) => {
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      alert("User already exists");
      return false; 
    } else {
      const newUser = { username, password };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
  
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser)); 
      return true; 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
