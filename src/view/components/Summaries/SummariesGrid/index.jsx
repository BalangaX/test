import React from 'react';
import SummaryCard from '../SummaryCard';
import styles from './style.module.css';

export default function SummariesGrid({ summaries }) {
  if (!summaries || summaries.length === 0) {
    return <p className={styles.noResults}>No summaries found.</p>;
  }

  return (
    <div className={styles.grid}>
      {summaries.map((summary) => (
        <SummaryCard key={summary.id} summary={summary} />
      ))}
    </div>
  );
}