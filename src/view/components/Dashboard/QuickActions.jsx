import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./QuickActions.module.css";

export default function QuickActions({ className = "" }) {
  const actions = [
    { label: "Create Task", to: "/tasks", icon: "➕" },
    { label: "Upload Summary", to: "/summaries", icon: "⬆️" },
    { label: "Writing Assistant", to: "/writing-assistant", icon: "✍️" },
  ];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {actions.map((a) => (
        <Link key={a.to} to={a.to} className={styles.action}>
          <span className={styles.icon}>{a.icon}</span>
          <span>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

QuickActions.propTypes = {
  className: PropTypes.string,
};
