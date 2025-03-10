import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp"; // Import SignUp component
import Dashboard from "./components/Dashboard";
import AddAgent from "./components/AddAgent";
import UploadList from "./components/UploadList";
import TasksByAgent from "./components/getTasksByAgent";
import "./index.css"; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload-list" element={<UploadList />} />
        <Route path="/tasks-by-agent" element={<TasksByAgent />} />
      </Routes>
    </Router>
  );
};

export default App;
