import { useState } from 'react';
import { tasks as initialTasks } from '../../../data/tasks';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

let idCounter = initialTasks.length + 1;

const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (title) => {
    setTasks([...tasks, { id: idCounter++, title, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <TaskForm onAdd={addTask} />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
