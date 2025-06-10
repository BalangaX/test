// src/view/components/Auth/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  if (!currentUser || !isAdmin) {
    // Redirect them to the home page if they are not an admin
    return <Navigate to="/" replace />;
  }

  return children;
}