import React, { useState } from 'react'; // Removed useEffect as useTasks handles data fetching
import TaskList from '../../components/Tasks/TaskList';
import TaskForm from '../../components/Tasks/TaskForm';
import MyCalendar from '../../components/Tasks/MyCalendar'; // Stays as placeholder
import Chat from '../../components/Tasks/Chat'; // Stays as placeholder
import useTasks from '../../../hooks/useTasks'; // Import the new hook
import { useAuth } from '../../../context/AuthContext'; // To ensure user is loaded

const tasksPageStyle = { padding: '20px' };
const taskBoardStyle = { display: 'flex', flexDirection: 'row', gap: '20px', overflowX: 'auto', paddingBottom: '10px' };

const TasksPage = () => {
  const { currentUser } = useAuth();
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus // Added from useTasks
  } = useTasks();

  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleFormSubmit = async (taskData) => {
    try {
      if (taskToEdit) {
        // Ensure not to spread taskData.id if it's what we are editing by.
        // The updateTask in the hook expects (taskId, dataToUpdate)
        const { id, ...dataToUpdate } = taskData;
        await updateTask(id, dataToUpdate);
        setTaskToEdit(null); // Clear editing state
      } else {
        // Ensure status is part of taskData if not set by TaskForm by default for new tasks
        const dataWithStatus = taskData.status ? taskData : {...taskData, status: 'todo'};
        await addTask(dataWithStatus);
      }
    } catch (err) {
      // Should display this error to the user appropriately
      alert(`Error saving task: ${err.message}`);
      console.error("Task operation error:", err);
    }
  };

  const handleSetTaskToEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        alert(`Error deleting task: ${err.message}`);
        console.error("Delete task error:", err);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus); // Use the specific hook function
    } catch (err) {
      alert(`Error updating task status: ${err.message}`);
      console.error("Status change error:", err);
    }
  };

  if (!currentUser) {
    return <div style={tasksPageStyle}><p>Please login to manage your tasks.</p></div>;
  }

  if (tasksLoading) {
    return <div style={tasksPageStyle}><p>Loading tasks...</p></div>;
  }

  if (tasksError) {
    return <div style={tasksPageStyle}><p style={{color: 'red'}}>Error loading tasks: {tasksError}</p></div>;
  }

  // Filter tasks by status for Kanban columns
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div style={tasksPageStyle}>
      <h1>My Tasks</h1>
      <TaskForm
        onSubmit={handleFormSubmit}
        taskToEdit={taskToEdit}
        onCancelEdit={handleCancelEdit}
      />

      <h2>Task Board</h2>
      {tasks.length === 0 && !tasksLoading && <p>No tasks found. Add one above!</p>}
      <div style={taskBoardStyle}>
        <TaskList
            title="To Do"
            tasks={todoTasks}
            onEditTask={handleSetTaskToEdit}
            onDeleteTask={handleDelete}
            onStatusChange={handleStatusChange}
        />
        <TaskList
            title="In Progress"
            tasks={inProgressTasks}
            onEditTask={handleSetTaskToEdit}
            onDeleteTask={handleDelete}
            onStatusChange={handleStatusChange}
        />
        <TaskList
            title="Done"
            tasks={doneTasks}
            onEditTask={handleSetTaskToEdit}
            onDeleteTask={handleDelete}
            onStatusChange={handleStatusChange}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{flex: 1, minWidth: '300px'}}>
            <MyCalendar tasks={tasks} />
        </div>
        <div style={{flex: 1, minWidth: '300px'}}>
            <Chat />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
