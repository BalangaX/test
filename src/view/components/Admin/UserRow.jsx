import React, { useEffect, useState } from "react";
import styles from "./UserRow.module.css";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function UserRow({ user }) {
  const { uid, username, email } = user;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [summaryCount, setSummaryCount] = useState(0);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!uid || !currentUser?.isAdmin) return;

    const fetchCounts = async () => {
      try {
        const tasksQuery = query(
          collection(db, "users", uid, "tasks"),
          where("completed", "==", true)
        );
        const tasksSnapshot = await getDocs(tasksQuery);
        setCompletedTasks(tasksSnapshot.size);

        const summariesQuery = query(
          collection(db, "summaries"),
          where("uploaderUid", "==", uid),
          where("status", "==", "approved")
        );
        const summariesSnapshot = await getDocs(summariesQuery);
        setSummaryCount(summariesSnapshot.size);
      } catch (error) {
        console.error("Error fetching post/summary counts:", error);
      }
    };

    fetchCounts();
  }, [uid, currentUser]);

  return (
    <tr className={styles.row}>
      <td>{username || email}</td>
      <td>{email}</td>
      <td>{completedTasks}</td>
      <td>{summaryCount}</td>
    </tr>
  );
}