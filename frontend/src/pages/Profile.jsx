import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaKey,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";

function Profile() {
  const userId = localStorage.getItem("user_id");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `/api/profile/${userId}`
      );

      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const showNotification = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put(
        `/api/profile/update/${userId}`,
        {
          name,
          email,
        }
      );

      // Keep localStorage updated
      localStorage.setItem("name", name);
      localStorage.setItem("full_name", name);

      showNotification(
        response.data.message ||
          "Profile updated successfully!",
        "success"
      );
    } catch (error) {
      console.error(error);

      showNotification(
        "Failed to update profile.",
        "error"
      );
    }
  };

  const changePassword = async () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      showNotification(
        "Please fill in all password fields.",
        "error"
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification(
        "New passwords do not match.",
        "error"
      );

      return;
    }

    try {
      const response = await axios.put(
        `/api/profile/change-password/${userId}`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );

      showNotification(
        response.data.message ||
          "Password changed successfully!",
        "success"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      showNotification(
        error.response?.data?.detail ||
          "Password update failed.",
        "error"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020707 0%,#061316 45%,#071c22 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =====================================
          ANIMATIONS
      ===================================== */}

      <style>
        {`
          @keyframes floatOne {
            0%,100% {
              transform: translate(0,0) scale(1);
            }

            50% {
              transform: translate(50px,35px) scale(1.08);
            }
          }

          @keyframes floatTwo {
            0%,100% {
              transform: translate(0,0);
            }

            50% {
              transform: translate(-40px,-35px);
            }
          }

          @keyframes pulseGlow {
            0%,100% {
              opacity:.18;
              transform:scale(1);
            }

            50% {
              opacity:.45;
              transform:scale(1.2);
            }
          }

          @keyframes fadeUp {
            from {
              opacity:0;
              transform:translateY(30px);
            }

            to {
              opacity:1;
              transform:translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity:0;
              transform:translateY(-10px) scale(.98);
            }

            to {
              opacity:1;
              transform:translateY(0) scale(1);
            }
          }

          @keyframes iconPulse {
            0%,100% {
              box-shadow:0 0 0 rgba(34,211,238,0);
            }

            50% {
              box-shadow:
                0 0 30px rgba(34,211,238,.15);
            }
          }

          .profile-card {
            transition:
              transform .35s ease,
              border-color .35s ease,
              box-shadow .35s ease;
          }

          .profile-card:hover {
            transform:translateY(-6px);

            border-color:
              rgba(34,211,238,.22) !important;

            box-shadow:
              0 25px 60px rgba(0,0,0,.35),
              0 0 40px rgba(34,211,238,.05);
          }

          .profile-button {
            transition:
              transform .25s ease,
              box-shadow .25s ease;
          }

          .profile-button:hover {
            transform:translateY(-3px);
          }

          .profile-input::placeholder {
            color:#64748b;
          }
        `}
      </style>

      {/* =====================================
          AMBIENT BACKGROUND
      ===================================== */}

      <div
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,220,200,.12),transparent 70%)",
          top: "-220px",
          left: "280px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatOne 12s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)",
          right: "-220px",
          bottom: "-180px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatTwo 14s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,211,238,.13),transparent 70%)",
          right: "30%",
          top: "45%",
          pointerEvents: "none",
          animation:
            "pulseGlow 7s ease-in-out infinite",
        }}
      />

      <Sidebar />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main
        style={{
          marginLeft: "260px",
          padding: "45px 60px",
          width: "calc(100% - 260px)",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          style={{
            marginBottom: "38px",
            animation:
              "fadeUp .7s ease forwards",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "8px 14px",
              borderRadius: "30px",
              background:
                "rgba(34,211,238,.07)",
              border:
                "1px solid rgba(34,211,238,.15)",
              color: "#67e8f9",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "17px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22d3ee",
                boxShadow:
                  "0 0 12px #22d3ee",
              }}
            />

            ACCOUNT SETTINGS
          </div>

          <h1
            style={{
              fontSize: "50px",
              fontWeight: "900",
              margin: "0 0 12px",
              letterSpacing: "-1.5px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              background:
                "linear-gradient(90deg,#ffffff,#67e8f9,#60a5fa)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Account Profile
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
              margin: 0,
              lineHeight: "1.7",
            }}
          >
            Manage your personal information
            and account security.
          </p>
        </div>

        {/* =====================================
            NOTIFICATION
        ===================================== */}

        {message && (
          <div
            style={{
              marginBottom: "30px",
              padding: "16px 20px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background:
                messageType === "success"
                  ? "rgba(34,197,94,.08)"
                  : "rgba(239,68,68,.08)",
              border:
                messageType === "success"
                  ? "1px solid rgba(34,197,94,.2)"
                  : "1px solid rgba(239,68,68,.2)",
              color:
                messageType === "success"
                  ? "#86efac"
                  : "#fca5a5",
              animation:
                "fadeIn .4s ease",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.15)",
            }}
          >
            {messageType ===
            "success" ? (
              <FaCheckCircle size={19} />
            ) : (
              <FaExclamationTriangle
                size={19}
              />
            )}

            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {message}
            </span>
          </div>
        )}

        {/* =====================================
            CARDS
        ===================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(450px,1fr))",
            gap: "28px",
          }}
        >
          {/* =====================================
              PERSONAL INFORMATION
          ===================================== */}

          <div
            className="profile-card"
            style={{
              background:
                "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))",
              backdropFilter:
                "blur(25px)",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "25px",
              padding: "35px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,.25)",
              animation:
                "fadeUp .8s ease forwards",
            }}
          >
            {/* Card header */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "28px",
                paddingBottom: "20px",
                borderBottom:
                  "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  background:
                    "linear-gradient(135deg,rgba(34,211,238,.12),rgba(59,130,246,.12))",
                  border:
                    "1px solid rgba(34,211,238,.15)",
                  color: "#67e8f9",
                  animation:
                    "iconPulse 4s ease-in-out infinite",
                }}
              >
                <FaUser size={21} />
              </div>

              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    margin: 0,
                    color: "#f8fafc",
                  }}
                >
                  Personal Information
                </h2>

                <p
                  style={{
                    margin:
                      "4px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Update your basic
                  account details.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "21px",
              }}
            >
              {/* Name */}

              <div>
                <label
                  style={labelStyle}
                >
                  Full Name
                </label>

                <InputGroup
                  icon={<FaUser />}
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  style={labelStyle}
                >
                  Email Address
                </label>

                <InputGroup
                  icon={
                    <FaEnvelope />
                  }
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email address"
                />
              </div>

              {/* Save */}

              <button
                className="profile-button"
                onClick={
                  saveProfile
                }
                style={{
                  marginTop: "8px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  gap: "10px",
                  width: "100%",
                  padding: "14px",
                  background:
                    "linear-gradient(135deg,#06b6d4,#2563eb)",
                  border: "none",
                  borderRadius: "13px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow:
                    "0 10px 25px rgba(6,182,212,.18)",
                }}
              >
                <FaSave />

                Save Changes
              </button>
            </div>
          </div>

          {/* =====================================
              SECURITY
          ===================================== */}

          <div
            className="profile-card"
            style={{
              background:
                "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))",
              backdropFilter:
                "blur(25px)",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "25px",
              padding: "35px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,.25)",
              animation:
                "fadeUp 1s ease forwards",
            }}
          >
            {/* Security header */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "28px",
                paddingBottom: "20px",
                borderBottom:
                  "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  background:
                    "linear-gradient(135deg,rgba(139,92,246,.12),rgba(59,130,246,.12))",
                  border:
                    "1px solid rgba(139,92,246,.15)",
                  color: "#a78bfa",
                  animation:
                    "iconPulse 4s ease-in-out infinite",
                }}
              >
                <FaShieldAlt
                  size={21}
                />
              </div>

              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    margin: 0,
                    color: "#f8fafc",
                  }}
                >
                  Security Settings
                </h2>

                <p
                  style={{
                    margin:
                      "4px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Keep your account
                  protected.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Current */}

              <div>
                <label
                  style={labelStyle}
                >
                  Current Password
                </label>

                <PasswordInputGroup
                  value={
                    currentPassword
                  }
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter current password"
                  showPassword={
                    showCurrent
                  }
                  setShowPassword={
                    setShowCurrent
                  }
                />
              </div>

              {/* New */}

              <div>
                <label
                  style={labelStyle}
                >
                  New Password
                </label>

                <PasswordInputGroup
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter new password"
                  showPassword={
                    showNew
                  }
                  setShowPassword={
                    setShowNew
                  }
                />
              </div>

              {/* Confirm */}

              <div>
                <label
                  style={labelStyle}
                >
                  Confirm New Password
                </label>

                <PasswordInputGroup
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  showPassword={
                    showConfirm
                  }
                  setShowPassword={
                    setShowConfirm
                  }
                />
              </div>

              {/* Update */}

              <button
                className="profile-button"
                onClick={
                  changePassword
                }
                style={{
                  marginTop: "8px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  gap: "10px",
                  width: "100%",
                  padding: "14px",
                  background:
                    "linear-gradient(135deg,#8b5cf6,#6366f1)",
                  border: "none",
                  borderRadius: "13px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow:
                    "0 10px 25px rgba(139,92,246,.18)",
                }}
              >
                <FaKey />

                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* =====================================
            SECURITY FOOTER
        ===================================== */}

        <div
          style={{
            marginTop: "28px",
            padding: "18px 22px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background:
              "rgba(34,211,238,.025)",
            border:
              "1px solid rgba(34,211,238,.08)",
            color: "#64748b",
            fontSize: "12px",
            animation:
              "fadeUp 1.2s ease forwards",
          }}
        >
          <FaShieldAlt
            color="#22d3ee"
          />

          <span>
            Your account information
            is protected with secure
            authentication and password
            protection.
          </span>
        </div>
      </main>
    </div>
  );
}

