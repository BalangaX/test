import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const uname = identifier.trim().toLowerCase();
      const isEmail = uname.includes("@");
      let emailToUse = isEmail ? uname : "";

      if (!isEmail) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", uname));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return setError("User not found");
        }
        emailToUse = querySnapshot.docs[0].data().email;
      }
      await login(emailToUse, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="identifier" className="form-label">Email or Username</label>
          <input
            id="identifier"
            className="form-input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button className="submit-btn" type="submit">Login</button>

        <div className="switch-auth">
          <span>Don’t have an account? </span>
          <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}