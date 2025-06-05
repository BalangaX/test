import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./QuickActions.module.css";

/**
 * Renders three primary shortcuts so users can jump straight
 * to common flows: create task, upload summary, open writing assistant.
 *
 * You can pass a custom className to control external layout.
 */
export default function QuickActions({ className = "" }) {
  const actions = [
    {
      label: "Create Task",
      to: "/tasks",
      icon: "➕",
    },
    {
      label: "Upload Summary",
      to: "/summaries",
      icon: "⬆️",
    },
    {
      label: "Writing Assistant",
      to: "/writing-assistant",
      icon: "✍️",
    },
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
