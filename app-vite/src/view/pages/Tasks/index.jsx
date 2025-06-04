import React, { useState, useEffect } from 'react';
import TaskList from '../../components/Tasks/TaskList';
import TaskForm from '../../components/Tasks/TaskForm';
import MyCalendar from '../../components/Tasks/MyCalendar';
import Chat from '../../components/Tasks/Chat';
import { mockTasks } from '../../../data/tasks'; // Using mock data
import { useAuth } from '../../../context/AuthContext';

const tasksPageStyle = {
  padding: '20px',
};

const taskBoardStyle = {
  display: 'flex',
  flexDirection: 'row', // Default for larger screens
  gap: '20px',
  overflowX: 'auto', // Allow horizontal scrolling for columns if needed
  paddingBottom: '10px', // Space for scrollbar
  // Media query for smaller screens will be handled by CSS file or more complex JS
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { currentUser } = useAuth(); // To potentially assign tasks or filter by user

  useEffect(() => {
    // Simulate fetching tasks - eventually from Firestore
    // For now, assign all tasks to the current user for simplicity in mock
    const userTasks = mockTasks.map(task => ({ ...task, assignee: currentUser ? currentUser.email : 'unassigned' }));
    setTasks(userTasks);
  }, [currentUser]);

  const handleAddTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: `t${Date.now()}`, // Simple unique ID for mock
      assignee: currentUser ? currentUser.email : 'unassigned',
      // status is already set in TaskForm, defaults to 'todo'
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleEditTask = (editedTaskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === editedTaskData.id ? { ...task, ...editedTaskData } : task))
    );
    setTaskToEdit(null); // Clear editing state
  };

  const handleSetTaskToEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Filter tasks by status for Kanban columns
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div style={tasksPageStyle}>
      <h1>My Tasks</h1>
      <TaskForm
        onSubmit={taskToEdit ? handleEditTask : handleAddTask}
        taskToEdit={taskToEdit}
        onCancelEdit={handleCancelEdit}
      />

      <h2>Task Board</h2>
      <div style={taskBoardStyle}>
        <TaskList
            title="To Do"
            tasks={todoTasks}
            onEditTask={handleSetTaskToEdit}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
        />
        <TaskList
            title="In Progress"
            tasks={inProgressTasks}
            onEditTask={handleSetTaskToEdit}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
        />
        <TaskList
            title="Done"
            tasks={doneTasks}
            onEditTask={handleSetTaskToEdit} // Usually can't edit 'done' tasks, but enabled for now
            onDeleteTask={handleDeleteTask}
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
