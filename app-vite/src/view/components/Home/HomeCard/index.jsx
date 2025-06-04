import React from 'react';
import { Link } from 'react-router-dom';

// Basic styling for the card
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px',
  textAlign: 'center',
  width: '200px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textDecoration: 'none',
  color: 'inherit'
};

const HomeCard = ({ title, description, linkTo }) => {
  return (
    <Link to={linkTo} style={cardStyle}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default HomeCard;
