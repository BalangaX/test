import React, { useState, useEffect } from 'react';
import SummaryTable from '../../components/Summaries/SummaryTable';
import SummaryFilters from '../../components/Summaries/SummaryFilters';
import UploadSummaryModal from '../../components/Summaries/UploadSummaryModal';
import useApprovedSummaries from '../../../hooks/useApprovedSummaries'; // For regular users
// import useSummaries from '../../../hooks/useSummaries'; // For admins or if showing all
import { useAuth } from '../../../context/AuthContext'; // To check if user is logged in

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

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters) => {
    // Assuming filters object like { course: 'CS101' }
    setCourseFilter(filters.course || '');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Course Summaries</h1>
      {currentUser && (
        <button onClick={() => setIsModalOpen(true)} style={{ marginBottom: '20px', padding: '10px 15px' }}>
          Upload New Summary
        </button>
      )}
      <UploadSummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <SummaryFilters
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <SummaryTable summaries={filteredSummaries} loading={loading} error={error} />
      {/*
        If you want to show all summaries for an admin, you might do something like:
        const { summaries: allSummaries, loading: adminLoading, error: adminError } = useSummaries();
        // And then pass allSummaries to SummaryTable based on user role.
      */}
    </div>
  );
};

export default SummariesPage;
