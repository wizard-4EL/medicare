import React from 'react';

import { BiStats, BiChart, BiUser } from 'react-icons/bi';
import { FaRegChartBar, FaUserAlt, FaHeartbeat, FaMoneyBillAlt, FaShieldAlt, FaChartPie } from 'react-icons/fa';
import Sidebar from '../Components/Sidebar';
function Reports() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
    <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800">Comprehensive Reports</h1>
          <p className="text-gray-600 mt-2">
            Detailed analytics and insights on appointments, patients, consultations, provider performance, financials, and usage.
          </p>
        </header>

        {/* Appointment Statistics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BiStats className="text-blue-600 mr-2" /> Appointment Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Appointments per Day</p>
              <h3 className="text-3xl font-bold">120</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Appointments per Week</p>
              <h3 className="text-3xl font-bold">840</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Appointments per Month</p>
              <h3 className="text-3xl font-bold">3600</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">No-show Rate</p>
              <h3 className="text-3xl font-bold">8%</h3>
              <p className="text-sm text-gray-500">Reasons: Traffic, Emergencies</p>
            </div>
          </div>
          <div className="mt-6 text-gray-500">
            <p>Average Appointment Duration: <span className="font-bold">30 minutes</span></p>
            <p>Popular Appointment Times: <span className="font-bold">9 AM - 12 PM</span></p>
          </div>
        </section>

        {/* Patient Demographics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaUserAlt className="text-green-600 mr-2" /> Patient Demographics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-bold text-lg mb-2">Age Distribution</h3>
              {/* Chart Placeholder */}
              <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg border-dashed border-2 border-gray-300">
                <span className="text-gray-500">[Bar Chart]</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-bold text-lg mb-2">Gender Breakdown</h3>
              {/* Chart Placeholder */}
              <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg border-dashed border-2 border-gray-300">
                <span className="text-gray-500">[Pie Chart]</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border md:col-span-2">
              <h3 className="font-bold text-lg mb-2">Geographic Distribution</h3>
              {/* Heatmap Placeholder */}
              <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg border-dashed border-2 border-gray-300">
                <span className="text-gray-500">[Heatmap]</span>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Metrics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaHeartbeat className="text-red-600 mr-2" /> Consultation Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Common Diagnoses</p>
              <h3 className="font-bold">Flu, Cold, Allergies</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Consultation Types</p>
              <h3 className="font-bold">Video: 60%, Chat: 30%, Phone: 10%</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Follow-up Rate</p>
              <h3 className="font-bold">25%</h3>
              <p className="text-sm text-gray-500">Outcome: Improved/Stable</p>
            </div>
          </div>
        </section>

        {/* Provider Performance */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BiChart className="text-purple-600 mr-2" /> Provider Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Consultations per Provider</p>
              <h3 className="font-bold">Dr. Smith: 200, Dr. Jones: 180</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Patient Satisfaction</p>
              <h3 className="font-bold">Avg. Rating: 4.5/5</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Average Response Time</p>
              <h3 className="font-bold">15 minutes</h3>
            </div>
          </div>
        </section>

        {/* Financial Reports */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaMoneyBillAlt className="text-green-600 mr-2" /> Financial Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Revenue</p>
              <h3 className="font-bold">$50,000</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Billing Summary</p>
              <h3 className="font-bold">$45,000</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Insurance Claims</p>
              <h3 className="font-bold">$5,000</h3>
            </div>
          </div>
        </section>

        {/* Usage Analytics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BiUser className="text-blue-600 mr-2" /> Usage Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Login Frequency</p>
              <h3 className="font-bold">Daily: 800, Monthly: 1500</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Average Session Duration</p>
              <h3 className="font-bold">15 minutes</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border md:col-span-2">
              <p className="text-gray-500">Drop-off Rates</p>
              <h3 className="font-bold">20% of sessions end prematurely</h3>
            </div>
          </div>
        </section>

        {/* Compliance and Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaShieldAlt className="text-red-600 mr-2" /> Compliance & Security
          </h2>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 mb-4">
              Data access logs, HIPAA compliance reports, and security audit trails.
            </p>
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg border-dashed border-2 border-gray-300">
              <span className="text-gray-500">[Security Dashboard Placeholder]</span>
            </div>
          </div>
        </section>

        {/* Visualization Tools */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaRegChartBar className="text-purple-600 mr-2" /> Visualization Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-bold mb-2">Appointment Trends</h3>
              <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg border-dashed border-2 border-gray-300">
                <span className="text-gray-500">[Line Chart]</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-bold mb-2">Patient Geography</h3>
              <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg border-dashed border-2 border-gray-300">
                <span className="text-gray-500">[Heatmap/Geo Chart]</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reports;
