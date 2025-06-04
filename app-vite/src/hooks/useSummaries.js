import { useState, useEffect } from 'react';
import { mockSummaries } from '../data/summaries'; // Using the mock data

// This hook will eventually fetch all summaries (e.g., for an admin)
// For now, it just returns all mock summaries
const useSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    try {
      setSummaries(mockSummaries);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { summaries, loading, error };
};

export default useSummaries;
