
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const sendOTP = async () => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/auth/forgot-password",
          {
            email
          }
        );

      setMessage(
  response.data.message
);

setTimeout(() => {

  window.location.href = "/";

}, 2000);

localStorage.setItem(
  "reset_email",
  email
);

setTimeout(() => {
  window.location.href =
    "/reset-password";
}, 1500);

    } catch (error) {

      setMessage(
        error.response?.data?.detail ||
        "Failed to send OTP"
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
        }}
      >
        <h1>
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={sendOTP}
          style={buttonStyle}
        >
          Send OTP
        </button>

        {message && (
          <p
            style={{
              marginTop: "15px",
            }}
          >
            {message}
          </p>
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
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  border: "none",
  borderRadius: "10px",
  background:
    "linear-gradient(90deg,#3b82f6,#22c55e)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default ForgotPassword;
