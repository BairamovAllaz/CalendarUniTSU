import React, { useState } from "react";
import ReactDOM from 'react-dom/client';

function WeekDaysGrid() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "6px",
      width: "280px",
      textAlign: "center",
      padding: "10px"
    }}>
      {days.map(day => (
        <div
          key={day}
          onClick={() => setSelectedDay(day)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: selectedDay === day ? "#007bff" : "#f9f9f9",
            color: selectedDay === day ? "white" : "black",
            cursor: "pointer"
          }}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default function mountWeekDaysGrid() { 
    const container = document.createElement("div");
    container.id = "weekdays-widget";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.zIndex = 9999;
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);
    root.render(<WeekDaysGrid />);
}