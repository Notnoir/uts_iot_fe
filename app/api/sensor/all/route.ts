import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";

    const response = await fetch(
      `http://localhost:3000/api/sensor/all?limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching all sensor data:", error);
    return NextResponse.json(
      { message: "Failed to fetch sensor data" },
      { status: 500 }
    );
  }
}
