import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaFileAlt,
  FaMicrophone,
  FaChartBar,
  FaFilePdf,
  FaSearch,
  FaBell,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("User");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedFullName =
      localStorage.getItem("full_name") ||
      localStorage.getItem("name");

    if (storedUsername) setUsername(storedUsername);
    if (storedFullName) setFullName(storedFullName);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "/api/profile/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.username) {
            setUsername(response.data.username);
          }

          if (
            response.data.full_name ||
            response.data.name
          ) {
            setFullName(
              response.data.full_name ||
                response.data.name
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch user profile",
          error
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-page">

      {/* Animated background */}
      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>
      <div className="background-grid"></div>

      <Sidebar />

      <div className="dashboard-wrapper">

        {/* ================= NAVBAR ================= */}

        <div className="dashboard-navbar">

          <div className="search-container">
            <FaSearch className="search-icon" />

            <input
              placeholder="Search reports, interviews..."
              className="search-input"
            />
          </div>

          <div className="navbar-right">

            <FaBell
              className="notification-icon"
            />

            <div
              className="profile-mini"
              onClick={() =>
                navigate("/profile")
              }
            >
              <div className="profile-text">

                <div className="profile-name">
                  {fullName || username}
                </div>

                {fullName && (
                  <div className="profile-username">
                    @{username}
                  </div>
                )}

              </div>

              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  fullName || username
                )}&background=60a5fa&color=fff`}
                alt="Profile Avatar"
                className="profile-avatar"
              />
            </div>

          </div>

        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="dashboard-content">

          {/* Ambient glow */}
          <div className="ambient-glow"></div>

          {/* ================= HERO ================= */}

          <div className="hero-section">

            <div className="hero-content">

              <div className="hero-badge">
                <span className="pulse-dot"></span>
                AI POWERED INTERVIEW PLATFORM
              </div>

              <h1>
                Land Your
                <span>Dream Job</span>
              </h1>

              <p>
                Master your next interview with
                AI-driven insights, resume
                optimization, and real-time
                performance tracking.
              </p>

              <button
                onClick={() =>
                  navigate("/resume")
                }
                className="journey-button"
              >
                Start Your Journey
                <span>→</span>
              </button>

            </div>

            {/* Animated decorative element */}
            <div className="hero-animation">

              <div className="hero-circle circle-one"></div>
              <div className="hero-circle circle-two"></div>
              <div className="hero-circle circle-three"></div>

              <div className="hero-center">
                AI
              </div>

              <div className="floating-dot dot-one"></div>
              <div className="floating-dot dot-two"></div>
              <div className="floating-dot dot-three"></div>

            </div>

          </div>

          {/* ================= STATS ================= */}

          <div className="stats-section">

            <GlassCard
              title="Average ATS Score"
              value="87%"
              accentColor="#22c55e"
              delay="0.1s"
            />

            <GlassCard
              title="Completed Interviews"
              value="12"
              accentColor="#3b82f6"
              delay="0.2s"
            />

            <GlassCard
              title="Generated Reports"
              value="8"
              accentColor="#8b5cf6"
              delay="0.3s"
            />

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="dashboard-grid">

            <div>

              <h2 className="section-title">
                Quick Actions
              </h2>

              <div className="action-grid">

                <ActionCard
                  icon={<FaFileAlt />}
                  title="Upload Resume"
                  desc="Check your ATS score"
                  onClick={() =>
                    navigate("/resume")
                  }
                  delay="0.1s"
                />

                <ActionCard
                  icon={<FaMicrophone />}
                  title="AI Interview"
                  desc="Practice with voice AI"
                  onClick={() =>
                    navigate("/voice-interview")
                  }
                  delay="0.2s"
                />

                <ActionCard
                  icon={<FaChartBar />}
                  title="Analytics"
                  desc="View performance stats"
                  onClick={() =>
                    navigate("/analytics")
                  }
                  delay="0.3s"
                />

                <ActionCard
                  icon={<FaFilePdf />}
                  title="Reports"
                  desc="Download past feedback"
                  onClick={() =>
                    navigate("/reports")
                  }
                  delay="0.4s"
                />

              </div>

            </div>

            {/* ================= ACTIVITY ================= */}

            <div>

              <h2 className="section-title">
                Recent Activity
              </h2>

              <div className="activity-card">

                <ActivityItem
                  text="Resume Evaluated (Google SWE)"
                  time="2 hours ago"
                  color="#22c55e"
                  isLast={false}
                  delay="0.1s"
                />

                <ActivityItem
                  text="Completed Mock Interview"
                  time="Yesterday"
                  color="#3b82f6"
                  isLast={false}
                  delay="0.2s"
                />

                <ActivityItem
                  text="Report Downloaded"
                  time="2 days ago"
                  color="#8b5cf6"
                  isLast={false}
                  delay="0.3s"
                />

                <ActivityItem
                  text="Account Created"
                  time="1 week ago"
                  color="#64748b"
                  isLast={true}
                  delay="0.4s"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= ANIMATION CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          background: #020617;
        }

        /* =====================================
           MAIN PAGE
        ===================================== */

        .dashboard-page {
          min-height: 100vh;

          background:
            linear-gradient(
              135deg,
              #020617 0%,
              #0f172a 50%,
              #1e3a8a 100%
            );

          color: white;

          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          position: relative;

          overflow-x: hidden;
        }

        /* =====================================
           BACKGROUND
        ===================================== */

        .background-orb {
          position: fixed;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(100px);

          opacity: 0.16;

          z-index: 0;
        }

        .orb-one {
          width: 450px;
          height: 450px;

          background: #2563eb;

          top: 5%;
          left: 20%;

          animation:
            floatOrb
            12s
            ease-in-out
            infinite;
        }

        .orb-two {
          width: 400px;
          height: 400px;

          background: #7c3aed;

          right: 0;
          bottom: 0;

          animation:
            floatOrbReverse
            15s
            ease-in-out
            infinite;
        }

        @keyframes floatOrb {

          0% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                70px,
                50px
              );
          }

          100% {
            transform:
              translate(
                0,
                0
              );
          }

        }

        @keyframes floatOrbReverse {

          0% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                -60px,
                -40px
              );
          }

          100% {
            transform:
              translate(
                0,
                0
              );
          }

        }

        .background-grid {
          position: fixed;

          inset: 0;

          pointer-events: none;

          opacity: 0.035;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.5
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.5
              ) 1px,
              transparent 1px
            );

          background-size:
            50px 50px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );

          z-index: 0;
        }

        /* =====================================
           WRAPPER
        ===================================== */

        .dashboard-wrapper {
          margin-left: 260px;

          display: flex;

          flex-direction: column;

          position: relative;

          z-index: 1;
        }

        /* =====================================
           NAVBAR
        ===================================== */

        .dashboard-navbar {
          height: 80px;

          display: flex;

          justify-content:
            space-between;

          align-items: center;

          padding:
            0
            40px;

          background:
            rgba(
              15,
              23,
              42,
              0.4
            );

          backdrop-filter:
            blur(20px);

          border-bottom:
            1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );

          position: sticky;

          top: 0;

          z-index: 100;

          animation:
            navbarAppear
            0.7s
            ease
            both;
        }

        @keyframes navbarAppear {

          from {
            opacity: 0;

            transform:
              translateY(
                -15px
              );
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        /* SEARCH */

        .search-container {
          position: relative;
        }

        .search-icon {
          position: absolute;

          top: 50%;
          left: 15px;

          transform:
            translateY(
              -50%
            );

          color: #64748b;

          transition:
            color
            0.3s ease;
        }

        .search-container:focus-within
          .search-icon {
          color: #60a5fa;
        }

        .search-input {
          width: 350px;

          padding:
            12px
            15px
            12px
            45px;

          border-radius: 20px;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.08
              );

          background:
            rgba(
              255,
              255,
              255,
              0.03
            );

          color: white;

          outline: none;

          font-size: 14px;

          transition:
            all
            0.3s ease;
        }

        .search-input:focus {
          background:
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-color:
            rgba(
              96,
              165,
              250,
              0.5
            );

          box-shadow:
            0 0 20px
              rgba(
                59,
                130,
                246,
                0.1
              );

          transform:
            scale(
              1.01
            );
        }

        /* NAV RIGHT */

        .navbar-right {
          display: flex;

          align-items: center;

          gap: 25px;
        }

        .notification-icon {
          color: #94a3b8;

          cursor: pointer;

          transition:
            all
            0.25s ease;
        }

        .notification-icon:hover {
          color: white;

          transform:
            translateY(
              -2px
            )
            rotate(
              -8deg
            );
        }

        .profile-mini {
          display: flex;

          align-items: center;

          gap: 12px;

          cursor: pointer;

          padding:
            5px
            10px;

          border-radius: 20px;

          transition:
            all
            0.3s ease;
        }

        .profile-mini:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          transform:
            translateY(
              -2px
            );
        }

        .profile-text {
          text-align: right;
        }

        .profile-name {
          font-size: 14px;

          font-weight: 600;
        }

        .profile-username {
          font-size: 12px;

          color: #94a3b8;
        }

        .profile-avatar {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          border:
            2px solid
              rgba(
                96,
                165,
                250,
                0.4
              );

          transition:
            all
            0.3s ease;
        }

        .profile-mini:hover
          .profile-avatar {
          border-color:
            #60a5fa;

          box-shadow:
            0 0 15px
              rgba(
                96,
                165,
                250,
                0.35
              );

          transform:
            scale(
              1.06
            );
        }

        /* =====================================
           CONTENT
        ===================================== */

        .dashboard-content {
          padding: 40px;

          position: relative;
        }

        .ambient-glow {
          position: absolute;

          width: 600px;
          height: 600px;

          background:
            radial-gradient(
              circle,
              rgba(
                59,
                130,
                246,
                0.15
              ),
              transparent 70%
            );

          top: -150px;
          left: 100px;

          z-index: 0;

          pointer-events: none;

          animation:
            ambientPulse
            8s
            ease-in-out
            infinite;
        }

        @keyframes ambientPulse {

          0%,
          100% {
            opacity: 0.6;

            transform:
              scale(
                1
              );
          }

          50% {
            opacity: 1;

            transform:
              scale(
                1.1
              );
          }

        }

        /* =====================================
           HERO
        ===================================== */

        .hero-section {
          position: relative;

          z-index: 1;

          min-height: 260px;

          background:
            linear-gradient(
              90deg,
              #1e3a8a 0%,
              #172554 100%
            );

          border-radius: 24px;

          padding: 40px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin-bottom: 50px;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.1
              );

          box-shadow:
            0 10px 25px -5px
              rgba(
                0,
                0,
                0,
                0.3
              );

          overflow: hidden;

          animation:
            heroAppear
            0.9s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;
        }

        @keyframes heroAppear {

          from {
            opacity: 0;

            transform:
              translateY(
                30px
              )
              scale(
                0.97
              );
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }

        .hero-section::before {
          content: "";

          position: absolute;

          width: 500px;
          height: 500px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                96,
                165,
                250,
                0.15
              ),
              transparent
            );

          right: -180px;

          top: -200px;

          animation:
            heroGlow
            6s
            ease-in-out
            infinite;
        }

        @keyframes heroGlow {

          0%,
          100% {
            transform:
              scale(
                1
              );
          }

          50% {
            transform:
              scale(
                1.25
              );
          }

        }

        .hero-content {
          max-width: 65%;

          position: relative;

          z-index: 3;

          animation:
            heroText
            1s
            0.15s
            ease
            both;
        }

        @keyframes heroText {

          from {
            opacity: 0;

            transform:
              translateX(
                -25px
              );
          }

          to {
            opacity: 1;

            transform:
              translateX(0);
          }

        }

        .hero-badge {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color: #93c5fd;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 2px;

          margin-bottom: 12px;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #60a5fa;

          box-shadow:
            0 0 10px
              #60a5fa;

          animation:
            pulse
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes pulse {

          0%,
          100% {
            opacity: 1;

            transform:
              scale(
                1
              );
          }

          50% {
            opacity: 0.4;

            transform:
              scale(
                1.5
              );
          }

        }

        .hero-content h1 {
          font-size: 48px;

          font-weight: 800;

          margin:
            0
            0
            15px;

          line-height: 1.1;

          letter-spacing: -1.5px;
        }

        .hero-content h1 span {
          color: #60a5fa;

          margin-left: 10px;

          text-shadow:
            0 0 25px
              rgba(
                96,
                165,
                250,
                0.25
              );
        }

        .hero-content p {
          font-size: 16px;

          color: #dbeafe;

          margin:
            0
            0
            30px;

          line-height: 1.6;

          max-width: 680px;
        }

        /* JOURNEY BUTTON */

        .journey-button {
          padding:
            12px
            24px;

          border-radius: 8px;

          border: none;

          background: #60a5fa;

          color: white;

          font-weight: 600;

          cursor: pointer;

          display: flex;

          align-items: center;

          gap: 8px;

          font-size: 14px;

          transition:
            all
            0.3s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            );

          box-shadow:
            0 8px 20px
              rgba(
                37,
                99,
                235,
                0.2
              );
        }

        .journey-button:hover {
          transform:
            translateY(
              -3px
            );

          background: #93c5fd;

          color: #172554;

          box-shadow:
            0 12px 30px
              rgba(
                96,
                165,
                250,
                0.35
              );
        }

        .journey-button span {
          font-size: 19px;

          transition:
            transform
            0.3s ease;
        }

        .journey-button:hover
          span {
          transform:
            translateX(
              5px
            );
        }

        /* =====================================
           HERO ANIMATION
        ===================================== */

        .hero-animation {
          width: 210px;
          height: 210px;

          position: relative;

          margin-right: 30px;

          display: flex;

          align-items: center;

          justify-content: center;

          animation:
            heroVisual
            1.2s
            0.3s
            ease
            both;
        }

        @keyframes heroVisual {

          from {
            opacity: 0;

            transform:
              translateX(
                30px
              )
              scale(
                0.8
              );
          }

          to {
            opacity: 1;

            transform:
              translateX(0)
              scale(1);
          }

        }

        .hero-circle {
          position: absolute;

          border-radius: 50%;

          border:
            1px solid
              rgba(
                147,
                197,
                253,
                0.3
              );
        }

        .circle-one {
          width: 190px;
          height: 190px;

          animation:
            rotateCircle
            15s
            linear
            infinite;
        }

        .circle-two {
          width: 135px;
          height: 135px;

          border-style: dashed;

          animation:
            rotateCircleReverse
            10s
            linear
            infinite;
        }

        .circle-three {
          width: 80px;
          height: 80px;

          border-color:
            rgba(
              96,
              165,
              250,
              0.6
            );

          box-shadow:
            0 0 30px
              rgba(
                96,
                165,
                250,
                0.12
              );

          animation:
            circlePulse
            3s
            ease-in-out
            infinite;
        }

        @keyframes rotateCircle {

          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }

        }

        @keyframes rotateCircleReverse {

          from {
            transform:
              rotate(360deg);
          }

          to {
            transform:
              rotate(0deg);
          }

        }

        @keyframes circlePulse {

          0%,
          100% {
            transform:
              scale(
                1
              );
          }

          50% {
            transform:
              scale(
                1.12
              );
          }

        }

        .hero-center {
          width: 55px;
          height: 55px;

          border-radius: 50%;

          display: flex;

          align-items: center;

          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #60a5fa,
              #2563eb
            );

          color: white;

          font-size: 17px;

          font-weight: 800;

          box-shadow:
            0 0 30px
              rgba(
                96,
                165,
                250,
                0.4
              );

          z-index: 5;

          animation:
            centerFloat
            3s
            ease-in-out
            infinite;
        }

        @keyframes centerFloat {

          0%,
          100% {
            transform:
              translateY(
                0
              );
          }

          50% {
            transform:
              translateY(
                -8px
              );
          }

        }

        .floating-dot {
          position: absolute;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #93c5fd;

          box-shadow:
            0 0 12px
              #60a5fa;
        }

        .dot-one {
          top: 10px;
          right: 35px;

          animation:
            orbitOne
            5s
            linear
            infinite;
        }

        .dot-two {
          bottom: 20px;
          left: 30px;

          animation:
            orbitTwo
            6s
            linear
            infinite;
        }

        .dot-three {
          top: 90px;
          right: 5px;

          animation:
            dotPulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes orbitOne {

          0% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                -30px,
                35px
              );
          }

          100% {
            transform:
              translate(
                0,
                0
              );
          }

        }

        @keyframes orbitTwo {

          0% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                35px,
                -25px
              );
          }

          100% {
            transform:
              translate(
                0,
                0
              );
          }

        }

        @keyframes dotPulse {

          0%,
          100% {
            opacity: 0.4;

            transform:
              scale(
                1
              );
          }

          50% {
            opacity: 1;

            transform:
              scale(
                1.5
              );
          }

        }

        /* =====================================
           STATS
        ===================================== */

        .stats-section {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(
                280px,
                1fr
              )
            );

          gap: 25px;

          margin-bottom: 50px;

          position: relative;

          z-index: 1;
        }

        /* =====================================
           GLASS CARD
        ===================================== */

        .glass-card {
          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.05
              ),
              rgba(
                255,
                255,
                255,
                0.01
              )
            );

          backdrop-filter:
            blur(20px);

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.08
              );

          border-radius: 24px;

          padding: 30px;

          position: relative;

          overflow: hidden;

          opacity: 0;

          animation:
            cardAppear
            0.7s
            var(--delay)
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            forwards;

          transition:
            transform
            0.3s ease,
            border-color
            0.3s ease,
            box-shadow
            0.3s ease;
        }

        .glass-card:hover {
          transform:
            translateY(
              -7px
            );

          border-color:
            rgba(
              96,
              165,
              250,
              0.25
            );

          box-shadow:
            0 20px 40px
              rgba(
                0,
                0,
                0,
                0.25
              );
        }

        @keyframes cardAppear {

          from {
            opacity: 0;

            transform:
              translateY(
                30px
              );
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        .glass-card::after {
          content: "";

          position: absolute;

          width: 150px;
          height: 150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              var(--accent),
              transparent
            );

          opacity: 0.05;

          right: -70px;
          bottom: -70px;

          transition:
            transform
            0.5s ease;
        }

        .glass-card:hover::after {
          transform:
            scale(
              1.8
            );
        }

        .glass-card-bar {
          position: absolute;

          top: 0;
          left: 0;

          width: 4px;
          height: 100%;

          border-radius:
            24px
            0
            0
            24px;
        }

        .glass-card h3 {
          color: #94a3b8;

          font-size: 16px;

          font-weight: 500;

          margin:
            0
            0
            15px;
        }

        .glass-card h1 {
          color: white;

          font-size: 48px;

          font-weight: 700;

          margin: 0;

          letter-spacing: -1px;
        }

        /* =====================================
           LOWER GRID
        ===================================== */

        .dashboard-grid {
          display: grid;

          grid-template-columns:
            2fr
            1.5fr;

          gap: 30px;

          position: relative;

          z-index: 1;
        }

        .section-title {
          font-size: 24px;

          margin:
            0
            0
            20px;

          font-weight: 600;

          animation:
            sectionAppear
            0.7s
            0.5s
            ease
            both;
        }

        @keyframes sectionAppear {

          from {
            opacity: 0;

            transform:
              translateX(
                -15px
              );
          }

          to {
            opacity: 1;

            transform:
              translateX(0);
          }

        }

        /* =====================================
           ACTION GRID
        ===================================== */

        .action-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              1fr
            );

          gap: 20px;
        }

        .action-card {
          background:
            rgba(
              255,
              255,
              255,
              0.03
            );

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.08
              );

          border-radius: 20px;

          padding: 25px;

          cursor: pointer;

          opacity: 0;

          animation:
            cardAppear
            0.7s
            var(--delay)
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            forwards;

          transition:
            all
            0.3s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            );
        }

        .action-card:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          border-color:
            rgba(
              96,
              165,
              250,
              0.4
            );

          transform:
            translateY(
              -7px
            )
            scale(
              1.01
            );

          box-shadow:
            0 15px 35px
              rgba(
                0,
                0,
                0,
                0.2
              );
        }

        .action-icon {
          width: 50px;
          height: 50px;

          border-radius: 14px;

          background:
            rgba(
              59,
              130,
              246,
              0.1
            );

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 24px;

          color: #60a5fa;

          margin-bottom: 15px;

          transition:
            all
            0.3s ease;
        }

        .action-card:hover
          .action-icon {
          transform:
            scale(
              1.1
            )
            rotate(
              -4deg
            );

          background:
            rgba(
              59,
              130,
              246,
              0.18
            );

          box-shadow:
            0 0 20px
              rgba(
                59,
                130,
                246,
                0.15
              );
        }

        .action-card h3 {
          font-size: 18px;

          color: white;

          margin:
            0
            0
            5px;
        }

        .action-card p {
          font-size: 13px;

          color: #94a3b8;

          margin: 0;
        }

        /* =====================================
           ACTIVITY
        ===================================== */

        .activity-card {
          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.05
              );

          border-radius: 20px;

          padding: 25px;

          height:
            calc(
              100%
              - 60px
            );

          backdrop-filter:
            blur(15px);

          transition:
            border-color
            0.3s ease,
            background
            0.3s ease;

          animation:
            activityAppear
            0.8s
            0.6s
            ease
            both;
        }

        .activity-card:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          border-color:
            rgba(
              96,
              165,
              250,
              0.15
            );
        }

        @keyframes activityAppear {

          from {
            opacity: 0;

            transform:
              translateX(
                25px
              );
          }

          to {
            opacity: 1;

            transform:
              translateX(0);
          }

        }

        .activity-item {
          display: flex;

          gap: 15px;

          position: relative;

          padding-bottom: 25px;

          opacity: 0;

          animation:
            activityItemAppear
            0.6s
            var(--delay)
            ease
            forwards;
        }

        @keyframes activityItemAppear {

          from {
            opacity: 0;

            transform:
              translateX(
                15px
              );
          }

          to {
            opacity: 1;

            transform:
              translateX(0);
          }

        }

        .timeline-line {
          position: absolute;

          left: 6px;

          top: 20px;

          bottom: 0;

          width: 2px;

          background:
            rgba(
              255,
              255,
              255,
              0.05
            );
        }

        .timeline-dot {
          width: 14px;
          height: 14px;

          border-radius: 50%;

          border:
            3px solid
              #0f172a;

          position: relative;

          z-index: 2;

          margin-top: 4px;

          flex-shrink: 0;

          box-shadow:
            0 0 10px
              var(--dot-color);

          animation:
            dotGlow
            2s
            ease-in-out
            infinite;
        }

        @keyframes dotGlow {

          0%,
          100% {
            box-shadow:
              0 0 5px
                var(--dot-color);
          }

          50% {
            box-shadow:
              0 0 15px
                var(--dot-color);
          }

        }

        .activity-text {
          color: #e2e8f0;

          font-size: 15px;

          font-weight: 500;
        }

        .activity-time {
          color: #64748b;

          font-size: 13px;

          margin-top: 3px;
        }

        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 1100px) {

          .dashboard-grid {
            grid-template-columns:
              1fr;
          }

          .hero-animation {
            margin-right: 0;
          }

        }

        @media (max-width: 800px) {

          .dashboard-wrapper {
            margin-left: 0;
          }

          .dashboard-navbar {
            padding:
              0
              20px;
          }

          .search-input {
            width: 240px;
          }

          .dashboard-content {
            padding: 25px;
          }

          .hero-section {
            padding: 30px;

            min-height: 0;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-animation {
            display: none;
          }

          .hero-content h1 {
            font-size: 38px;
          }

        }

        @media (max-width: 600px) {

          .dashboard-navbar {
            height: auto;

            min-height: 75px;

            gap: 15px;
          }

          .search-container {
            display: none;
          }

          .navbar-right {
            margin-left: auto;
          }

          .profile-text {
            display: none;
          }

          .dashboard-content {
            padding: 20px;
          }

          .hero-section {
            border-radius: 18px;

            padding: 25px;

            margin-bottom: 30px;
          }

          .hero-content h1 {
            font-size: 34px;
          }

          .hero-content h1 span {
            display: block;

            margin-left: 0;

            margin-top: 4px;
          }

          .hero-content p {
            font-size: 14px;
          }

          .stats-section {
            grid-template-columns:
              1fr;

            gap: 15px;

            margin-bottom: 30px;
          }

          .glass-card {
            padding: 25px;
          }

          .glass-card h1 {
            font-size: 40px;
          }

          .action-grid {
            grid-template-columns:
              1fr;
          }

          .section-title {
            font-size: 21px;
          }

          .dashboard-grid {
            gap: 35px;
          }

        }

        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration:
              0.01ms !important;

            animation-iteration-count:
              1 !important;

            scroll-behavior:
              auto !important;

            transition-duration:
              0.01ms !important;
          }

        }

      `}</style>

    </div>
  );
}

/* =================================================
   GLASS CARD
================================================= */

function GlassCard({
  title,
  value,
  accentColor,
  delay,
}) {
  return (
    <div
      className="glass-card"
      style={{
        "--delay": delay,
        "--accent": accentColor,
      }}
    >

      <div
        className="glass-card-bar"
        style={{
          background: accentColor,
        }}
      />

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
}

/* =================================================
   ACTION CARD
================================================= */

function ActionCard({
  icon,
  title,
  desc,
  onClick,
  delay,
}) {
  return (
    <div
      onClick={onClick}
      className="action-card"
      style={{
        "--delay": delay,
      }}
    >

      <div className="action-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{desc}</p>

    </div>
  );
}

/* =================================================
   ACTIVITY ITEM
================================================= */

function ActivityItem({
  text,
  time,
  color,
  isLast,
  delay,
}) {
  return (
    <div
      className="activity-item"
      style={{
        "--delay": delay,
      }}
    >

      {!isLast && (
        <div className="timeline-line"></div>
      )}

      <div
        className="timeline-dot"
        style={{
          background: color,
          "--dot-color": color,
        }}
      />

      <div>
        <div className="activity-text">
          {text}
        </div>

        <div className="activity-time">
          {time}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;