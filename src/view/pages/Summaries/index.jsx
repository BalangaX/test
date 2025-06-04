import React, { useState, useEffect } from 'react';
import SummaryTable from '../../components/Summaries/SummaryTable';
import SummaryFilters from '../../components/Summaries/SummaryFilters';
import UploadSummaryModal from '../../components/Summaries/UploadSummaryModal';
import useApprovedSummaries from '../../../hooks/useApprovedSummaries';
import { useAuth } from '../../../context/AuthContext';
import styles from './SummariesPage.module.css'; // Import

const SummariesPage = () => {
  const { currentUser } = useAuth();
  const { summaries: approvedSummaries, loading, error } = useApprovedSummaries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  useEffect(() => {
    let currentSummaries = approvedSummaries;
    if (searchTerm) {
      currentSummaries = currentSummaries.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (courseFilter) {
      currentSummaries = currentSummaries.filter(s => s.course === courseFilter);
    }
    setFilteredSummaries(currentSummaries);
  }, [searchTerm, courseFilter, approvedSummaries]);

  const handleSearchChange = (term) => setSearchTerm(term);
  const handleFilterChange = (filters) => setCourseFilter(filters.course || '');

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Course Summaries</h1>
      {currentUser && (
        <button onClick={() => setIsModalOpen(true)} className={styles.uploadButton}>
          Upload New Summary
        </button>
      )}
      <UploadSummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SummaryFilters
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <SummaryTable summaries={filteredSummaries} loading={loading} error={error} />
    </div>
  );
};
export default SummariesPage;
