import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import usePendingSummaries from '../../../hooks/usePendingSummaries';
import SummaryTable from '../../components/Summaries/SummaryTable';
import { db } from '../../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

import styles from './AdminPage.module.css';
import useAdminDashboardStats from '../../../hooks/useAdminDashboardStats'; // Import stats hook
import statsStyles from './AdminStatsDisplay.module.css'; // Import stats CSS module

const ADMIN_UIDS = ['admin@example.com', 'superadmin@example.com']; // TODO: Manage centrally

const AdminPage = () => {
  const { currentUser } = useAuth();
  const { summaries: pendingSummaries, loading: pendingLoading, error: pendingError, setSummaries: setPendingSummaries } = usePendingSummaries();
  const { stats, loading: statsLoading, error: statsError } = useAdminDashboardStats();

  const isUserAdmin = currentUser && ADMIN_UIDS.includes(currentUser.email);

  const handleApproveSummary = async (summaryId) => {
    try {
      const summaryRef = doc(db, 'summaries', summaryId);
      await updateDoc(summaryRef, { status: 'approved' });
      setPendingSummaries(prevSummaries => prevSummaries.filter(s => s.id !== summaryId));
      alert('Summary approved successfully.');
    } catch (e) {
      console.error("Error approving summary:", e);
      alert(`Failed to approve summary: ${e.message}`);
    }
  };

  const handleRejectSummary = async (summaryId) => {
     try {
      const summaryRef = doc(db, 'summaries', summaryId);
      await updateDoc(summaryRef, { status: 'rejected' });
      setPendingSummaries(prevSummaries => prevSummaries.filter(s => s.id !== summaryId));
      alert('Summary rejected successfully.');
    } catch (e) {
      console.error("Error rejecting summary:", e);
      alert(`Failed to reject summary: ${e.message}`);
    }
  };

  if (!currentUser) {
    return <div className={styles.adminPageContainer}><p>Please login to view this page.</p></div>;
  }

  if (!isUserAdmin) {
    return (
      <div className={styles.adminPageContainer}>
        <h1 className={styles.pageTitle}>Admin Panel</h1>
        <p className={styles.accessDenied}>Access Denied. You do not have administrative privileges.</p>
      </div>
    );
  }

  return (
    <div className={styles.adminPageContainer}>
      <h1 className={styles.pageTitle}>Admin Panel</h1>

      {/* User Activity Data Section - Updated */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>User Activity Data</h2>
        <div className={styles.sectionContent}>
          {statsLoading && <p className={statsStyles.loadingText}>Loading stats...</p>}
          {statsError && <p className={statsStyles.errorText}>Error loading stats: {statsError}</p>}
          {!statsLoading && !statsError && (
            <div className={statsStyles.statsContainer}>
              <div className={statsStyles.statCard}>
                <p className={statsStyles.statValue}>{stats.totalUsers}</p>
                <p className={statsStyles.statLabel}>Total Users</p>
              </div>
              <div className={statsStyles.statCard}>
                <p className={statsStyles.statValue}>{stats.totalSummaries}</p>
                <p className={statsStyles.statLabel}>Total Summaries</p>
              </div>
              <div className={statsStyles.statCard}>
                <p className={statsStyles.statValue}>{stats.pendingSummaries}</p>
                <p className={statsStyles.statLabel}>Pending Approval</p>
              </div>
              <div className={statsStyles.statCard}>
                <p className={statsStyles.statValue}>{stats.approvedSummaries}</p>
                <p className={statsStyles.statLabel}>Approved Summaries</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pending Summary Approvals Section - Remains as is */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pending Summary Approvals</h2>
        <div className={styles.sectionContent}>
          <SummaryTable
            summaries={pendingSummaries} // from usePendingSummaries
            loading={pendingLoading}    // from usePendingSummaries
            error={pendingError ? pendingError.toString() : null}
            isAdminView={true}
            onApprove={handleApproveSummary}
            onReject={handleRejectSummary}
          />
        </div>
      </section>

      {/* User Management Section - Remains as is */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>User Management</h2>
        <div className={styles.sectionContent}>
          <p className={styles.placeholderText}>
            <em>(User management features, like viewing users or changing roles, are planned for future development.)</em>
          </p>
        </div>
      </section>
    </div>
  );
};
export default AdminPage;
