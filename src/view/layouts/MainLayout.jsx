import React from 'react';
import NavBar from "../../components/NavBar";
import styles from "./style.module.css";

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
