import React from "react";
import { Link } from "react-router-dom";
import { Plus, Upload, ListChecks } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Admin Dashboard
        </h1>

        <div className="space-y-4">
          <Link
            to="/add-agent"
            className="flex items-center justify-center w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="mr-2" /> Add Agent
          </Link>
          <Link
            to="/upload-list"
            className="flex items-center justify-center w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Upload className="mr-2" /> Upload List
          </Link>
          <Link
            to="/tasks-by-agent"
            className="flex items-center justify-center w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <ListChecks className="mr-2" /> View Tasks by Agent
          </Link>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Link
          to="/add-agent"
          className="bg-yellow-500 p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all flex items-center justify-center"
        >
          <Plus className="text-white" />
        </Link>
        <Link
          to="/upload-list"
          className="bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
        >
          <Upload className="text-white" />
        </Link>
        <Link
          to="/tasks-by-agent"
          className="bg-red-500 p-4 rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center justify-center"
        >
          <ListChecks className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
