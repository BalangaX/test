// src/view/components/Tasks/MyCalendar.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default react-calendar styles (can be overridden)
import styles from '../../pages/Tasks/style.module.css'; // Using unified styles

export default function MyCalendar({ selectedDate, onSelectDate, tasks }) {
  // Function to determine if a tile should have a task indicator
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().slice(0, 10);
      const hasTasks = tasks.some(task => task.date === dateString);
      return hasTasks ? styles['react-calendar__tile--hasTask'] : null;
    }
    return null;
  };

  return (
    <Calendar
      onChange={onSelectDate}
      value={selectedDate}
      className={styles['react-calendar']} // Apply custom styles via global class
      tileClassName={tileClassName}
    />
  );
}