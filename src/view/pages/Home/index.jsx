import React from 'react';
import HomeCard from '../../components/Home/HomeCard';
import { useAuth } from '../../../context/AuthContext';
import styles from './HomePage.module.css'; // Import CSS module

const HomePage = () => {
  const { currentUser } = useAuth();

  const features = [
    { title: 'Tasks', description: 'Manage your academic tasks and projects.', linkTo: '/tasks' },
    { title: 'Summaries', description: 'Access and share course summaries.', linkTo: '/summaries' },
    { title: 'Writing Assistant', description: 'Get help with academic writing.', linkTo: '/writing-assistant' },
    { title: 'Social Hub', description: 'Connect and collaborate with peers.', linkTo: '/social-hub' },
    { title: 'Help & Settings', description: 'Find help and manage your settings.', linkTo: '/help-settings' },
  ];

  return (
    <div className={styles.homeContainer}> {/* Use homeContainer class */}
      {currentUser && <h2 className={styles.welcomeMessage}>Welcome back, {currentUser.displayName || currentUser.email.split('@')[0]}!</h2>}
      <h1 className={styles.pageTitle}>Welcome to StudyBuddy</h1>
      <p className={styles.pageSubtitle}>Your all-in-one platform for academic collaboration and success.</p>
      <div className={styles.featuresGrid}> {/* Use featuresGrid class */}
        {features.map(feature => (
          <HomeCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            linkTo={feature.linkTo}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
