// src/view/pages/SocialHub/index.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom'; // Import useMatch
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import CreateGroupForm from '../../components/SocialHub/CreateGroupForm';
import GroupList from '../../components/SocialHub/GroupList';
import styles from './style.module.css';

export default function SocialHubPage() {
  const [studyGroups, setStudyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // This hook checks if the current URL matches the pattern for a group detail page.
  const isGroupDetailPage = useMatch("/social-hub/groups/:groupId");

  useEffect(() => {
    const q = query(collection(db, 'studyGroups'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudyGroups(groupsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.page}>
      {/* The main title is shown only on the main hub page, not on the detail page */}
      {!isGroupDetailPage && (
        <>
          <h1 className={styles.title}>Social Hub</h1>
          <p className={styles.subtitle}>Find your community, collaborate, and learn together.</p>
        </>
      )}

      <div className={styles.hubLayout}>
        {/* Main Content Column: Renders either the list or the detail page */}
        <main className={styles.mainContent}>
          {isGroupDetailPage ? (
            <Outlet />
          ) : (
            <>
              <h2 className={styles.sectionTitle}>Available Study Groups</h2>
              <GroupList groups={studyGroups} loading={loading} />
            </>
          )}
        </main>

        {/* Sidebar Column: Renders only on the main hub page */}
        {!isGroupDetailPage && (
          <aside className={styles.sidebar}>
            <section>
              <h2 className={styles.sectionTitle}>Create a New Group</h2>
              <CreateGroupForm />
            </section>
          </aside>
        )}
      </div>
    </div>
  );
}