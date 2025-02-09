import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { CgClipboard, CgDetailsMore, CgTemplate, CgMail, CgProfile, CgLogIn } from "react-icons/cg";
import { RiSettings2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

// Sample patient data
const patients = [
  { name: "Robert Fox", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "/img/bb8a91a047deaa78f7a89228f80d92da.jpg" },
  { name: "Abella Danger", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "/img/th (1).jpg" },
  { name: "Jude Oc", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "img/1a96cf1393ff90ea75c15db5d648b03b.jpg" },
  { name: "Robert Fox", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image:"img/875b4fb82c44a038466807b0dcf884cc.jpg" },
  { name: "Abella Danger", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "/img/th (2).jpg"},
  { name: "Jude Oc", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "/img/bb8a91a047deaa78f7a89228f80d92da.jpg" },
  { name: "Robert Fox", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "img/875b4fb82c44a038466807b0dcf884cc.jpg" },
  { name: "Abella Danger", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image:"/img/th (3).jpg" },
  { name: "Jude Oc", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "/img/bb8a91a047deaa78f7a89228f80d92da.jpg" },
  { name: "Robert Fox", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "/img/th (4).jpg" },
  { name: "Abella Danger", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "img/1a96cf1393ff90ea75c15db5d648b03b.jpg" },
  { name: "Jude Oc", date: "23, Oct.", time: "11:00am - 12:00pm", type: "Individual Counseling", image: "img/875b4fb82c44a038466807b0dcf884cc.jpg" },
  // More patients...
];

function Patients() {
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
      <div className="flex-1 p-6 bg-pink-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Patients</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-400" />
          </div>
        </header>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center">
                <img
                  src={patient.image}
                  alt={patient.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-gray-500 text-sm">{patient.date}, {patient.time}</p>
                  <p className="text-gray-500 text-sm">{patient.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patients;
