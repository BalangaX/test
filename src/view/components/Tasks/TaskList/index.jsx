import React from 'react';
import TaskItem from '../TaskItem';
import styles from './TaskList.module.css'; // Import CSS module

const TaskList = ({ title, tasks, onEditTask, onDeleteTask, onStatusChange }) => {
  return (
    <div className={styles.taskList}>
      <h3 className={styles.title}>{title} ({tasks.length})</h3>
      <div className={styles.tasksContainer}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onStatusChange={onStatusChange}
          />
        ))}
        {tasks.length === 0 && <p style={{textAlign: 'center', color: '#777', marginTop: '20px'}}>No tasks here.</p>}
      </div>
    </div>
  );
};
export default TaskList;
