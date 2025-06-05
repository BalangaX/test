import React, { useState } from "react";
import styles from "./SettingsPanel.module.css";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useAuth } from "../../../../context/AuthContext";

export default function SettingsPanel() {
  const getLS = (key, fallback) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    if (raw === "true") return true;
    if (raw === "false") return false;
    return raw;
  };
  const setLS = (key, value) => localStorage.setItem(key, value);

  const [darkMode, setDarkMode] = useState(() => getLS("sb_darkMode", false));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeError, setChangeError] = useState("");
  const [changeSuccess, setChangeSuccess] = useState("");

  const auth = getAuth();
  const { currentUser } = useAuth();

  async function handleChangePassword(e) {
    e.preventDefault();
    setChangeError("");
    setChangeSuccess("");

    if (newPassword !== confirmPassword) {
      setChangeError("New passwords do not match.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setChangeSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setChangeError(err.message);
    }
  }

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    setLS("sb_darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Settings</h3>

      <div className={styles.option}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((v) => !v)}
          />
          <span>Dark Mode</span>
        </label>
      </div>

      <div className={styles.changePasswordSection}>
        <h4>Change Password</h4>
        {changeError && <p className={styles.error}>{changeError}</p>}
        {changeSuccess && <p className={styles.success}>{changeSuccess}</p>}
        <form onSubmit={handleChangePassword}>
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}