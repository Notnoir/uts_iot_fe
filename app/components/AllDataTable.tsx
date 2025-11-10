"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { formatTimestamp } from "../utils/format";

interface SensorRecord {
  idx: number;
  suhu: number;
  humid: number;
  kecerahan: number;
  timestamp: string;
}

interface AllDataResponse {
  count: number;
  data: SensorRecord[];
}

export default function AllDataTable() {
  const [data, setData] = useState<AllDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [limit]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/sensor/all?limit=${limit}`);
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
    return (
      <div className="bg-red-50 border-2 border-red-300 text-red-800 px-6 py-4 rounded-2xl">
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

  if (!data || data.count === 0) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 text-yellow-800 px-6 py-4 rounded-2xl">
        <p>No data available yet. Waiting for sensor data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Latest Sensor Data
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {data.count} most recent records • Auto-refresh every 10s
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value={20}>Last 20</option>
            <option value={50}>Last 50</option>
            <option value={100}>Last 100</option>
            <option value={200}>Last 200</option>
          </select>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center space-x-2"
            disabled={loading}
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Humidity
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Light
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.data.map((record, index) => (
                <tr
                  key={record.idx}
                  className={`hover:bg-blue-50 transition ${
                    index === 0 ? "bg-green-50" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {record.idx}
                    {index === 0 && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-200 text-green-800">
                        Latest
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="font-semibold text-red-600">
                      {record.suhu}°C
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="font-semibold text-blue-600">
                      {record.humid}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="font-semibold text-yellow-600">
                      {record.kecerahan}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatTimestamp(record.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-xl p-4">
          <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
            Avg Temperature
          </div>
          <div className="text-2xl font-bold text-red-700">
            {(
              data.data.reduce((sum, r) => sum + r.suhu, 0) / data.count
            ).toFixed(1)}
            °C
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
            Avg Humidity
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {(
              data.data.reduce((sum, r) => sum + r.humid, 0) / data.count
            ).toFixed(1)}
            %
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 rounded-xl p-4">
          <div className="text-xs font-semibold text-yellow-600 uppercase tracking-wide mb-1">
            Avg Light
          </div>
          <div className="text-2xl font-bold text-yellow-700">
            {(
              data.data.reduce((sum, r) => sum + r.kecerahan, 0) / data.count
            ).toFixed(1)}
            %
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
            Total Records
          </div>
          <div className="text-2xl font-bold text-green-700">{data.count}</div>
        </div>
      </div>
    </div>
  );
}
