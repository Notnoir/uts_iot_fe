// Utility functions for sensor data

/**
 * Format timestamp to readable date string
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Format temperature with unit
 */
export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

/**
 * Format humidity with unit
 */
export function formatHumidity(humid: number): string {
  return `${humid.toFixed(1)}%`;
}

/**
 * Get color class based on temperature value
 */
export function getTemperatureColor(temp: number): string {
  if (temp >= 35) return "text-red-600";
  if (temp >= 30) return "text-orange-600";
  if (temp >= 25) return "text-yellow-600";
  return "text-green-600";
}

/**
 * Get color class based on humidity value
 */
export function getHumidityColor(humid: number): string {
  if (humid >= 80) return "text-blue-600";
  if (humid >= 60) return "text-cyan-600";
  return "text-teal-600";
}

/**
 * Parse month-year format (e.g., "11-2024" to "November 2024")
 */
export function parseMonthYear(monthYear: string): string {
  const [month, year] = monthYear.split("-");
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}