/* =====================================
   LABEL STYLE
===================================== */

const labelStyle = {
  display: "block",
  color: "#cbd5e1",
  fontSize: "13px",
  marginBottom: "8px",
  fontWeight: "600",
};

/* =====================================
   NORMAL INPUT
===================================== */

function InputGroup({
  icon,
  type,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "15px",
          transform:
            "translateY(-50%)",
          color: "#64748b",
          pointerEvents: "none",
        }}
      >
        {icon}
      </div>

      <input
        className="profile-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding:
            "14px 15px 14px 45px",
          borderRadius: "13px",
          border:
            "1px solid rgba(255,255,255,.08)",
          background:
            "rgba(0,0,0,.22)",
          color: "white",
          outline: "none",
          fontSize: "14px",
          transition:
            "all .3s ease",
          boxSizing: "border-box",
          fontFamily:
            "'Inter',sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.background =
            "rgba(0,0,0,.4)";

          e.target.style.borderColor =
            "rgba(34,211,238,.35)";

          e.target.style.boxShadow =
            "0 0 25px rgba(34,211,238,.06)";
        }}
        onBlur={(e) => {
          e.target.style.background =
            "rgba(0,0,0,.22)";

          e.target.style.borderColor =
            "rgba(255,255,255,.08)";

          e.target.style.boxShadow =
            "none";
        }}
      />
    </div>
  );
}

