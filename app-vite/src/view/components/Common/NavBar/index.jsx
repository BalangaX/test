import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '1rem', marginBottom: '1rem' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/summaries">Summaries</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/writing-assistant">Writing Assistant</Link></li>
        <li><Link to="/social-hub">Social Hub</Link></li>
        <li><Link to="/help-settings">Help & Settings</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/auth">Login/Register</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
