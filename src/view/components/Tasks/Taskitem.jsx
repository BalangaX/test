// src/view/components/Tasks/TaskItem.jsx

import React from "react";
import styles from "./style.module.css";

export default function TaskItem({ task, onToggle }) {
  return (
    <div
      className={`${styles.taskItem} ${
        task.completed ? styles.completed : ""
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>
        {task.title}
        {task.description && " - " + task.description}
      </span>
    </div>
  );
}