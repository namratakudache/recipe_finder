import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Private route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public route component
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export { PrivateRoute, PublicRoute };

