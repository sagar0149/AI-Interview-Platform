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

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedFullName) {
      setFullName(storedFullName);
    }

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

      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      <div className="background-noise"></div>

      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>

      <div className="grid-background"></div>

      <div className="floating-particle particle-1"></div>
      <div className="floating-particle particle-2"></div>
      <div className="floating-particle particle-3"></div>
      <div className="floating-particle particle-4"></div>
      <div className="floating-particle particle-5"></div>

      <Sidebar />

      <div className="dashboard-wrapper">

        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <div className="dashboard-navbar">

          <div className="search-container">

            <FaSearch className="search-icon" />

            <input
              placeholder="Search reports, interviews..."
              className="search-input"
            />

          </div>

          <div className="navbar-right">

            <div className="notification-wrapper">
              <FaBell className="notification-icon" />

              <span className="notification-dot"></span>
            </div>

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
                )}&background=16b8ac&color=fff`}
                alt="Profile Avatar"
                className="profile-avatar"
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="dashboard-content">

          <div className="ambient-light"></div>

          {/* =================================================
              HERO SECTION
          ================================================= */}

          <section className="hero-section">

            <div className="hero-shine"></div>

            <div className="hero-content">

              <div className="hero-label">

                <span className="status-pulse"></span>

                AI-POWERED INTERVIEW PLATFORM

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
                className="journey-button"
                onClick={() =>
                  navigate("/resume")
                }
              >

                <span>
                  Start Your Journey
                </span>

                <span className="arrow">
                  →
                </span>

              </button>

            </div>

            {/* =================================================
                HERO ANIMATION
            ================================================= */}

            <div className="hero-visual">

              <div className="orbit orbit-1"></div>

              <div className="orbit orbit-2"></div>

              <div className="orbit orbit-3"></div>

              <div className="orbit-dot orbit-dot-1"></div>

              <div className="orbit-dot orbit-dot-2"></div>

              <div className="orbit-dot orbit-dot-3"></div>

              <div className="ai-core">

                <div className="core-inner">
                  AI
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="stats-section">

            <GlassCard
              title="Average ATS Score"
              value="87%"
              accentColor="#22c55e"
              icon="↗"
              delay="0.1s"
            />

            <GlassCard
              title="Completed Interviews"
              value="12"
              accentColor="#19d6ca"
              icon="✓"
              delay="0.2s"
            />

            <GlassCard
              title="Generated Reports"
              value="8"
              accentColor="#8b5cf6"
              icon="◈"
              delay="0.3s"
            />

          </div>

          {/* =================================================
              QUICK ACTIONS + ACTIVITY
          ================================================= */}

          <div className="dashboard-grid">

            {/* ================= QUICK ACTIONS ================= */}

            <div>

              <div className="section-heading">

                <div>
                  <span className="section-label">
                    TOOLS
                  </span>

                  <h2>
                    Quick Actions
                  </h2>
                </div>

                <div className="heading-line"></div>

              </div>

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

            {/* ================= RECENT ACTIVITY ================= */}

            <div>

              <div className="section-heading">

                <div>
                  <span className="section-label">
                    TIMELINE
                  </span>

                  <h2>
                    Recent Activity
                  </h2>
                </div>

                <div className="heading-line"></div>

              </div>

              <div className="activity-card">

                <div className="activity-glow"></div>

                <ActivityItem
                  text="Resume Evaluated (Google SWE)"
                  time="2 hours ago"
                  color="#22c55e"
                  isLast={false}
                  delay="0.2s"
                />

                <ActivityItem
                  text="Completed Mock Interview"
                  time="Yesterday"
                  color="#19d6ca"
                  isLast={false}
                  delay="0.3s"
                />

                <ActivityItem
                  text="Report Downloaded"
                  time="2 days ago"
                  color="#8b5cf6"
                  isLast={false}
                  delay="0.4s"
                />

                <ActivityItem
                  text="Account Created"
                  time="1 week ago"
                  color="#64748b"
                  isLast={true}
                  delay="0.5s"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

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
          background: #020707;
        }

        /* =================================================
           MAIN PAGE
        ================================================= */

        .dashboard-page {

          min-height: 100vh;

          position: relative;

          overflow-x: hidden;

          color: #f2f7f6;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          background:

            radial-gradient(
              circle at 50% 20%,
              rgba(
                0,
                220,
                200,
                0.07
              ),
              transparent 35%
            ),

            linear-gradient(
              180deg,
              #020708 0%,
              #061314 48%,
              #020707 100%
            );
        }

        /* =================================================
           BACKGROUND GRID
        ================================================= */

        .grid-background {

          position: fixed;

          inset: 0;

          pointer-events: none;

          z-index: 0;

          opacity: 0.025;

          background-image:

            linear-gradient(
              rgba(
                40,
                220,
                205,
                0.8
              ) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(
                40,
                220,
                205,
                0.8
              ) 1px,
              transparent 1px
            );

          background-size:
            55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );
        }

        /* =================================================
           BACKGROUND GLOWS
        ================================================= */

        .glow-orb {

          position: fixed;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(120px);

          z-index: 0;
        }

        .glow-orb-1 {

          width: 500px;
          height: 500px;

          background:
            rgba(
              0,
              220,
              200,
              0.09
            );

          top: -150px;
          left: 15%;

          animation:
            moveGlow1
            13s
            ease-in-out
            infinite;
        }

        .glow-orb-2 {

          width: 450px;
          height: 450px;

          background:
            rgba(
              0,
              150,
              140,
              0.07
            );

          right: -150px;
          top: 35%;

          animation:
            moveGlow2
            16s
            ease-in-out
            infinite;
        }

        .glow-orb-3 {

          width: 400px;
          height: 400px;

          background:
            rgba(
              40,
              90,
              255,
              0.05
            );

          left: 20%;
          bottom: -200px;

          animation:
            moveGlow3
            18s
            ease-in-out
            infinite;
        }

        @keyframes moveGlow1 {

          0%,
          100% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                80px,
                60px
              );
          }

        }

        @keyframes moveGlow2 {

          0%,
          100% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                -70px,
                50px
              );
          }

        }

        @keyframes moveGlow3 {

          0%,
          100% {
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
                -50px
              );
          }

        }

        /* =================================================
           PARTICLES
        ================================================= */

        .floating-particle {

          position: fixed;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 12px
              rgba(
                25,
                214,
                202,
                0.8
              );

          opacity: 0.4;

          pointer-events: none;

          z-index: 1;
        }

        .particle-1 {

          top: 20%;
          left: 30%;

          animation:
            particleFloat
            7s
            ease-in-out
            infinite;
        }

        .particle-2 {

          top: 65%;
          left: 12%;

          animation:
            particleFloat
            9s
            1s
            ease-in-out
            infinite;
        }

        .particle-3 {

          top: 35%;
          right: 15%;

          animation:
            particleFloat
            8s
            2s
            ease-in-out
            infinite;
        }

        .particle-4 {

          bottom: 15%;
          right: 25%;

          animation:
            particleFloat
            10s
            1.5s
            ease-in-out
            infinite;
        }

        .particle-5 {

          top: 50%;
          right: 40%;

          animation:
            particleFloat
            6s
            3s
            ease-in-out
            infinite;
        }

        @keyframes particleFloat {

          0%,
          100% {

            transform:
              translate(
                0,
                0
              );

            opacity: 0.2;
          }

          50% {

            transform:
              translate(
                30px,
                -40px
              );

            opacity: 0.8;
          }

        }

        /* =================================================
           WRAPPER
        ================================================= */

        .dashboard-wrapper {

          margin-left: 260px;

          display: flex;

          flex-direction: column;

          position: relative;

          z-index: 2;
        }

        /* =================================================
           NAVBAR
        ================================================= */

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
              4,
              14,
              15,
              0.65
            );

          backdrop-filter:
            blur(25px);

          border-bottom:
            1px solid
              rgba(
                255,
                255,
                255,
                0.06
              );

          position: sticky;

          top: 0;

          z-index: 100;

          animation:
            navbarEnter
            0.8s
            ease
            both;
        }

        @keyframes navbarEnter {

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

        /* =================================================
           SEARCH
        ================================================= */

        .search-container {

          position: relative;
        }

        .search-icon {

          position: absolute;

          left: 16px;

          top: 50%;

          transform:
            translateY(
              -50%
            );

          color: #607370;

          transition:
            color
            0.3s ease;
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
              0.035
            );

          color: white;

          outline: none;

          font-size: 14px;

          transition:
            all
            0.3s ease;
        }

        .search-input::placeholder {

          color: #657572;
        }

        .search-input:focus {

          background:
            rgba(
              20,
              40,
              40,
              0.75
            );

          border-color:
            rgba(
              25,
              214,
              202,
              0.5
            );

          box-shadow:
            0 0 0 3px
              rgba(
                25,
                214,
                202,
                0.06
              );

          width: 370px;
        }

        .search-container:focus-within
          .search-icon {

          color: #19d6ca;
        }

        /* =================================================
           NAVBAR RIGHT
        ================================================= */

        .navbar-right {

          display: flex;

          align-items: center;

          gap: 25px;
        }

        .notification-wrapper {

          position: relative;

          cursor: pointer;
        }

        .notification-icon {

          color: #7d8e8b;

          font-size: 19px;

          transition:
            all
            0.3s ease;
        }

        .notification-wrapper:hover
          .notification-icon {

          color: #19d6ca;

          transform:
            rotate(
              -8deg
            )
            scale(
              1.1
            );
        }

        .notification-dot {

          position: absolute;

          top: -3px;
          right: -3px;

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 8px
              #19d6ca;

          animation:
            notificationPulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes notificationPulse {

          0%,
          100% {
            transform:
              scale(
                1
              );

            opacity: 1;
          }

          50% {
            transform:
              scale(
                1.6
              );

            opacity: 0.5;
          }

        }

        /* =================================================
           PROFILE
        ================================================= */

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
              25,
              214,
              202,
              0.05
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

          color: #e7f1ef;
        }

        .profile-username {

          font-size: 12px;

          color: #71817f;
        }

        .profile-avatar {

          width: 38px;
          height: 38px;

          border-radius: 50%;

          border:
            2px solid
              rgba(
                25,
                214,
                202,
                0.4
              );

          transition:
            all
            0.3s ease;
        }

        .profile-mini:hover
          .profile-avatar {

          border-color:
            #19d6ca;

          box-shadow:
            0 0 18px
              rgba(
                25,
                214,
                202,
                0.35
              );

          transform:
            scale(
              1.07
            );
        }

        /* =================================================
           CONTENT
        ================================================= */

        .dashboard-content {

          padding: 40px;

          position: relative;
        }

        .ambient-light {

          position: absolute;

          width: 650px;
          height: 650px;

          left: 50px;
          top: -180px;

          background:
            radial-gradient(
              circle,
              rgba(
                25,
                214,
                202,
                0.08
              ),
              transparent 70%
            );

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
            transform:
              scale(
                1
              );

            opacity: 0.6;
          }

          50% {
            transform:
              scale(
                1.12
              );

            opacity: 1;
          }

        }

        /* =================================================
           HERO
        ================================================= */

        .hero-section {

          min-height: 300px;

          position: relative;

          z-index: 3;

          overflow: hidden;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding: 40px;

          margin-bottom: 45px;

          border-radius: 25px;

          background:

            radial-gradient(
              circle at 80% 50%,
              rgba(
                25,
                214,
                202,
                0.08
              ),
              transparent 35%
            ),

            linear-gradient(
              145deg,
              rgba(
                25,
                48,
                49,
                0.9
              ),
              rgba(
                7,
                25,
                26,
                0.9
              )
            );

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.16
              );

          box-shadow:
            0 25px 70px
              rgba(
                0,
                0,
                0,
                0.35
              ),
            inset 0 1px 0
              rgba(
                255,
                255,
                255,
                0.04
              );

          animation:
            heroEnter
            1s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;
        }

        @keyframes heroEnter {

          from {

            opacity: 0;

            transform:
              translateY(
                35px
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

          inset: 0;

          background:
            linear-gradient(
              110deg,
              transparent 20%,
              rgba(
                25,
                214,
                202,
                0.04
              ),
              transparent 80%
            );

          animation:
            heroSweep
            7s
            ease-in-out
            infinite;
        }

        @keyframes heroSweep {

          0% {
            transform:
              translateX(
                -100%
              );
          }

          50%,
          100% {
            transform:
              translateX(
                100%
              );
          }

        }

        .hero-shine {

          position: absolute;

          width: 400px;
          height: 400px;

          right: -160px;
          top: -170px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                25,
                214,
                202,
                0.12
              ),
              transparent 65%
            );

          animation:
            heroShine
            6s
            ease-in-out
            infinite;
        }

        @keyframes heroShine {

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

        /* =================================================
           HERO CONTENT
        ================================================= */

        .hero-content {

          position: relative;

          z-index: 5;

          max-width: 65%;

          animation:
            heroContent
            1s
            0.15s
            ease
            both;
        }

        @keyframes heroContent {

          from {

            opacity: 0;

            transform:
              translateX(
                -30px
              );

          }

          to {

            opacity: 1;

            transform:
              translateX(0);

          }

        }

        .hero-label {

          display: flex;

          align-items: center;

          gap: 9px;

          color: #19cfc4;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 3px;

          margin-bottom: 15px;
        }

        .status-pulse {

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 12px
              #19d6ca;

          animation:
            statusPulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes statusPulse {

          0%,
          100% {
            transform:
              scale(
                1
              );

            opacity: 1;
          }

          50% {
            transform:
              scale(
                1.6
              );

            opacity: 0.5;
          }

        }

        .hero-content h1 {

          margin:
            0
            0
            16px;

          font-size:
            clamp(
              40px,
              5vw,
              55px
            );

          line-height: 1;

          font-weight: 800;

          letter-spacing: -2px;
        }

        .hero-content h1 span {

          color: #19d6ca;

          margin-left: 10px;

          text-shadow:
            0 0 25px
              rgba(
                25,
                214,
                202,
                0.2
              );
        }

        .hero-content p {

          max-width: 680px;

          margin:
            0
            0
            28px;

          color: #91a19f;

          font-size: 15px;

          line-height: 1.65;
        }

        /* =================================================
           BUTTON
        ================================================= */

        .journey-button {

          height: 50px;

          padding:
            0
            21px;

          display: flex;

          align-items: center;

          gap: 10px;

          border: none;

          border-radius: 13px;

          background:
            linear-gradient(
              135deg,
              #19d6ca,
              #0fa59d
            );

          color: #031211;

          font-size: 14px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 10px 30px
              rgba(
                20,
                205,
                193,
                0.15
              );

          transition:
            all
            0.3s ease;
        }

        .journey-button:hover {

          transform:
            translateY(
              -3px
            );

          box-shadow:
            0 15px 35px
              rgba(
                20,
                205,
                193,
                0.28
              );

          filter:
            brightness(
              1.08
            );
        }

        .journey-button .arrow {

          font-size: 20px;

          transition:
            transform
            0.3s ease;
        }

        .journey-button:hover
          .arrow {

          transform:
            translateX(
              5px
            );
        }

        /* =================================================
           HERO VISUAL
        ================================================= */

        .hero-visual {

          width: 230px;
          height: 230px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          margin-right: 25px;

          animation:
            visualEnter
            1.2s
            0.3s
            ease
            both;
        }

        @keyframes visualEnter {

          from {

            opacity: 0;

            transform:
              translateX(
                40px
              )
              scale(
                0.7
              );

          }

          to {

            opacity: 1;

            transform:
              translateX(0)
              scale(1);

          }

        }

        .orbit {

          position: absolute;

          border-radius: 50%;

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.22
              );
        }

        .orbit-1 {

          width: 210px;
          height: 210px;

          animation:
            orbitRotate
            18s
            linear
            infinite;
        }

        .orbit-2 {

          width: 155px;
          height: 155px;

          border-style: dashed;

          animation:
            orbitRotateReverse
            12s
            linear
            infinite;
        }

        .orbit-3 {

          width: 100px;
          height: 100px;

          border-color:
            rgba(
              25,
              214,
              202,
              0.45
            );

          box-shadow:
            0 0 30px
              rgba(
                25,
                214,
                202,
                0.08
              );

          animation:
            corePulse
            3s
            ease-in-out
            infinite;
        }

        @keyframes orbitRotate {

          from {
            transform:
              rotate(
                0deg
              );
          }

          to {
            transform:
              rotate(
                360deg
              );
          }

        }

        @keyframes orbitRotateReverse {

          from {
            transform:
              rotate(
                360deg
              );
          }

          to {
            transform:
              rotate(
                0deg
              );
          }

        }

        @keyframes corePulse {

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

        .ai-core {

          width: 65px;
          height: 65px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              #20ddd0,
              #0d938b
            );

          box-shadow:
            0 0 35px
              rgba(
                25,
                214,
                202,
                0.35
              );

          animation:
            coreFloat
            3s
            ease-in-out
            infinite;

          z-index: 5;
        }

        .core-inner {

          width: 52px;
          height: 52px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            #071b1c;

          color: #19d6ca;

          font-size: 16px;

          font-weight: 900;

          letter-spacing: 1px;

          box-shadow:
            inset 0 0 15px
              rgba(
                25,
                214,
                202,
                0.15
              );
        }

        @keyframes coreFloat {

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
                -9px
              );
          }

        }

        .orbit-dot {

          position: absolute;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 12px
              #19d6ca;

          z-index: 6;
        }

        .orbit-dot-1 {

          top: 14px;
          right: 52px;

          animation:
            dotFloat1
            5s
            ease-in-out
            infinite;
        }

        .orbit-dot-2 {

          bottom: 30px;
          left: 25px;

          animation:
            dotFloat2
            6s
            ease-in-out
            infinite;
        }

        .orbit-dot-3 {

          right: 4px;
          top: 105px;

          animation:
            dotPulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes dotFloat1 {

          0%,
          100% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                -25px,
                30px
              );
          }

        }

        @keyframes dotFloat2 {

          0%,
          100% {
            transform:
              translate(
                0,
                0
              );
          }

          50% {
            transform:
              translate(
                30px,
                -20px
              );
          }

        }

        @keyframes dotPulse {

          0%,
          100% {
            transform:
              scale(
                1
              );

            opacity: 0.4;
          }

          50% {
            transform:
              scale(
                1.7
              );

            opacity: 1;
          }

        }

        /* =================================================
           STATS
        ================================================= */

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

          margin-bottom: 48px;

          position: relative;

          z-index: 3;
        }

        .glass-card {

          min-height: 170px;

          position: relative;

          overflow: hidden;

          padding: 30px;

          border-radius: 23px;

          background:
            linear-gradient(
              145deg,
              rgba(
                38,
                57,
                57,
                0.58
              ),
              rgba(
                8,
                25,
                26,
                0.72
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

          box-shadow:
            inset 0 1px 0
              rgba(
                255,
                255,
                255,
                0.03
              );

          opacity: 0;

          animation:
            cardEnter
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
            0.35s ease;
        }

        .glass-card:hover {

          transform:
            translateY(
              -7px
            );

          border-color:
            rgba(
              25,
              214,
              202,
              0.25
            );

          box-shadow:
            0 20px 50px
              rgba(
                0,
                0,
                0,
                0.25
              ),
            0 0 25px
              rgba(
                25,
                214,
                202,
                0.04
              );
        }

        @keyframes cardEnter {

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

          width: 180px;
          height: 180px;

          right: -100px;
          bottom: -100px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              var(--accent),
              transparent 70%
            );

          opacity: 0.08;

          transition:
            transform
            0.5s ease;
        }

        .glass-card:hover::after {

          transform:
            scale(
              1.7
            );
        }

        .card-accent {

          position: absolute;

          left: 0;
          top: 0;

          width: 4px;
          height: 100%;

          border-radius:
            23px
            0
            0
            23px;
        }

        .card-icon {

          position: absolute;

          right: 25px;
          top: 25px;

          width: 35px;
          height: 35px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          color: var(--accent);

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          font-size: 15px;
        }

        .glass-card h3 {

          color: #81918f;

          font-size: 14px;

          font-weight: 500;

          margin:
            0
            0
            14px;
        }

        .glass-card h1 {

          color: white;

          font-size: 47px;

          font-weight: 700;

          margin: 0;

          letter-spacing: -1px;
        }

        /* =================================================
           LOWER GRID
        ================================================= */

        .dashboard-grid {

          display: grid;

          grid-template-columns:
            2fr
            1.5fr;

          gap: 30px;

          position: relative;

          z-index: 3;
        }

        /* =================================================
           SECTION HEADINGS
        ================================================= */

        .section-heading {

          display: flex;

          align-items: flex-end;

          justify-content:
            space-between;

          margin-bottom: 20px;
        }

        .section-label {

          display: block;

          color: #19aaa2;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 3px;

          margin-bottom: 4px;
        }

        .section-heading h2 {

          margin: 0;

          color: #e8f1f0;

          font-size: 23px;

          font-weight: 650;
        }

        .heading-line {

          height: 1px;

          flex: 1;

          margin-left: 20px;

          margin-bottom: 6px;

          background:
            linear-gradient(
              90deg,
              rgba(
                25,
                214,
                202,
                0.18
              ),
              transparent
            );
        }

        /* =================================================
           ACTION CARDS
        ================================================= */

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

          position: relative;

          overflow: hidden;

          padding: 25px;

          border-radius: 20px;

          cursor: pointer;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.08
              );

          opacity: 0;

          animation:
            cardEnter
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
            0.35s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            );
        }

        .action-card::before {

          content: "";

          position: absolute;

          width: 180px;
          height: 180px;

          top: -120px;
          right: -100px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                25,
                214,
                202,
                0.15
              ),
              transparent 70%
            );

          transition:
            all
            0.5s ease;
        }

        .action-card:hover {

          transform:
            translateY(
              -7px
            );

          background:
            rgba(
              25,
              214,
              202,
              0.045
            );

          border-color:
            rgba(
              25,
              214,
              202,
              0.3
            );

          box-shadow:
            0 18px 45px
              rgba(
                0,
                0,
                0,
                0.25
              );
        }

        .action-card:hover::before {

          transform:
            scale(
              1.7
            );
        }

        .action-icon {

          width: 50px;
          height: 50px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 14px;

          background:
            rgba(
              25,
              214,
              202,
              0.07
            );

          color: #19d6ca;

          font-size: 22px;

          margin-bottom: 17px;

          transition:
            all
            0.35s ease;

          box-shadow:
            inset 0 0 15px
              rgba(
                25,
                214,
                202,
                0.03
              );
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

          color: #68f3eb;

          background:
            rgba(
              25,
              214,
              202,
              0.12
            );

          box-shadow:
            0 0 25px
              rgba(
                25,
                214,
                202,
                0.12
              );
        }

        .action-card h3 {

          margin:
            0
            0
            6px;

          color: #e7f1ef;

          font-size: 17px;

          font-weight: 600;
        }

        .action-card p {

          margin: 0;

          color: #72817f;

          font-size: 13px;
        }

        /* =================================================
           ACTIVITY CARD
        ================================================= */

        .activity-card {

          position: relative;

          overflow: hidden;

          height:
            calc(
              100%
              - 63px
            );

          padding: 25px;

          border-radius: 20px;

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
                0.06
              );

          backdrop-filter:
            blur(18px);

          animation:
            activityEnter
            0.8s
            0.5s
            ease
            both;

          transition:
            all
            0.3s ease;
        }

        .activity-card:hover {

          border-color:
            rgba(
              25,
              214,
              202,
              0.16
            );

          background:
            rgba(
              25,
              214,
              202,
              0.018
            );
        }

        @keyframes activityEnter {

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

        .activity-glow {

          position: absolute;

          width: 250px;
          height: 250px;

          right: -150px;
          top: -100px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                25,
                214,
                202,
                0.08
              ),
              transparent
            );

          pointer-events: none;

          animation:
            activityGlow
            7s
            ease-in-out
            infinite;
        }

        @keyframes activityGlow {

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
                1.3
              );
          }

        }

        /* =================================================
           ACTIVITY ITEMS
        ================================================= */

        .activity-item {

          display: flex;

          gap: 15px;

          position: relative;

          padding-bottom: 25px;

          opacity: 0;

          animation:
            activityItemEnter
            0.6s
            var(--delay)
            ease
            forwards;
        }

        @keyframes activityItemEnter {

          from {

            opacity: 0;

            transform:
              translateX(
                18px
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
            linear-gradient(
              to bottom,
              rgba(
                25,
                214,
                202,
                0.18
              ),
              rgba(
                255,
                255,
                255,
                0.03
              )
            );
        }

        .timeline-dot {

          width: 14px;
          height: 14px;

          flex-shrink: 0;

          margin-top: 4px;

          border-radius: 50%;

          border:
            3px solid
              #071314;

          position: relative;

          z-index: 2;

          box-shadow:
            0 0 10px
              var(--dot-color);

          animation:
            timelinePulse
            2.5s
            ease-in-out
            infinite;
        }

        @keyframes timelinePulse {

          0%,
          100% {
            box-shadow:
              0 0 5px
                var(--dot-color);
          }

          50% {
            box-shadow:
              0 0 16px
                var(--dot-color);
          }

        }

        .activity-text {

          color: #dce7e5;

          font-size: 14px;

          font-weight: 500;
        }

        .activity-time {

          color: #647573;

          font-size: 12px;

          margin-top: 4px;
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1150px) {

          .dashboard-grid {

            grid-template-columns:
              1fr;
          }

          .activity-card {

            height: auto;
          }

          .hero-visual {

            margin-right: 0;
          }

        }

        @media (max-width: 850px) {

          .dashboard-wrapper {

            margin-left: 0;
          }

          .dashboard-navbar {

            padding:
              0
              20px;
          }

          .search-input {

            width: 250px;
          }

          .dashboard-content {

            padding: 25px;
          }

          .hero-section {

            padding: 30px;
          }

          .hero-content {

            max-width: 100%;
          }

          .hero-visual {

            display: none;
          }

        }

        @media (max-width: 650px) {

          .dashboard-navbar {

            height: 75px;

            padding:
              0
              15px;
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

            padding: 27px 23px;

            min-height: 280px;

            border-radius: 20px;
          }

          .hero-content {

            max-width: 100%;
          }

          .hero-content h1 {

            font-size: 37px;

            letter-spacing: -1.5px;
          }

          .hero-content h1 span {

            display: block;

            margin:
              5px
              0
              0;
          }

          .hero-content p {

            font-size: 13px;
          }

          .stats-section {

            grid-template-columns:
              1fr;

            gap: 15px;

            margin-bottom: 35px;
          }

          .glass-card {

            min-height: 150px;

            padding: 25px;
          }

          .glass-card h1 {

            font-size: 42px;
          }

          .action-grid {

            grid-template-columns:
              1fr;

            gap: 15px;
          }

          .section-heading h2 {

            font-size: 21px;
          }

          .heading-line {

            display: none;
          }

        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (
          prefers-reduced-motion:
            reduce
        ) {

          *,
          *::before,
          *::after {

            animation-duration:
              0.01ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              0.01ms !important;
          }

        }

      `}</style>

    </div>
  );
}

/* =========================================================
   GLASS CARD
========================================================= */

function GlassCard({
  title,
  value,
  accentColor,
  icon,
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
        className="card-accent"
        style={{
          background: accentColor,
        }}
      />

      <div
        className="card-icon"
        style={{
          "--accent": accentColor,
        }}
      >
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <h1>
        {value}
      </h1>

    </div>
  );
}

/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
  icon,
  title,
  desc,
  onClick,
  delay,
}) {
  return (
    <div
      className="action-card"
      style={{
        "--delay": delay,
      }}
      onClick={onClick}
    >

      <div className="action-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {desc}
      </p>

    </div>
  );
}

/* =========================================================
   ACTIVITY ITEM
========================================================= */

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