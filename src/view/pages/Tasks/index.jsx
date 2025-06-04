import React, { useState } from 'react';
import TaskList from '../../components/Tasks/TaskList';
import TaskForm from '../../components/Tasks/TaskForm';
import MyCalendar from '../../components/Tasks/MyCalendar';
import Chat from '../../components/Tasks/Chat';
import useTasks from '../../../hooks/useTasks';
import { useAuth } from '../../../context/AuthContext';
import styles from './TasksPage.module.css'; // Import TasksPage.module.css

const TasksPage = () => {
  const { currentUser } = useAuth();
  const {
    tasks, loading: tasksLoading, error: tasksError,
    addTask, updateTask, deleteTask, updateTaskStatus
  } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleFormSubmit = async (taskData) => {
    try {
      if (taskToEdit) {
        const { id, ...dataToUpdate } = taskData;
        await updateTask(id, dataToUpdate);
        setTaskToEdit(null);
      } else {
        const dataWithStatus = taskData.status ? taskData : {...taskData, status: 'todo'};
        await addTask(dataWithStatus);
      }
    } catch (err) {
      alert(`Error saving task: ${err.message}`);
      console.error("Task operation error:", err);
    }
  };

  const handleSetTaskToEdit = (task) => setTaskToEdit(task);
  const handleCancelEdit = () => setTaskToEdit(null);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try { await deleteTask(taskId); } catch (err) {
        alert(`Error deleting task: ${err.message}`); console.error("Delete task error:", err);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try { await updateTaskStatus(taskId, newStatus); } catch (err) {
      alert(`Error updating task status: ${err.message}`); console.error("Status change error:", err);
    }
  };

  if (!currentUser) {
    return <div className={styles.tasksPageContainer}><p>Please login to manage your tasks.</p></div>;
  }
  if (tasksLoading) {
    return <div className={styles.tasksPageContainer}><p className={styles.loadingText}>Loading tasks...</p></div>;
  }
  if (tasksError) {
    return <div className={styles.tasksPageContainer}><p className={styles.errorText}>Error loading tasks: {tasksError}</p></div>;
  }

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className={styles.tasksPageContainer}>
      <h1 className={styles.pageTitle}>My Tasks</h1>
      <TaskForm onSubmit={handleFormSubmit} taskToEdit={taskToEdit} onCancelEdit={handleCancelEdit} />

      <h2 className={styles.sectionTitle}>Task Board</h2>
      {tasks.length === 0 && !tasksLoading && <p className={styles.placeholderText}>No tasks found. Add one above!</p>}
      <div className={styles.taskBoardContainer}>
        <TaskList title="To Do" tasks={todoTasks} onEditTask={handleSetTaskToEdit} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
        <TaskList title="In Progress" tasks={inProgressTasks} onEditTask={handleSetTaskToEdit} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
        <TaskList title="Done" tasks={doneTasks} onEditTask={handleSetTaskToEdit} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      </div>

      <div className={styles.additionalFeaturesContainer}>
        <div className={styles.featureBox}><MyCalendar tasks={tasks} /></div>
        <div className={styles.featureBox}><Chat /></div>
      </div>
    </div>
  );
};
export default TasksPage;
