import React, { useState } from 'react';
import initialTasks from '../../../data/tasks';
import styles from './style.module.css';
import TaskForm from '../../components/Tasks/TaskForm'; // Import TaskForm

// Helper function to generate unique IDs (if not already in tasks.js or for new tasks)
const generateId = () => `task_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Task object or null

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleShowAddForm = () => {
    setEditingTask(null); // Ensure we are not editing
    setIsFormVisible(true);
  };

  const handleShowEditForm = (task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingTask) {
      // Update existing task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id ? { ...task, ...formData, id: editingTask.id } : task
        )
      );
    } else {
      // Add new task
      setTasks(prevTasks => [
        ...prevTasks,
        { ...formData, id: generateId(), completed: false }, // Ensure new tasks have an ID and completed status
      ]);
    }
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setEditingTask(null);
  };

  return (
    <div className={styles.tasksPageContainer}>
      <header className={styles.header}>
        <h1>My Tasks</h1>
        {!isFormVisible && ( // Only show Add button if form is not visible
          <button className={styles.addButton} onClick={handleShowAddForm}>
            Add New Task
          </button>
        )}
      </header>

      {isFormVisible && (
        <TaskForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          initialData={editingTask}
        />
      )}

      <div className={styles.taskList}>
        {tasks.length === 0 && !isFormVisible ? ( // Also hide if form is up for adding first task
          <p className={styles.noTasksMessage}>No tasks yet. Add some!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
              <div className={styles.taskDetails}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  className={styles.checkbox}
                />
                <div className={styles.taskInfo}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  {task.description && <p className={styles.taskDescription}>{task.description}</p>}
                  <div className={styles.taskMeta}>
                    {task.dueDate && <span className={styles.dueDate}>Due: {task.dueDate}</span>}
                    {task.priority && (
                      <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                        {task.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.taskActions}>
                <button className={styles.editButton} onClick={() => handleShowEditForm(task)}>Edit</button>
                <button className={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}