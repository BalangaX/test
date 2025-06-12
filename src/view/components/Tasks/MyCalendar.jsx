import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../../pages/Tasks/style.module.css';

export default function MyCalendar({ selectedDate, onSelectDate, tasks }) {
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
  className={styles['react-calendar']}
  tileClassName={tileClassName}
  locale="en-IL"
  calendarType="gregory"
/>
  );
}