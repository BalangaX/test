import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav style={{ display: 'flex', gap: '1rem' }}>
    <Link to="/">Home</Link>
    <Link to="/tasks">Tasks</Link>
    <Link to="/summaries">Summaries</Link>
    <Link to="/writing">Writing Assistant</Link>
    <Link to="/social">Social Hub</Link>
    <Link to="/help">Help & Settings</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);

export default NavBar;
