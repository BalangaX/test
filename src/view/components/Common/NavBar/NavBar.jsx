import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/tasks">Tasks</Link> |{' '}
    <Link to="/summaries">Summaries</Link>
  </nav>
);

export default NavBar;
