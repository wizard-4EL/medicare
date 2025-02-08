import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import Modal from '../Components/Modal';
import Sidebar from '../Components/Sidebar';

function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentMonth = "October 2024";
  const highlightedDates = [27, 28, 29, 30];

  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const schedulesRef = collection(db, "schedules");
        const q = query(
          schedulesRef,
          // where("doctorId", "==", auth.currentUser.uid),
          // where("date", ">=", today.toISOString()),
          // orderBy("date", "asc"),
          // orderBy("time", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const schedulesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            time: new Date(doc.data().date + 'T' + doc.data().time).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          }));
          setSchedules(schedulesData);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const getTagColor = (patientType) => {
    const colors = {
      'New Patient': 'bg-red-600',
      'Insurance': 'bg-purple-600',
      'Chronic Patient': 'bg-green-600',
      'Regular': 'bg-blue-600'
    };
    return colors[patientType] || 'bg-gray-600';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold font-mono">
            Good Morning, Dr. {auth.currentUser?.displayName || 'Doctor'}
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-lg border border-blue-600 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <Modal />
        </header>

        {/* Daily Schedule */}
        <section className="bg-gray-100 p-6 rounded-md shadow-md mb-8">
          <h3 className="text-lg font-bold mb-4 font-mono">Daily Schedule</h3>
          {loading ? (
            <div className="text-center py-4">Loading schedules...</div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No appointments scheduled for today</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="p-4 bg-white border rounded-md">
                  <p className="text-xl font-bold font-mono">{schedule.time}</p>
                  <p className="text-gray-600">{schedule.patientName}</p>
                  <p className="text-gray-500">{schedule.purpose}</p>
                  <p className="text-gray-400">{schedule.patientPhone}</p>
                  <span className={`inline-block mt-2 px-3 py-1 text-sm text-white ${getTagColor(schedule.patientType)} rounded-lg`}>
                    {schedule.patientType}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Analytics and Reports */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Stats */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4 text-gray-800 font-mono">Patient Stats</h4>
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24" viewBox="0 0 36 36" aria-label="Patient Stats">
                <circle
                  className="text-blue-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                  strokeDasharray="63 37"
                  transform="rotate(-90 18 18)"
                />
                <circle
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                  strokeDasharray="25 75"
                  strokeDashoffset="63"
                  transform="rotate(-90 18 18)"
                />
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                  strokeDasharray="12 88"
                  strokeDashoffset="88"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center text-sm font-bold">
                100%
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <span className="block w-4 h-4 bg-blue-500 rounded"></span>
                <span className="text-gray-600">New Patients: 63%</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="block w-4 h-4 bg-green-500 rounded"></span>
                <span className="text-gray-600">Patients: 25%</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="block w-4 h-4 bg-gray-300 rounded"></span>
                <span className="text-gray-600">Others: 12%</span>
              </div>
            </div>
          </div>

          {/* Daily Traffic */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4 text-gray-800 font-mono">Daily Traffic</h4>
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-gray-900">2,579</p>
              <p className="text-green-500 bg-green-100 px-2 py-1 rounded-full text-sm font-medium">
                +2.45%
              </p>
            </div>
            <div className="mt-4">
              <svg viewBox="0 0 100 40" className="w-full h-32" aria-label="Traffic Chart">
                <rect x="5" y="15" width="10" height="25" fill="#60a5fa" rx="2" />
                <rect x="20" y="10" width="10" height="30" fill="#3b82f6" rx="2" />
                <rect x="35" y="5" width="10" height="35" fill="#2563eb" rx="2" />
                <rect x="50" y="20" width="10" height="20" fill="#60a5fa" rx="2" />
                <rect x="65" y="12" width="10" height="28" fill="#3b82f6" rx="2" />
                <rect x="80" y="8" width="10" height="32" fill="#2563eb" rx="2" />
              </svg>
            </div>
          </div>

          {/* Consultations */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4 text-gray-800 font-mono">Consultations</h4>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-700 text-sm">Upcoming Consultations</p>
              <p className="text-blue-600 text-sm">View All</p>
              <p className="text-gray-500 text-sm">{currentMonth}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <span key={day} className="font-semibold text-gray-600">
                    {day}
                  </span>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <span
                    key={date}
                    className={`px-3 py-1 rounded-full ${
                      highlightedDates.includes(date)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700"
                    } hover:bg-blue-200 cursor-pointer`}
                  >
                    {date}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;