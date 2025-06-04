import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import RequireAuth from './view/components/Common/RequireAuth'; // Import RequireAuth

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Routes within MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="summaries" element={<SummariesPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="writing-assistant" element={<WritingAssistantPage />} />
        <Route path="social-hub" element={<SocialHubPage />} />
        <Route path="help-settings" element={<HelpSettingsPage />} />

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
      </Route>
      {/* You might want a catch-all 404 route here */}
    </Routes>
  );
}

export default App;
