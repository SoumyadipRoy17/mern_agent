import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaStickyNote } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const AgentDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
  const agentData = JSON.parse(localStorage.getItem("agentData"));

  useEffect(() => {
    console.log("AgentData", agentData);
    if (agentData) {
      setTasks(agentData.tasks);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1000/api/agents/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("agentData"); // Remove stored token
      navigate("/agent-login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-6 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center"
      >
        <LogOut className="mr-2" size={18} /> Logout
      </button>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Welcome, {agentData?.name} 👋
        </h2>
        <h3 className="text-lg font-medium text-gray-700 text-center mb-3">
          Your Assigned Tasks
        </h3>

        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              //   <li
              //     key={task._id}
              //     className="bg-blue-100 text-blue-900 p-3 rounded-lg shadow-md"
              //   >
              //     {task.firstName} {task.phone} - {task.notes}
              //   </li>
              <li
                key={task._id}
                className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105"
              >
                <p className=" flex items-center gap-2">
                  <FaUser className="text-blue-300" />{" "}
                  <span className="font-medium">Name:</span> {task.firstName}
                </p>
                <p className=" flex items-center gap-2">
                  <FaPhone className="text-green-400" />{" "}
                  <span className="font-medium">Phone:</span> {task.phone}
                </p>
                <p className=" flex items-center gap-2">
                  <FaStickyNote className="text-yellow-300" />{" "}
                  <span className="font-medium">Notes:</span> {task.notes}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No tasks assigned. 🎉</p>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
