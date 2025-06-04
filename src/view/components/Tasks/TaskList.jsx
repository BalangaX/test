import React from "react";
import styles from "./style.module.css";

export default function TaskList({ tasks, onToggle, type = "standard" }) {
  if (!tasks.length) {
    return <p className={styles.noTasks}>No tasks to show.</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((t) => (
        <li key={t.id} className={styles.listItem}>
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => onToggle(t.id)}
          />
          <span className={t.completed ? styles.completed : ""}>
            {t.title}
            {type === "deadline" && (
              <span className={styles.deadlineTag}> 🔴 </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}