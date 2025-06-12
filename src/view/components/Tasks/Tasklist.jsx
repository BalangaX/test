import React from "react";
import styles from "../../pages/Tasks/style.module.css"; 

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
            onChange={() => onToggle(t.id, t.isGroupTask, t.groupId)}
          />
          <span className={`${styles.taskTitle} ${t.completed ? styles.completed : ""}`}>
            {t.title}
            {t.type === "deadline" && (
              <span className={styles.deadlineTag}>DEADLINE - {
                (() => {
                  const [year, month, day] = t.date.split('-').map(Number);
                  const localDate = new Date(year, month - 1, day);
                  return localDate.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
                })()
              }</span>
            )}
            {t.isGroupTask && t.groupName && (
              <span className={styles.groupTaskTag}> ({t.groupName})</span>
            )}
          </span>
          <div className={styles.taskActions}>
            <button
              onClick={() => onEdit(t)}
              className={`${styles.btn} ${styles.btnEdit}`}
            >
              Edit
            </button>
            <button
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