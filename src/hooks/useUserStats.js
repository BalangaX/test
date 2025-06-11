import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function useUserStats(userId) {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

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

        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);

        const activeTasks = tasks.filter((t) => !t.completed);

        const total = tasks.length;
        const completed = tasks.filter((t) => t.completed).length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        const newToday = tasks.filter((t) => t.date === todayStr).length;

        const completedToday = tasks.filter(
          (t) => t.completed && t.date === todayStr
        ).length;

        setKpis([
          { label: "Active Tasks", value: activeTasks.length },
          { label: "Completion Rate", value: `${completionRate}%` },
          { label: "New Tasks Today", value: newToday },
          { label: "Daily Engagement", value: `${completedToday}` },
        ]);

        const progressArr = [];
        for (let i = 29; i >= 0; i--) {          // last 30 days including today
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const dStr = d.toISOString().slice(0, 10);
          progressArr.push({
            day: `${d.getDate()}/${d.getMonth() + 1}`,   // label format d/m
            completed: tasks.filter(
              (t) => t.completed && t.date === dStr
            ).length,
          });
        }
        setProgressData(progressArr);

        const feed = tasks
          .map((t) => {
            // use completedAt if present, otherwise fallback to task date
            const rawDate = t.completed && t.completedAt ? t.completedAt : t.date;
            const dt = new Date(rawDate);

            return {
              id: t.id,
              text: t.completed
                ? `Completed task: "${t.title}"`
                : `Added task: "${t.title}"`,
              ts: dt,                        // keep Date object for sort
              displayDate: `${dt.getDate()}/${dt.getMonth() + 1}`, // d/m
            };
          })
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
