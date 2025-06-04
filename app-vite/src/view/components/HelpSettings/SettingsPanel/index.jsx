import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext'; // For user profile info

const SettingsPanel = () => {
  const { currentUser } = useAuth();
  // Mock settings state
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile update functionality is not yet implemented.');
    // In a real app, this would interact with Firebase Auth or Firestore
  };

  const handleSettingsSave = () => {
     alert(`Settings saved (mock): Theme: ${theme}, Email Notifications: ${emailNotifications}, Push Notifications: ${pushNotifications}`);
  };

  return (
    <div>
      <h3>Settings</h3>

      {currentUser && (
        <section style={{ marginBottom: '20px' }}>
          <h4>Profile Management</h4>
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label>Email: </label>
              <span>{currentUser.email}</span> (Cannot be changed here)
            </div>
            {/* Add fields for display name, photo URL etc. if needed */}
            {/* <button type="submit">Update Profile</button> */}
            <p><small><em>Full profile updates (like password change) are typically handled via Firebase directly or specific forms.</em></small></p>
          </form>
        </section>
      )}

      <section>
        <h4>Application Settings</h4>
        <div>
          <label htmlFor="themeSelect">Theme: </label>
          <select id="themeSelect" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark (UI only)</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            Enable Email Notifications
          </label>
        </div>
        <div style={{ marginTop: '5px' }}>
          <label>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
            Enable Push Notifications (App)
          </label>
        </div>
        <button onClick={handleSettingsSave} style={{marginTop: '15px'}}>Save Settings</button>
      </section>
    </div>
  );
};

export default SettingsPanel;
