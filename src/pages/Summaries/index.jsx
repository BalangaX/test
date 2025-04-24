import React, { useState, useMemo } from 'react';
import initialSummaries from '../../data/summaries';
import styles from './SummariesPage.module.css';
import UploadSummaryForm from '../../components/features/Summaries/UploadSummaryForm'; // Import form

// Helper function to generate unique IDs
const generateId = () => `summary_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export default function SummariesPage() {
  const [summaries, setSummaries] = useState(initialSummaries);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);

  const filteredSummaries = useMemo(() => {
    if (!searchTerm.trim()) {
      return summaries;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return summaries.filter(summary =>
      summary.title.toLowerCase().includes(lowercasedSearchTerm) ||
      summary.subject.toLowerCase().includes(lowercasedSearchTerm) ||
      summary.author.toLowerCase().includes(lowercasedSearchTerm) ||
      summary.tags.some(tag => tag.toLowerCase().includes(lowercasedSearchTerm))
    );
  }, [summaries, searchTerm]);

  return (
    <div className={styles.summariesPageContainer}> {/* Main container class */}
      <header className={styles.header}>
        <h1>Summaries Library</h1>
        {!isUploadFormVisible && (
          <button className={styles.uploadButton} onClick={() => setIsUploadFormVisible(true)}>
            Upload New Summary
          </button>
        )}
      </header>

      {isUploadFormVisible && (
        <UploadSummaryForm
          onSubmit={(newSummaryData) => {
            const newSummary = {
              ...newSummaryData,
              id: generateId(),
              uploadDate: new Date().toISOString().split('T')[0], // Get YYYY-MM-DD
            };
            setSummaries(prevSummaries => [newSummary, ...prevSummaries]); // Add to top of the list
            setIsUploadFormVisible(false);
          }}
          onCancel={() => setIsUploadFormVisible(false)}
        />
      )}

      <div className={styles.searchFilterControls}>
        <input
          type="text"
          placeholder="Search summaries by title, subject, author, or tag..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Placeholder for additional filter dropdowns if needed */}
      </div>

      <div className={styles.summaryList}>
        {filteredSummaries.length === 0 && !isUploadFormVisible ? ( // Hide if form is open and list would be empty
          <p className={styles.noSummariesMessage}>No summaries found matching your criteria.</p>
        ) : (
          filteredSummaries.map(summary => (
            <div key={summary.id} className={styles.summaryItem}>
              <h3 className={styles.summaryTitle}>{summary.title}</h3>
              <p className={styles.summaryMeta}>
                <span className={styles.subject}>Subject: {summary.subject}</span> | 
                <span className={styles.author}>Author: {summary.author}</span> | 
                <span className={styles.uploadDate}>Uploaded: {summary.uploadDate}</span>
              </p>
              <p className={styles.summaryPreview}>{summary.previewText}</p>
              {summary.tags && summary.tags.length > 0 && (
                <div className={styles.summaryTags}>
                  Tags: {summary.tags.join(', ')}
                </div>
              )}
              {/* Placeholder for View/Download buttons if needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}