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
} from "react-icons/fa";

function Profile() {
  const userId = localStorage.getItem("user_id");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/profile/${userId}`
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
    setTimeout(() => setMessage(""), 5000); // Auto hide after 5 seconds
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/profile/update/${userId}`,
        { name, email }
      );
      showNotification(response.data.message || "Profile updated successfully!", "success");
    } catch (error) {
      console.error(error);
      showNotification("Failed to update profile.", "error");
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification("Please fill in all password fields.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification("New passwords do not match.", "error");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/profile/change-password/${userId}`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );

      showNotification(response.data.message || "Password changed successfully!", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      showNotification(
        error.response?.data?.detail || "Password update failed.",
        "error"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "40px 60px",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "1200px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "16px", color: "#60a5fa", display: "flex" }}>
              <FaUserCircle size={30} />
            </div>
            Account Profile
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
            Manage your personal information and security settings.
          </p>
        </div>

        {/* Global Notification Banner */}
        {message && (
          <div
            style={{
              marginBottom: "30px",
              padding: "16px 20px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: messageType === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
              border: messageType === "success" ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
              color: messageType === "success" ? "#86efac" : "#fca5a5",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            {messageType === "success" ? <FaCheckCircle size={20} /> : <FaExclamationTriangle size={20} />}
            <span style={{ fontSize: "15px", fontWeight: "500" }}>{message}</span>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "30px" }}>
          
          {/* LEFT: Personal Information */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "35px",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ fontSize: "20px", margin: "0 0 25px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaUser color="#60a5fa" /> Personal Information
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <InputGroup 
                  icon={<FaUser />} 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your name" 
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <InputGroup 
                  icon={<FaEnvelope />} 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                />
              </div>

              <button
                onClick={saveProfile}
                style={{
                  marginTop: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  border: "none", borderRadius: "12px",
                  color: "white", fontSize: "16px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.2s ease",
                  boxShadow: "0 8px 20px -5px rgba(59,130,246,0.4)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT: Security & Password */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "35px",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ fontSize: "20px", margin: "0 0 25px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaKey color="#a855f7" /> Security Settings
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Current Password</label>
                <PasswordInputGroup 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  placeholder="Enter current password"
                  showPassword={showCurrent}
                  setShowPassword={setShowCurrent}
                />
              </div>

              <div>
                <label style={labelStyle}>New Password</label>
                <PasswordInputGroup 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="Enter new password"
                  showPassword={showNew}
                  setShowPassword={setShowNew}
                />
              </div>

              <div>
                <label style={labelStyle}>Confirm New Password</label>
                <PasswordInputGroup 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm new password"
                  showPassword={showConfirm}
                  setShowPassword={setShowConfirm}
                />
              </div>

              <button
                onClick={changePassword}
                style={{
                  marginTop: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  border: "none", borderRadius: "12px",
                  color: "white", fontSize: "16px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.2s ease",
                  boxShadow: "0 8px 20px -5px rgba(139,92,246,0.4)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <FaLock /> Update Password
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// --- Helper Styles & Components ---

const labelStyle = {
  display: "block",
  color: "#cbd5e1",
  fontSize: "14px",
  marginBottom: "8px",
  fontWeight: "500",
};

function InputGroup({ icon, type, value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#64748b" }}>
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "14px 15px 14px 45px",
          borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.2)", color: "white", outline: "none",
          fontSize: "15px", transition: "all 0.3s ease", boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.background = "rgba(0,0,0,0.4)";
          e.target.style.borderColor = "rgba(96, 165, 250, 0.5)";
        }}
        onBlur={(e) => {
          e.target.style.background = "rgba(0,0,0,0.2)";
          e.target.style.borderColor = "rgba(255,255,255,0.08)";
        }}
      />
    </div>
  );
}

function PasswordInputGroup({ value, onChange, placeholder, showPassword, setShowPassword }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#64748b" }}>
        <FaLock />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "14px 45px",
          borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.2)", color: "white", outline: "none",
          fontSize: "15px", transition: "all 0.3s ease", boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.background = "rgba(0,0,0,0.4)";
          e.target.style.borderColor = "rgba(168, 85, 247, 0.5)"; // Purple glow for password
        }}
        onBlur={(e) => {
          e.target.style.background = "rgba(0,0,0,0.2)";
          e.target.style.borderColor = "rgba(255,255,255,0.08)";
        }}
      />
      <div 
        onClick={() => setShowPassword(!showPassword)}
        style={{ position: "absolute", top: "50%", right: "15px", transform: "translateY(-50%)", color: "#94a3b8", cursor: "pointer" }}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
}

export default Profile;