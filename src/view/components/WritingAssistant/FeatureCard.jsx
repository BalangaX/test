import React from "react";
import styles from "./FeatureCard.module.css";

export default function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className={styles.card} onClick={() => alert(`${title} clicked`)}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
}