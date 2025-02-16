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
//Doctor Routes
import DoctorDashboard from './Doctor/Dashboard';
import DoctorPatients from './Doctor/Patient';
import DoctorAppointments from './Doctor/Appointment';  
import DoctorMessages from './Doctor/Message';
import DoctorReports from './Doctor/Report';  
import DoctorSettings from './Doctor/Settings';
import AdminAppointments from './Admin/Appointment';
import AdminPatients from './Admin/Patient';
import AdminMessages from './Admin/Message';
import AdminReports from './Admin/Report';
import AdminSettings from './Admin/Settings';



// import VideoCallSystem from './Doctor/VideoCall';




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

     {/* Doctor's Routes */}
     <Route path="/doctor/dashboard" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
           <Route path="/doctor/appointments" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorAppointments />
            </ProtectedRoute>
          } />

<Route path="/doctor/patient" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorPatients />
            </ProtectedRoute>
          } />

<Route path="/doctor/message" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorMessages />
            </ProtectedRoute>
          } />

<Route path="/doctor/report" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorReports />
            </ProtectedRoute>
          } />
       
       <Route path="/doctor/settings" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorSettings />
            </ProtectedRoute>
          } />
               {/* <Route path="/user/video" element={
            <ProtectedRoute allowedRoles={['user']}>
              <VideoCallSystem />
            </ProtectedRoute>
          } /> */}
 
 
    {/* Admin Routes */}
    <Route path="/doctor/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
           <Route path="/doctor/appointments" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminAppointments />
            </ProtectedRoute>
          } />

<Route path="/doctor/patient" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPatients />
            </ProtectedRoute>
          } />

<Route path="/doctor/message" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminMessages />
            </ProtectedRoute>
          } />

<Route path="/doctor/report" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
            </ProtectedRoute>
          } />
       
       <Route path="/doctor/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettings />
            </ProtectedRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
