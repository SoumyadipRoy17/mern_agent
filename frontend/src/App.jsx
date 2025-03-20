// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Login from "./components/Login";
// // import SignUp from "./components/SignUp"; // Import SignUp component
// // import Dashboard from "./components/Dashboard";
// // import AddAgent from "./components/AddAgent";
// // import UploadList from "./components/UploadList";
// // import TasksByAgent from "./components/getTasksByAgent";
// // import "./index.css"; // Adjust the path if necessary

// // const App = () => {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/add-agent" element={<AddAgent />} />
// //         <Route path="/upload-list" element={<UploadList />} />
// //         <Route path="/tasks-by-agent" element={<TasksByAgent />} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./components/LoginPage"; // New selection page for Admin/Agent login
// import AdminLogin from "./components/Login";
// import AgentLogin from "./components/AgentLogin";
// import Dashboard from "./components/Dashboard"; // Admin Dashboard
// import AgentDashboard from "./components/AgentDashboard"; // New Agent Dashboard
// import AddAgent from "./components/AddAgent";
// import UploadList from "./components/UploadList";
// import TasksByAgent from "./components/getTasksByAgent";
// import SignUp from "./components/SignUp"; // SignUp component
// import "./index.css"; // Adjust path if necessary

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing page where users choose login type */}
//         <Route path="/" element={<LoginPage />} />
//         {/* Separate logins */}
//         <Route path="/login" element={<AdminLogin />} />
//         <Route path="/agent-login" element={<AgentLogin />} />
//         {/* Dashboards */}
//         <Route path="/dashboard" element={<Dashboard />} />{" "}
//         {/* Admin Dashboard */}
//         <Route path="/agent-dashboard" element={<AgentDashboard />} />{" "}
//         {/* Agent Dashboard */}
//         {/* Other routes */}
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/add-agent" element={<AddAgent />} />
//         <Route path="/upload-list" element={<UploadList />} />
//         <Route path="/tasks-by-agent" element={<TasksByAgent />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/Login";
import AgentLogin from "./pages/AgentLogin";
import Dashboard from "./pages/Dashboard";
import AgentDashboard from "./pages/AgentDashboard";
import AddAgent from "./pages/AddAgent";
import UploadList from "./pages/UploadList";
import TasksByAgent from "./pages/getTasksByAgent";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedRouteAgent from "../components/ProtectedRouteAgent";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page where users choose login type */}
        <Route path="/" element={<LoginPage />} />

        {/* Separate login routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/agent-login" element={<AgentLogin />} />

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* Admin Dashboard */}
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/upload-list" element={<UploadList />} />
          <Route path="/tasks-by-agent" element={<TasksByAgent />} />
        </Route>

        <Route element={<ProtectedRouteAgent role="agent" />}>
          {/* Agent Dashboard (No protection needed) */}
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
        </Route>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
