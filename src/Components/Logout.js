import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 
  const handleLogout = () => {
    console.log("Logging out..."); 
    logout(); 
    navigate("/home"); 
  };

  return <button onClick={() => handleLogout()}>Logout</button>; 
};

export default LogoutComponent;
