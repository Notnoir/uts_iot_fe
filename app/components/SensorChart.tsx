"use client";

import { useEffect, useRef } from "react";

interface ChartData {
  timestamp: string;
  value: number;
}

interface SensorChartProps {
  data: ChartData[];
  label: string;
  color: string;
}

export default function SensorChart({ data, label, color }: SensorChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate chart dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find min and max values
    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Draw data line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(
      0,
      padding.top,
      0,
      height - padding.bottom
    );
    gradient.addColorStop(0, `${color}40`);
    gradient.addColorStop(1, `${color}05`);

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const normalizedValue = (point.value - minValue) / valueRange;
      const y = height - padding.bottom - normalizedValue * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    // Store the path for filling
    const linePath = new Path2D();
    data.forEach((point, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const normalizedValue = (point.value - minValue) / valueRange;
      const y = height - padding.bottom - normalizedValue * chartHeight;

      if (index === 0) {
        linePath.moveTo(x, y);
      } else {
        linePath.lineTo(x, y);
      }
    });

    // Complete the fill path
    linePath.lineTo(width - padding.right, height - padding.bottom);
    linePath.lineTo(padding.left, height - padding.bottom);
    linePath.closePath();

    // Fill the area
    ctx.fillStyle = gradient;
    ctx.fill(linePath);

    // Stroke the line
    ctx.stroke();

    // Draw time labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";

    const labelInterval = Math.floor(data.length / 6);
    data.forEach((point, index) => {
      if (index % labelInterval === 0 || index === data.length - 1) {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const time = new Date(point.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        ctx.fillText(time, x, height - padding.bottom + 20);
      }
    });

    // Draw value labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * (5 - i);
      const y = padding.top + (chartHeight / 5) * i;
      ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
    }
  }, [data, color]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
