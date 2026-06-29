import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  FaChartLine,
  FaTrophy,
  FaClipboardCheck,
  FaFileAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Analytics() {
  // 1. All state and hooks must go inside the component at the top
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/interview/analytics"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 2. Early return for loading state happens before the main return
  if (!data) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "30px",
        }}
      >
        Loading Analytics...
      </div>
    </div>
  );
}

  // 3. Define variables that rely on state BEFORE the main return
  const chartData = [
    {
      interview: "1",
      score: Math.max(data.average_score - 2, 0),
    },
    {
      interview: "2",
      score: Math.max(data.average_score - 1, 0),
    },
    {
      interview: "3",
      score: data.average_score,
    },
    {
      interview: "4",
      score: Math.max(data.highest_score - 1, 0),
    },
    {
      interview: "5",
      score: data.highest_score,
    },
  ];

  // 4. Finally, the main return statement rendering the UI
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "900",
            marginBottom: "10px",
            background: "linear-gradient(90deg,#ffffff,#60a5fa,#22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          📊 Analytics Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Monitor your interview performance and AI evaluation statistics.
        </p>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <StatCard
            icon={<FaClipboardCheck />}
            title="Interviews"
            value={data.total_interviews}
            color="#3b82f6"
          />

          <StatCard
            icon={<FaChartLine />}
            title="Average Score"
            value={data.average_score}
            color="#22c55e"
          />

          <StatCard
            icon={<FaTrophy />}
            title="Highest Score"
            value={data.highest_score}
            color="#f59e0b"
          />

          <StatCard
            icon={<FaFileAlt />}
            title="Reports"
            value={data.total_interviews} // Note: you are using total_interviews for reports here too
            color="#8b5cf6"
          />
        </div>

        {/* Interview Trend */}
        <div
          style={{
            background: "rgba(255,255,255,.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            📈 Interview Score Trend
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="interview" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// 5. Separate components should be defined cleanly outside
function StatCard({ icon, title, value, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "20px",
        padding: "25px",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = `0 0 30px ${color}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          fontSize: "40px",
          color,
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#cbd5e1",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "10px",
          fontSize: "48px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default Analytics;