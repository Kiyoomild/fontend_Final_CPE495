import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import Help from "./components/Help";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;