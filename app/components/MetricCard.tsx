"use client";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  bgColor: string;
  iconColor: string;
}

export default function MetricCard({
  icon,
  label,
  value,
  unit,
  bgColor,
  iconColor,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <div
              className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}
            >
              <div className={iconColor}>{icon}</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">
            {value}
            <span className="text-lg font-semibold text-gray-600 ml-1">
              {unit}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
