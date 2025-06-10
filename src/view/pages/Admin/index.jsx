import { getDocs, collection, query, where, orderBy, onSnapshot, updateDoc, doc, getDoc, collectionGroup } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { FaEdit, FaTrash, FaThumbsUp, FaTimes } from "react-icons/fa";
import { db } from "../../../firebase/config";
import PageHeader from "../../components/Common/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import UserRow from "../../components/Admin/UserRow"; // Assuming UserRow is in components/Admin

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [pendingSummaries, setPendingSummaries] = useState([]);
  const [userList, setUserList] = useState([]);
  const [contentStats, setContentStats] = useState({ summaries: 0, posts: 0 });
  const [userStats, setUserStats] = useState({ total: 0, growth: [], newSignups: 0 });
  const [supportList, setSupportList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Other states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.isAdmin) return;
    console.log("DEBUG AdminDashboard: useEffect running");
    setLoading(true);

    const listeners = [];

    // Listener for pending summaries
    const summariesQuery = query(collection(db, "summaries"), where("status", "==", "pending"));
    const unsubSummaries = onSnapshot(summariesQuery, (snapshot) => {
      setPendingSummaries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    listeners.push(unsubSummaries);

    // Combined listener for users, posts, and summaries
    const unsubCombined = onSnapshot(collection(db, "users"), (usersSnapshot) => {
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("DEBUG AdminDashboard: users:", users);

      // Set up listeners for all posts and summaries to update counts in real-time
      const unsubPosts = onSnapshot(collection(db, "posts"), (allPostsSnap) => {
        const postsByAuthor = {};
        allPostsSnap.forEach(doc => {
          const post = doc.data();
          postsByAuthor[post.authorUid] = (postsByAuthor[post.authorUid] || 0) + 1;
        });
        console.log("DEBUG AdminDashboard: postsByAuthor:", postsByAuthor);

        const unsubSummaries = onSnapshot(collection(db, "summaries"), (allSummariesSnap) => {
          const summariesByUploader = {};
          allSummariesSnap.forEach(doc => {
            const summary = doc.data();
            summariesByUploader[summary.uploaderUid] = (summariesByUploader[summary.uploaderUid] || 0) + 1;
          });
          console.log("DEBUG AdminDashboard: summariesByUploader:", summariesByUploader);

          // Combine the data
          const enrichedUsers = users.map(user => ({
            ...user,
            postCount: postsByAuthor[user.id] || 0,
            summaryCount: summariesByUploader[user.id] || 0,
          }));
          console.log("DEBUG AdminDashboard: enrichedUsers:", enrichedUsers);
          setUserList(enrichedUsers);
          // Update summary count immediately, and subscribe to completed tasks count
          setContentStats({
            summaries: allSummariesSnap.size,
            posts: 0,
          });
          // Only admins subscribe to global completed tasks count
          if (currentUser?.isAdmin) {
            const tasksStatsQuery = query(
              collectionGroup(db, "tasks"),
              where("completed", "==", true)
            );
            const unsubTasksStats = onSnapshot(tasksStatsQuery, (tasksSnap) => {
              setContentStats((prev) => ({
                ...prev,
                posts: tasksSnap.size,
              }));
            });
            listeners.push(unsubTasksStats);
          }
        });
        listeners.push(unsubSummaries); // Add summaries listener to cleanup array
      });
      listeners.push(unsubPosts); // Add posts listener to cleanup array

      // Update global user stats
      const now = Date.now();
      const dayMs = 24 * 60 * 60 * 1000;
      let growthMap = {};
      let newSignups = 0;
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now - i * dayMs).toISOString().slice(0, 10);
        growthMap[d] = 0;
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

      setLoading(false);
    });
    listeners.push(unsubCombined);

    // Listener for support tickets
    const supportQuery = query(collection(db, "supportTickets"), orderBy("createdAt", "desc"));
    const unsubSupport = onSnapshot(supportQuery, async (ticketsSnap) => {
        const rawTickets = ticketsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const uniqueUids = Array.from(new Set(rawTickets.map(t => t.userId).filter(Boolean)));
        const userDocs = await Promise.all(uniqueUids.map(uid => getDoc(doc(db, "users", uid))));
        const uidToUsername = Object.fromEntries(userDocs.map(d => [d.id, d.exists() ? d.data().username || d.data().email : "Unknown"]));
        const ticketsWithUsernames = rawTickets.map(t => ({...t, username: uidToUsername[t.userId] || "Unknown" }));
        setSupportList(ticketsWithUsernames);
    });
    listeners.push(unsubSupport);

    // Cleanup function to unsubscribe from all listeners when component unmounts
    return () => {
      listeners.forEach(unsub => unsub());
    };
  }, [currentUser]);

  const handleSearch = async () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;
    setSearchLoading(true);
    let results = [];
    try {
      const usersRef = collection(db, "users");
      const q1 = query(usersRef, where("username", ">=", term), where("username", "<=", term + "\uf8ff"));
      const q2 = query(usersRef, where("email", ">=", term), where("email", "<=", term + "\uf8ff"));
      const [usersSnap1, usersSnap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      const seenIds = new Set();
      const addUser = (doc) => {
        if (!seenIds.has(doc.id)) {
            results.push({ type: "user", id: doc.id, ...doc.data() });
            seenIds.add(doc.id);
        }
      };
      usersSnap1.forEach(addUser);
      usersSnap2.forEach(addUser);
    } catch (err) { console.error("Error searching users:", err); }
    try {
      const summariesRef = collection(db, "summaries");
      const q3 = query(summariesRef, where("title", ">=", term), where("title", "<=", term + "\uf8ff"));
      const [sumSnap1] = await Promise.all([getDocs(q3)]);
      sumSnap1.forEach(doc => results.push({ type: "summary", id: doc.id, ...doc.data() }));
    } catch (err) { console.error("Error searching summaries:", err); }
    setSearchResults(results);
    setSearchLoading(false);
  };

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "summaries", id), { status: "approved" });
  };

  const handleReject = async (id) => {
    await updateDoc(doc(db, "summaries", id), { status: "rejected" });
  };

  const handleAdminResponse = async (ticketId) => {
    const responseInput = document.getElementById(`resp-${ticketId}`);
    if (!responseInput) return;
    const responseText = responseInput.value;
    try {
      await updateDoc(doc(db, "supportTickets", ticketId), { adminResponse: responseText });
      responseInput.disabled = true;
    } catch (err) {
      console.error("Error sending admin response:", err);
    }
  };

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage users, content, and system statistics from one central place."
      />
      <section className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Search</h2>
            <div className={styles.searchRow}>
              <input type="text" className={styles.input} placeholder="Search users or summaries..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleSearch(); }} />
              <button className={styles.filterBtn} onClick={handleSearch}>Filter</button>
            </div>
            <div className={styles.list}>
              {searchLoading && <div>Searching...</div>}
              {!searchLoading && searchResults.length === 0 && <div className={styles.placeholder}>No results found.</div>}
              {searchResults.map(item => (
                 <div className={styles.listItem} key={`${item.type}-${item.id}`}>
                  <span>{item.type === "user" ? <>{item.username} <span className={styles.muted}>({item.email})</span></> : <>{item.title} <span className={styles.muted}>by {item.author}</span></>}</span>
                  <button className={styles.iconBtn}>{item.type === "user" ? <FaEdit /> : <FaTrash />}</button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.card}>
            <h2>Summary Approval</h2>
            <div className={styles.list}>
                {pendingSummaries.length === 0 ? <div className={styles.placeholder}>No summaries pending approval.</div> : (
                    pendingSummaries.map((s) => (
                    <div key={s.id} className={styles.approvalItem}>
                        <div className={styles.summaryInfo}>
                          <strong>{s.title}</strong> by {s.author}
                          {s.pdfURL && <a href={s.pdfURL} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>View PDF</a>}
                        </div>
                        <div className={styles.btnRow}>
                          <button className={styles.approve} onClick={() => handleApprove(s.id)}><FaThumbsUp /> Approve</button>
                          <button className={styles.reject} onClick={() => handleReject(s.id)}><FaTimes /> Reject</button>
                        </div>
                    </div>
                    ))
                )}
            </div>
          </div>
          <div className={`${styles.card} ${styles.fullWidth}`}>
            <h2>All Users</h2>
            {loading ? <div>Loading users...</div> : (
              <table className={styles.table}>
                <thead><tr><th>Username</th><th>Email</th><th>Completed Tasks</th><th>Summaries</th></tr></thead>
                <tbody>
                  {userList.map((user) => <UserRow key={user.id} user={{ ...user, uid: user.id }} />)}
                </tbody>
              </table>
            )}
          </div>
          <div className={`${styles.card} ${styles.fullWidth}`}>
            <h2>Support Tickets</h2>
            {loading ? <div>Loading tickets...</div> : supportList.length === 0 ? <div className={styles.placeholder}>No support requests.</div> : (
              <table className={styles.table}>
                <thead><tr><th>Username</th><th>Message</th><th>Submitted</th><th>Admin Response</th></tr></thead>
                <tbody>
                  {supportList.map(ticket => (
                    <tr key={ticket.id}>
                      <td>{ticket.username}</td>
                      <td>{ticket.message}</td>
                      <td>{ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : ''}</td>
                      <td>
                        <div className={styles.responseCell}>
                          <input type="text" defaultValue={ticket.adminResponse || ""} id={`resp-${ticket.id}`} className={styles.responseInput} />
                          <button className={styles.responseBtn} onClick={() => handleAdminResponse(ticket.id)}>Send</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>User Growth (Last 7 Days)</h3>
            <div className={styles.chartContainer}>
              {loading ? <div>Loading...</div> : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={userStats.growth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
            <div className={styles.chartContainer}>
              {loading ? <div>Loading...</div> : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[ { name: "Summaries", value: contentStats.summaries || 0 }, { name: "Completed Tasks", value: contentStats.posts || 0 } ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      label={false}
                    >
                      <Cell fill="#a78bfa" />
                      <Cell fill="#6366f1" />
                    </Pie>
                    <Tooltip />
                    <Legend 
                      verticalAlign="bottom"
                      align="center"
                      layout="horizontal"
                      iconType="circle"
                      height={36}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className={styles.statCard}>
            <h3>Usage Statistics</h3>
            <table className={styles.statsTable}>
              <tbody>
                <tr><td>Total Users</td><td>{loading ? "..." : userStats.total}</td></tr>
                <tr><td>New Signups (7d)</td><td>{loading ? "..." : userStats.newSignups}</td></tr>
                <tr><td>Total Summaries</td><td>{loading ? "..." : contentStats.summaries}</td></tr>
                <tr><td>Total Completed Tasks</td><td>{loading ? "..." : contentStats.posts}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}