// src/view/components/Summaries/SummaryTable/SummaryTable.jsx
import React from "react";
import styles from "./style.module.css";

export default function SummaryTable({ summaries }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Summary</th>
          <th>Download</th>
          <th>Author</th>
          <th>Upload Date</th>
        </tr>
      </thead>
      <tbody>
        {summaries.map((s) => (
          <tr key={s.id}>
            <td>
              <a
                href={s.pdfURL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {s.title}
              </a>
            </td>
            <td>
              <a href={s.pdfURL} download className={styles.downloadBtn}>
                ⬇️
              </a>
            </td>
            <td>{s.author}</td>
            <td>{new Date(s.uploadDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}