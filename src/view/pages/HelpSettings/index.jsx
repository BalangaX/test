import React, { useState } from 'react';
import { faqData } from '../../../data/faq'; // Adjusted path
import styles from './style.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // For accordion icons

export default function HelpSettingsPage() {
  // FAQ State
  const [faqs] = useState(faqData);
  const [openFaqId, setOpenFaqId] = useState(null); // ID of the currently open FAQ item

  // Profile Form State
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com", // Typically not editable by user directly
    school: "University of Example",
    major: "Computer Science",
    profilePictureUrl: "", // Optional
  });
  // Password fields state (mock)
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleFaqToggle = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevPasswords => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    console.log("Profile data to save (mock):", profile);
    alert("Profile saved successfully! (Mock)");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    if (!passwords.currentPassword || !passwords.newPassword) {
        alert("Please fill in current and new password fields.");
        return;
    }
    console.log("Password change data (mock):", { current: passwords.currentPassword, new: passwords.newPassword });
    alert("Password changed successfully! (Mock - new password not stored)");
    setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Clear fields
  };

  return (
    <div className={styles.helpSettingsContainer}>
      <header className={styles.header}>
        <h1>Help & Settings</h1>
      </header>

      <section className={styles.pageSection}>
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div className={styles.faqList}>
          {faqs.map(faq => (
            <div key={faq.id} className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => handleFaqToggle(faq.id)}>
                <span>{faq.question}</span>
                {openFaqId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openFaqId === faq.id && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.pageSection}>
        <h2>User Profile</h2>
        <form onSubmit={handleProfileSave} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={profile.name} onChange={handleProfileChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={profile.email} readOnly disabled className={styles.readOnlyInput} />
            <small>Email address cannot be changed.</small>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="school">School/University</label>
            <input type="text" id="school" name="school" value={profile.school} onChange={handleProfileChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="major">Major/Field of Study</label>
            <input type="text" id="major" name="major" value={profile.major} onChange={handleProfileChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="profilePictureUrl">Profile Picture URL (Optional)</label>
            <input type="text" id="profilePictureUrl" name="profilePictureUrl" value={profile.profilePictureUrl} onChange={handleProfileChange} placeholder="https://example.com/image.png"/>
          </div>
          <button type="submit" className={styles.saveButton}>Save Profile</button>
        </form>
      </section>
      
      <section className={styles.pageSection}>
        <h2>Change Password (Mock)</h2>
        <form onSubmit={handlePasswordSave} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={passwords.confirmNewPassword} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className={styles.saveButton}>Change Password</button>
        </form>
      </section>
    </div>
  );
}