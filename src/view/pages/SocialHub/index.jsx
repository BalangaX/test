// src/view/pages/SocialHub/index.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import CreateGroupForm from '../../components/SocialHub/CreateGroupForm';
import GroupList from '../../components/SocialHub/GroupList';
import PageHeader from '../../components/Common/PageHeader';
import styles from './style.module.css';

export default function SocialHubPage() {
  const [studyGroups, setStudyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
      {!isGroupDetailPage && (
        <PageHeader
          title="Social Hub"
          subtitle="Find your community, collaborate, and learn together."
        />
      )}

      <div className={styles.page}>
        <div className={styles.hubLayout}>
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
    </>
  );
}