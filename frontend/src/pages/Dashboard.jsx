import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  FaBell,
  FaSearch,
  FaArrowRight,
  FaFileAlt,
  FaMicrophone,
  FaVideo,
  FaChartLine,
  FaFilePdf,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard() {

  /* =========================================
     USER
  ========================================= */

  const userId = localStorage.getItem("user_id");

  const [userName, setUserName] =
    useState("User");

  const [loadingUser, setLoadingUser] =
    useState(true);

  /* =========================================
     FETCH LOGGED-IN USER
  ========================================= */

  useEffect(() => {

    const fetchUser = async () => {

      if (!userId) {
        setLoadingUser(false);
        return;
      }

      try {

        const response = await axios.get(
          `/api/profile/${userId}`
        );

        const name =
          response.data?.name ||
          "User";

        setUserName(name);

        /*
         * Save locally too.
         * Other pages can use this without
         * making another request.
         */

        localStorage.setItem(
          "userName",
          name
        );

      } catch (error) {

        console.error(
          "Failed to load user:",
          error
        );

        /*
         * Fallback to locally stored name
         */

        const savedName =
          localStorage.getItem(
            "userName"
          );

        if (savedName) {
          setUserName(savedName);
        }

      } finally {

        setLoadingUser(false);

      }
    };

    fetchUser();

  }, [userId]);

  /* =========================================
     USER INITIALS
  ========================================= */

  const getInitials = (name) => {

    if (!name) return "US";

    const words =
      name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  const initials =
    getInitials(userName);

  /* =========================================
     RETURN
  ========================================= */

  return (

    <div className="dashboard-page">

      <Sidebar />

      {/* =====================================
          MAIN AREA
      ===================================== */}

      <main className="dashboard-main">

        {/* ===================================
            TOP BAR
        =================================== */}

        <header className="dashboard-header">

          {/* Search */}

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder=
                "Search reports, interviews..."
            />

          </div>

          {/* RIGHT */}

          <div className="header-right">

            {/* Notification */}

            <button className="notification-button">

              <FaBell />

              <span className="notification-dot">
              </span>

            </button>

            {/* USER */}

            <div className="header-user">

              <div className="header-user-name">

                {loadingUser
                  ? "Loading..."
                  : userName}

              </div>

              <div className="header-avatar">

                {initials}

              </div>

            </div>

          </div>

        </header>


        {/* ===================================
            CONTENT
        =================================== */}

        <div className="dashboard-content">

          {/* =================================
              HERO
          ================================= */}

          <section className="hero-card">

            <div className="hero-content">

              <div className="hero-label">

                <span className="hero-dot"></span>

                AI-POWERED INTERVIEW PLATFORM

              </div>

              <h1>

                Land Your{" "}

                <span>
                  Dream Job
                </span>

              </h1>

              <p>

                Master your next interview
                with AI-driven insights,
                resume optimization, and
                real-time performance tracking.

              </p>

              <a
                href="/resume"
                className="hero-button"
              >

                Start Your Journey

                <FaArrowRight />

              </a>

            </div>

            {/* AI ORBIT */}

            <div className="ai-orbit">

              <div className="orbit orbit-one">
              </div>

              <div className="orbit orbit-two">
              </div>

              <div className="orbit orbit-three">
              </div>

              <div className="ai-core">
                AI
              </div>

              <span className="orbit-dot dot-one">
              </span>

              <span className="orbit-dot dot-two">
              </span>

              <span className="orbit-dot dot-three">
              </span>

            </div>

          </section>


          {/* =================================
              STATS
          ================================= */}

          <section className="stats-grid">

            <StatCard
              title="Average ATS Score"
              value="87%"
              icon="↗"
              type="green"
            />

            <StatCard
              title="Completed Interviews"
              value="12"
              icon="✓"
              type="cyan"
            />

            <StatCard
              title="Generated Reports"
              value="8"
              icon="◇"
              type="purple"
            />

          </section>


          {/* =================================
              LOWER SECTION
          ================================= */}

          <section className="dashboard-lower">

            {/* QUICK ACTIONS */}

            <div className="dashboard-column">

              <div className="section-heading">

                <div>

                  <span>
                    TOOLS
                  </span>

                  <h2>
                    Quick Actions
                  </h2>

                </div>

                <div className="heading-line">
                </div>

              </div>


              <div className="quick-actions">

                <QuickAction
                  icon={<FaFileAlt />}
                  title="Resume Analyzer"
                  description=
                    "Analyze and optimize your resume"
                  link="/resume"
                />

                <QuickAction
                  icon={<FaMicrophone />}
                  title="Mock Interview"
                  description=
                    "Practice with AI-generated questions"
                  link="/interview"
                />

                <QuickAction
                  icon={<FaVideo />}
                  title="Video Interview"
                  description=
                    "Practice your interview on camera"
                  link="/video-interview"
                />

                <QuickAction
                  icon={<FaChartLine />}
                  title="Analytics"
                  description=
                    "Track your interview performance"
                  link="/analytics"
                />

              </div>

            </div>


            {/* RECENT ACTIVITY */}

            <div className="dashboard-column">

              <div className="section-heading">

                <div>

                  <span>
                    TIMELINE
                  </span>

                  <h2>
                    Recent Activity
                  </h2>

                </div>

                <div className="heading-line">
                </div>

              </div>


              <div className="activity-card">

                <Activity
                  icon={<FaFileAlt />}
                  title="Resume Evaluated"
                  subtitle="Resume analysis completed"
                  time="Recently"
                  type="green"
                />

                <Activity
                  icon={<FaMicrophone />}
                  title="Mock Interview"
                  subtitle="Interview session completed"
                  time="Recently"
                  type="cyan"
                />

                <Activity
                  icon={<FaFilePdf />}
                  title="Report Generated"
                  subtitle="AI interview report created"
                  time="Recently"
                  type="purple"
                />

              </div>

            </div>

          </section>

        </div>

      </main>


      {/* =====================================
          CSS
      ===================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(20,184,166,0.04),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #020707 0%,
              #041213 45%,
              #02090b 100%
            );

          color: white;

          font-family:
            "Inter",
            sans-serif;
        }


        /* ===================================
           MAIN
        =================================== */

        .dashboard-main {
          margin-left: 260px;

          min-height: 100vh;

          position: relative;
        }


        /* ===================================
           HEADER
        =================================== */

        .dashboard-header {

          height: 100px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0 45px;

          border-bottom:
            1px solid
            rgba(255,255,255,0.05);

          background:
            rgba(2,7,7,0.65);

          backdrop-filter:
            blur(20px);

          position: sticky;

          top: 0;

          z-index: 50;
        }


        /* SEARCH */

        .search-box {

          width: 385px;

          height: 52px;

          display: flex;

          align-items: center;

          gap: 14px;

          padding:
            0 18px;

          border-radius: 18px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.07);

          transition:
            all 0.3s ease;
        }

        .search-box:focus-within {

          border-color:
            rgba(25,214,202,0.35);

          box-shadow:
            0 0 25px
            rgba(25,214,202,0.05);
        }

        .search-box svg {

          color:
            #627472;

          font-size:
            17px;
        }

        .search-box input {

          width: 100%;

          border: none;

          outline: none;

          background:
            transparent;

          color: white;

          font-size: 15px;
        }

        .search-box input::placeholder {
          color: #657775;
        }


        /* ===================================
           HEADER RIGHT
        =================================== */

        .header-right {

          display: flex;

          align-items: center;

          gap: 25px;
        }


        /* NOTIFICATION */

        .notification-button {

          position: relative;

          width: 42px;
          height: 42px;

          display: flex;

          align-items: center;

          justify-content: center;

          border: none;

          background:
            transparent;

          color: #83918f;

          font-size: 19px;

          cursor: pointer;

          transition:
            all 0.3s ease;
        }

        .notification-button:hover {

          color:
            #19d6ca;

          transform:
            translateY(-2px);
        }

        .notification-dot {

          position: absolute;

          width: 8px;
          height: 8px;

          right: 5px;
          top: 3px;

          border-radius: 50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 12px
            #19d6ca;

          animation:
            notificationPulse
            2s
            infinite;
        }

        @keyframes notificationPulse {

          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.3);
          }

        }


        /* ===================================
           USER
        =================================== */

        .header-user {

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .header-user-name {

          color:
            #dce9e7;

          font-size:
            15px;

          font-weight:
            700;

          max-width:
            180px;

          white-space:
            nowrap;

          overflow:
            hidden;

          text-overflow:
            ellipsis;
        }

        .header-avatar {

          width: 42px;
          height: 42px;

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

          color:
            #031211;

          font-size:
            12px;

          font-weight:
            900;

          border:
            1px solid
            rgba(25,214,202,0.5);

          box-shadow:
            0 0 20px
            rgba(25,214,202,0.15);

          animation:
            avatarGlow
            4s
            ease-in-out
            infinite;
        }

        @keyframes avatarGlow {

          0%,100% {

            box-shadow:
              0 0 15px
              rgba(25,214,202,0.12);

          }

          50% {

            box-shadow:
              0 0 28px
              rgba(25,214,202,0.3);

          }

        }


        /* ===================================
           CONTENT
        =================================== */

        .dashboard-content {

          padding:
            45px;

          max-width:
            1450px;

          margin:
            0 auto;
        }


        /* ===================================
           HERO
        =================================== */

        .hero-card {

          min-height:
            340px;

          position:
            relative;

          overflow:
            hidden;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          padding:
            45px;

          border-radius:
            28px;

          background:
            linear-gradient(
              135deg,
              rgba(19,65,64,0.55),
              rgba(9,35,35,0.55)
            );

          border:
            1px solid
            rgba(25,214,202,0.18);

          box-shadow:
            0 25px 70px
            rgba(0,0,0,0.25);

          animation:
            fadeUp
            .7s
            ease both;
        }

        .hero-card::before {

          content:
            "";

          position:
            absolute;

          width:
            500px;

          height:
            500px;

          right:
            -200px;

          top:
            -200px;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(25,214,202,0.09),
              transparent 70%
            );

          animation:
            heroGlow
            8s
            ease-in-out
            infinite;
        }

        @keyframes heroGlow {

          0%,100% {
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.2);
          }

        }


        .hero-content {

          position:
            relative;

          z-index:
            2;

          max-width:
            780px;
        }


        .hero-label {

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          color:
            #19d6ca;

          font-size:
            11px;

          font-weight:
            800;

          letter-spacing:
            3px;

          margin-bottom:
            18px;
        }

        .hero-dot {

          width:
            9px;

          height:
            9px;

          border-radius:
            50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 12px
            #19d6ca;
        }


        .hero-card h1 {

          margin:
            0 0 14px;

          font-size:
            clamp(45px,4vw,65px);

          line-height:
            1;

          font-weight:
            900;

          letter-spacing:
            -2px;

          color:
            #f0f7f6;
        }

        .hero-card h1 span {

          color:
            #19d6ca;

          text-shadow:
            0 0 30px
            rgba(25,214,202,0.2);
        }


        .hero-card p {

          max-width:
            720px;

          margin:
            0 0 28px;

          color:
            #8fa4a2;

          font-size:
            16px;

          line-height:
            1.7;
        }


        .hero-button {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            14px;

          padding:
            16px 24px;

          border-radius:
            13px;

          text-decoration:
            none;

          background:
            linear-gradient(
              135deg,
              #20ddd0,
              #12a9a0
            );

          color:
            #02100f;

          font-size:
            15px;

          font-weight:
            800;

          box-shadow:
            0 12px 30px
            rgba(25,214,202,0.18);

          transition:
            all .3s ease;
        }

        .hero-button:hover {

          transform:
            translateY(-3px);

          box-shadow:
            0 18px 40px
            rgba(25,214,202,0.25);
        }


        /* ===================================
           AI ORBIT
        =================================== */

        .ai-orbit {

          position:
            relative;

          width:
            300px;

          height:
            300px;

          margin-right:
            30px;

          flex-shrink:
            0;
        }

        .orbit {

          position:
            absolute;

          left:
            50%;

          top:
            50%;

          transform:
            translate(-50%,-50%);

          border:
            1px solid
            rgba(25,214,202,0.2);

          border-radius:
            50%;
        }

        .orbit-one {

          width:
            160px;

          height:
            160px;
        }

        .orbit-two {

          width:
            220px;

          height:
            220px;

          border-style:
            dashed;
        }

        .orbit-three {

          width:
            280px;

          height:
            280px;

          opacity:
            .6;
        }

        .ai-core {

          position:
            absolute;

          left:
            50%;

          top:
            50%;

          transform:
            translate(-50%,-50%);

          width:
            72px;

          height:
            72px;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #061817;

          border:
            7px solid
            #19d6ca;

          color:
            #eafffd;

          font-size:
            17px;

          font-weight:
            900;

          box-shadow:
            0 0 35px
            rgba(25,214,202,0.3);

          animation:
            corePulse
            3s
            ease-in-out
            infinite;
        }

        @keyframes corePulse {

          0%,100% {
            box-shadow:
              0 0 25px
              rgba(25,214,202,0.2);
          }

          50% {
            box-shadow:
              0 0 50px
              rgba(25,214,202,0.45);
          }

        }

        .orbit-dot {

          position:
            absolute;

          width:
            8px;

          height:
            8px;

          border-radius:
            50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 12px
            #19d6ca;
        }

        .dot-one {
          top:
            35px;

          right:
            45px;
        }

        .dot-two {
          bottom:
            55px;

          left:
            30px;
        }

        .dot-three {
          top:
            100px;

          right:
            20px;
        }


        /* ===================================
           STATS
        =================================== */

        .stats-grid {

          display:
            grid;

          grid-template-columns:
            repeat(3,1fr);

          gap:
            25px;

          margin-top:
            45px;
        }


        .stat-card {

          min-height:
            185px;

          position:
            relative;

          overflow:
            hidden;

          padding:
            30px;

          border-radius:
            22px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.08);

          transition:
            all .35s ease;

          animation:
            fadeUp
            .8s
            ease both;
        }

        .stat-card:hover {

          transform:
            translateY(-5px);

          border-color:
            rgba(25,214,202,0.2);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,0.2);
        }

        .stat-card::before {

          content:
            "";

          position:
            absolute;

          left:
            0;

          top:
            0;

          bottom:
            0;

          width:
            4px;

          border-radius:
            10px;
        }

        .stat-green::before {
          background:
            #22c55e;
        }

        .stat-cyan::before {
          background:
            #19d6ca;
        }

        .stat-purple::before {
          background:
            #a855f7;
        }

        .stat-title {

          color:
            #849795;

          font-size:
            14px;

          font-weight:
            600;

          margin-bottom:
            20px;
        }

        .stat-value {

          color:
            #f2f8f7;

          font-size:
            48px;

          font-weight:
            900;

          line-height:
            1;
        }

        .stat-icon {

          position:
            absolute;

          top:
            28px;

          right:
            28px;

          width:
            40px;

          height:
            40px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            11px;

          background:
            rgba(255,255,255,0.04);

          font-weight:
            900;
        }


        /* ===================================
           LOWER
        =================================== */

        .dashboard-lower {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            30px;

          margin-top:
            50px;
        }


        .section-heading {

          display:
            flex;

          align-items:
            flex-end;

          gap:
            20px;

          margin-bottom:
            22px;
        }

        .section-heading span {

          color:
            #19d6ca;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            3px;
        }

        .section-heading h2 {

          margin:
            5px 0 0;

          color:
            #eaf4f2;

          font-size:
            25px;

          font-weight:
            850;
        }

        .heading-line {

          flex:
            1;

          height:
            1px;

          margin-bottom:
            8px;

          background:
            linear-gradient(
              90deg,
              rgba(25,214,202,0.2),
              transparent
            );
        }


        /* ===================================
           QUICK ACTIONS
        =================================== */

        .quick-actions {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            18px;
        }

        .quick-action {

          display:
            block;

          padding:
            23px;

          border-radius:
            18px;

          text-decoration:
            none;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.07);

          transition:
            all .3s ease;
        }

        .quick-action:hover {

          transform:
            translateY(-4px);

          border-color:
            rgba(25,214,202,0.2);

          background:
            rgba(25,214,202,0.035);
        }

        .quick-icon {

          width:
            45px;

          height:
            45px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          margin-bottom:
            17px;

          border-radius:
            13px;

          background:
            rgba(25,214,202,0.08);

          color:
            #19d6ca;

          font-size:
            18px;
        }

        .quick-action h3 {

          margin:
            0 0 7px;

          color:
            #dce9e7;

          font-size:
            15px;
        }

        .quick-action p {

          margin:
            0;

          color:
            #697c7a;

          font-size:
            12px;

          line-height:
            1.5;
        }


        /* ===================================
           ACTIVITY
        =================================== */

        .activity-card {

          padding:
            5px 22px;

          border-radius:
            20px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.07);
        }

        .activity {

          display:
            flex;

          align-items:
            center;

          gap:
            16px;

          padding:
            20px 0;

          border-bottom:
            1px solid
            rgba(255,255,255,0.05);
        }

        .activity:last-child {
          border-bottom:
            none;
        }

        .activity-icon {

          width:
            43px;

          height:
            43px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            12px;

          background:
            rgba(25,214,202,0.08);

          color:
            #19d6ca;
        }

        .activity-content {
          flex:
            1;
        }

        .activity-title {

          color:
            #dce9e7;

          font-size:
            14px;

          font-weight:
            700;
        }

        .activity-subtitle {

          margin-top:
            4px;

          color:
            #697c7a;

          font-size:
            12px;
        }

        .activity-time {

          color:
            #526562;

          font-size:
            11px;
        }


        /* ===================================
           ANIMATIONS
        =================================== */

        @keyframes fadeUp {

          from {

            opacity:
              0;

            transform:
              translateY(25px);
          }

          to {

            opacity:
              1;

            transform:
              translateY(0);
          }
        }


        /* ===================================
           RESPONSIVE
        =================================== */

        @media(max-width:1100px) {

          .hero-card {
            padding:
              35px;
          }

          .ai-orbit {
            transform:
              scale(.8);

            margin-right:
              -10px;
          }

          .dashboard-content {
            padding:
              30px;
          }

        }


        @media(max-width:900px) {

          .stats-grid,
          .dashboard-lower {
            grid-template-columns:
              1fr;
          }

          .hero-card {
            min-height:
              auto;
          }

          .ai-orbit {
            display:
              none;
          }

        }


        @media(max-width:650px) {

          .dashboard-main {
            margin-left:
              0;

            padding-bottom:
              70px;
          }

          .dashboard-header {
            height:
              auto;

            padding:
              18px;

            gap:
              15px;
          }

          .search-box {
            width:
              100%;
          }

          .header-user-name {
            display:
              none;
          }

          .dashboard-content {
            padding:
              20px;
          }

          .hero-card {
            padding:
              30px 25px;
          }

          .hero-card h1 {
            font-size:
              42px;
          }

          .stats-grid {
            gap:
              15px;
          }

          .quick-actions {
            grid-template-columns:
              1fr;
          }

        }

      `}</style>

    </div>
  );
}


/* =========================================
   STAT CARD
========================================= */

function StatCard({
  title,
  value,
  icon,
  type,
}) {

  return (

    <div
      className={`stat-card stat-${type}`}
    >

      <div className="stat-title">
        {title}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-icon">
        {icon}
      </div>

    </div>
  );
}


/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
  icon,
  title,
  description,
  link,
}) {

  return (

    <a
      href={link}
      className="quick-action"
    >

      <div className="quick-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </a>
  );
}


/* =========================================
   ACTIVITY
========================================= */

function Activity({
  icon,
  title,
  subtitle,
  time,
  type,
}) {

  return (

    <div className="activity">

      <div className="activity-icon">
        {icon}
      </div>

      <div className="activity-content">

        <div className="activity-title">
          {title}
        </div>

        <div className="activity-subtitle">
          {subtitle}
        </div>

      </div>

      <div className="activity-time">
        {time}
      </div>

    </div>
  );
}

export default Dashboard;