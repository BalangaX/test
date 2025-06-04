// src/view/pages/Auth/Register/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import styles from "./style.module.css";

export default function RegisterPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const { register }            = useAuth();
  const navigate                = useNavigate();
  const allowedDomain           = "365.ono.ac.il";

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    const parts = email.split("@");
    if (parts.length !== 2 || parts[1].toLowerCase() !== allowedDomain) {
      setError(`Use your university email (@${allowedDomain})`);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign Up</h1>
        {error && <div className={styles.error}>{error}</div>}

        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email" type="email" required className={styles.input}
          value={email} onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password" type="password" required className={styles.input}
          value={password} onChange={e => setPassword(e.target.value)}
        />

        <label htmlFor="confirm" className={styles.label}>Confirm Password</label>
        <input
          id="confirm" type="password" required className={styles.input}
          value={confirm} onChange={e => setConfirm(e.target.value)}
        />

        <button type="submit" className={styles.btn}>Register</button>

        <div className={styles.footer}>
          <span>Already have an account?</span>
          <a href="/login" className={styles.link}>Login</a>
        </div>
      </form>
    </div>
  );
}