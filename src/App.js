import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp'; 
import Dashboard from './Components/Dashboard';
import Appointments from './Components/Appointment';
import Patient from './Components/Patient';
import Message from './Components/Message';
import Report from './Components/Report';



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

