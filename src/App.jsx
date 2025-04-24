import { Routes, Route } from "react-router-dom";
// NavBar is now part of MainLayout, so it's not directly imported here unless needed for other purposes.
// For this change, we assume NavBar is only in MainLayout.
// import NavBar from "./components/common/NavBar"; 
import MainLayout from "./layouts/MainLayout"; // Import MainLayout
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Summaries from "./pages/Summaries";
import WritingAssistant from "./pages/WritingAssistant";
import SocialHub from "./pages/SocialHub";
import HelpSettings from "./pages/HelpSettings";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <MainLayout> {/* Wrap Routes with MainLayout */}
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
    </MainLayout> // Closing MainLayout tag
  );
}