"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import MetricCard from "./MetricCard";
import SensorChart from "./SensorChart";

interface RealtimeData {
  suhu: number;
  kelembapan: number;
  cahaya: number;
  timestamp: string;
}

interface ChartDataPoint {
  timestamp: string;
  value: number;
}

export default function RealtimeMonitor() {
  const [data, setData] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pompaStatus, setPompaStatus] = useState<"ON" | "OFF">("OFF");
  const [controlLoading, setControlLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartView, setChartView] = useState<"Hour" | "Day" | "Week">("Hour");

  useEffect(() => {
    fetchData();
    // Refresh setiap 2 detik untuk real-time
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/sensor/latest");
      if (response.status === 404) {
        setError("Waiting for sensor data from ESP32...");
        setLoading(false);
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      setError(null);
      setLoading(false);

      // Add to chart data
      setChartData((prev) => {
        const newData = [
          ...prev,
          {
            timestamp: result.timestamp,
            value: result.suhu,
          },
        ];
        // Keep only last 50 points
        return newData.slice(-50);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const togglePompa = async () => {
    setControlLoading(true);
    try {
      const newStatus = pompaStatus === "ON" ? "OFF" : "ON";
      const response = await fetch("/api/pompa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to control pump");
      }

      setPompaStatus(newStatus);
      console.log(`Pompa turned ${newStatus}`);
    } catch (err) {
      console.error("Error controlling pump:", err);
      alert("Failed to control pump");
    } finally {
      setControlLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 text-yellow-800 px-6 py-4 rounded-2xl mb-8">
        <p className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      </div>
    );
  }

  if (!data) return null;

  // Calculate Air Quality Index (dummy calculation based on temperature and humidity)
  const airQuality = Math.round(45 + data.kelembapan / 10);
  const lightLevel = data.cahaya; // Real light sensor value from ESP32

  return (
    <div className="space-y-6 mb-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          label="Temperature"
          value={data.suhu.toFixed(0)}
          unit="°C"
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <MetricCard
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          }
          label="Humidity"
          value={data.kelembapan.toFixed(0)}
          unit="%"
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <MetricCard
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
          label="Light"
          value={lightLevel.toFixed(0)}
          unit="%"
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />

        <MetricCard
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          }
          label="Air Quality"
          value={airQuality}
          unit="AQI"
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-gray-800">
              Real-Time Sensor Readings
            </h2>
            <span className="flex items-center text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
              <span className="animate-pulse h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              Live
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {(["Hour", "Day", "Week"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setChartView(view)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  chartView === view
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          {chartData.length > 0 ? (
            <SensorChart data={chartData} label="Temperature" color="#3b82f6" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Waiting for sensor data...</p>
            </div>
          )}
        </div>
      </div>

      {/* Pump Control */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-xl ${
                pompaStatus === "ON" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  pompaStatus === "ON" ? "text-green-600" : "text-gray-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Water Pump Control
              </h3>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    pompaStatus === "ON" ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {pompaStatus === "ON" ? "Running" : "Stopped"}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={togglePompa}
            disabled={controlLoading}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
              controlLoading
                ? "bg-gray-400 cursor-not-allowed"
                : pompaStatus === "ON"
                ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200"
                : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200"
            }`}
          >
            {controlLoading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Processing...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      pompaStatus === "ON"
                        ? "M6 18L18 6M6 6l12 12"
                        : "M5 13l4 4L19 7"
                    }
                  />
                </svg>
                <span>{pompaStatus === "ON" ? "Turn OFF" : "Turn ON"}</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
