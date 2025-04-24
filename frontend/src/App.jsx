import { Routes, Route } from "react-router-dom";
import NavBar from "./view/components/NavBar";
import Home from "./view/pages/Home";
import Tasks from "./view/pages/Tasks";
import Summaries from "./view/pages/Summaries";
import WritingAssistant from "./view/pages/WritingAssistant";
import SocialHub from "./view/pages/SocialHub";
import HelpSettings from "./view/pages/HelpSettings";
import Dashboard from "./view/pages/Dashboard";
import Admin from "./view/pages/Admin";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/summaries" element={<Summaries />} />
        <Route path="/writing-assistant" element={<WritingAssistant />} />
        <Route path="/social-hub" element={<SocialHub />} />
        <Route path="/help-settings" element={<HelpSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}