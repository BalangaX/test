import React, { useState } from "react";
import styles from "./style.module.css";

export default function TaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description: "", type });
    setTitle("");
  };

  return (
    <form className={styles.addTaskForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task name..."
        className={styles.input}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={styles.input}
      >
        <option value="personal">Personal</option>
        <option value="deadline">Deadline</option>
      </select>
      <button type="submit" className={styles.btnPrimary}>
        Add
      </button>
      <button
        type="button"
        onClick={onCancel}
        className={styles.btnSecondary}
      >
        Cancel
      </button>
    </form>
  );
}