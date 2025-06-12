import React from "react";
import styles from "./style.module.css";

export default function SummaryFilters({
  search,
  onSearch,
  authors,
  authorFilter,
  onAuthorChange,
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

    </div>
  );
}