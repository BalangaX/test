// src/hooks/usePendingSummaries.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const usePendingSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const summariesCollectionRef = collection(db, 'summaries');
    const q = query(
      summariesCollectionRef,
      where('status', '==', 'pending'),
      orderBy('uploadedAt', 'desc') // Show newest pending summaries first
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const fetchedSummaries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSummaries(fetchedSummaries);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching pending summaries:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { summaries, loading, error, setSummaries }; // Exposing setSummaries for optimistic updates
};

export default usePendingSummaries;
