import React from 'react';
import { CgClipboard, CgDetailsMore, CgTemplate, CgProfile, CgLogIn, CgMail } from "react-icons/cg";
import { RiSettings2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { BiStats } from 'react-icons/bi';
import { FaRegFrown, FaRegMoneyBillAlt } from 'react-icons/fa';

// Sample data for reports
const usageStats = {
  totalUsers: 1500,
  totalConsultations: 1200,
  avgConsultationTime: "30 mins",
};

const commonIssues = [
  "Connection issues during consultations",
  "Billing discrepancies",
  "Difficulty accessing the platform",
  "Delayed response times from healthcare providers",
];

const financialReports = {
  totalRevenue: "$50,000",
  totalExpenses: "$30,000",
  netProfit: "$20,000",
};

function Reports() {
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
              <Link to="/reports" className="flex items-center space-x-2">
                <CgClipboard className="text-lg" />
                <span>Reports</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <CgMail />
              <span>Messages</span>
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
        <h1 className="text-3xl font-bold mb-6">General Reports</h1>

        {/* Usage Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex items-center">
            <BiStats className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold">Usage Statistics</h2>
              <p>Total Users: <span className="font-bold">{usageStats.totalUsers}</span></p>
              <p>Total Consultations: <span className="font-bold">{usageStats.totalConsultations}</span></p>
              <p>Avg Consultation Time: <span className="font-bold">{usageStats.avgConsultationTime}</span></p>
            </div>
          </div>
        </div>

        {/* Common Issues Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaRegFrown className="text-red-500 mr-2" /> Common Issues
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {commonIssues.map((issue, index) => (
              <li key={index} className="text-gray-700">{issue}</li>
            ))}
          </ul>
        </div>

        {/* Financial Reports Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaRegMoneyBillAlt className="text-green-500 mr-2" /> Financial Reports
          </h2>
          <ul className="space-y-2">
            <li>Total Revenue: <span className="font-bold">{financialReports.totalRevenue}</span></li>
            <li>Total Expenses: <span className="font-bold">{financialReports.totalExpenses}</span></li>
            <li>Net Profit: <span className="font-bold">{financialReports.netProfit}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;
