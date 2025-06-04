import React from 'react';

const tipsStyle = {
  marginTop: '20px',
  padding: '15px',
  border: '1px dashed #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9'
};

const FeedbackTips = ({ tips, generalTips }) => {
  return (
    <div style={tipsStyle}>
      <h4>Writing Tips:</h4>
      {tips && tips.length > 0 && (
        <>
          <h5>Specific to this template:</h5>
          <ul>
            {tips.map((tip, index) => <li key={`specific-${index}`}>{tip}</li>)}
          </ul>
        </>
      )}
      {generalTips && generalTips.length > 0 && (
         <>
          <h5>General Academic Writing Tips:</h5>
          <ul>
            {generalTips.map((tip, index) => <li key={`general-${index}`}>{tip}</li>)}
          </ul>
        </>
      )}
       {!tips && !generalTips && <p>Select a template to see specific tips.</p>}
    </div>
  );
};

export default FeedbackTips;
