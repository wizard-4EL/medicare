import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { CgClipboard, CgDetailsMore, CgTemplate, CgMail, CgProfile, CgLogIn } from "react-icons/cg";
import { RiSettings2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';  




const appointments = [
  {
  
      date: "23rd Oct",
      time: "11:00am - 12:00pm",
      description:
        "Individual Counseling for feeling stress all the time after office work # Being able to manage stress, emotions, and life's challenges in a healthy way.",
      patientName: "Yagami Light",
      patientImage: "/img/bb8a91a047deaa78f7a89228f80d92da.jpg", 
      tag: "New Patient",
      tagColor: "bg-green-500", // green for new patient
    },
  {
    date: "23rd Oct",
    time: "11:00am - 12:00pm",
    description: "Individual Counseling for feeling stress all the time after office work # Being able to manage stress, emotions, and life's challenges in a healthy way.",
    patientName: "Yagami Light",
    patientImage:  "img/875b4fb82c44a038466807b0dcf884cc.jpg",
    tag: "Returning Patient",
    tagColor: "bg-blue-500" // blue for returning patient
  },
  {
   date: "23rd Oct",
   time: "11:00am - 12:00pm",
   description: "Individual Counseling for feeling stress all the time after office work # Being able to manage stress, emotions, and life's challenges in a healthy way.",
   patientName: "Yagami Light",
   patientImage:  "img/1a96cf1393ff90ea75c15db5d648b03b.jpg",
   tag: "New Patient",
   tagColor: "bg-green-500" // green for new patient
 },
  {
   date: "23rd Oct",
   time: "11:00am - 12:00pm",
   description: "Individual Counseling for feeling stress all the time after office work # Being able to manage stress, emotions, and life's challenges in a healthy way.",
   patientName: "Yagami Light",
   patientImage:  "img/875b4fb82c44a038466807b0dcf884cc.jpg",
   tag: "Returning Patient",
   tagColor: "bg-blue-500" // blue for returning patient
 },
 {
   date: "23rd Oct",
   time: "11:00am - 12:00pm",
   description: "Individual Counseling for feeling stress all the time after office work # Being able to manage stress, emotions, and life's challenges in a healthy way.",
   patientName: "Yagami Light",
   patientImage:  "img/1a96cf1393ff90ea75c15db5d648b03b.jpg",
   tag: "New Patient",
   tagColor: "bg-green-500" // green for new patient
 },
 {
   date: "23rd Oct",
   time: "11:00am - 12:00pm",
   description: "Individual Counseling for feeling stress all the time after office work # Being able to manage stress, emotions, and life's challenges in a healthy way.",
   patientName: "Yagami Light",
   patientImage:  "img/1a96cf1393ff90ea75c15db5d648b03b.jpg",
   tag: "Returning Patient",
   tagColor: "bg-blue-500" // blue for returning patient
 },
  // Add more appointments as needed
];

function AdminAppointments() {
  return (
   <div className="flex h-screen bg-gray-100">
         {/* Sidebar */}
         <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </header>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className={`text-white px-3 py-1 rounded-md inline-block ${appointment.tagColor}`}>
                {appointment.date}, {appointment.time}
              </div>
              <p className="mt-2 text-gray-700 text-sm">{appointment.description}</p>
              <div className="flex items-center mt-4">
                <img
                  src={appointment.patientImage}
                  alt={appointment.patientName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <h3 className="font-semibold text-gray-800">{appointment.patientName}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAppointments;
