
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(30);

  const otpRefs = useRef([]);

  /* ---------------- OTP TIMER ---------------- */

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ---------------- OTP INPUT ---------------- */

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);

    // Move to next box
    if (digit && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < 3
    ) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* ---------------- OTP PASTE ---------------- */

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    const updatedOtp = ["", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const nextIndex = Math.min(
      pasted.length,
      3
    );

    otpRefs.current[nextIndex]?.focus();
  };

  /* ---------------- RESEND OTP ---------------- */

  const resendOtp = () => {
    if (timeLeft > 0) return;

    /*
      Your backend can be connected here later
      if you have a resend OTP endpoint.
    */

    setTimeLeft(30);
    setMessage("A new OTP has been requested.");
  };

  /* ---------------- RESET PASSWORD ---------------- */

  const resetPassword = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setMessage(
        "Please enter the complete 4-digit OTP."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage(
        "Please complete all password fields."
      );
      return;
    }

    if (newPassword.length < 8) {
      setMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(
        "Passwords do not match."
      );
      return;
    }

    const email =
      localStorage.getItem("reset_email");

    if (!email) {
      setMessage(
        "Reset session expired. Please request a new OTP."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        "/api/auth/verify-otp",
        {
          email,
          otp: otpValue,
          new_password: newPassword,
        }
      );

      setMessage(
        "Password reset successful. Redirecting to login..."
      );

      localStorage.removeItem(
        "reset_email"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "Unable to reset password. Please check your OTP."
      );

      setLoading(false);
    }
  };

  const passwordsMatch =
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword;

  const otpComplete =
    otp.every((digit) => digit !== "");

  return (
    <div className="reset-page">

      {/* Background glow */}
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <main className="reset-container">

        {/* Top label */}
        <div className="component-label">
          AI INTERVIEW · ACCOUNT SECURITY
        </div>

        {/* Main title */}
        <h1 className="main-title">
          Reset
          <span>Password</span>
        </h1>

        {/* Card */}
        <div className="reset-card">

          {/* Brand */}
          <div className="brand-row">
            <div className="brand-orb">
              <div className="orb-dot"></div>
            </div>

            <span>AI INTERVIEW</span>
          </div>

          {/* Heading */}
          <h2>Verify your identity</h2>

          <p className="welcome-text">
            Enter the verification code sent to
            your email and create a new password.
          </p>

          {/* ---------------- OTP ---------------- */}

          <div className="otp-section">

            <div className="otp-label-row">
              <label>Verification Code</label>

              <span
                className={
                  otpComplete
                    ? "otp-status complete"
                    : "otp-status"
                }
              >
                {otpComplete
                  ? "VERIFIED"
                  : "4 DIGITS"}
              </span>
            </div>

            {/* Circular OTP */}
            <div
              className={`otp-circle ${
                otpComplete
                  ? "otp-complete"
                  : ""
              }`}
            >

              {/* Outer ring */}
              <div className="otp-ring"></div>

              {/* Decorative ring */}
              <div className="otp-ring-inner"></div>

              {/* Center */}
              <div className="otp-center">
                <div className="center-dot"></div>
              </div>

              {/* Top */}
              <div className="otp-position otp-top">
                <input
                  ref={(element) =>
                    (otpRefs.current[0] =
                      element)
                  }
                  value={otp[0]}
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  onChange={(e) =>
                    handleOtpChange(
                      0,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(0, e)
                  }
                  onPaste={handleOtpPaste}
                  aria-label="OTP digit 1"
                />
              </div>

              {/* Right */}
              <div className="otp-position otp-right">
                <input
                  ref={(element) =>
                    (otpRefs.current[1] =
                      element)
                  }
                  value={otp[1]}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleOtpChange(
                      1,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(1, e)
                  }
                  aria-label="OTP digit 2"
                />
              </div>

              {/* Bottom */}
              <div className="otp-position otp-bottom">
                <input
                  ref={(element) =>
                    (otpRefs.current[2] =
                      element)
                  }
                  value={otp[2]}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleOtpChange(
                      2,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(2, e)
                  }
                  aria-label="OTP digit 3"
                />
              </div>

              {/* Left */}
              <div className="otp-position otp-left">
                <input
                  ref={(element) =>
                    (otpRefs.current[3] =
                      element)
                  }
                  value={otp[3]}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleOtpChange(
                      3,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(3, e)
                  }
                  aria-label="OTP digit 4"
                />
              </div>

            </div>

            {/* OTP instruction */}
            <div className="otp-instruction">
              <span className="instruction-dot"></span>

              <span>
                Enter the 4-digit code
              </span>
            </div>

            {/* Resend */}
            <div className="resend-section">

              <span>
                Didn't receive the code?
              </span>

              {timeLeft > 0 ? (
                <span className="resend-timer">
                  Resend in{" "}
                  <strong>
                    {timeLeft}s
                  </strong>
                </span>
              ) : (
                <button
                  className="resend-button"
                  onClick={resendOtp}
                >
                  Resend code
                </button>
              )}

            </div>

          </div>

          {/* ---------------- PASSWORD ---------------- */}

          <div className="input-group">

            <label>New Password</label>

            <div
              className={`input-wrapper ${
                newPassword
                  ? "active"
                  : ""
              }`}
            >

              <span className="input-icon">
                🔒
              </span>

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                autoComplete="new-password"
              />

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
              >
                {showNewPassword
                  ? "◉"
                  : "◌"}
              </button>

            </div>

            {newPassword && (
              <div className="password-hint">
                {newPassword.length >= 8
                  ? "✓ Strong enough"
                  : "Use at least 8 characters"}
              </div>
            )}

          </div>

          {/* Confirm Password */}

          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <div
              className={`input-wrapper ${
                confirmPassword
                  ? passwordsMatch
                    ? "match"
                    : "active"
                  : ""
              }`}
            >

              <span className="input-icon">
                🔐
              </span>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                autoComplete="new-password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    resetPassword();
                  }
                }}
              />

              {confirmPassword && (
                <span
                  className={
                    passwordsMatch
                      ? "check-icon"
                      : "error-icon"
                  }
                >
                  {passwordsMatch
                    ? "✓"
                    : "!"}
                </span>
              )}

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "◉"
                  : "◌"}
              </button>

            </div>

          </div>

          {/* Reset button */}

          <button
            className="reset-button"
            onClick={resetPassword}
            disabled={loading}
          >
            <span>
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </span>

            {!loading && (
              <span className="button-arrow">
                →
              </span>
            )}
          </button>

          {/* Status */}

          {message && (
            <div
              className={`status-area ${
                message.includes(
                  "successful"
                )
                  ? "success"
                  : "error"
              }`}
            >
              <div className="status-dot"></div>

              <span>{message}</span>
            </div>
          )}

          {/* Divider */}

          <div className="divider"></div>

          {/* Back */}

          <div className="back-login">
            Remember your password?

            <Link to="/">
              Back to Login
            </Link>
          </div>

        </div>

        {/* Footer */}

        <div className="technical-footer">
          SECURE PASSWORD RECOVERY · AI INTERVIEW
        </div>

      </main>

      {/* CSS */}

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

        /* PAGE */

        .reset-page {
          min-height: 100vh;
          width: 100%;

          background:
            radial-gradient(
              circle at 50% 25%,
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

          color: #f2f7f6;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          position: relative;

          overflow-x: hidden;
          overflow-y: auto;
        }

        /* GLOW */

        .glow {
          position: fixed;

          border-radius: 50%;

          filter: blur(110px);

          pointer-events: none;

          opacity: 0.14;
        }

        .glow-one {
          width: 360px;
          height: 360px;

          background: #00e5d0;

          top: 15%;
          left: 10%;
        }

        .glow-two {
          width: 330px;
          height: 330px;

          background: #008f86;

          right: 8%;
          bottom: 8%;
        }

        /* CONTAINER */

        .reset-container {
          min-height: 100vh;

          display: flex;

          flex-direction: column;

          align-items: center;

          padding:
            50px
            20px
            40px;

          position: relative;

          z-index: 2;
        }

        /* LABEL */

        .component-label {
          color: #18aaa0;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 4px;

          margin-bottom: 12px;

          text-align: center;
        }

        /* TITLE */

        .main-title {
          margin:
            0
            0
            28px;

          text-align: center;

          font-size:
            clamp(
              45px,
              6vw,
              65px
            );

          line-height: 0.92;

          letter-spacing: -3px;

          font-weight: 800;
        }

        .main-title span {
          display: block;

          color: #19d6ca;

          text-shadow:
            0 0 20px
              rgba(
                25,
                214,
                202,
                0.18
              ),
            0 0 45px
              rgba(
                25,
                214,
                202,
                0.08
              );
        }

        /* CARD */

        .reset-card {
          width: 100%;

          max-width: 510px;

          padding:
            33px
            36px
            30px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(
                36,
                54,
                54,
                0.72
              ),
              rgba(
                10,
                26,
                26,
                0.9
              )
            );

          border:
            1px solid
              rgba(
                170,
                210,
                205,
                0.12
              );

          box-shadow:
            0 35px 80px
              rgba(
                0,
                0,
                0,
                0.45
              ),
            inset 0 1px 0
              rgba(
                255,
                255,
                255,
                0.04
              );

          backdrop-filter:
            blur(18px);
        }

        /* BRAND */

        .brand-row {
          display: flex;

          align-items: center;

          gap: 11px;

          color: #8a9d9b;

          font-size: 11px;

          letter-spacing: 4px;

          margin-bottom: 23px;
        }

        .brand-orb {
          width: 25px;
          height: 25px;

          border:
            2px solid
              #16d8cb;

          border-radius: 50%;

          display: flex;

          align-items: center;

          justify-content: center;

          box-shadow:
            0 0 10px
              rgba(
                22,
                216,
                203,
                0.35
              );
        }

        .orb-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #17d9cc;

          box-shadow:
            0 0 10px
              #17d9cc;
        }

        /* HEADING */

        .reset-card h2 {
          margin:
            0
            0
            6px;

          font-size: 25px;

          font-weight: 700;

          letter-spacing: -0.5px;
        }

        .welcome-text {
          color: #7e8e8c;

          font-size: 14px;

          line-height: 1.5;

          margin:
            0
            0
            22px;
        }

        /* OTP */

        .otp-section {
          margin-bottom: 23px;
        }

        .otp-label-row {
          display: flex;

          justify-content: space-between;

          align-items: center;

          margin-bottom: 4px;
        }

        .otp-label-row label {
          color: #a4b1af;

          font-size: 13px;

          font-weight: 600;
        }

        .otp-status {
          color: #627370;

          font-size: 9px;

          letter-spacing: 2px;

          font-weight: 800;
        }

        .otp-status.complete {
          color: #19d6ca;
        }

        /* CIRCLE */

        .otp-circle {
          width: 250px;
          height: 250px;

          margin:
            4px
            auto
            5px;

          position: relative;

          border-radius: 50%;
        }

        .otp-ring {
          position: absolute;

          inset: 18px;

          border-radius: 50%;

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.35
              );

          box-shadow:
            0 0 20px
              rgba(
                25,
                214,
                202,
                0.05
              );
        }

        .otp-ring-inner {
          position: absolute;

          inset: 55px;

          border-radius: 50%;

          border:
            1px dashed
              rgba(
                25,
                214,
                202,
                0.25
              );

          animation:
            rotate-ring
            18s
            linear
            infinite;
        }

        @keyframes rotate-ring {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        /* CENTER */

        .otp-center {
          position: absolute;

          width: 54px;
          height: 54px;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              3,
              19,
              19,
              0.95
            );

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.3
              );

          display: flex;

          align-items: center;

          justify-content: center;

          box-shadow:
            inset 0 0 15px
              rgba(
                25,
                214,
                202,
                0.05
              );
        }

        .center-dot {
          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 12px
              #19d6ca;
        }

        /* OTP POSITIONS */

        .otp-position {
          position: absolute;

          width: 58px;
          height: 58px;

          z-index: 5;
        }

        .otp-top {
          top: 0;

          left: 50%;

          transform:
            translateX(-50%);
        }

        .otp-right {
          right: 0;

          top: 50%;

          transform:
            translateY(-50%);
        }

        .otp-bottom {
          bottom: 0;

          left: 50%;

          transform:
            translateX(-50%);
        }

        .otp-left {
          left: 0;

          top: 50%;

          transform:
            translateY(-50%);
        }

        /* OTP BOX */

        .otp-position input {
          width: 58px;
          height: 58px;

          border-radius: 17px;

          border:
            1px solid
              rgba(
                32,
                170,
                160,
                0.75
              );

          background:
            linear-gradient(
              145deg,
              rgba(
                18,
                39,
                39,
                0.95
              ),
              rgba(
                4,
                18,
                18,
                0.95
              )
            );

          color: #e7f8f6;

          text-align: center;

          font-size: 23px;

          font-weight: 700;

          outline: none;

          font-family:
            monospace;

          caret-color: #19d6ca;

          box-shadow:
            0 8px 20px
              rgba(
                0,
                0,
                0,
                0.25
              );

          transition:
            border-color
              0.2s ease,
            box-shadow
              0.2s ease,
            transform
              0.2s ease;
        }

        .otp-position input:focus {
          border-color: #19d6ca;

          box-shadow:
            0 0 0 3px
              rgba(
                25,
                214,
                202,
                0.08
              ),
            0 0 22px
              rgba(
                25,
                214,
                202,
                0.18
              );

          transform:
            scale(1.04);
        }

        .otp-complete
          .otp-position
          input {
          border-color:
            rgba(
              25,
              214,
              202,
              0.95
            );

          box-shadow:
            0 0 18px
              rgba(
                25,
                214,
                202,
                0.12
              );
        }

        /* OTP INSTRUCTION */

        .otp-instruction {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          color: #71817e;

          font-size: 11px;

          margin-top: 1px;
        }

        .instruction-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #19cfc4;
        }

        /* RESEND */

        .resend-section {
          display: flex;

          justify-content: center;

          align-items: center;

          flex-wrap: wrap;

          gap: 5px;

          margin-top: 12px;

          color: #687775;

          font-size: 12px;
        }

        .resend-timer {
          color: #8c9b99;
        }

        .resend-timer strong {
          color: #19cfc4;
        }

        .resend-button {
          border: none;

          background:
            transparent;

          color: #19cfc4;

          font-size: 12px;

          font-weight: 700;

          cursor: pointer;

          padding: 0;
        }

        .resend-button:hover {
          color: #61f3eb;

          text-decoration:
            underline;
        }

        /* INPUTS */

        .input-group {
          margin-bottom: 18px;
        }

        .input-group label {
          display: block;

          color: #a4b1af;

          font-size: 13px;

          font-weight: 600;

          margin-bottom: 8px;
        }

        .input-wrapper {
          height: 56px;

          display: flex;

          align-items: center;

          gap: 12px;

          padding:
            0
            15px;

          border-radius: 15px;

          background:
            rgba(
              2,
              12,
              13,
              0.78
            );

          border:
            1px solid
              rgba(
                32,
                170,
                160,
                0.65
              );

          transition:
            border-color
              0.25s ease,
            box-shadow
              0.25s ease;
        }

        .input-wrapper:focus-within,
        .input-wrapper.active {
          border-color: #1ad8ca;

          box-shadow:
            0 0 0 3px
              rgba(
                22,
                216,
                203,
                0.08
              ),
            0 0 18px
              rgba(
                22,
                216,
                203,
                0.12
              );
        }

        .input-wrapper.match {
          border-color: #1bd1c5;
        }

        .input-icon {
          width: 21px;

          color: #22bdb4;

          font-size: 17px;

          text-align: center;

          flex-shrink: 0;
        }

        .input-wrapper input {
          flex: 1;

          min-width: 0;

          border: none;

          outline: none;

          background:
            transparent;

          color: #e8f1f0;

          font-size: 15px;

          font-family:
            inherit;
        }

        .input-wrapper input::placeholder {
          color: #647573;
        }

        /* CHECK */

        .check-icon {
          width: 21px;
          height: 21px;

          display: flex;

          align-items: center;

          justify-content: center;

          background: #1bd1c5;

          color: #042322;

          border-radius: 50%;

          font-size: 13px;

          font-weight: 900;

          flex-shrink: 0;
        }

        /* ERROR */

        .error-icon {
          width: 21px;
          height: 21px;

          display: flex;

          align-items: center;

          justify-content: center;

          background: #d95f5f;

          color: white;

          border-radius: 50%;

          font-size: 13px;

          font-weight: 900;

          flex-shrink: 0;
        }

        /* EYE */

        .eye-button {
          border: none;

          background:
            transparent;

          color: #70807e;

          cursor: pointer;

          font-size: 18px;

          padding: 4px;
        }

        .eye-button:hover {
          color: #20d3c8;
        }

        /* PASSWORD HINT */

        .password-hint {
          margin-top: 6px;

          padding-left: 3px;

          color: #6f807d;

          font-size: 11px;
        }

        /* RESET BUTTON */

        .reset-button {
          width: 100%;

          height: 55px;

          margin-top: 9px;

          border: none;

          border-radius: 15px;

          background:
            linear-gradient(
              135deg,
              #17cfc3,
              #0fa59d
            );

          color: #021211;

          font-size: 16px;

          font-weight: 800;

          cursor: pointer;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          box-shadow:
            0 8px 25px
              rgba(
                20,
                205,
                193,
                0.15
              );

          transition:
            transform
              0.2s ease,
            box-shadow
              0.2s ease;
        }

        .reset-button:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 12px 30px
              rgba(
                20,
                205,
                193,
                0.23
              );
        }

        .reset-button:disabled {
          cursor: wait;

          opacity: 0.7;

          transform:
            translateY(0);
        }

        .button-arrow {
          font-size: 21px;

          line-height: 1;
        }

        /* STATUS */

        .status-area {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          margin-top: 15px;

          padding:
            10px
            12px;

          border-radius: 10px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color: #a7b2b0;

          font-size: 12px;

          text-align: center;

          line-height: 1.4;
        }

        .status-area.success {
          color: #6de2d8;

          background:
            rgba(
              27,
              209,
              197,
              0.05
            );
        }

        .status-area.error {
          color: #e88787;

          background:
            rgba(
              217,
              95,
              95,
              0.05
            );
        }

        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #9daaa8;

          flex-shrink: 0;
        }

        .status-area.success
          .status-dot {
          background: #1bd1c5;

          box-shadow:
            0 0 8px
              #1bd1c5;
        }

        .status-area.error
          .status-dot {
          background: #ef6b6b;

          box-shadow:
            0 0 8px
              #ef6b6b;
        }

        /* DIVIDER */

        .divider {
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );

          margin:
            21px
            0
            17px;
        }

        /* BACK LOGIN */

        .back-login {
          text-align: center;

          color: #788684;

          font-size: 13px;
        }

        .back-login a {
          color: #19cfc4;

          text-decoration: none;

          font-weight: 700;

          margin-left: 5px;
        }

        .back-login a:hover {
          color: #61f3eb;
        }

        /* FOOTER */

        .technical-footer {
          margin-top: 27px;

          color: #526260;

          font-size: 9px;

          letter-spacing: 2px;

          text-align: center;
        }

        /* MOBILE */

        @media (max-width: 650px) {

          .reset-container {
            padding:
              35px
              15px
              30px;
          }

          .component-label {
            font-size: 8px;

            letter-spacing: 2.5px;
          }

          .main-title {
            font-size: 47px;

            letter-spacing: -2px;
          }

          .reset-card {
            padding:
              27px
              20px
              26px;

            border-radius: 21px;
          }

          .otp-circle {
            width: 225px;
            height: 225px;
          }

          .otp-position {
            width: 54px;
            height: 54px;
          }

          .otp-position input {
            width: 54px;
            height: 54px;

            border-radius: 15px;

            font-size: 21px;
          }

          .otp-ring {
            inset: 15px;
          }

          .otp-ring-inner {
            inset: 49px;
          }

          .reset-card h2 {
            font-size: 23px;
          }

          .welcome-text {
            font-size: 13px;
          }

          .technical-footer {
            font-size: 7px;

            letter-spacing: 1px;
          }
        }

        @media (max-width: 380px) {

          .main-title {
            font-size: 41px;
          }

          .reset-card {
            padding:
              24px
              16px;
          }

          .otp-circle {
            width: 205px;
            height: 205px;
          }

          .otp-position {
            width: 50px;
            height: 50px;
          }

          .otp-position input {
            width: 50px;
            height: 50px;

            font-size: 19px;
          }

          .otp-ring {
            inset: 12px;
          }

          .otp-ring-inner {
            inset: 44px;
          }
        }

      `}</style>
    </div>
  );
}

export default ResetPassword;