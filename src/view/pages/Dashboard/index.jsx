import { useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import useUserStats from "../../../hooks/useUserStats";
import styles from "./style.module.css";

import StatsCard from "../../components/Dashboard/StatsCard";
import ProgressChart from "../../components/Dashboard/ProgressChart";
import ActivityFeed from "../../components/Dashboard/ActivityFeed";
import QuickActions from "../../components/Dashboard/QuickActions";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const { kpis, progressData, activityFeed, loading, error } = useUserStats(userId);

  const today = useMemo(
    () => new Date().toLocaleDateString("he-IL", { dateStyle: "full" }),
    []
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.greeting}>Hi, </h2>
          <span className={styles.date}>{today}</span>
        </div>
        <button className={styles.refreshBtn} title="Refresh">
          ⟳
        </button>
      </header>

      <section className={styles.statsGrid}>
        {loading ? (
          <span>טוען נתונים...</span>
        ) : error ? (
          <span className={styles.error}>שגיאה בטעינת נתונים</span>
        ) : (
          kpis.map((kpi) => (
            <StatsCard key={kpi.label} label={kpi.label} value={kpi.value} />
          ))
        )}
      </section>

      <main className={styles.mainGrid}>
        <ProgressChart className={styles.chart} data={progressData} loading={loading} />
        <ActivityFeed className={styles.feed} data={activityFeed} loading={loading} />
      </main>

      <aside className={styles.actions}>
        <QuickActions />
      </aside>
    </div>
  );
}