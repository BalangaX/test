import React, { useState, useEffect } from "react";
import styles from "./SettingsPanel.module.css";

export default function SettingsPanel() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>הגדרות האפליקציה</h2>
      <div className={styles.option}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          מצב כהה (Dark Mode)
        </label>
      </div>
      <div className={styles.option}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          התראות
        </label>
      </div>
    </div>
  );
}