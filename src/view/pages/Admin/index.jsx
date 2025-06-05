import { getDocs, collection, query, where } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // תיצור קובץ style.module.css באותה תיקייה
import { FaEdit, FaTrash, FaThumbsUp, FaTimes, FaComment } from "react-icons/fa";
import { collection as collectionRef, query as queryRef, where as whereRef, orderBy, onSnapshot, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function AdminDashboard() {
  const [pendingSummaries, setPendingSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [userStats, setUserStats] = useState({ total: 0, growth: [], newSignups: 0 });
  const [contentStats, setContentStats] = useState({ summaries: 0, posts: 0, tasks: 0, comments: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [supportList, setSupportList] = useState([]);
  const [loadingSupport, setLoadingSupport] = useState(true);

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

      const usersSnap = await getDocs(collection(db, "users"));
      const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const usersWithCounts = await Promise.all(
        users.map(async (u) => {
          // Count posts by this user
          const postsRef = collection(db, "posts");
          const postsQuery = query(postsRef, where("authorUid", "==", u.id));
          const postsSnap = await getDocs(postsQuery);
          const postCount = postsSnap.size;

          // Count summaries by this user
          const summariesRef = collection(db, "summaries");
          const summariesQuery = query(summariesRef, where("uploaderUid", "==", u.id));
          const summariesSnap = await getDocs(summariesQuery);
          const summaryCount = summariesSnap.size;

          return {
            id: u.id,
            username: u.username || u.email,
            email: u.email,
            postCount,
            summaryCount,
          };
        })
      );
      setUserList(usersWithCounts);
      setLoadingUsers(false);

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

      const summariesSnap = await getDocs(collection(db, "summaries"));
      const summaries = summariesSnap.docs.length;

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

  useEffect(() => {
    async function loadSupport() {
      setLoadingSupport(true);
      try {
        const ticketsSnap = await getDocs(collection(db, "supportTickets"));
        const rawTickets = ticketsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const uniqueUids = Array.from(new Set(rawTickets.map(t => t.userId).filter(uid => uid)));

        const uidToUsername = {};
        await Promise.all(uniqueUids.map(async (uid) => {
          try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              uidToUsername[uid] = data.username || data.email || "Unknown";
            } else {
              uidToUsername[uid] = "Unknown";
            }
          } catch (error) {
            console.error("Failed to fetch username for UID:", uid, error);
            uidToUsername[uid] = "Unknown";
          }
        }));

        const ticketsWithUsernames = rawTickets.map(t => ({
          id: t.id,
          username: uidToUsername[t.userId] || "Unknown",
          message: t.message,
          createdAt: t.createdAt,
          adminResponse: t.adminResponse || ""
        }));
        setSupportList(ticketsWithUsernames);
      } catch (err) {
        console.error("Error loading support tickets:", err);
      }
      setLoadingSupport(false);
    }
    loadSupport();
  }, []);
  
  const handleSearch = async () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;
    setSearchLoading(true);
    let results = [];

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
        if (!results.find(u => u.id === doc.id))
          results.push({ type: "user", id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.error("Error searching users:", err);
    }

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

        {/* All Users Table */}
        <div className={styles.card} style={{ width: "100%", overflowX: "auto" }}>
          <h2>All Users</h2>
          {loadingUsers ? (
            <div>Loading users...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Posts</th>
                  <th>Summaries</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.postCount}</td>
                    <td>{user.summaryCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Support Tickets */}
        <div className={styles.card} style={{ width: "100%", overflowX: "auto" }}>
          <h2>Support Tickets</h2>
          {loadingSupport ? (
            <div>Loading tickets...</div>
          ) : supportList.length === 0 ? (
            <div>No support requests.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Message</th>
                  <th>Submitted At</th>
                  <th>Admin Response</th>
                </tr>
              </thead>
              <tbody>
                {supportList.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.username || 'Guest'}</td>
                    <td>{ticket.message}</td>
                    <td>{ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleString() : ''}</td>
                    <td>
                      <input
                        type="text"
                        defaultValue={ticket.adminResponse || ""}
                        id={`resp-${ticket.id}`}
                        className={styles.responseInput}
                      />
                      <button
                        className={styles.responseBtn}
                        onClick={async () => {
                          const val = document.getElementById(`resp-${ticket.id}`).value;
                          try {
                            const ticketRef = doc(db, "supportTickets", ticket.id);
                            await updateDoc(ticketRef, { adminResponse: val });
                            window.location.reload();
                          } catch (err) {
                            console.error("Error sending admin response:", err);
                          }
                        }}
                      >
                        Send
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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