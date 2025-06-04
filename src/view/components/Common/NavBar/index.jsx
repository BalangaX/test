import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth } from '../../../../context/AuthContext';

// Mock Admin UIDs - this should ideally come from a config or context
const ADMIN_UIDS_NAV = ['admin@example.com', 'superadmin@example.com'];


const NavBar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isUserAdmin = currentUser && ADMIN_UIDS_NAV.includes(currentUser.email);

  // Active style for NavLink, applied if isActive is true
  const getActiveStyle = ({ isActive }) => {
    return isActive
      ? { fontWeight: 'bold', textDecoration: 'underline', color: 'var(--accent-color)' }
      : {};
  };

  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li><NavLink to="/" className={styles.navLink} style={getActiveStyle}>Home</NavLink></li>
        {currentUser && <li><NavLink to="/dashboard" className={styles.navLink} style={getActiveStyle}>Dashboard</NavLink></li>}
        <li><NavLink to="/summaries" className={styles.navLink} style={getActiveStyle}>Summaries</NavLink></li>
        <li><NavLink to="/tasks" className={styles.navLink} style={getActiveStyle}>Tasks</NavLink></li>
        <li><NavLink to="/writing-assistant" className={styles.navLink} style={getActiveStyle}>Writing Assistant</NavLink></li>
        <li><NavLink to="/social-hub" className={styles.navLink} style={getActiveStyle}>Social Hub</NavLink></li>
        <li><NavLink to="/help-settings" className={styles.navLink} style={getActiveStyle}>Help & Settings</NavLink></li>

        {isUserAdmin && (
            <li><NavLink to="/admin" className={styles.navLink} style={getActiveStyle}>Admin</NavLink></li>
        )}

        {currentUser ? (
          <li><button onClick={handleLogout} className={styles.navLink} style={{background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', padding: 0, fontWeight: 500}}>Logout ({currentUser.email.substring(0, currentUser.email.indexOf('@'))})</button></li>
        ) : (
          <li><NavLink to="/auth" className={styles.navLink} style={getActiveStyle}>Login/Register</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
