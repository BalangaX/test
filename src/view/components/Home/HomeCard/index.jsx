import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function HomeCard({ to, icon, title, subtitle, fullWidth }) {
  return (
    <Link to={to} className={`${styles.card} ${fullWidth ? styles.fullWidth : ""}`}>
      <span className={styles.icon}>{icon}</span>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </Link>
  );
}