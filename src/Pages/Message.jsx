import React, { useState } from 'react';
import { FaSearch, FaPhoneAlt } from 'react-icons/fa';
import {
  CgClipboard,
  CgDetailsMore,
  CgTemplate,
  CgMail,
  CgProfile,
  CgLogIn,
} from 'react-icons/cg';
import { RiSettings2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const messagesData = [
  {
    name: "Obed Kyei",
    message: "Hey, How are you...",
    time: "9:32am",
    image: "/img/bb8a91a047deaa78f7a89228f80d92da.jpg",
  },
  {
    name: "Dr. Griffin",
    message: "Follow-up Consultation",
    time: "10:45am",
    image: "/img/th (1).jpg",
  },
  {
    name: "Daniel Kojo",
    message: "Follow-up Consultation",
    time: "10:45am",
    image: "/img/th (4).jpg",
  },
  {
    name: "The Hub",
    message: "Follow-up Consultation",
    time: "10:45am",
    image: "/img/th (3).jpg",
  },
  {
    name: "The Witcher",
    message: "Follow-up Consultation",
    time: "10:45am",
    image: "/img/th.jpg",
  },
  {
    name: "Jon Snow",
    message: "Follow-up Consultation",
    time: "10:45am",
    image: "/img/th (2).jpg",
  },
  {
    name: "Mia Khalifa",
    message: "Follow-up Consultation",
    time: "10:45am",
    image: "img/1a96cf1393ff90ea75c15db5d648b03b.jpg",
  },
];

// A simple video conferencing component using Jitsi Meet
function VideoConference({ roomName, onEndCall }) {
  return (
    <div className="w-full h-full relative">
      <iframe
        title="Video Conference"
        src={`https://meet.jit.si/${roomName}#config.disableDeepLinking=true`}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-full rounded-lg"
      />
      <button
        onClick={onEndCall}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        End Call
      </button>
    </div>
  );
}

function Messages() {
  const [activeTab, setActiveTab] = useState("messages");
  const [inCall, setInCall] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [roomName, setRoomName] = useState("");

  const handleItemClick = (msg) => {
    setSelectedMessage(msg);
    // If the user is on the Video Calls tab, start a call.
    if (activeTab === "calls") {
      // Generate a unique room name (you might base this on user IDs or other logic)
      const newRoom = `MedicalMeeting-${Date.now()}`;
      setRoomName(newRoom);
      setInCall(true);
    } else {
      // For messages, you might load a chat interface instead
      setInCall(false);
    }
  };

  const handleEndCall = () => {
    setInCall(false);
  };

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
        <button className="flex items-center space-x-2 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors">
          <CgLogIn />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Messages</h1>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring focus:border-blue-300 w-full transition duration-200"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-400" />
          </div>
        </header>

        {/* Panels */}
        <div className="flex flex-col lg:flex-row h-[calc(100%-4rem)]">
          {/* Left Panel: Message & Calls List */}
          <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-4 mb-4 lg:mb-0 lg:mr-4 overflow-y-auto">
            {/* Tabs */}
            <div className="flex justify-around border-b pb-2 mb-4">
              <span
                onClick={() => {
                  setActiveTab("messages");
                  setInCall(false);
                  setSelectedMessage(null);
                }}
                className={`cursor-pointer font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "messages"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent"
                }`}
              >
                New Messages
              </span>
              <span
                onClick={() => {
                  setActiveTab("calls");
                  setInCall(false);
                  setSelectedMessage(null);
                }}
                className={`cursor-pointer font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "calls"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent"
                }`}
              >
                Video Calls
              </span>
            </div>

            {/* Message List */}
            {messagesData.map((msg, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(msg)}
                className={`flex items-center justify-between p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-gray-100 ${
                  selectedMessage === msg ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={msg.image}
                    alt={msg.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">{msg.name}</h3>
                    <p className="text-xs text-gray-500">{msg.message}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Right Panel: Video Conference / Chat Placeholder */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg shadow-inner relative">
            {activeTab === "calls" && inCall ? (
              <VideoConference roomName={roomName} onEndCall={handleEndCall} />
            ) : (
              <div className="text-gray-500 text-center p-6">
                {activeTab === "calls"
                  ? "Select a video call to start"
                  : "Select a message to view the conversation"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
