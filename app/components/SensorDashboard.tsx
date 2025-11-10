"use client";

import { useEffect, useState } from "react";
import { SensorData } from "../types/sensor";
import StatCard from "./StatCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { formatTimestamp, parseMonthYear } from "../utils/format";

export default function SensorDashboard() {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sensor");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchData} />;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Historical Data Summary
        </h2>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Max Temperature"
          value={data.suhumax}
          unit="°C"
          gradient="bg-red-50 border border-red-100"
        />
        <StatCard
          title="Min Temperature"
          value={data.suhumin}
          unit="°C"
          gradient="bg-blue-50 border border-blue-100"
        />
        <StatCard
          title="Avg Temperature"
          value={data.suhurata}
          unit="°C"
          gradient="bg-green-50 border border-green-100"
        />
        <StatCard
          title="Max Humidity"
          value={data.humidmax}
          unit="%"
          gradient="bg-purple-50 border border-purple-100"
        />
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Max Temperature & Max Humidity Records
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Temperature (°C)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Humidity (%)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Brightness (Lux)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.nilai_suhu_max_humid_max.map((record) => (
                <tr key={record.idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.idx}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span
                      className={
                        record.suhu === data.suhumax
                          ? "font-bold text-red-600"
                          : ""
                      }
                    >
                      {record.suhu}°C
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span
                      className={
                        record.humid === data.humidmax
                          ? "font-bold text-purple-600"
                          : ""
                      }
                    >
                      {record.humid}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {record.kecerahan}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatTimestamp(record.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Month-Year Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Month-Year of Max Records
        </h3>
        <div className="flex flex-wrap gap-3">
          {data.month_year_max.map((item, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors border border-indigo-100"
            >
              {parseMonthYear(item.month_year)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
