import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgClipboard, CgDetailsMore, CgTemplate, CgMail, CgProfile, CgLogIn } from 'react-icons/cg';
import { RiSettings2Line } from 'react-icons/ri';

function Sidebar() {
  const location = useLocation();
  
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-1/5 bg-blue-800 text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-6">MEDICARE</h2>
        <ul className="space-y-4">
          <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
            isActivePath('/') ? 'bg-blue-900' : 'hover:bg-blue-700'
          }`}>
            <Link to="/" className="flex items-center space-x-2 w-full">
              <CgDetailsMore />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
            isActivePath('/appointments') ? 'bg-blue-900' : 'hover:bg-blue-700'
          }`}>
            <Link to="/appointments" className="flex items-center space-x-2 w-full">
              <CgTemplate />
              <span>Appointments</span>
            </Link>
          </li>
          <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
            isActivePath('/patient') ? 'bg-blue-900' : 'hover:bg-blue-700'
          }`}>
            <Link to="/patient" className="flex items-center space-x-2 w-full">
              <CgProfile />
              <span>Patients</span>
            </Link>
          </li>
          <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
            isActivePath('/report') ? 'bg-blue-900' : 'hover:bg-blue-700'
          }`}>
            <Link to="/report" className="flex items-center space-x-2 w-full">
              <CgClipboard />
              <span>Report</span>
            </Link>
          </li>
          <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
            isActivePath('/message') ? 'bg-blue-900' : 'hover:bg-blue-700'
          }`}>
            <Link to="/message" className="flex items-center space-x-2 w-full">
              <CgMail />
              <span>Messages</span>
            </Link>
          </li>
          <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
            isActivePath('/settings') ? 'bg-blue-900' : 'hover:bg-blue-700'
          }`}>
            <Link to="/settings" className="flex items-center space-x-2 w-full">
              <RiSettings2Line />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <button className="flex items-center space-x-2 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors w-full">
        <CgLogIn />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;