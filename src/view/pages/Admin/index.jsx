import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // תיצור קובץ style.module.css באותה תיקייה
import { FaEdit, FaTrash, FaThumbsUp, FaTimes, FaComment } from "react-icons/fa";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function AdminDashboard() {
  const [pendingSummaries, setPendingSummaries] = useState([]);

  useEffect(() => {
    const summariesRef = collection(db, "summaries");
    const q = query(
      summariesRef,
      where("status", "==", "pending"),
      orderBy("uploadDate", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setPendingSummaries(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        );
      },
      (error) => console.error("Admin onSnapshot error:", error)
    );
    return unsub;
  }, []);
  
  const handleApprove = async (id) => {
    const summaryRef = doc(db, "summaries", id);
    await updateDoc(summaryRef, { status: "approved" });
  };
  const handleReject = async (id) => {
    const summaryRef = doc(db, "summaries", id);
    await updateDoc(summaryRef, { status: "rejected" });
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>Admin Dashboard</h1>
      <div className={styles.grid}>
        {/* Search */}
        <div className={styles.card}>
          <h2>Search</h2>
          <div className={styles.searchRow}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search users or summaries..."
            />
            <button className={styles.filterBtn}>Filter</button>
          </div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              John Smith
              <button className={styles.iconBtn}><FaEdit /></button>
            </div>
            <div className={styles.listItem}>
              Psychology 101 Summary
              <button className={styles.iconBtn}><FaTrash /></button>
            </div>
          </div>
        </div>

        {/* Summary Approval */}
        <div className={styles.card}>
          <h2>Summary Approval</h2>
          {pendingSummaries.length === 0 ? (
            <p>No summaries pending approval.</p>
          ) : (
            pendingSummaries.map((s) => (
              <div key={s.id} className={styles.approvalItem}>
                <div className={styles.summaryInfo}>
                  <strong>{s.title}</strong> by {s.author}
                </div>
                <div className={styles.btnRow}>
                  <button
                    className={styles.approve}
                    onClick={() => handleApprove(s.id)}
                  >
                    <FaThumbsUp /> Approve
                  </button>
                  <button
                    className={styles.reject}
                    onClick={() => handleReject(s.id)}
                  >
                    <FaTimes /> Reject
                  </button>
                  <button className={styles.comment}>
                    <FaComment /> Comment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Data and Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>User Growth</h3>
          <div className={styles.placeholderChart}>[Chart]</div>
        </div>
        <div className={styles.statCard}>
          <h3>Content Distribution</h3>
          <div className={styles.placeholderChart}>[Pie Chart]</div>
        </div>
        <div className={styles.statCard}>
          <h3>Usage Statistics</h3>
          <table className={styles.statsTable}>
            <tbody>
              <tr>
                <td>Active Users</td>
                <td>1,245</td>
              </tr>
              <tr>
                <td>New Signups</td>
                <td>328</td>
              </tr>
              <tr>
                <td>Summaries Added</td>
                <td>156</td>
              </tr>
              <tr>
                <td>Comments Posted</td>
                <td>947</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
);
}