import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeCard.module.css'; // Import CSS Module

const HomeCard = ({ title, description, linkTo }) => {
  return (
    <Link to={linkTo} className={styles.homeCard}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default HomeCard;
