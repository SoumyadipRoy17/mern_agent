import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  // Retrieve stored user data from localStorage
  const userData = JSON.parse(localStorage.getItem("adminData")); // Ensure this is stored during login

  // If user is not logged in or role is not admin, redirect to login
  if (!userData || userData.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
