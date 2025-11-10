import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const response = await fetch(`${backendUrl}/api/sensor/latest`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      return NextResponse.json(
        { message: "No sensor data available yet" },
        { status: 404 }
      );
    }

    if (!response.ok) {
      throw new Error("Failed to fetch sensor data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching latest sensor data:", error);
    return NextResponse.json(
      { error: "Failed to fetch sensor data" },
      { status: 500 }
    );
  }
}
