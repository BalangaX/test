import React from 'react';

const MyCalendar = ({ tasks }) => {
  // Basic display of tasks, not a full calendar
  return (
    <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
      <h3>Task Calendar (Upcoming Due Dates)</h3>
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks
            .filter(task => task.dueDate)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5) // Show top 5 upcoming
            .map(task => (
              <li key={task.id}>
                {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}
              </li>
            ))}
        </ul>
      ) : (
        <p>No tasks with due dates to display.</p>
      )}
      <p><small><i>Full calendar integration coming soon.</i></small></p>
    </div>
  );
};

export default MyCalendar;
