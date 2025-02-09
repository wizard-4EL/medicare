import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import Sidebar from '../Components/Sidebar';
import Modal from '../Components/Modal';
import { 
  RiSearchLine, 
  RiCalendarCheckLine,
  RiUserHeartLine,
  RiStethoscopeLine,
  RiTimeLine,
  RiArrowUpLine,
  RiArrowRightLine
} from 'react-icons/ri';

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
        const schedulesRef = collection(db, "schedules");
        const q = query(schedulesRef);

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
      'New Patient': 'bg-rose-500 border-rose-600',
      'Insurance': 'bg-purple-500 border-purple-600',
      'Chronic Patient': 'bg-emerald-500 border-emerald-600',
      'Regular': 'bg-blue-500 border-blue-600'
    };
    return colors[patientType] || 'bg-gray-500 border-gray-600';
  };

  const StatCard = ({ icon: Icon, title, value, trend, subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-teal-50 rounded-lg">
          <Icon className="text-2xl text-teal-600" />
        </div>
        {trend && (
          <span className="flex items-center text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <RiArrowUpLine className="mr-1" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold mt-4 text-gray-800">{value}</h3>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-500">{title}</p>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, Dr. {auth.currentUser?.displayName || 'Doctor'}
              </h1>
              <p className="text-gray-500 mt-1">Here's what's happening today</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Modal />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={RiUserHeartLine}
              title="Total Patients"
              value="1,234"
              trend="+12.5%"
              subtitle="vs last month"
            />
            <StatCard
              icon={RiCalendarCheckLine}
              title="Appointments"
              value="48"
              subtitle="Today"
            />
            <StatCard
              icon={RiStethoscopeLine}
              title="Consultations"
              value="28"
              trend="+8.1%"
            />
            <StatCard
              icon={RiTimeLine}
              title="Avg. Wait Time"
              value="12min"
              subtitle="Today"
            />
          </div>

          {/* Appointments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Today's Appointments</h2>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                  View All <RiArrowRightLine className="ml-1" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading appointments...</p>
                </div>
              ) : schedules.length === 0 ? (
                <div className="text-center py-8">
                  <RiCalendarCheckLine className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No appointments scheduled for today</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} 
                      className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-800">{schedule.time}</span>
                        <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getTagColor(schedule.patientType)}`}>
                          {schedule.patientType}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-800">{schedule.patientName}</h3>
                      <p className="text-sm text-gray-500 mt-1">{schedule.purpose}</p>
                      <p className="text-sm text-gray-400 mt-2">{schedule.patientPhone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Calendar and Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Calendar</h2>
                <p className="text-gray-500">{currentMonth}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <span key={day} className="text-sm font-medium text-gray-600 py-2">
                      {day}
                    </span>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <button
                      key={date}
                      className={`
                        py-2 rounded-lg text-sm font-medium
                        ${highlightedDates.includes(date)
                          ? "bg-teal-500 text-white hover:bg-teal-600"
                          : "text-gray-700 hover:bg-gray-100"}
                        transition-colors
                      `}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Patient Analytics</h2>
              <div className="relative">
                <svg className="w-full h-48" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-800">75%</p>
                    <p className="text-sm text-gray-500">Recovery Rate</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Patients</span>
                  <span className="text-sm font-medium text-gray-800">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Returning</span>
                  <span className="text-sm font-medium text-gray-800">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Referrals</span>
                  <span className="text-sm font-medium text-gray-800">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;