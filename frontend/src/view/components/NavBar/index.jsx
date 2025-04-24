import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/summaries">Summaries</NavLink>
      <NavLink to="/writing-assistant">Writing Assistant</NavLink>
      <NavLink to="/social-hub">Social Hub</NavLink>
      <NavLink to="/help-settings">Help & Settings</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </nav>
  );
}