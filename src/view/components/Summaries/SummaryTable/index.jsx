import React from 'react';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const buttonStyle = {
  marginRight: '5px',
  padding: '3px 8px',
  fontSize: '0.9em'
};

const SummaryTable = ({ summaries, loading, error, isAdminView, onApprove, onReject }) => {
  if (loading) return <p>Loading summaries...</p>;
  if (error) return <p style={{ color: 'red' }}>Error loading summaries: {error}</p>;
  if (!summaries || summaries.length === 0) return <p>No summaries found.</p>;

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thTdStyle}>Title</th>
          <th style={thTdStyle}>Course</th>
          <th style={thTdStyle}>Author</th>
          <th style={thTdStyle}>Uploaded At</th>
          <th style={thTdStyle}>Status</th>
          <th style={thTdStyle}>Description</th>
          <th style={thTdStyle}>Download/Link</th>
          {isAdminView && <th style={thTdStyle}>Admin Actions</th>}
        </tr>
      </thead>
      <tbody>
        {summaries.map(summary => (
          <tr key={summary.id}>
            <td style={thTdStyle}>{summary.title}</td>
            <td style={thTdStyle}>{summary.course}</td>
            <td style={thTdStyle}>{summary.author}</td>
            <td style={thTdStyle}>{new Date(summary.uploadedAt).toLocaleDateString()}</td>
            <td style={thTdStyle}>{summary.status}</td>
            <td style={thTdStyle}>{summary.description}</td>
            <td style={thTdStyle}>
              {summary.status === 'approved' || isAdminView ? ( // Admins can see link even if pending
                <a href={summary.fileUrl || '#'} download target="_blank" rel="noopener noreferrer">
                  {summary.fileUrl && summary.fileUrl !== '#' ? 'Download' : 'View (No File)'}
                </a>
              ) : (
                'N/A'
              )}
            </td>
            {isAdminView && (
              <td style={thTdStyle}>
                {summary.status === 'pending' && onApprove && onReject && (
                  <>
                    <button onClick={() => onApprove(summary.id)} style={buttonStyle}>Approve</button>
                    <button onClick={() => onReject(summary.id)} style={buttonStyle}>Reject</button>
                  </>
                )}
                {summary.status === 'approved' && <span style={{color: 'green'}}>Approved</span>}
                {summary.status === 'rejected' && <span style={{color: 'red'}}>Rejected</span>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
