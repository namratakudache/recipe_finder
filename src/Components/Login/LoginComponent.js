import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logo } from "../../Constants/constant";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      const registrationSuccess = register(username, password);
      if (registrationSuccess) {
        setUsername("");
        setPassword("");
        setIsRegistering(false);
      }
    } else {
      const loginSuccess = login(username, password);
      if (loginSuccess) {
        navigate("/home");
      }
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      {isAuthenticated ? (
        <p className="login-message">You are logged in!</p>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">
            {isRegistering ? (
              "Register"
            ) : (
              <img src={logo} alt="Logo" style={{ width: 100 }} />
            )}
          </h2>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
          <button className="login-button" type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
          <p className="toggle-message">
            {isRegistering
              ? "Already have an account? "
              : "Don't have an account? "}
            <span className="toggle-link" onClick={toggleRegister}>
              {isRegistering ? "Login" : "Register"}
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
