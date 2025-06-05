import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import CreateGroupForm from '../../components/SocialHub/CreateGroupForm';
import GroupList from '../../components/SocialHub/GroupList';
import styles from './style.module.css';

export default function SocialHubPage() {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'studyGroups'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudyGroups(groupsData);
    });
    return unsubscribe;
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Social Hub</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Create New Study Group</h2>
        <CreateGroupForm />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Study Groups</h2>
        <GroupList groups={studyGroups} loading={false} />
      </section>
      
      <Outlet />
    </div>
  );
}