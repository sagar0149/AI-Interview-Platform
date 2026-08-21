import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function SidebarLink({ to, children }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`sidebar-link ${active ? "sidebar-active" : ""}`}
    >
      <span className="sidebar-link-text">{children}</span>

      {active && <span className="active-indicator"></span>}
    </Link>
  );
}

function Sidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className="sidebar">

        {/* Background Effects */}
        <div className="sidebar-glow"></div>
        <div className="sidebar-glow-bottom"></div>
        <div className="sidebar-grid"></div>

        {/* Top */}
        <div className="sidebar-top">

          {/* Logo */}
          <Link to="/dashboard" className="sidebar-logo">
            <div className="logo-symbol">
              <span>AI</span>
            </div>

            <div className="logo-text">
              AI Interview
            </div>
          </Link>

          <div className="logo-line"></div>

          {/* Navigation */}
          <div className="sidebar-navigation">

            <div className="navigation-label">
              MENU
            </div>

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

        {/* Bottom */}
        <div className="sidebar-bottom">

          <div className="sidebar-status">
            <span className="status-dot"></span>
            <span>AI SYSTEM ONLINE</span>
          </div>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </div>
      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: 28px 22px;

          overflow: hidden;

          color: #e8f1f0;

          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(25,214,202,0.07),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #020707 0%,
              #061314 50%,
              #020707 100%
            );

          border-right:
            1px solid rgba(25,214,202,0.14);

          box-shadow:
            10px 0 40px rgba(0,0,0,0.35);

          animation:
            sidebarEnter
            0.8s
            cubic-bezier(0.16,1,0.3,1)
            both;
        }

        @keyframes sidebarEnter {
          from {
            opacity: 0;
            transform: translateX(-25px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sidebar-glow {
          position: absolute;

          width: 280px;
          height: 280px;

          left: -150px;
          top: 80px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(25,214,202,0.12),
              transparent 70%
            );

          filter: blur(20px);

          pointer-events: none;

          animation:
            sidebarGlow
            8s
            ease-in-out
            infinite;
        }

        .sidebar-glow-bottom {
          position: absolute;

          width: 240px;
          height: 240px;

          right: -150px;
          bottom: -80px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(25,214,202,0.07),
              transparent 70%
            );

          filter: blur(30px);

          pointer-events: none;

          animation:
            sidebarGlowBottom
            10s
            ease-in-out
            infinite;
        }

        @keyframes sidebarGlow {
          0%,100% {
            transform: translate(0,0);
            opacity: 0.5;
          }

          50% {
            transform: translate(40px,50px);
            opacity: 1;
          }
        }

        @keyframes sidebarGlowBottom {
          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.3);
          }
        }

        .sidebar-grid {
          position: absolute;
          inset: 0;

          pointer-events: none;

          opacity: 0.025;

          background-image:
            linear-gradient(
              rgba(25,214,202,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(25,214,202,0.8) 1px,
              transparent 1px
            );

          background-size: 35px 35px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );
        }

        .sidebar-top {
          position: relative;
          z-index: 5;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;

          text-decoration: none;
          color: white;

          margin-bottom: 25px;

          transition: all 0.3s ease;
        }

        .sidebar-logo:hover {
          transform: translateX(3px);
        }

        .logo-symbol {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              #20ddd0,
              #0d938b
            );

          color: #031211;

          font-size: 13px;
          font-weight: 900;

          box-shadow:
            0 0 25px
            rgba(25,214,202,0.22);

          animation:
            logoPulse
            3s
            ease-in-out
            infinite;
        }

        @keyframes logoPulse {
          0%,100% {
            box-shadow:
              0 0 15px
              rgba(25,214,202,0.18);
          }

          50% {
            box-shadow:
              0 0 28px
              rgba(25,214,202,0.38);
          }
        }

        .logo-text {
          color: #dce9e7;
          font-size: 20px;
          font-weight: 750;
          letter-spacing: -0.5px;
        }

        .logo-line {
          width: 100%;
          height: 1px;

          margin-bottom: 22px;

          background:
            linear-gradient(
              90deg,
              rgba(25,214,202,0.25),
              transparent
            );
        }

        .sidebar-navigation {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .navigation-label {
          color: #4e6260;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: 3px;

          margin:
            0 0 8px 7px;
        }

        .sidebar-link {
          min-height: 45px;

          display: flex;
          align-items: center;

          position: relative;

          padding: 11px 14px;

          border-radius: 12px;

          color: #83918f;

          text-decoration: none;

          font-size: 14px;
          font-weight: 500;

          border:
            1px solid transparent;

          transition:
            all 0.3s
            cubic-bezier(
              0.4,0,0.2,1
            );

          overflow: hidden;
        }

        .sidebar-link::before {
          content: "";

          position: absolute;

          width: 5px;
          height: 5px;

          left: 0;
          top: 50%;

          transform:
            translate(-10px,-50%);

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 10px #19d6ca;

          transition:
            transform 0.3s ease;
        }

        .sidebar-link::after {
          content: "";

          position: absolute;

          width: 100%;
          height: 100%;

          left: -100%;
          top: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(25,214,202,0.05),
              transparent
            );

          transition:
            left 0.5s ease;
        }

        .sidebar-link:hover {
          color: #dff8f5;

          background:
            rgba(25,214,202,0.055);

          border-color:
            rgba(25,214,202,0.18);

          transform:
            translateX(6px);

          box-shadow:
            0 8px 20px
            rgba(0,0,0,0.15);
        }

        .sidebar-link:hover::before {
          transform:
            translate(6px,-50%);
        }

        .sidebar-link:hover::after {
          left: 100%;
        }

        .sidebar-link-text {
          position: relative;
          z-index: 2;
        }

        .sidebar-active {
          color: #e8fffc;

          background:
            linear-gradient(
              90deg,
              rgba(25,214,202,0.12),
              rgba(25,214,202,0.035)
            );

          border-color:
            rgba(25,214,202,0.2);

          box-shadow:
            inset 0 0 20px
            rgba(25,214,202,0.025);
        }

        .sidebar-active::before {
          transform:
            translate(6px,-50%);

          box-shadow:
            0 0 15px #19d6ca;
        }

        .active-indicator {
          position: absolute;

          right: 9px;

          width: 4px;
          height: 20px;

          border-radius: 10px;

          background:
            linear-gradient(
              to bottom,
              #19d6ca,
              #0e8d86
            );

          box-shadow:
            0 0 12px
            rgba(25,214,202,0.6);

          animation:
            indicatorAppear
            0.35s
            ease both;
        }

        @keyframes indicatorAppear {
          from {
            opacity: 0;
            transform: scaleY(0);
          }

          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        .sidebar-bottom {
          position: relative;
          z-index: 5;
        }

        .sidebar-status {
          display: flex;
          align-items: center;
          gap: 8px;

          margin:
            0 5px 12px;

          color: #50615f;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: 1.5px;
        }

        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 9px #19d6ca;

          animation:
            statusBlink
            2s
            ease-in-out
            infinite;
        }

        @keyframes statusBlink {
          0%,100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }
        }

        .logout-button {
          width: 100%;
          height: 46px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          border-radius: 12px;

          border:
            1px solid
            rgba(255,90,90,0.12);

          background:
            rgba(255,70,70,0.045);

          color: #c88787;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition:
            all 0.3s ease;
        }

        .logout-button:hover {
          background:
            rgba(239,68,68,0.12);

          border-color:
            rgba(239,68,68,0.35);

          color: #ff8585;

          transform:
            translateY(-3px);

          box-shadow:
            0 10px 25px
            rgba(239,68,68,0.08);
        }

        .logout-button svg {
          transition:
            transform 0.3s ease;
        }

        .logout-button:hover svg {
          transform:
            translateX(-3px)
            rotate(-8deg);
        }

        @media (max-width:850px) {
          .sidebar {
            width: 220px;
            padding: 25px 17px;
          }
        }

        @media (max-width:650px) {
          .sidebar {
            position: fixed;

            width: 100%;
            height: auto;

            min-height: auto;

            bottom: 0;
            top: auto;
            left: 0;

            padding: 10px 15px;

            flex-direction: row;
            align-items: center;

            border-right: none;

            border-top:
              1px solid
              rgba(25,214,202,0.15);
          }

          .sidebar-top {
            width: 100%;
          }

          .sidebar-logo,
          .logo-line,
          .navigation-label {
            display: none;
          }

          .sidebar-navigation {
            flex-direction: row;
            justify-content: space-between;
            gap: 3px;
          }

          .sidebar-link {
            flex: 1;

            justify-content: center;

            min-height: 42px;

            padding: 8px 5px;

            font-size: 10px;

            text-align: center;
          }

          .sidebar-link:hover {
            transform:
              translateY(-3px);
          }

          .sidebar-link::before,
          .sidebar-link::after,
          .active-indicator {
            display: none;
          }

          .sidebar-bottom {
            display: none;
          }
        }

      `}</style>
    </>
  );
}

export default Sidebar;