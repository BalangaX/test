import React from 'react';
import HomeCard from '../../components/Home/HomeCard'; // Adjusted path
import { useAuth } from '../../../context/AuthContext'; // To greet user

// Basic styling for the page and card container
const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px'
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  maxWidth: '1000px'
};

const HomePage = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      title: 'Tasks',
      description: 'Manage your academic tasks and projects.',
      linkTo: '/tasks'
    },
    {
      title: 'Summaries',
      description: 'Access and share course summaries.',
      linkTo: '/summaries'
    },
    {
      title: 'Writing Assistant',
      description: 'Get help with academic writing.',
      linkTo: '/writing-assistant'
    },
    {
      title: 'Social Hub',
      description: 'Connect and collaborate with peers.',
      linkTo: '/social-hub'
    },
    {
      title: 'Help & Settings',
      description: 'Find help and manage your settings.',
      linkTo: '/help-settings'
    },
    // Optionally, add Dashboard if user is logged in and it's not the primary nav item
    // {
    //   title: 'My Dashboard',
    //   description: 'View your personalized dashboard.',
    //   linkTo: '/dashboard'
    // }
  ];

  return (
    <div style={pageStyle}>
      {currentUser && <h2>Welcome back, {currentUser.email}!</h2>}
      <h1>Welcome to StudyBuddy</h1>
      <p>Your all-in-one platform for academic collaboration and success.</p>
      <div style={containerStyle}>
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
