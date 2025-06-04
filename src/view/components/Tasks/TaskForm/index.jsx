import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskToEdit, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo'); // Default status

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
      setPriority(taskToEdit.priority || 'medium');
      setStatus(taskToEdit.status || 'todo');
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setStatus('todo');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Basic validation

    const taskData = {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        status
    };

    if(taskToEdit) {
        taskData.id = taskToEdit.id; // Keep original ID for editing
    }

    onSubmit(taskData);

    if (!taskToEdit) { // Reset form only if it was for a new task
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setStatus('todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h3>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {taskToEdit && ( // Only show status dropdown if editing, otherwise new tasks are 'todo'
         <div>
         <label>Status:</label>
         <select value={status} onChange={(e) => setStatus(e.target.value)}>
           <option value="todo">To Do</option>
           <option value="inprogress">In Progress</option>
           <option value="done">Done</option>
         </select>
       </div>
      )}
      <button type="submit" style={{ marginRight: '10px', marginTop: '10px' }}>{taskToEdit ? 'Save Changes' : 'Add Task'}</button>
      {taskToEdit && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
