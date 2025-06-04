// src/view/components/Tasks/MyCalendar.jsx

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MyCalendar({ selectedDate, onSelectDate, tasks }) {
  const taskDates = tasks.map((t) => t.date);

  return (
    <Calendar
      locale="en-US"
      onChange={onSelectDate}
      value={selectedDate}
      tileClassName={({ date, view }) => {
        const dateStr = date.toISOString().slice(0, 10);
        if (view === "month" && taskDates.includes(dateStr)) {
          return "react-calendar__tile--hasTask";
        }
        return null;
      }}
    />
  );
}