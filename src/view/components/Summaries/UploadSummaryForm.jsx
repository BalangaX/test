import React, { useState } from 'react';
import styles from './style.module.css'; // To be created in Step 5

const UploadSummaryForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [author, setAuthor] = useState(''); // Assuming author might be different from logged-in user
  const [previewText, setPreviewText] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated string

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !author.trim() || !previewText.trim()) {
      alert('Please fill in all required fields (Title, Subject, Author, Preview Text).');
      return;
    }
    onSubmit({
      title,
      subject,
      author,
      previewText,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Convert to array and remove empty tags
    });
    // Reset form fields after submission
    setTitle('');
    setSubject('');
    setAuthor('');
    setPreviewText('');
    setTags('');
  };

  return (
    <div className={styles.formOverlay}> {/* Optional: for modal-like appearance */}
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <h2>Upload New Summary</h2>
        
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="previewText">Preview Text / Short Description</label>
          <textarea
            id="previewText"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            rows="3"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., calculus, history, programming"
          />
        </div>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Upload Summary
          </button>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSummaryForm;
