import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootswatch/dist/vapor/bootstrap.min.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EmailVerification from "./components/auth/emailConfirmationPage";
import Dashboard from "./components/home/dashboard";
import ProtectedRoute from "./components/security/captainAmerica";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
