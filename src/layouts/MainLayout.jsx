import React from 'react';
import NavBar from '../components/common/NavBar'; // Adjusted path
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <> {/* Using React.Fragment as a root element */}
      <NavBar />
      <main className={styles.contentArea}>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
