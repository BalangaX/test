import React from 'react';
import styles from './style.module.css';

export default function SummariesHeader() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Summaries Library</h1>
      <p className={styles.description}>
        Search and filter academic summaries shared by the community.
      </p>
    </div>
  );
}