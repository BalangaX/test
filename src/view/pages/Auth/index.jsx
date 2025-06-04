import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config';
import styles from './style.module.css';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        await setDoc(doc(db, 'users', userCredential.user.uid), { username });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.toggleButtons}>
        <button
          className={mode === 'login' ? styles.active : ''}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={mode === 'signup' ? styles.active : ''}
          onClick={() => setMode('signup')}
        >
          Sign Up
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        {mode === 'signup' && (
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

