import React from "react";
import styles from "./UserRow.module.css";

export default function UserRow({ user }) {
  const { uid, username, email, completedTasks = 0, summaryCount = 0 } = user;

  return (
    <tr className={styles.row}>
      <td>{username || email}</td>
      <td>{email}</td>
      <td>{completedTasks}</td>
      <td>{summaryCount}</td>
    </tr>
  );
}