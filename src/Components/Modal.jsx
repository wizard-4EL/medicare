import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";

// Dummy data for dropdowns
const DUMMY_DEPARTMENTS = [
  { id: "dept1", name: "Cardiology" },
  { id: "dept2", name: "Neurology" },
  { id: "dept3", name: "Pediatrics" },
  { id: "dept4", name: "Orthopedics" },
  { id: "dept5", name: "Dermatology" }
];

const DUMMY_DOCTORS = [
  { id: "doc1", name: "Dr. John Smith" },
  { id: "doc2", name: "Dr. Sarah Johnson" },
  { id: "doc3", name: "Dr. Michael Brown" },
  { id: "doc4", name: "Dr. Emily Davis" },
  { id: "doc5", name: "Dr. James Wilson" }
];

const PATIENT_TYPES = [
  "New Patient",
  "Regular Patient",
  "Chronic Patient",
  "Insurance Patient"
];

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    department: "",
    doctorId: "",
    purpose: "",
    date: "",
    time: "",
    patientType: "New Patient",
    status: "scheduled"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dateTime") {
      // Split datetime-local input into date and time
      const dateTimeValue = new Date(value);
      setFormData(prev => ({
        ...prev,
        date: dateTimeValue.toISOString().split('T')[0],
        time: dateTimeValue.toTimeString().slice(0, 5)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Add the schedule to Firestore
      const schedulesRef = collection(db, "schedules");
      console.log("init schedule")
      // Format the data to match the dashboard's expected structure
      const scheduleData = {
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        department: formData.department,
        doctorId: formData.doctorId,
        doctorName: DUMMY_DOCTORS.find(d => d.id === formData.doctorId)?.name || '',
        purpose: formData.purpose,
        date: formData.date,
        time: formData.time,
        patientType: formData.patientType,
        status: "scheduled",
        createdAt: new Date().toISOString(),
        userId: auth.currentUser?.uid || null
      };

      await addDoc(schedulesRef, scheduleData);

      setSuccess("Appointment scheduled successfully!");
      setFormData({
        patientName: "",
        patientPhone: "",
        department: "",
        doctorId: "",
        purpose: "",
        date: "",
        time: "",
        patientType: "New Patient",
        status: "scheduled"
      });
      
      // Close modal after short delay
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(null);
      }, 1500);
    } catch (err) {
      console.error("Error creating schedule:", err);
      setError("Failed to create appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-blue-700 focus:outline-none"
      >
        + Create New Schedule
      </button>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative p-6">
            {/* Close Icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close Modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">Schedule Appointment</h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Contact/Phone */}
              <div>
                <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="patientPhone"
                  id="patientPhone"
                  placeholder="Enter contact number"
                  value={formData.patientPhone}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Select Department</option>
                  {DUMMY_DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
                  Doctor
                </label>
                <select
                  name="doctorId"
                  id="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Select Doctor</option>
                  {DUMMY_DOCTORS.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Type */}
              <div>
                <label htmlFor="patientType" className="block text-sm font-medium text-gray-700">
                  Patient Type
                </label>
                <select
                  name="patientType"
                  id="patientType"
                  value={formData.patientType}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  {PATIENT_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose/Medical Issue */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  Purpose of Visit
                </label>
                <input
                  type="text"
                  name="purpose"
                  id="purpose"
                  placeholder="Describe the purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Date and Time */}
              <div>
                <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                  Appointment Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  id="dateTime"
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Scheduling..." : "Schedule Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;