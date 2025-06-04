import React from 'react';
import styles from './SummaryTable.module.css'; // Import

const SummaryTable = ({ summaries, loading, error, isAdminView, onApprove, onReject }) => {
  if (loading) return <p className={styles.loading}>Loading summaries...</p>;
  if (error) return <p className={styles.error}>Error loading summaries: {error}</p>;
  if (!summaries || summaries.length === 0) return <p className={styles.noSummaries}>No summaries found.</p>;

  const getStatusClass = (status) => {
    if (status === 'pending') return styles.statusPending;
    if (status === 'approved') return styles.statusApproved;
    if (status === 'rejected') return styles.statusRejected;
    return '';
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Author</th>
            <th>Uploaded At</th>
            <th>Status</th>
            <th>Description</th>
            <th>Download/Link</th>
            {isAdminView && <th>Admin Actions</th>}
          </tr>
        </thead>
        <tbody>
          {summaries.map(summary => (
            <tr key={summary.id}>
              <td>{summary.title}</td>
              <td>{summary.course}</td>
              <td>{summary.authorEmail ? summary.authorEmail.split('@')[0] : 'N/A'}</td>
              <td>{summary.uploadedAt?.toDate ? new Date(summary.uploadedAt.toDate()).toLocaleDateString() : new Date(summary.uploadedAt).toLocaleDateString()}</td>
              <td className={getStatusClass(summary.status)}>{summary.status}</td>
              <td>{summary.description || 'N/A'}</td>
              <td>
                {(summary.status === 'approved' || isAdminView) && summary.fileUrl && summary.fileUrl !== '#' ? (
                  <a href={summary.fileUrl} download target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                    Download
                  </a>
                ) : (summary.status === 'approved' || isAdminView) ? 'View (No File)' : 'N/A'}
              </td>
              {isAdminView && (
                <td>
                  {summary.status === 'pending' && onApprove && onReject && (
                    <>
                      <button onClick={() => onApprove(summary.id)} className={`${styles.actionButton} ${styles.approveButton}`}>Approve</button>
                      <button onClick={() => onReject(summary.id)} className={`${styles.actionButton} ${styles.rejectButton}`}>Reject</button>
                    </>
                  )}
                  {summary.status === 'approved' && <span className={styles.statusApproved}>Approved</span>}
                  {summary.status === 'rejected' && <span className={styles.statusRejected}>Rejected</span>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SummaryTable;
