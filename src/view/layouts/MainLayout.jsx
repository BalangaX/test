import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Common/NavBar';
import styles from './MainLayout.module.css'; // Import CSS module

const MainLayout = () => {
  return (
    <div className={styles.container}> {/* Use container class */}
      <NavBar />
      <main className={styles.content}> {/* Use content class */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
