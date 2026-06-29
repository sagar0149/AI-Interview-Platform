
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

function SidebarLink({ to, children }) {
  const [hover, setHover] =
    useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() =>
        setHover(true)
      }
      onMouseLeave={() =>
        setHover(false)
      }
      style={{
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: hover
          ? "700"
          : "500",

        padding: "14px 18px",

        borderRadius: "12px",

        transition:
          "all 0.3s ease",

        background: hover
          ? "rgba(96,165,250,0.15)"
          : "transparent",

        border: hover
          ? "1px solid rgba(96,165,250,0.5)"
          : "1px solid transparent",

        transform: hover
          ? "translateX(8px)"
          : "translateX(0px)",

        boxShadow: hover
          ? "0 0 20px rgba(96,165,250,0.35)"
          : "none",
      }}
    >
      {children}
    </Link>
  );
}

function Sidebar() {

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div
      style={{
        width: "260px",

        background:
          "linear-gradient(180deg,#020617,#081229,#020617)",

        height: "100vh",

        padding: "30px",

        color: "white",

        position: "fixed",

        left: 0,

        top: 0,

        borderRight:
          "1px solid rgba(96,165,250,0.2)",

        boxShadow:
          "5px 0 30px rgba(0,0,0,0.4)",

        display: "flex",

        flexDirection: "column",

        justifyContent:
          "space-between",
      }}
    >
      <div>
        <Link
          to="/dashboard"
          style={{
            marginBottom: "40px",

            color: "#60a5fa",

            textDecoration:
              "none",

            fontSize: "32px",

            fontWeight: "bold",

            display: "block",
          }}
        >
          AI Interview
        </Link>

        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "15px",
          }}
        >
          <SidebarLink to="/dashboard">
            Dashboard
          </SidebarLink>

          <SidebarLink to="/resume-builder">
            Resume Builder
          </SidebarLink>

          <SidebarLink to="/resume">
            Resume Analyzer
          </SidebarLink>

          <SidebarLink to="/interview">
            Mock Interview
          </SidebarLink>

          <SidebarLink to="/video-interview">
            Video Interview
          </SidebarLink>

          <SidebarLink to="/analytics">
            Analytics
          </SidebarLink>

          <SidebarLink to="/reports">
            Reports
          </SidebarLink>

          <SidebarLink to="/profile">
            Profile
          </SidebarLink>
        </div>
      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        style={{
          padding: "14px",

          width: "100%",

          background:
            "linear-gradient(90deg,#ef4444,#dc2626)",

          border: "none",

          borderRadius: "12px",

          color: "white",

          fontWeight: "bold",

          cursor: "pointer",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "center",

          gap: "10px",

          fontSize: "16px",
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
