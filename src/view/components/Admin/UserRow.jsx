import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from "./UserRow.module.css";

export default function UserRow({ userId, email, username }) {
  const [postCount, setPostCount] = useState(0);
  const [summaryCount, setSummaryCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef, where("authorUid", "==", userId));
      const postsSnap = await getDocs(postsQuery);
      setPostCount(postsSnap.size);

      const summariesRef = collection(db, "summaries");
      const summariesQuery = query(summariesRef, where("uploaderUid", "==", userId));
      const summariesSnap = await getDocs(summariesQuery);
      setSummaryCount(summariesSnap.size);
    }
    fetchCounts();
  }, [userId]);

  return (
    <tr className={styles.row}>
      <td>{username || email}</td>
      <td>{email}</td>
      <td>{postCount}</td>
      <td>{summaryCount}</td>
    </tr>
  );
}