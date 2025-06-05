import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

/**
 * useUserStats – Fetches dashboard stats for a specific user from Firestore
 * Returns { kpis, progressData, activityFeed, loading, error }
 * 
 * @param {string} userId - The logged-in user's id
 */
export default function useUserStats(userId) {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    // Listen to all tasks for this user, ordered by date
    const q = query(
      collection(db, "users", userId, "tasks"),
      orderBy("date", "asc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const tasks = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // KPIs
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);

        // Active (not completed) tasks
        const activeTasks = tasks.filter((t) => !t.completed);

        // Completion Rate: completed/total
        const total = tasks.length;
        const completed = tasks.filter((t) => t.completed).length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        // New tasks created today
        const newToday = tasks.filter((t) => t.date === todayStr).length;

        // "Daily Engagement": מספר משימות שסומנו כהושלמו היום
        const completedToday = tasks.filter(
          (t) => t.completed && t.date === todayStr
        ).length;

        setKpis([
          { label: "Active Tasks", value: activeTasks.length },
          { label: "Completion Rate", value: `${completionRate}%` },
          { label: "New Tasks Today", value: newToday },
          { label: "Daily Engagement", value: `${completedToday}` },
        ]);

        // Progress Chart (7 ימים אחורה)
        const progressArr = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const dStr = d.toISOString().slice(0, 10);
          progressArr.push({
            day: d.toLocaleDateString("he-IL", { weekday: "short" }),
            completed: tasks.filter(
              (t) => t.completed && t.date === dStr
            ).length,
          });
        }
        setProgressData(progressArr);

        // Activity Feed (שלושת השינויים האחרונים)
        const feed = tasks
          .map((t) => ({
            id: t.id,
            text: t.completed
              ? `סיימת משימה: "${t.title}"`
              : `הוספת משימה: "${t.title}"`,
            ts: new Date(t.date),
          }))
          .sort((a, b) => b.ts - a.ts)
          .slice(0, 5);

        setActivityFeed(feed);

        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userId]);

  return { kpis, progressData, activityFeed, loading, error };
}
