import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/Common/NavBar';
import styles from './style.module.css';

export default function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  return (
    <div className={styles.layout}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}