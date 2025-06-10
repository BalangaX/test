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

  // You can still use this if you want to display the date somewhere else
  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { dateStyle: "full" }),
    []
  );

  return (
    // The PageHeader is now at the top level
    <>
      <PageHeader
        title={`Welcome, ${currentUser?.displayName || 'User'}!`}
        subtitle="Here's a quick overview of your academic progress."
      />
      
      {/* The rest of the page content is wrapped separately */}
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
    </>
  );
}