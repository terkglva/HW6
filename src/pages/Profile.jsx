// src/pages/Profile.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
