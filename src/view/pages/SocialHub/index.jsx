import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import NewPostForm from '../../components/SocialHub/NewPostForm';
import RatingsList from '../../components/SocialHub/RatingsList/RatingsList';
import StudentCard from '../../components/SocialHub/StudentCard/StudentCard';
import styles from './style.module.css';

export default function SocialHubPage() {
  const [queryText, setQueryText] = useState('');
  const [posts, setPosts] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch community feed (posts) from Firestore
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });
    return unsubscribe;
  }, []);

  // Fetch study groups from Firestore
  useEffect(() => {
    const q = query(collection(db, 'groups'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudyGroups(groupsData);
    });
    return unsubscribe;
  }, []);

  // Fetch user profiles from Firestore
  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('username'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);

  // Filter user profiles based on search query
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(queryText.toLowerCase()) ||
    (u.tags && u.tags.some(t => t.toLowerCase().includes(queryText.toLowerCase())))
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Social Hub</h1>

      {/* Community Feed Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Community Feed</h2>
        <NewPostForm />
        <div className={styles.feed}>
          <RatingsList posts={posts} />
        </div>
      </section>

      {/* Study Groups Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Study Groups</h2>
        <ul className={styles.groupList}>
          {studyGroups.map(group => (
            <li key={group.id} className={styles.groupItem}>
              {group.name}
            </li>
          ))}
        </ul>
      </section>

      {/* User Profiles Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>User Profiles</h2>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by username or tag"
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            className={styles.search}
          />
        </div>
        <div className={styles.profiles}>
          {filteredUsers.map((u, i) => (
            <StudentCard
              key={u.id}
              name={u.username}
              tags={u.tags || []}
              avatar={u.avatarUrl || '/default-avatar.png'}
            />
          ))}
        </div>
      </section>
    </div>
  );
}