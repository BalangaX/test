// src/view/pages/Tasks/index.jsx
import React, { useState } from "react";
import styles from "./style.module.css";

import TaskForm from "../../components/Tasks/TaskForm";
import TaskList from "../../components/Tasks/TaskList";
import MyCalendar from "../../components/Tasks/MyCalendar";

const todayISO = new Date().toISOString().slice(0, 10);

const initialTasks = [
  {
    id: "1",
    title: "Statistics Project",
    type: "deadline",
    completed: false,
    date: todayISO,
  },
  {
    id: "2",
    title: "Complete research paper draft",
    type: "standard",
    completed: false,
    date: todayISO,
  },
  {
    id: "3",
    title: "Study for statistics exam",
    type: "standard",
    completed: false,
    date: todayISO,
  },
];

// עזר לבדיקת תאריך עתידי
const isFutureDate = (taskDate) => {
  const today = new Date().toISOString().slice(0, 10);
  return taskDate > today;
};

export default function TasksPage() {
  // state של כל המשימות
  const [tasks, setTasks] = useState(initialTasks);
  // האם הטופס ליצירת משימה פתוח?
  const [showForm, setShowForm] = useState(false);
  // התאריך הנבחר בלוח השנה
  const [selectedDate, setSelectedDate] = useState(new Date());

  // מתרחש כשמסמנים/מסירים וי על משימה
  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // מתרחש כשמוסיפים משימה חדשה מהטופס
  const handleAdd = ({ title }) => {
    const dateStr = selectedDate.toISOString().slice(0, 10);
    const newTask = {
      id: Date.now().toString(),
      title,
      date: dateStr,
      completed: false,
      type: "standard", // ניתן לשנות ל"deadline" אם תרצו
    };
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  };

  // מסנן משימות עבור התאריך הנבחר
  const dateStr = selectedDate.toISOString().slice(0, 10);
  const tasksForDate = tasks.filter((t) => t.date === dateStr);

  // מסנן משימות מסוג "deadline" שעדיין לא עברו תאריך
  const upcomingDeadlines = tasks.filter(
    (t) => t.type === "deadline" && isFutureDate(t.date)
  );

  // חישוב סיכום משימות פתוחות וסגורות
  const completedCount = tasks.filter((t) => t.completed).length;
  const openCount = tasks.length - completedCount;

  return (
    <div className={styles.tasksWrapper}>
      <h1 className={styles.title}>Learning & Tasks Management</h1>
      <p className={styles.subtitle}>Personalized Learning Dashboard</p>

      {/* אם showForm=true, מציגים את הטופס למעלה */}
      {showForm && (
        <TaskForm
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className={styles.grid}>
        {/* ״Tasks Section״ */}
        <div className={styles.card}>
          <div className={styles.sectionTitle}>
            Today’s Tasks for <b>{selectedDate.toLocaleDateString()}</b>
          </div>
          <TaskList
            tasks={tasksForDate}
            onToggle={handleToggle}
          />

          <div className={styles.sectionTitle}>Upcoming Deadlines</div>
          <TaskList
            tasks={upcomingDeadlines}
            type="deadline"
            onToggle={handleToggle}
          />

          <div className={styles.sectionTitle}>Progress Overview</div>
          <div className={styles.overview}>
            <div>Open Tasks: {openCount}</div>
            <div>Completed Tasks: {completedCount}</div>
          </div>
        </div>

        {/* ״Calendar + Quick Actions״ */}
        <div className={styles.card}>
          <div className={styles.sectionTitle}>Your Calendar</div>
          <MyCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasks}
          />

          <div className={styles.sectionTitle}>Quick Actions</div>
          <div className={styles.actionsRow}>
            <button
              className={styles.btnPrimary}
              onClick={() => setShowForm(true)}
            >
              📝 Create Task
            </button>
            <button className={styles.btnSecondary}>
              💬 Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}