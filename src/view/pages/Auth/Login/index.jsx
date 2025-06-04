// src/view/pages/Auth/Login/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import logger from "../../../../utils/logger.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]     = useState("");
  const [remember, setRemember]     = useState(false);
  const [error, setError]           = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    /* ---- ADMIN BYPASS ---- */
    if (identifier === "1111" && password === "1111") {
      try {
        logger.log("Attempting admin login");
        await login(identifier, password); // עדכן את currentUser ל-admin
        logger.log("Admin login successful");
        navigate("/", { replace: true });
      } catch (err) {
        logger.error("Admin login failed:", err);
        setError(err.message || "Admin login failed");
      }
      return;
    }

    /* ---- NORMAL FLOW ---- */
    if (!/@/.test(identifier)) {
      setError("Use your university email address");
      return;
    }

    try {
      logger.log("Attempting login for", identifier, "remember:", remember);
      await login(identifier, password);
      logger.log("Login successful, navigating to home");
      navigate("/", { replace: true });
    } catch (err) {
      logger.error("Login failed:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}

        <label>
          Email or Username
          <input
            className="input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you@uni.edu OR 1111"
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <label className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />{" "}
          Remember Me
        </label>

        <button className="btn-primary" type="submit">
          Login
        </button>

        <div className="switch-auth">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}