import React, { useState } from "react";
import AdminLogin from "./Login"; // Ensure correct import path
import AgentLogin from "./AgentLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [view, setView] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Select Login Type
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => {
              navigate("/agent-login");
            }}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Agent Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
