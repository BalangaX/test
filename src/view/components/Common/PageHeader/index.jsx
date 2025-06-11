import React from 'react';
import styles from './style.module.css';

export default function PageHeader({ title, subtitle }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}