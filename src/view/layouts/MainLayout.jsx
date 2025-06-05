import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Common/NavBar';
import styles from './style.module.css';

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.content}>
        {/* כאן נטען כל עמוד בהתאם ל-route */}
        <Outlet />
      </main>
    </div>
  );
}