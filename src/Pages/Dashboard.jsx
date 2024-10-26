import React from 'react';
//import { FaUserCircle, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { CgClipboard, CgDetailsMore, CgTemplate, CgMail, CgProfile, CgLogIn,    } from "react-icons/cg";
import { RiSettings2Line } from "react-icons/ri";
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';


function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-800 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-6">MEDICARE</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 p-2 rounded-lg bg-blue-900 cursor-pointer">
            <CgDetailsMore />
              <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/appointments" className="flex items-center space-x-2">
                <CgTemplate />
                <span>Appointments</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/patient" className="flex items-center space-x-2">
                <CgProfile />
                <span>Patients</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/report" className="flex items-center space-x-2">
                <CgClipboard />
                <span>Report</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/message" className="flex items-center space-x-2">
                <CgMail />
                <span>Messages</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
            <RiSettings2Line />
              <span>Settings</span>
            </li>
          </ul>
        </div>
        <button className="flex items-center space-x-2 p-2 rounded-lg bg-red-600 hover:bg-red-700">
        <CgLogIn />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-lg border border-blue-600 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Create New Schedule</button>
            
          </div>
        </header>

        {/* Daily Schedule */}
        <section className="bg-blue-400 p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-2xl font-bold mb-4">Daily Schedule</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['10:00 AM', '10:30 AM', '11:00 AM', '11:40 AM'].map((time, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <p className="text-lg font-bold">{time}</p>
                <p className="text-white">Check-up</p>
                <p className="text-gray-500">+233 556 375 323</p>
                <span className="inline-block mt-2 px-3 py-1 text-sm text-white rounded-4 bg-yellow-600">
                  {index === 0 ? 'New Patient' : index === 1 ? 'Insurance' : 'Chronic Patient'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics and Reports */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Patient Stats */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4">Your Pie Chart</h4>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full relative">
                <div className="w-20 h-20 bg-white rounded-full absolute top-2 left-2"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-gray-600">
              <p>New Patients: 63%</p>
              <p>Patients: 25%</p>
            </div>
          </div>

          {/* Daily Traffic */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4">Daily Traffic</h4>
            <p className="text-3xl font-bold">2,579</p>
            <p className="text-green-500">+2.45%</p>
            <div className="h-32 mt-4">
              <div className="bg-blue-300 h-full w-full"></div>
            </div>
          </div>

          {/* Consultations */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4">Consultations</h4>
            <div className="flex items-center justify-between">
              <p>Upcoming Consultations</p>
              <p className="text-gray-500">October 2024</p>
            </div>
            <div className="h-32 mt-4">
              <div className="bg-gray-100 h-full w-full"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
