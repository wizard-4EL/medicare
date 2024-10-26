import React from 'react';
import { CgClipboard, CgDetailsMore, CgTemplate, CgProfile, CgLogIn } from "react-icons/cg";
import { RiSettings2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

// Sample message data
const messages = [
  { id: 1, sender: "Dr. Smith", content: "Hello, how can I assist you today?", time: "10:30 AM" },
  { id: 2, sender: "Patient A", content: "I have some questions about my prescription.", time: "10:32 AM" },
  { id: 3, sender: "Dr. Smith", content: "Sure, I can help with that!", time: "10:33 AM" },
  { id: 4, sender: "Patient A", content: "Thank you!", time: "10:34 AM" },
  { id: 5, sender: "Dr. Smith", content: "Don't hesitate to reach out anytime.", time: "10:35 AM" },
];

function Messages() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-800 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-6">MEDICARE</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <CgDetailsMore />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700">
              <Link to="/appointments" className="flex items-center space-x-2">
                <CgTemplate />
                <span>Appointments</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700">
              <Link to="/patients" className="flex items-center space-x-2">
                <CgProfile />
                <span>Patients</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg bg-blue-900">
              <Link to="/messages" className="flex items-center space-x-2">
                <CgClipboard className="text-lg" />
                <span>Messages</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700">
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
      <div className="flex-1 p-6 bg-pink-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-400" />
          </div>
        </header>

        {/* Chat Container */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Chat History</h2>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 p-3 rounded-lg ${
                  msg.sender.includes("Dr.") ? "bg-blue-50" : "bg-green-50"
                }`}
              >
                <FaUserCircle className="text-3xl text-gray-400" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{msg.sender}</span>
                    <span className="text-gray-500 text-sm">{msg.time}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="mt-4">
          <textarea
            rows="3"
            placeholder="Type your message..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
