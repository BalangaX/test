import React from "react";
import styles from "./FeatureCard.module.css";

export default function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className={styles.card} onClick={() => alert(`${title} clicked`)}>
      {icon}
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}