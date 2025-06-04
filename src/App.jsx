import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './view/layouts/MainLayout';
import HomePage from './view/pages/Home';
import SummariesPage from './view/pages/Summaries';
import TasksPage from './view/pages/Tasks';
import WritingAssistantPage from './view/pages/WritingAssistant';
import SocialHubPage from './view/pages/SocialHub';
import HelpSettingsPage from './view/pages/HelpSettings';
import AdminPage from './view/pages/Admin';
import DashboardPage from './view/pages/Dashboard';
import AuthPage from './view/pages/Auth';
import RequireAuth from './view/components/Common/RequireAuth';
import { useAuth } from './context/AuthContext'; // Import useAuth to check initial auth state

function App() {
  const { currentUser } = useAuth(); // Get current user to potentially redirect from "/"

  return (
    <Routes>
      {/* Public route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route
        path="/*" // This will match all routes other than /auth
        element={
          <RequireAuth>
            <Routes> {/* Nested Routes for MainLayout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="summaries" element={<SummariesPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="writing-assistant" element={<WritingAssistantPage />} />
                <Route path="social-hub" element={<SocialHubPage />} />
                <Route path="help-settings" element={<HelpSettingsPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="admin" element={<AdminPage />} />
                {/* Add a catch-all for routes within MainLayout that don't match */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
