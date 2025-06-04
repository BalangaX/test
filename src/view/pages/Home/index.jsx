import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>StudyBuddy</h1>
    <ul>
      <li><Link to="/tasks">Tasks</Link></li>
      <li><Link to="/summaries">Summaries</Link></li>
      <li><Link to="/writing">Writing Assistant</Link></li>
      <li><Link to="/social">Social Hub</Link></li>
      <li><Link to="/help">Help & Settings</Link></li>
    </ul>
  </div>
);

export default Home;
