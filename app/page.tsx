"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import RealtimeMonitor from "./components/RealtimeMonitor";
import SensorDashboard from "./components/SensorDashboard";
import AllDataTable from "./components/AllDataTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === "Dashboard" && (
          <>
            {/* Real-time Monitor */}
            <RealtimeMonitor />

            {/* All Data Table */}
            <AllDataTable />

            {/* Historical Summary */}
            <SensorDashboard />
          </>
        )}

        {activeTab === "Devices" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Devices</h2>
            <p className="text-gray-600">Device management coming soon...</p>
          </div>
        )}

        {activeTab === "Alerts" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Alerts</h2>
            <p className="text-gray-600">Alert configuration coming soon...</p>
          </div>
        )}

        {activeTab === "Settings" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-600">System settings coming soon...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 Smart IoT System. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
