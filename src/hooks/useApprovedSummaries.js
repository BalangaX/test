import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

// Fetches only 'approved' summaries
const useApprovedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedSummaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const summariesCollection = collection(db, 'summaries');
        const q = query(
          summariesCollection,
          where('status', '==', 'approved'),
          orderBy('uploadedAt', 'desc') // Show newest approved first
        );
        const querySnapshot = await getDocs(q);
        const fetchedSummaries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          uploadedAt: doc.data().uploadedAt?.toDate ? doc.data().uploadedAt.toDate() : new Date(),
        }));
        setSummaries(fetchedSummaries);
      } catch (err) {
        console.error("Error fetching approved summaries:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedSummaries();
    // Add listener for real-time updates if needed: onSnapshot
  }, []);

  return { summaries, loading, error };
};

export default useApprovedSummaries;
