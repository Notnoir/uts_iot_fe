import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const response = await fetch(`${backendUrl}/api/sensor/summary`, {
      cache: "no-store", // Disable caching for real-time data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sensor data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    return NextResponse.json(
      { error: "Failed to fetch sensor data" },
      { status: 500 }
    );
  }
}