/* =====================================
   PASSWORD INPUT
===================================== */

function PasswordInputGroup({
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword,
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "15px",
          transform:
            "translateY(-50%)",
          color: "#64748b",
          pointerEvents: "none",
        }}
      >
        <FaLock />
      </div>

      <input
        className="profile-input"
        type={
          showPassword
            ? "text"
            : "password"
        }
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding:
            "14px 45px",
          borderRadius: "13px",
          border:
            "1px solid rgba(255,255,255,.08)",
          background:
            "rgba(0,0,0,.22)",
          color: "white",
          outline: "none",
          fontSize: "14px",
          transition:
            "all .3s ease",
          boxSizing: "border-box",
          fontFamily:
            "'Inter',sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.background =
            "rgba(0,0,0,.4)";

          e.target.style.borderColor =
            "rgba(139,92,246,.4)";

          e.target.style.boxShadow =
            "0 0 25px rgba(139,92,246,.07)";
        }}
        onBlur={(e) => {
          e.target.style.background =
            "rgba(0,0,0,.22)";

          e.target.style.borderColor =
            "rgba(255,255,255,.08)";

          e.target.style.boxShadow =
            "none";
        }}
      />

      <div
        onClick={() =>
          setShowPassword(
            !showPassword
          )
        }
        style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform:
            "translateY(-50%)",
          color: "#94a3b8",
          cursor: "pointer",
          transition:
            "color .2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color =
            "#67e8f9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color =
            "#94a3b8";
        }}
      >
        {showPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </div>
    </div>
  );
}

export default Profile;