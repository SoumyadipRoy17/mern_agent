import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAgent = ({ role }) => {
  // Retrieve stored user data from localStorage
  const userData = JSON.parse(localStorage.getItem("agentData")); // Ensure this is stored during login

  // If user is not logged in or role is not agent, redirect to login
  if (!userData || userData.role !== role) {
    return <Navigate to="/agent-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteAgent;
