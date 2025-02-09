import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Page Imports
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Dashboard from './Pages/Dashboard';
import Appointments from './Pages/Appointment';
import Patient from './Pages/Patient';
import Message from './Pages/Message';
import Report from './Pages/Report';
import Settings from './Pages/Settings';




import DoctorDashboard from './Doctor/Dashboard';
// Placeholder for Protected Routes

const getUserRole = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    // Parse the user data and get the role
    const userData = JSON.parse(user);
    return userData.role || 'user'; // Default to 'user' if role is not set
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();
  
  if (!role) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(role)) {
    // Role not authorized, redirect to appropriate dashboard
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }
  
  return children;
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
          <Route path="/user/dashboard" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Dashboard />
            </ProtectedRoute>
          } />
           <Route path="/user/appointments" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Appointments />
            </ProtectedRoute>
          } />

<Route path="/user/patient" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Patient />
            </ProtectedRoute>
          } />

<Route path="/user/message" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Message />
            </ProtectedRoute>
          } />

<Route path="/user/report" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Report />
            </ProtectedRoute>
          } />
       
       <Route path="/user/settings" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Settings />
            </ProtectedRoute>
          } />
 {/* Admin Routes */}
 <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
