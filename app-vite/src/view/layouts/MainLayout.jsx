import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Common/NavBar';

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
