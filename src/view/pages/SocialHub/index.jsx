import React, { useState } from 'react';
import StudentCard from '../../components/SocialHub/StudentCard/StudentCard';
import RatingsList from '../../components/SocialHub/RatingsList/RatingsList';
import socialPosts from '../../../data/socialPosts';
import styles from './style.module.css';

export default function SocialHubPage() {
  const [query, setQuery] = useState('');
  const students = [
    { name: 'Alice Johnson', tags: ['Mathematics','Physics'], avatar: '/avatar1.png' },
    { name: 'Bob Smith',     tags: ['Chemistry','Biology'],      avatar: '/avatar2.png' },
    { name: 'Carol Lee',     tags: ['History','Literature'],     avatar: '/avatar3.png' },
    { name: 'David Kim',     tags: ['Economics','Statistics'],   avatar: '/avatar4.png' },
  ];

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Social Hub</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by tags or expertise"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.search}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.profiles}>
          {filtered.map((s, i) => (
            <StudentCard
              key={i}
              name={s.name}
              tags={s.tags}
              avatar={s.avatar}
            />
          ))}
        </div>
        <div className={styles.comments}>
          <RatingsList comments={socialPosts} />
        </div>
      </div>
    </div>
  );
}