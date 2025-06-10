// src/view/components/Tasks/TaskForm.jsx
import React, { useState, useEffect } from "react";
import styles from "../../pages/Tasks/style.module.css"; // Using unified styles

export default function TaskForm({ onSave, onCancel, taskToEdit, userGroups }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("personal"); // Default to 'personal', but can be 'deadline' or 'study' from DB
  const [assignedTo, setAssignedTo] = useState("personal"); // 'personal' or group ID

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setType(taskToEdit.type || "personal"); // Ensure type is correctly set from taskToEdit
      setAssignedTo(taskToEdit.isGroupTask ? taskToEdit.groupId : "personal");
    } else {
      // Reset form when not editing or starting new task
      setTitle("");
      setDescription("");
      setType("personal"); // Default type for new task
      setAssignedTo("personal");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({ title, description, type }, assignedTo); // Pass type with taskData
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task name..."
        className={styles.formInput}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description (optional)..."
        className={styles.formInput}
        rows="3"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={styles.formInput}
      >
        <option value="personal">General Task</option> {/* Changed 'Personal' to 'General Task' for clarity */}
        <option value="deadline">Deadline Task</option> {/* Added 'Deadline' option */}
        {/* Removed <option value="study">Study</option> */}
      </select>

      {/* New dropdown for group assignment */}
      {userGroups && userGroups.length > 0 && (
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className={styles.formInput}
        >
          <option value="personal">Assign to: Personal Tasks</option>
          {userGroups.map((group) => (
            <option key={group.id} value={group.id}>
              Assign to: {group.name} (Group)
            </option>
          ))}
        </select>
      )}

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={`${styles.btn} ${styles.btnSecondary}`}>
          Cancel
        </button>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          {taskToEdit ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}