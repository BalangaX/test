import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth } from '../../../../context/AuthContext';

// Mock Admin UIDs - this should ideally come from a config or context
// For styling purposes, we can keep this as is or remove if not directly impacting NavBar style.
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

  // Updated NavLink className logic
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
  };

  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
        {currentUser && <li className={styles.navItem}><NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink></li>}
        <li className={styles.navItem}><NavLink to="/summaries" className={getNavLinkClass}>Summaries</NavLink></li>
        <li className={styles.navItem}><NavLink to="/tasks" className={getNavLinkClass}>Tasks</NavLink></li>
        <li className={styles.navItem}><NavLink to="/writing-assistant" className={getNavLinkClass}>Writing Assistant</NavLink></li>
        <li className={styles.navItem}><NavLink to="/social-hub" className={getNavLinkClass}>Social Hub</NavLink></li>
        <li className={styles.navItem}><NavLink to="/help-settings" className={getNavLinkClass}>Help & Settings</NavLink></li>

        {isUserAdmin && (
            <li className={styles.navItem}><NavLink to="/admin" className={getNavLinkClass}>Admin</NavLink></li>
        )}

        {currentUser ? (
          <li className={styles.navItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout <span className={styles.userEmail}>({currentUser.email.substring(0, currentUser.email.indexOf('@'))})</span>
            </button>
          </li>
        ) : (
          <li className={styles.navItem}><NavLink to="/auth" className={getNavLinkClass}>Login/Register</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
