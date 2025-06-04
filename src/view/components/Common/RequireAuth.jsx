import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function RequireAuth({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>טוען...</div>;
  if (!currentUser) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}