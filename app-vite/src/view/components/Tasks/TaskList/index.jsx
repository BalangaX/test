import React from 'react';
import TaskItem from '../TaskItem'; // Corrected path

const taskListStyle = {
  backgroundColor: '#f4f5f7',
  borderRadius: '3px',
  padding: '10px',
  margin: '0 10px',
  minWidth: '280px',
  maxWidth: '300px', // Max width for a column
  flex: '1 1 300px', // Flex properties for responsiveness
};

const TaskList = ({ title, tasks, onEditTask, onDeleteTask, onStatusChange }) => {
  return (
    <div style={taskListStyle}>
      <h3>{title} ({tasks.length})</h3>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
