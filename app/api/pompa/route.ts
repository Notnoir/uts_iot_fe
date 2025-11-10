import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { status } = body;

    if (status !== "ON" && status !== "OFF") {
      return NextResponse.json(
        { error: "Invalid status. Use ON or OFF" },
        { status: 400 }
      );
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const response = await fetch(`${backendUrl}/api/pompa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to control pump");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error controlling pump:", error);
    return NextResponse.json(
      { error: "Failed to control pump" },
      { status: 500 }
    );
  }
}
