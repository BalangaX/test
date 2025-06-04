import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import { useAuth } from '../../../../context/AuthContext'; // ייבוא ה־AuthContext

export default function NavBar() {
  const { isAdmin } = useAuth();

  // הלינקים של כולם
  const links = [
    { to: '/',       label: 'Home' },
    { to: '/tasks',  label: 'Tasks' },
    { to: '/summaries', label: 'Summaries' },
    { to: '/writing-assistant', label: 'Writing Assistant' },
    { to: '/social-hub', label: 'Social Hub' },
    { to: '/help-settings', label: 'Help & Settings' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  // אם המשתמש הוא אדמין, תוסיף גם לינק אדמין (בסוף)
  if (isAdmin) {
    links.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyApp</div>
      <ul className={styles.menu}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              end={to === '/'} // Home יהיה פעיל רק בדיוק ב־/
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}