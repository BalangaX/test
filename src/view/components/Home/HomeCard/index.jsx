import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeCard.module.css';

const HomeCard = ({ title, description, linkTo }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <Link to={linkTo} className={styles.cardLink}>Go to {title}</Link>
    </div>
  );
};

export default HomeCard;
