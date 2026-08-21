import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [searchFocus, setSearchFocus] = useState(false);
  const [notificationHover, setNotificationHover] =
    useState(false);
  const [profileHover, setProfileHover] =
    useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const username =
    localStorage.getItem("username") || "User";

  const fullName =
    localStorage.getItem("full_name") ||
    localStorage.getItem("name") ||
    username;

  return (
    <>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="app-navbar">

        {/* Animated background glow */}

        <div className="navbar-glow"></div>

        <div className="navbar-shine"></div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className={`navbar-search ${
            searchFocus ? "search-active" : ""
          }`}
        >

          <FaSearch className="navbar-search-icon" />

          <input
            type="text"
            placeholder="Search reports, interviews..."
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />

          <span className="search-shortcut">
            /
          </span>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="navbar-right">

          {/* Notification */}

          <div
            className={`notification-button ${
              notificationHover
                ? "notification-active"
                : ""
            }`}
            onMouseEnter={() =>
              setNotificationHover(true)
            }
            onMouseLeave={() =>
              setNotificationHover(false)
            }
          >

            <FaBell />

            <span className="notification-indicator"></span>

            <div className="notification-wave"></div>

          </div>

          {/* Divider */}

          <div className="navbar-divider"></div>

          {/* Profile */}

          <div
            className={`navbar-profile ${
              profileHover
                ? "profile-active"
                : ""
            }`}
            onMouseEnter={() =>
              setProfileHover(true)
            }
            onMouseLeave={() =>
              setProfileHover(false)
            }
            onClick={() =>
              setShowMenu(!showMenu)
            }
          >

            <div className="navbar-profile-info">

              <div className="navbar-full-name">
                {fullName}
              </div>

              <div className="navbar-username">
                @{username}
              </div>

            </div>

            <div className="navbar-avatar-wrapper">

              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  fullName
                )}&background=16b8ac&color=fff`}
                alt="Profile"
                className="navbar-avatar"
              />

              <span className="online-status"></span>

            </div>

            <FaChevronDown
              className={`profile-arrow ${
                showMenu
                  ? "arrow-open"
                  : ""
              }`}
            />

          </div>

          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {showMenu && (
            <div className="profile-dropdown">

              <div className="dropdown-header">

                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    fullName
                  )}&background=16b8ac&color=fff`}
                  alt="Profile"
                />

                <div>

                  <strong>
                    {fullName}
                  </strong>

                  <span>
                    @{username}
                  </span>

                </div>

              </div>

              <div className="dropdown-line"></div>

              <button
                onClick={() =>
                  navigate("/profile")
                }
              >
                <FaUserCircle />
                Profile
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="dropdown-logout"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </nav>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =====================================================
           MAIN NAVBAR
        ===================================================== */

        .app-navbar {

          height: 80px;

          width: 100%;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0 38px;

          position: sticky;

          top: 0;

          z-index: 900;

          background:
            rgba(
              3,
              11,
              12,
              0.72
            );

          backdrop-filter:
            blur(25px);

          -webkit-backdrop-filter:
            blur(25px);

          border-bottom:
            1px solid
              rgba(
                25,
                214,
                202,
                0.08
              );

          animation:
            navbarAppear
            0.7s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;

          overflow: visible;
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

        /* =====================================================
           NAVBAR GLOW
        ===================================================== */

        .navbar-glow {

          position: absolute;

          width: 350px;

          height: 100px;

          left: 15%;

          top: -60px;

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
              transparent 70%
            );

          filter:
            blur(20px);

          pointer-events: none;

          animation:
            navbarGlow
            6s
            ease-in-out
            infinite;
        }

        @keyframes navbarGlow {

          0%,
          100% {

            transform:
              translateX(0);

            opacity:
              0.5;
          }

          50% {

            transform:
              translateX(
                100px
              );

            opacity:
              1;
          }

        }

        .navbar-shine {

          position: absolute;

          left: -30%;

          top: 0;

          width: 25%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #19d6ca,
              transparent
            );

          box-shadow:
            0 0 12px
              rgba(
                25,
                214,
                202,
                0.5
              );

          animation:
            navbarScan
            7s
            linear
            infinite;

          pointer-events: none;
        }

        @keyframes navbarScan {

          0% {

            left:
              -30%;
          }

          100% {

            left:
              110%;
          }

        }

        /* =====================================================
           SEARCH
        ===================================================== */

        .navbar-search {

          width: 350px;

          height: 43px;

          position: relative;

          display: flex;

          align-items: center;

          border-radius: 14px;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.07
              );

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          transition:
            all
            0.35s
            ease;

          z-index: 2;
        }

        .navbar-search:hover {

          border-color:
            rgba(
              25,
              214,
              202,
              0.15
            );

          background:
            rgba(
              25,
              214,
              202,
              0.025
            );
        }

        .navbar-search.search-active {

          width: 380px;

          border-color:
            rgba(
              25,
              214,
              202,
              0.35
            );

          background:
            rgba(
              25,
              214,
              202,
              0.035
            );

          box-shadow:
            0 0 0 3px
              rgba(
                25,
                214,
                202,
                0.04
              ),
            0 0 25px
              rgba(
                25,
                214,
                202,
                0.06
              );
        }

        .navbar-search-icon {

          position: absolute;

          left: 15px;

          color:
            #5f706d;

          font-size: 14px;

          transition:
            all
            0.3s
            ease;
        }

        .search-active
          .navbar-search-icon {

          color:
            #19d6ca;

          transform:
            scale(
              1.08
            );
        }

        .navbar-search input {

          width: 100%;

          height: 100%;

          padding:
            0
            42px
            0
            43px;

          border: none;

          outline: none;

          background:
            transparent;

          color:
            #e6f0ee;

          font-size:
            13px;
        }

        .navbar-search input::placeholder {

          color:
            #62716f;
        }

        .search-shortcut {

          position: absolute;

          right: 13px;

          width: 22px;

          height: 22px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 6px;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.08
              );

          color:
            #526360;

          font-size:
            11px;

          font-family:
            monospace;

          transition:
            all
            0.3s ease;
        }

        .search-active
          .search-shortcut {

          color:
            #19d6ca;

          border-color:
            rgba(
              25,
              214,
              202,
              0.2
            );
        }

        /* =====================================================
           RIGHT
        ===================================================== */

        .navbar-right {

          display: flex;

          align-items: center;

          gap: 20px;

          position: relative;

          z-index: 5;
        }

        /* =====================================================
           NOTIFICATION
        ===================================================== */

        .notification-button {

          width: 40px;

          height: 40px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 12px;

          color:
            #687976;

          cursor: pointer;

          transition:
            all
            0.3s ease;
        }

        .notification-button:hover {

          color:
            #19d6ca;

          background:
            rgba(
              25,
              214,
              202,
              0.06
            );

          transform:
            translateY(
              -2px
            );
        }

        .notification-button svg {

          font-size:
            17px;

          transition:
            transform
            0.4s ease;
        }

        .notification-active svg {

          transform:
            rotate(
              -10deg
            )
            scale(
              1.08
            );
        }

        .notification-indicator {

          position: absolute;

          width: 6px;

          height: 6px;

          right: 8px;

          top: 7px;

          border-radius: 50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 10px
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

            opacity:
              1;
          }

          50% {

            transform:
              scale(
                1.7
              );

            opacity:
              0.5;
          }

        }

        .notification-wave {

          position: absolute;

          width: 18px;

          height: 18px;

          border-radius: 50%;

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.4
              );

          right: 2px;

          top: 1px;

          animation:
            notificationWave
            2s
            ease-out
            infinite;
        }

        @keyframes notificationWave {

          from {

            transform:
              scale(
                0.5
              );

            opacity:
              0.8;
          }

          to {

            transform:
              scale(
                1.5
              );

            opacity:
              0;
          }

        }

        /* =====================================================
           DIVIDER
        ===================================================== */

        .navbar-divider {

          width: 1px;

          height: 30px;

          background:
            rgba(
              255,
              255,
              255,
              0.07
            );
        }

        /* =====================================================
           PROFILE
        ===================================================== */

        .navbar-profile {

          display: flex;

          align-items: center;

          gap: 11px;

          padding:
            5px
            9px;

          border-radius: 14px;

          cursor: pointer;

          transition:
            all
            0.3s ease;
        }

        .navbar-profile:hover {

          background:
            rgba(
              25,
              214,
              202,
              0.045
            );

          transform:
            translateY(
              -2px
            );
        }

        .navbar-profile-info {

          text-align:
            right;
        }

        .navbar-full-name {

          color:
            #dfe9e7;

          font-size:
            13px;

          font-weight:
            600;
        }

        .navbar-username {

          color:
            #647573;

          font-size:
            11px;

          margin-top:
            2px;
        }

        /* =====================================================
           AVATAR
        ===================================================== */

        .navbar-avatar-wrapper {

          position:
            relative;
        }

        .navbar-avatar {

          width:
            38px;

          height:
            38px;

          border-radius:
            50%;

          border:
            2px solid
              rgba(
                25,
                214,
                202,
                0.3
              );

          transition:
            all
            0.35s ease;
        }

        .navbar-profile:hover
          .navbar-avatar {

          border-color:
            #19d6ca;

          box-shadow:
            0 0 18px
              rgba(
                25,
                214,
                202,
                0.3
              );

          transform:
            scale(
              1.06
            );
        }

        .online-status {

          position:
            absolute;

          right:
            0;

          bottom:
            0;

          width:
            9px;

          height:
            9px;

          border-radius:
            50%;

          background:
            #19d6ca;

          border:
            2px solid
              #061011;

          box-shadow:
            0 0 8px
              #19d6ca;
        }

        .profile-arrow {

          color:
            #586967;

          font-size:
            9px;

          transition:
            transform
            0.3s ease;
        }

        .arrow-open {

          transform:
            rotate(
              180deg
            );

          color:
            #19d6ca;
        }

        /* =====================================================
           PROFILE DROPDOWN
        ===================================================== */

        .profile-dropdown {

          position:
            absolute;

          right:
            0;

          top:
            62px;

          width:
            230px;

          padding:
            10px;

          border-radius:
            16px;

          background:
            rgba(
              5,
              17,
              18,
              0.97
            );

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.15
              );

          box-shadow:
            0 25px 60px
              rgba(
                0,
                0,
                0,
                0.45
              ),
            0 0 25px
              rgba(
                25,
                214,
                202,
                0.04
              );

          backdrop-filter:
            blur(25px);

          animation:
            dropdownAppear
            0.25s
            ease
            both;
        }

        @keyframes dropdownAppear {

          from {

            opacity:
              0;

            transform:
              translateY(
                -8px
              )
              scale(
                0.96
              );
          }

          to {

            opacity:
              1;

            transform:
              translateY(
                0
              )
              scale(
                1
              );
          }

        }

        .dropdown-header {

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          padding:
            8px;
        }

        .dropdown-header img {

          width:
            38px;

          height:
            38px;

          border-radius:
            50%;
        }

        .dropdown-header strong {

          display:
            block;

          color:
            #e3eeec;

          font-size:
            12px;
        }

        .dropdown-header span {

          display:
            block;

          color:
            #647573;

          font-size:
            10px;

          margin-top:
            3px;
        }

        .dropdown-line {

          height:
            1px;

          margin:
            7px 0;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );
        }

        .profile-dropdown button {

          width:
            100%;

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          padding:
            11px;

          border:
            none;

          border-radius:
            9px;

          background:
            transparent;

          color:
            #91a09e;

          font-size:
            12px;

          text-align:
            left;

          cursor:
            pointer;

          transition:
            all
            0.25s ease;
        }

        .profile-dropdown button:hover {

          color:
            #19d6ca;

          background:
            rgba(
              25,
              214,
              202,
              0.06
            );

          transform:
            translateX(
              3px
            );
        }

        .dropdown-logout {

          color:
            #bd7777 !important;
        }

        .dropdown-logout:hover {

          color:
            #ff8585 !important;

          background:
            rgba(
              239,
              68,
              68,
              0.06
            ) !important;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 850px) {

          .app-navbar {

            padding:
              0
              20px;
          }

          .navbar-search {

            width:
              280px;
          }

          .navbar-search.search-active {

            width:
              310px;
          }

        }

        @media (max-width: 650px) {

          .app-navbar {

            height:
              70px;

            padding:
              0
              15px;
          }

          .navbar-search {

            display:
              none;
          }

          .navbar-right {

            margin-left:
              auto;

            gap:
              10px;
          }

          .navbar-divider {

            display:
              none;
          }

          .navbar-profile-info {

            display:
              none;
          }

          .profile-arrow {

            display:
              none;
          }

          .profile-dropdown {

            right:
              5px;

            top:
              58px;
          }

        }

      `}</style>
    </>
  );
}

export default Navbar;