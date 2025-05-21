import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css'; // To be created in Step 5

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate || '');
      setPriority(initialData.priority || 'Medium');
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.'); // Basic validation
      return;
    }
    onSubmit({
      // id will be handled by the parent component if it's a new task
      ...(initialData && { id: initialData.id }), 
      title,
      description,
      dueDate,
      priority,
      // completed status is not directly managed by this form, parent handles it
    });
    // Optionally reset form or let parent handle visibility
    if (!initialData) { // Reset only if it's a new task form
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <h2>{initialData ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {initialData ? 'Save Changes' : 'Add Task'}
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
