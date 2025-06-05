import { getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // תיצור קובץ style.module.css באותה תיקייה
import { FaEdit, FaTrash, FaThumbsUp, FaTimes, FaComment } from "react-icons/fa";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function AdminDashboard() {
  const [pendingSummaries, setPendingSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [userStats, setUserStats] = useState({ total: 0, growth: [], newSignups: 0 });
  const [contentStats, setContentStats] = useState({ summaries: 0, posts: 0, tasks: 0, comments: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

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
  
  useEffect(() => {
    async function loadStats() {
      setLoadingStats(true);

      // Load users
      const usersSnap = await getDocs(collection(db, "users"));
      const users = usersSnap.docs.map(doc => doc.data());
      const now = Date.now();
      const dayMs = 24 * 60 * 60 * 1000;
      let growthMap = {};
      let newSignups = 0;
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now - i * dayMs);
        const dateStr = d.toISOString().slice(0, 10);
        growthMap[dateStr] = 0;
      }
      users.forEach(u => {
        if (u.createdAt) {
          const d = new Date(u.createdAt);
          const dateStr = d.toISOString().slice(0, 10);
          if (growthMap[dateStr] !== undefined) growthMap[dateStr]++;
          if (d > new Date(now - 7 * dayMs)) newSignups++;
        }
      });
      setUserStats({
        total: users.length,
        growth: Object.entries(growthMap).map(([date, count]) => ({ date, count })),
        newSignups,
      });

      // Summaries
      const summariesSnap = await getDocs(collection(db, "summaries"));
      const summaries = summariesSnap.docs.length;

      // Posts
      const postsSnap = await getDocs(collection(db, "posts"));
      const posts = postsSnap.docs.length;

      // Comments (simulate by posts if no comments collection)
      setContentStats({
        summaries,
        posts,
        tasks: 0,
        comments: posts,
      });

      setLoadingStats(false);
    }
    loadStats();
  }, []);
  
  const handleSearch = async () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;
    setSearchLoading(true);
    let results = [];

    // Users search (by username or email)
    try {
      const usersRef = collection(db, "users");
      const q1 = query(usersRef, where("username", ">=", term), where("username", "<=", term + "\uf8ff"));
      const q2 = query(usersRef, where("email", ">=", term), where("email", "<=", term + "\uf8ff"));
      const [usersSnap1, usersSnap2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);
      usersSnap1.forEach(doc => {
        results.push({ type: "user", id: doc.id, ...doc.data() });
      });
      usersSnap2.forEach(doc => {
        // avoid duplicates
        if (!results.find(u => u.id === doc.id))
          results.push({ type: "user", id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.error("Error searching users:", err);
    }

    // Summaries search (by title or author)
    try {
      const summariesRef = collection(db, "summaries");
      const q3 = query(summariesRef, where("title", ">=", term), where("title", "<=", term + "\uf8ff"));
      const q4 = query(summariesRef, where("author", ">=", term), where("author", "<=", term + "\uf8ff"));
      const [sumSnap1, sumSnap2] = await Promise.all([
        getDocs(q3),
        getDocs(q4),
      ]);
      sumSnap1.forEach(doc => {
        results.push({ type: "summary", id: doc.id, ...doc.data() });
      });
      sumSnap2.forEach(doc => {
        if (!results.find(s => s.type === "summary" && s.id === doc.id))
          results.push({ type: "summary", id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.error("Error searching summaries:", err);
    }
    setSearchResults(results);
    setSearchLoading(false);
  };

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
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
            />
            <button className={styles.filterBtn} onClick={handleSearch}>Filter</button>
          </div>
          <div className={styles.list}>
            {searchLoading && <div>Searching...</div>}
            {!searchLoading && searchResults.length === 0 && (
              <div style={{ color: "#888", padding: "0.6em" }}>No results found.</div>
            )}
            {searchResults.map(item => (
              <div className={styles.listItem} key={item.type + "-" + item.id}>
                {item.type === "user"
                  ? <>{item.username} <span style={{ color: "#888" }}>({item.email})</span></>
                  : <>{item.title} <span style={{ color: "#888" }}>by {item.author}</span></>
                }
                <button className={styles.iconBtn}>
                  {item.type === "user" ? <FaEdit /> : <FaTrash />}
                </button>
              </div>
            ))}
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
                  {s.pdfURL && (
                    <a
                      href={s.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewLink}
                    >
                      View PDF
                    </a>
                  )}
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
          <div className={styles.placeholderChart}>
            {loadingStats ? (
              <div>Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={userStats.growth}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Content Distribution</h3>
          <div className={styles.placeholderChart}>
            {loadingStats ? (
              <div>Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Summaries", value: contentStats.summaries },
                      { name: "Posts", value: contentStats.posts },
                      { name: "Comments", value: contentStats.comments },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="40%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                    label={false}
                  >
                    <Cell fill="#a78bfa" />
                    <Cell fill="#6366f1" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: 20 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Usage Statistics</h3>
          <table className={styles.statsTable}>
            <tbody>
              <tr>
                <td>Active Users</td>
                <td>{loadingStats ? "..." : userStats.total}</td>
              </tr>
              <tr>
                <td>New Signups (last 7 days)</td>
                <td>{loadingStats ? "..." : userStats.newSignups}</td>
              </tr>
              <tr>
                <td>Summaries Added</td>
                <td>{loadingStats ? "..." : contentStats.summaries}</td>
              </tr>
              <tr>
                <td>Comments Posted</td>
                <td>{loadingStats ? "..." : contentStats.comments}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
);
}