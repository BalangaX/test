import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './AuthPage.module.css'; // Import the CSS module

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, currentUser, error, loading } = useAuth(); // Added loading
  const navigate = useNavigate();

  if (loading) { // Optional: Show loading state
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />; // Or to the last visited page
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      // Navigation on success is handled by the currentUser check redirecting
    } catch (err) {
      console.error("Auth operation failed:", err);
      // Error is already set in AuthContext and displayed
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleButton}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
