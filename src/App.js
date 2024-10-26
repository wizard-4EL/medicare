import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'; 
import Dashboard from './Pages/Dashboard';
import Appointments from './Pages/Appointment';
import Patient from './Pages/Patient';
import Message from './Pages/Message';
import Report from './Pages/Report';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for Login and SignUp */}
          <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/message" element={<Message />} />
        <Route path="/message" element={<Message />} />
        <Route path="/report" element={<Report />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

