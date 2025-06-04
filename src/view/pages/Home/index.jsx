import React from 'react';
import HomeCard from '../../components/Home/HomeCard';
import { useAuth } from '../../../context/AuthContext';

// Inline styles removed, assuming global or page-specific module will handle layout

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
    <div className="app-container" style={{textAlign: 'center'}}> {/* Using app-container from global.css and adding text-center */}
      {currentUser && <h2>Welcome back, {currentUser.displayName || currentUser.email.split('@')[0]}!</h2>}
      <h1>Welcome to StudyBuddy</h1>
      <p>Your all-in-one platform for academic collaboration and success.</p>
      <div className="homePageCardContainer">
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
