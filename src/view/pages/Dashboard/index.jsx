import { useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import useUserStats from "../../../hooks/useUserStats";
import styles from "./style.module.css";
import PageHeader from "../../components/Common/PageHeader";
import StatsCard from "../../components/Dashboard/StatsCard";
import ProgressChart from "../../components/Dashboard/ProgressChart";
import ActivityFeed from "../../components/Dashboard/ActivityFeed";
import QuickActions from "../../components/Dashboard/QuickActions";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const { kpis, progressData, activityFeed, loading, error } = useUserStats(userId);


  return (
    <>
      <PageHeader
        title={`Welcome, ${currentUser?.username || currentUser?.displayName || currentUser?.email || 'User'}!`}
        subtitle="Here's a quick overview of your academic progress."
      />
      <div className={styles.wrapper}>
        <div className={styles.dashboardWrapper}>
          <section className={styles.statsGrid}>
            {loading ? (
              <span>Loading stats...</span>
            ) : error ? (
              <span className={styles.error}>Error loading data</span>
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
      </div>
    </>
  );
}