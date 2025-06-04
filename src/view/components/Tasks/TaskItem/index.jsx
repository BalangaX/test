import React from 'react';
import styles from './TaskItem.module.css'; // Import CSS module

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  if (!task) return null;

  return (
    <div className={styles.taskItem}>
      <h4 className={styles.taskTitle}>{task.title}</h4>
      {task.description && <p className={styles.taskDescription}>{task.description}</p>}
      {task.dueDate && <p className={styles.taskMeta}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      <p className={styles.taskMeta}>Priority: {task.priority || 'N/A'}</p>
      {/* <p className={styles.taskMeta}>Assignee: {task.assignee || 'N/A'}</p> */}

      <div className={styles.statusSelectContainer}>
        <label htmlFor={`status-${task.id}`}>Status:</label>
        <select
          id={`status-${task.id}`}
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className={styles.actionsContainer}>
        <button onClick={() => onEdit(task)} className={styles.actionButton}>Edit</button>
        <button onClick={() => onDelete(task.id)} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};
export default TaskItem;
