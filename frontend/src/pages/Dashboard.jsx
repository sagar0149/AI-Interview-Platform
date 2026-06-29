import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaFileAlt,
  FaMicrophone,
  FaChartBar,
  FaFilePdf,
  FaUserCircle,
  FaSearch,
  FaBell,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  
  // States for dynamic user data
  const [username, setUsername] = useState("User");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // 1. Try to get data from local storage first (set during login)
    const storedUsername = localStorage.getItem("username");
    const storedFullName = localStorage.getItem("full_name") || localStorage.getItem("name");
    
    if (storedUsername) setUsername(storedUsername);
    if (storedFullName) setFullName(storedFullName);

    // 2. Fetch fresh data from the backend
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (token) {
          const response = await axios.get("http://127.0.0.1:8000/profile/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Update based on your actual database column names
          if (response.data.username) setUsername(response.data.username);
          
          // Assuming your backend sends 'full_name' or 'name'
          if (response.data.full_name || response.data.name) {
            setFullName(response.data.full_name || response.data.name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <div
          style={{
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 40px",
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ position: "relative" }}>
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            />
            <input
              placeholder="Search reports, interviews..."
              style={{
                width: "350px",
                padding: "12px 15px 12px 45px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "white",
                outline: "none",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.background = "rgba(255,255,255,0.08)";
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.background = "rgba(255,255,255,0.03)";
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <FaBell
              size={20}
              style={{ color: "#94a3b8", cursor: "pointer", transition: "0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            />
            <div
              onClick={() => navigate("/profile")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: "20px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ textAlign: "right" }}>
                {/* DISPLAY FULL NAME ON TOP, USERNAME BELOW */}
                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                  {fullName || username} 
                </div>
                {fullName && (
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    @{username}
                  </div>
                )}
              </div>
              
              {/* AVATAR USES FULL NAME FOR INITIALS */}
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username)}&background=60a5fa&color=fff`} 
                alt="Profile Avatar" 
                style={{ width: "38px", height: "38px", borderRadius: "50%" }} 
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "40px", position: "relative" }}>
          {/* Ambient Glow background element */}
          <div
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
              top: "-150px",
              left: "100px",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Hero Section */}
          <div style={{ 
            position: "relative", 
            zIndex: 1, 
            background: "linear-gradient(90deg, #1e3a8a 0%, #172554 100%)", 
            borderRadius: "24px", 
            padding: "40px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            marginBottom: "50px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)"
          }}>
            <div style={{ maxWidth: "65%" }}>
              <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "15px", display: "flex", alignItems: "center", gap: "15px" }}>
                Land Your Dream Job 🚀
              </h1>
              <p style={{ fontSize: "16px", color: "#dbeafe", marginBottom: "30px", lineHeight: "1.6" }}>
                Master your next interview with AI-driven insights, resume optimization, and real-time performance tracking.
              </p>
              <button 
                onClick={() => navigate("/resume")}
                style={{ 
                  padding: "12px 24px", 
                  borderRadius: "8px", 
                  border: "none", 
                  background: "#60a5fa", 
                  color: "white", 
                  fontWeight: "600", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px"
                }}
              >
                Start Your Journey →
              </button>
            </div>
            
            {/* Robot Illustration */}
            <div style={{ fontSize: "120px", marginRight: "20px" }}>🤖</div>
          </div>

          {/* Stats Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
              marginBottom: "50px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <GlassCard title="Average ATS Score" value="87%" accentColor="#22c55e" />
            <GlassCard title="Completed Interviews" value="12" accentColor="#3b82f6" />
            <GlassCard title="Generated Reports" value="8" accentColor="#8b5cf6" />
          </div>

          {/* Quick Actions & Activity Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr",
              gap: "30px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Quick Actions */}
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "600" }}>
                Quick Actions
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px",
                }}
              >
                <ActionCard icon={<FaFileAlt />} title="Upload Resume" desc="Check your ATS score" onClick={() => navigate("/resume")} />
                <ActionCard icon={<FaMicrophone />} title="AI Interview" desc="Practice with voice AI" onClick={() => navigate("/voice-interview")} />
                <ActionCard icon={<FaChartBar />} title="Analytics" desc="View performance stats" onClick={() => navigate("/analytics")} />
                <ActionCard icon={<FaFilePdf />} title="Reports" desc="Download past feedback" onClick={() => navigate("/reports")} />
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "600" }}>
                Recent Activity
              </h2>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  padding: "25px",
                  height: "calc(100% - 60px)", 
                }}
              >
                <ActivityItem text="Resume Evaluated (Google SWE)" time="2 hours ago" color="#22c55e" isLast={false} />
                <ActivityItem text="Completed Mock Interview" time="Yesterday" color="#3b82f6" isLast={false} />
                <ActivityItem text="Report Downloaded" time="2 days ago" color="#8b5cf6" isLast={false} />
                <ActivityItem text="Account Created" time="1 week ago" color="#64748b" isLast={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function GlassCard({ title, value, accentColor }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          background: accentColor,
        }}
      />
      <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "500", marginBottom: "15px" }}>
        {title}
      </h3>
      <h1 style={{ color: "white", fontSize: "48px", fontWeight: "700" }}>{value}</h1>
    </div>
  );
}

function ActionCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "25px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(96, 165, 250, 0.4)";
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "14px",
          background: "rgba(59, 130, 246, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          color: "#60a5fa",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "18px", color: "white", marginBottom: "5px" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#94a3b8" }}>{desc}</p>
    </div>
  );
}

function ActivityItem({ text, time, color, isLast }) {
  return (
    <div style={{ display: "flex", gap: "15px", position: "relative", paddingBottom: isLast ? "0" : "25px" }}>
      {/* Timeline Line */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            left: "6px",
            top: "20px",
            bottom: "0",
            width: "2px",
            background: "rgba(255,255,255,0.05)",
          }}
        />
      )}
      
      {/* Timeline Dot */}
      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: color,
          border: "3px solid #0f172a",
          position: "relative",
          zIndex: 2,
          marginTop: "4px",
          flexShrink: 0,
        }}
      />
      
      {/* Content */}
      <div>
        <div style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: "500" }}>{text}</div>
        <div style={{ color: "#64748b", fontSize: "13px", marginTop: "3px" }}>{time}</div>
      </div>
    </div>
  );
}

export default Dashboard;