import { Outlet } from 'react-router-dom';
import NavBar from '../components/Common/NavBar/NavBar';

const MainLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default MainLayout;
