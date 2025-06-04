import React from 'react';

const taskItemStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '15px',
  marginBottom: '10px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  if (!task) return null;

  return (
    <div style={taskItemStyle}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><small>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</small></p>
      <p><small>Priority: {task.priority}</small></p>
      <p><small>Assignee: {task.assignee}</small></p>
      <div>
        Status:
        <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)} style={{marginLeft: '5px'}}>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => onEdit(task)} style={{ marginRight: '5px' }}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
