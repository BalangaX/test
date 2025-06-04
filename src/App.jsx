// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./view/components/Auth/PrivateRoute";

import MainLayout from "./view/layouts/MainLayout";
import Home from "./view/pages/Home";
import Tasks from "./view/pages/Tasks";
import Summaries from "./view/pages/Summaries";
import WritingAssistant from "./view/pages/WritingAssistant";
import SocialHub from "./view/pages/SocialHub";
import HelpSettings from "./view/pages/HelpSettings";
import Dashboard from "./view/pages/Dashboard";
import Admin from "./view/pages/Admin";

import Login from "./view/pages/Auth/Login";
import Register from "./view/pages/Auth/Register";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="summaries" element={<Summaries />} />
        <Route path="writing-assistant" element={<WritingAssistant />} />
        <Route path="social-hub" element={<SocialHub />} />
        <Route path="help-settings" element={<HelpSettings />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
      </Route>

      {/* כל שאר הדרכים → Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}