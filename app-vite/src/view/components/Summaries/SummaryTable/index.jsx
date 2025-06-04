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

const SummaryTable = ({ summaries, loading, error }) => {
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
          <th style={thTdStyle}>Download</th>
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
              {summary.status === 'approved' ? (
                <a href={summary.fileUrl} download target="_blank" rel="noopener noreferrer">Download</a>
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
