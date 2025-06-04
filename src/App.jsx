import { Routes, Route, Navigate } from "react-router-dom";
// NavBar is now part of MainLayout, so it's not directly imported here unless needed for other purposes.
// For this change, we assume NavBar is only in MainLayout.
// import NavBar from "./components/common/NavBar"; 
import MainLayout from "./view/layouts/MainLayout";
import Home from "./view/pages/Home";
import AuthPage from "./view/pages/Auth";
import RequireAuth from "./view/components/Common/RequireAuth";
import Tasks from "./view/pages/Tasks";
import Summaries from "./view/pages/Summaries";
import WritingAssistant from "./view/pages/WritingAssistant";
import SocialHub from "./view/pages/SocialHub";
import HelpSettings from "./view/pages/HelpSettings";
import Dashboard from "./view/pages/Dashboard";
import Admin from "./view/pages/Admin";

export default function App() {
  return (
    <MainLayout> {/* Wrap Routes with MainLayout */}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/tasks" element={<RequireAuth><Tasks /></RequireAuth>} />
        <Route path="/summaries" element={<RequireAuth><Summaries /></RequireAuth>} />
        <Route path="/writing-assistant" element={<RequireAuth><WritingAssistant /></RequireAuth>} />
        <Route path="/social-hub" element={<RequireAuth><SocialHub /></RequireAuth>} />
        <Route path="/help-settings" element={<RequireAuth><HelpSettings /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
      </Routes>
    </MainLayout> // Closing MainLayout tag
  );
}