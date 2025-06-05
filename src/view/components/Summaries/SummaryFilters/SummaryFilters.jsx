import React from "react";
import styles from "./style.module.css";

export default function SummaryFilters({
  search,
  onSearch,
  authors,
  authorFilter,
  onAuthorChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by title, subject, or author..."
        className={styles.searchInput}
      />

      <select
        value={authorFilter}
        onChange={(e) => onAuthorChange(e.target.value)}
        className={styles.select}
      >
        {authors.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.select}
      >
        <option value="Popularity">Popularity</option>
        <option value="Date">Date</option>
      </select>
    </div>
  );
}