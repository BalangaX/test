import React from 'react';
import styles from './style.module.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import logger from '../../../../utils/logger.js';

export default function RatingsList({ comments }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Summary Ratings and Comments</h2>
      <ul className={styles.list}>
        {comments.map((c, idx) => (
          <li key={idx} className={styles.item}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) =>
                i < c.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>
            <p className={styles.comment}>"{c.comment}"</p>
            {idx < comments.length - 1 && <hr className={styles.divider} />}
          </li>
        ))}
      </ul>
      <button
        className={styles.button}
        onClick={() => logger.log('Send message clicked')}
      >
        📩 Send Message
      </button>
    </div>
  );
}