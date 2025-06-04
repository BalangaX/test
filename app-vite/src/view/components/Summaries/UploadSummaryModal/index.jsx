import React, { useState } from 'react';

// Basic styling for modal (can be improved with a library or CSS)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const UploadSummaryModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actual upload logic will be added later (Firebase Storage)
    console.log({ title, course, file, description });
    alert('Summary submitted for approval (mock)!');
    onClose(); // Close modal after submission
    // Reset form
    setTitle('');
    setCourse('');
    setFile(null);
    setDescription('');
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <h2>Upload New Summary</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="course">Course (e.g., CS101):</label>
            <input type="text" id="course" value={course} onChange={e => setCourse(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="3"></textarea>
          </div>
          <div>
            <label htmlFor="file">Summary File (PDF, DOCX):</label>
            <input type="file" id="file" onChange={e => setFile(e.target.files[0])} accept=".pdf,.doc,.docx" required />
          </div>
          <button type="submit">Submit for Approval</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UploadSummaryModal;
