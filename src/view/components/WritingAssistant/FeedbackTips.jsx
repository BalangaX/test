import React, { useState } from "react";
import styles from "./FeedbackTips.module.css";
import { FaLightbulb } from "react-icons/fa";

export default function FeedbackTips({ tips = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!tips.length) return null;

  return (
    <div className={styles.card}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaLightbulb className={styles.icon} />
        <span className={styles.heading}>Feedback & Tips</span>
        <span
          className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <ol className={styles.list}>
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ol>
      )}
    </div>
  );
}