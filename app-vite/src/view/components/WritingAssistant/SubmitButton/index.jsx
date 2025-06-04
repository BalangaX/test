import React from 'react';

const SubmitButton = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ padding: '10px 20px', marginTop: '20px', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children || 'Get Assistance'}
    </button>
  );
};

export default SubmitButton;
