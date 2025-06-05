import React, { useState } from "react";
import styles from "./FeedbackTips.module.css";

export default function FeedbackTips({ tips = [] }) {
  const [collapsed, setCollapsed] = useState(true);

  if (!tips.length) return null;

  return (
    <div className={styles.card}>
      <button
        className={styles.heading}
        onClick={() => setCollapsed((c) => !c)}
      >
        Feedback &amp; Tips {collapsed ? "▼" : "▲"}
      </button>
      {!collapsed && (
        <ol className={styles.list}>
          {tips.map((tip, i) => (
            <li key={i}>
              <span className={styles.number}>{i + 1}</span>
              {tip}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}