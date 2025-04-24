import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"; // Updated import

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <NavLink to="/" className={styles.navTitle}>
        MyApp
      </NavLink>
      <ul className={styles.navLinks}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""} end>Home</NavLink></li>
        <li><NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : ""}>Tasks</NavLink></li>
        <li><NavLink to="/summaries" className={({ isActive }) => isActive ? styles.active : ""}>Summaries</NavLink></li>
        <li><NavLink to="/writing-assistant" className={({ isActive }) => isActive ? styles.active : ""}>Writing Assistant</NavLink></li>
        <li><NavLink to="/social-hub" className={({ isActive }) => isActive ? styles.active : ""}>Social Hub</NavLink></li>
        <li><NavLink to="/help-settings" className={({ isActive }) => isActive ? styles.active : ""}>Help & Settings</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ""}>Admin</NavLink></li>
      </ul>
    </nav>
  );
}