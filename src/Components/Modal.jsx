import React, { useState } from "react";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    department: "",
    doctor: "",
    issue: "",
    dateTime: "",
    userId: "USR123", // Sample user ID (replace dynamically)
    doctorId: "DOC456", // Sample doctor ID (replace dynamically)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    setIsModalOpen(false); // Close modal after submission
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

            <h3 className="text-xl font-semibold mb-4 text-center">Book Appointment</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Contact/Phone */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact / Phone
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
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
                <input
                  type="text"
                  name="department"
                  id="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Doctor's Name */}
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                  Doctor's Name
                </label>
                <input
                  type="text"
                  name="doctor"
                  id="doctor"
                  placeholder="Doctor's Name"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Medical Issue */}
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                  Medical Issue
                </label>
                <input
                  type="text"
                  name="issue"
                  id="issue"
                  placeholder="Describe your issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Time and Date */}
              <div>
                <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                  Time and Date
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  id="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              {/* Hidden Fields for User & Doctor IDs */}
              <input type="hidden" name="userId" value={formData.userId} />
              <input type="hidden" name="doctorId" value={formData.doctorId} />

              {/* Form Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  Book Now
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
