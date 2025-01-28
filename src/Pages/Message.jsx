import React, { useState } from 'react';
import { FaSearch,  FaPhoneAlt } from 'react-icons/fa';
import { CgClipboard, CgDetailsMore, CgTemplate, CgMail, CgProfile, CgLogIn } from 'react-icons/cg';
import { RiSettings2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';


const messages = [
  { name: "Obed Kyei", message: "Hey, How are you...", time: "9:32am", image: "https://via.placeholder.com/40" },
  { name: "Dr. Obed", message: "Follow-up Consultation", time: "10:45am", image: "https://via.placeholder.com/40" },
];

function Messages() {
  const [activeTab, setActiveTab] = useState("messages");
  const [inCall, setInCall] = useState(false);

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
                  <Link to="/settings" className="flex items-center space-x-2">
                    <RiSettings2Line />
                    <span>Settings</span>
                  </Link>
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
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="pl-10 pr-4 py-2 rounded-full border focus:outline-none"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-400" />
          </div>
        </header>

        {/* Messages or Video Calls */}
        <div className="flex h-full">
          {/* Left Panel */}
          <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-around border-b pb-2 mb-4">
              <span
                onClick={() => setActiveTab("messages")}
                className={`cursor-pointer font-semibold ${activeTab === "messages" ? "text-blue-600" : ""}`}
              >
                New Messages
              </span>
              <span
                onClick={() => setActiveTab("calls")}
                className={`cursor-pointer font-semibold ${activeTab === "calls" ? "text-blue-600" : ""}`}
              >
                Video Calls
              </span>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={() => setInCall(activeTab === "calls")}
              >
                <div className="flex items-center">
                  <img src={msg.image} alt={msg.name} className="w-10 h-10 rounded-full" />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">{msg.name}</h3>
                    <p className="text-xs text-gray-500">{msg.message}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg shadow-inner">
            {inCall ? (
              <div className="relative w-3/4 h-3/4 bg-white rounded-lg overflow-hidden shadow-lg">
                {/* Video Placeholder */}
                <img
                  src="https://via.placeholder.com/700x400"
                  alt="Dr. Obed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                  Dr. Obed
                </div>
                {/* Call Controls */}
                <div className="absolute bottom-4 left-4 flex space-x-4">
                  <button className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700">
                    <FaPhoneAlt />
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700">
                    REC 9:00
                  </button>
                </div>
                {/* Small Video */}
                <div className="absolute bottom-4 right-4">
                  <img
                    src="https://via.placeholder.com/120x80"
                    alt="User"
                    className="w-32 h-24 rounded-md border-2 border-white shadow-md"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No messages selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
