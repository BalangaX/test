import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Fetches ALL summaries (e.g., for admin or if no filtering needed)
const useSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const summariesCollection = collection(db, 'summaries');
        // Order by upload date, newest first
        const q = query(summariesCollection, orderBy('uploadedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedSummaries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to JS Date if needed for display consistency
          uploadedAt: doc.data().uploadedAt?.toDate ? doc.data().uploadedAt.toDate() : new Date(),
        }));
        setSummaries(fetchedSummaries);
      } catch (err) {
        console.error("Error fetching summaries:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
    // Add listener for real-time updates if needed: onSnapshot
  }, []);

  return { summaries, loading, error, setSummaries }; // expose setSummaries for local updates on admin page
};

export default useSummaries;
