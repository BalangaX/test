import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css'; // Import TaskForm.module.css

const TaskForm = ({ onSubmit, taskToEdit, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
      setPriority(taskToEdit.priority || 'medium');
      setStatus(taskToEdit.status || 'todo');
    } else {
      setTitle(''); setDescription(''); setDueDate('');
      setPriority('medium'); setStatus('todo');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const taskData = { title, description, dueDate: dueDate ? new Date(dueDate) : null, priority, status };
    if (taskToEdit) taskData.id = taskToEdit.id;
    onSubmit(taskData);
    if (!taskToEdit) {
      setTitle(''); setDescription(''); setDueDate('');
      setPriority('medium'); setStatus('todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <h3 className={styles.formTitle}>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h3>
      <div className={styles.formGroup}>
        <label htmlFor="taskTitle">Title:</label>
        <input id="taskTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="taskDescription">Description:</label>
        <textarea id="taskDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="taskDueDate">Due Date:</label>
        <input id="taskDueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="taskPriority">Priority:</label>
        <select id="taskPriority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {taskToEdit && (
        <div className={styles.formGroup}>
          <label htmlFor="taskStatus">Status:</label>
          <select id="taskStatus" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton}>
          {taskToEdit ? 'Save Changes' : 'Add Task'}
        </button>
        {taskToEdit && (
          <button type="button" onClick={onCancelEdit} className={styles.cancelButton}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};
export default TaskForm;
