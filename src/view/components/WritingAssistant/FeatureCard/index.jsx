import React from 'react';

const featureCardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px 0',
  backgroundColor: '#fff',
};

const FeatureCard = ({ title, children }) => {
  return (
    <div style={featureCardStyle}>
      {title && <h4>{title}</h4>}
      <div>{children}</div>
    </div>
  );
};

export default FeatureCard;
