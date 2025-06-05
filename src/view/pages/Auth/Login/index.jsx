import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const isEmail = identifier.includes("@");
      const uname = identifier.trim().toLowerCase();

      let emailToUse = identifier;
      if (!isEmail) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", uname));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No user found with that username");
          return;
        }
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        if (!userData.email) {
          setError("Error: user has no email associated");
          return;
        }
        emailToUse = userData.email;
      }
      console.log("Attempting login for", emailToUse);
      await login(emailToUse, password);
      console.log("Login successful, navigating to home");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
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