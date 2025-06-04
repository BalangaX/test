import { Routes, Route } from 'react-router-dom';
import MainLayout from './view/layouts/MainLayout';
import Home from './view/pages/Home';
import Summaries from './view/pages/Summaries';
import Tasks from './view/pages/Tasks';
import WritingAssistant from './view/pages/WritingAssistant';
import SocialHub from './view/pages/SocialHub';
import HelpSettings from './view/pages/HelpSettings';
import Dashboard from './view/pages/Dashboard';
import Admin from './view/pages/Admin';
import Auth from './view/pages/Auth';

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}> 
      <Route index element={<Home />} />
      <Route path="summaries" element={<Summaries />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="writing" element={<WritingAssistant />} />
      <Route path="social" element={<SocialHub />} />
      <Route path="help" element={<HelpSettings />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="admin" element={<Admin />} />
    </Route>
    <Route path="/login" element={<Auth />} />
  </Routes>
);

export default App;
