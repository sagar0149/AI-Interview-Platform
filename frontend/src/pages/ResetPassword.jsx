
import { useState } from "react";
import axios from "axios";

function ResetPassword() {

  const [otp, setOtp] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const resetPassword =
    async () => {

      if (
        newPassword !==
        confirmPassword
      ) {

        setMessage(
          "❌ Passwords do not match"
        );

        return;
      }

      const email =
        localStorage.getItem(
          "reset_email"
        );

      try {

        await axios.post(
          "http://127.0.0.1:8000/auth/verify-otp",
          {
            email,
            otp,
            new_password:
              newPassword
          }
        );

        setMessage(
          "✅ Password reset successful. Redirecting to login..."
        );

        localStorage.removeItem(
          "reset_email"
        );

        setTimeout(() => {

          window.location.href =
            "/";

        }, 2000);

      } catch (error) {

        setMessage(
          error.response?.data?.detail ||
          "Reset failed"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#1e293b",
          padding: "35px",
          borderRadius: "20px",
          boxShadow:
            "0 0 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Reset Password
        </h1>

        <input
          placeholder="OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            resetPassword
          }
          style={buttonStyle}
        >
          Reset Password
        </button>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "10px",
              background:
                "#0f172a",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  border: "none",
  borderRadius: "10px",
  background:
    "linear-gradient(90deg,#8b5cf6,#6366f1)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

export default ResetPassword;
