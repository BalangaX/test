const TaskItem = ({ task, onToggle, onDelete }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id)}
    />
    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.title}
    </span>
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
);

export default TaskItem;
