import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import useSummaries from '../../../hooks/useSummaries';
import SummaryTable from '../../components/Summaries/SummaryTable';
import { db } from '../../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const ADMIN_UIDS = ['admin@example.com', 'superadmin@example.com'];

const adminPageStyle = { padding: '20px' };
const sectionStyle = { marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' };

const AdminPage = () => {
  const { currentUser } = useAuth();
  const { summaries, loading, error, setSummaries: setAdminSummaries } = useSummaries();

  const isUserAdmin = currentUser && ADMIN_UIDS.includes(currentUser.email);

  const handleApproveSummary = async (summaryId) => {
    try {
      const summaryRef = doc(db, 'summaries', summaryId);
      await updateDoc(summaryRef, { status: 'approved' });
      setAdminSummaries(prevSummaries =>
        prevSummaries.map(s => s.id === summaryId ? { ...s, status: 'approved' } : s)
      );
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
      setAdminSummaries(prevSummaries =>
        prevSummaries.map(s => s.id === summaryId ? { ...s, status: 'rejected' } : s)
      );
      alert('Summary rejected successfully.');
    } catch (e) {
      console.error("Error rejecting summary:", e);
      alert(`Failed to reject summary: ${e.message}`);
    }
  };

  if (!currentUser) {
    return <div style={adminPageStyle}><p>Please login to view this page.</p></div>;
  }

  if (!isUserAdmin) {
    return (
      <div style={adminPageStyle}>
        <h1>Admin Panel</h1>
        <p style={{ color: 'red' }}>Access Denied. You do not have administrative privileges.</p>
      </div>
    );
  }

  return (
    <div style={adminPageStyle}>
      <h1>Admin Panel</h1>
      <section style={sectionStyle}>
        <h2>Summary Management</h2>
        <p>Review and approve or reject user-uploaded summaries.</p>
        <SummaryTable
          summaries={summaries}
          loading={loading}
          error={error}
          isAdminView={true}
          onApprove={handleApproveSummary}
          onReject={handleRejectSummary}
        />
      </section>
      <section style={sectionStyle}>
        <h2>User Management</h2>
        <p><em>(User management features will be implemented here.)</em></p>
      </section>
      <section style={sectionStyle}>
        <h2>Application Data Monitoring</h2>
        <p><em>(Dashboard for monitoring application data will be implemented here.)</em></p>
      </section>
    </div>
  );
};
export default AdminPage;
