import React, { useState, useEffect } from "react";
import styles from "./SettingsPanel.module.css";

/**
 * SettingsPanel – manages Dark‑Mode, Email Notifications and UI Language.
 * All preferences persist to localStorage and dark‑mode toggles a body class.
 */
export default function SettingsPanel() {
  /** ----- Helpers ----- */
  const getLS = (key, fallback) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    if (raw === "true") return true;
    if (raw === "false") return false;
    return raw; // for strings like language
  };
  const setLS = (key, value) => localStorage.setItem(key, value);

  /** ----- State ----- */
  const [darkMode, setDarkMode] = useState(() => getLS("sb_darkMode", false));
  const [notifications, setNotifications] = useState(() =>
    getLS("sb_notifications", true)
  );
  const [language, setLanguage] = useState(() => getLS("sb_language", "he"));

  /** ----- Effects ----- */
  // Apply dark‑mode class to <body>
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    setLS("sb_darkMode", darkMode);
  }, [darkMode]);

  // Persist notifications preference
  useEffect(() => setLS("sb_notifications", notifications), [notifications]);

  // Persist language preference
  useEffect(() => setLS("sb_language", language), [language]);

  /** ----- Render ----- */
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>הגדרות</h3>

      {/* Dark Mode */}
      <div className={styles.option}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((v) => !v)}
          />
          <span>מצב כהה (Dark&nbsp;Mode)</span>
        </label>
      </div>

      {/* Email Notifications */}
      <div className={styles.option}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications((v) => !v)}
          />
          <span>קבל התראות באימייל</span>
        </label>
      </div>

      {/* Language Select */}
      <div className={styles.option}>
        <label className={styles.label} htmlFor="lang-select">
          שפת ממשק&nbsp;
        </label>
        <select
          id="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={styles.select}
        >
          <option value="he">עברית</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}