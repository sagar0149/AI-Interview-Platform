import React from "react";
import Sidebar from "../components/Sidebar";

function Reports() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
      }}
    >
      {/* Sidebar added here */}
      <Sidebar />

      {/* Main Content Wrapper with margin-left to accommodate the Sidebar */}
      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          📄 Interview Reports
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Download and review your AI-generated interview reports here.
        </p>

        {/* Placeholder container for your future reports list/table */}
        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2>Available Reports</h2>
          <p
            style={{
              marginTop: "15px",
              color: "#cbd5e1",
              lineHeight: "1.5",
            }}
          >
            No reports available yet. Complete an AI mock interview to generate and download your first report.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reports;