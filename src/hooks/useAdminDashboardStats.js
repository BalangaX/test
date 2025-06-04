// src/hooks/useAdminDashboardStats.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useAdminDashboardStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSummaries: 0,
    pendingSummaries: 0,
    approvedSummaries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch total users (assuming a 'users' collection exists)
        // Note: Counting documents client-side can be inefficient for very large collections.
        // For large scale, consider using Firebase Functions to maintain counters.
        let totalUsers = 0;
        try {
          const usersSnapshot = await getDocs(collection(db, 'users'));
          totalUsers = usersSnapshot.size;
        } catch (userError) {
          console.warn("Could not fetch total users. Assuming 'users' collection doesn't exist or is not readable:", userError.message);
          // If 'users' collection isn't there, totalUsers remains 0 or you can set to 'N/A'
        }

        // Fetch summary counts
        const summariesCollectionRef = collection(db, 'summaries');
        const allSummariesSnapshot = await getDocs(summariesCollectionRef);
        const totalSummaries = allSummariesSnapshot.size;

        const pendingQuery = query(summariesCollectionRef, where('status', '==', 'pending'));
        const pendingSnapshot = await getDocs(pendingQuery);
        const pendingSummaries = pendingSnapshot.size;

        const approvedQuery = query(summariesCollectionRef, where('status', '==', 'approved'));
        const approvedSnapshot = await getDocs(approvedQuery);
        const approvedSummaries = approvedSnapshot.size;

        setStats({
          totalUsers,
          totalSummaries,
          pendingSummaries,
          approvedSummaries,
        });
      } catch (err) {
        console.error("Error fetching admin dashboard stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Consider adding a listener or a refresh mechanism if real-time updates are crucial
    // For now, it fetches once on component mount.
  }, []);

  return { stats, loading, error };
};

export default useAdminDashboardStats;
