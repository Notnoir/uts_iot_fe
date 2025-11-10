"use client";

interface StatCardProps {
  title: string;
  value: number | string;
  unit?: string;
  gradient: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  unit = "",
  gradient,
}: StatCardProps) {
  return (
    <div
      className={`${gradient} rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow`}
    >
      <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
      <p className="text-3xl font-bold text-gray-900">
        {value}
        <span className="text-lg font-semibold text-gray-600 ml-1">{unit}</span>
      </p>
    </div>
  );
}
