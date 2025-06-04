import React from 'react';
import styles from './SummaryFilters.module.css'; // Import

const SummaryFilters = ({ onFilterChange, onSearchChange }) => {
  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="Search summaries by title or course..."
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      <select
        onChange={(e) => onFilterChange({ course: e.target.value })}
        className={styles.courseSelect}
      >
        <option value="">All Courses</option>
        {/* These should ideally be dynamic */}
        <option value="CS101">CS101</option>
        <option value="CS303">CS303</option>
        <option value="HIST202">HIST202</option>
        <option value="MATH201">MATH201</option>
      </select>
    </div>
  );
};
export default SummaryFilters;
