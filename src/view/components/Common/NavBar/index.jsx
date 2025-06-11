import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import { useAuth } from '../../../../context/AuthContext';

export default function NavBar() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.isAdmin;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/summaries', label: 'Summaries' },
    { to: '/writing-assistant', label: 'Writing Assistant' },
    { to: '/social-hub', label: 'Social Hub' },
    { to: '/help-settings', label: 'Help & Settings' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  if (isAdmin) {
    links.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>StudyBuddy</div>
      <ul className={styles.menu}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              end={to === '/'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.userInfo}>
        {currentUser ? (
          <span className={styles.username}>
            Hello, {currentUser.username || currentUser.email}
          </span>
        ) : (
          <NavLink to="/login" className={styles.loginLink}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}