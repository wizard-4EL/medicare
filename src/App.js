import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Page Imports
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Appointments from './Pages/Appointment';
import Patient from './Pages/Patient';
import Message from './Pages/Message';
import Report from './Pages/Report';

// Placeholder for Protected Routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with actual authentication logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <PrivateRoute>
                <Patient />
              </PrivateRoute>
            }
          />
          <Route
            path="/message"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
