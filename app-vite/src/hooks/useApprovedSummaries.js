import { useState, useEffect } from 'react';
import { mockSummaries } from '../data/summaries';

// This hook will fetch only approved summaries (for regular users)
const useApprovedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    try {
      const approved = mockSummaries.filter(s => s.status === 'approved');
      setSummaries(approved);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { summaries, loading, error };
};

export default useApprovedSummaries;
