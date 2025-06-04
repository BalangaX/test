import React from 'react';

const SummaryFilters = ({ onFilterChange, onSearchChange }) => {
  // Actual filtering logic will be implemented later
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search summaries by title or course..."
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: '8px', flexGrow: 1 }}
      />
      {/* Example filter - can be expanded */}
      <select onChange={(e) => onFilterChange({ course: e.target.value })} style={{ padding: '8px' }}>
        <option value="">All Courses</option>
        <option value="CS101">CS101</option>
        <option value="CS303">CS303</option>
        <option value="HIST202">HIST202</option>
        <option value="MATH201">MATH201</option>
        {/* Add more courses dynamically or from a list */}
      </select>
    </div>
  );
};

export default SummaryFilters;
