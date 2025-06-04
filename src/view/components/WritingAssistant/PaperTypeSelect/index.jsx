import React from 'react';

const PaperTypeSelect = ({ paperTypes, selectedType, onSelectType }) => {
  return (
    <div>
      <label htmlFor="paperType" style={{ marginRight: '10px' }}>Select Paper Type:</label>
      <select id="paperType" value={selectedType} onChange={(e) => onSelectType(e.target.value)}>
        <option value="">--Select Paper Type--</option>
        {paperTypes.map(pt => (
          <option key={pt.id} value={pt.id}>{pt.name}</option>
        ))}
      </select>
    </div>
  );
};

export default PaperTypeSelect;
