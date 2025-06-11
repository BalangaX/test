import React from 'react';
import styles from './style.module.css';

export default function SummaryCard({ summary }) {
  const { title, author, uploadDate, pdfURL } = summary;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>By: {author}</p>
        <p className={styles.date}>{new Date(uploadDate).toLocaleDateString()}</p>
      </div>
      <div className={styles.actions}>
        <a
          href={pdfURL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.viewBtn}`}
        >
          View
        </a>
        <a
          href={pdfURL}
          download
          className={`${styles.button} ${styles.downloadBtn}`}
        >
          Download
        </a>
      </div>
    </div>
  );
}