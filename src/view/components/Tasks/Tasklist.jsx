// src/view/components/Tasks/Tasklist.jsx
import React from "react";
import styles from "../../pages/Tasks/style.module.css"; // Using unified styles

export default function Tasklist({ tasks, onToggle, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <p className={styles.noTasks}>No tasks to show for this section.</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((t) => (
        <li key={t.id} className={styles.listItem}>
          <input
            type="checkbox"
            checked={t.completed}
            // Pass isGroupTask and groupId to onToggle
            onChange={() => onToggle(t.id, t.isGroupTask, t.groupId)}
          />
          <span className={`${styles.taskTitle} ${t.completed ? styles.completed : ""}`}>
            {t.title}
            {t.type === "deadline" && (
              <span className={styles.deadlineTag}>DEADLINE</span>
            )}
            {/* Display group name if it's a group task */}
            {t.isGroupTask && t.groupName && (
              <span className={styles.groupTaskTag}> ({t.groupName})</span>
            )}
          </span>
          <div className={styles.taskActions}>
            <button
              // Pass isGroupTask and groupId to onEdit
              onClick={() => onEdit(t)}
              className={`${styles.btn} ${styles.btnEdit}`}
            >
              Edit
            </button>
            <button
              // Pass isGroupTask and groupId to onDelete
              onClick={() => onDelete(t.id, t.isGroupTask, t.groupId)}
              className={`${styles.btn} ${styles.btnDanger}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}