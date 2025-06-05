import React from 'react';
import styles from './style.module.css';

export default function RatingsList({ posts }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Community Feed</h2>
      <ul className={styles.list}>
        {posts.map((p, idx) => {
          // Convert Firestore timestamp to readable string if necessary
          const dateStr = p.createdAt
            ? new Date(p.createdAt.seconds * 1000).toLocaleString()
            : '';
          return (
            <li key={p.id} className={styles.item}>
              <div className={styles.postHeader}>
                <strong>{p.authorName}</strong>{' '}
                <span className={styles.timestamp}>{dateStr}</span>
              </div>
              <p className={styles.postContent}>{p.content}</p>
              {idx < posts.length - 1 && <hr className={styles.divider} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}