import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "/api/auth/forgot-password",
        {
          email,
        }
      );

      // Save email for ResetPassword.jsx
      localStorage.setItem(
        "reset_email",
        email
      );

      setMessage(
        response.data?.message ||
          "Verification code sent successfully."
      );

      // Go to reset password page
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
          "Unable to send verification code."
      );

      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">

      {/* Background glow */}
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <main className="forgot-container">

        {/* Top label */}
        <div className="component-label">
          AI INTERVIEW · ACCOUNT SECURITY
        </div>

        {/* Main title */}
        <h1 className="main-title">
          Forgot
          <span>Password?</span>
        </h1>

        {/* Card */}
        <div className="forgot-card">

          {/* Brand */}
          <div className="brand-row">

            <div className="brand-orb">
              <div className="orb-dot"></div>
            </div>

            <span>AI INTERVIEW</span>

          </div>

          {/* Heading */}
          <h2>Recover your account</h2>

          <p className="welcome-text">
            Enter the email address associated
            with your account. We'll send you a
            verification code to continue.
          </p>

          {/* ================= EMAIL ================= */}

          <div className="input-group">

            <label>Email Address</label>

            <div
              className={`input-wrapper ${
                email ? "active" : ""
              }`}
            >

              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                autoComplete="email"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleForgotPassword();
                  }
                }}
              />

              {email && (
                <span className="check-icon">
                  ✓
                </span>
              )}

            </div>

          </div>

          {/* ================= BUTTON ================= */}

          <button
            className="forgot-button"
            onClick={handleForgotPassword}
            disabled={loading}
          >

            <span>
              {loading
                ? "Sending..."
                : "Send Verification Code"}
            </span>

            {!loading && (
              <span className="button-arrow">
                →
              </span>
            )}

          </button>

          {/* ================= MESSAGE ================= */}

          {message && (
            <div
              className={`status-area ${
                message
                  .toLowerCase()
                  .includes("sent") ||
                message
                  .toLowerCase()
                  .includes("success")
                  ? "success"
                  : "error"
              }`}
            >

              <div className="status-dot"></div>

              <span>{message}</span>

            </div>
          )}

          {/* ================= DIVIDER ================= */}

          <div className="divider"></div>

          {/* ================= BACK TO LOGIN ================= */}

          <div className="back-login">

            Remember your password?

            <Link to="/">
              Back to Login
            </Link>

          </div>

        </div>

        {/* Footer */}

        <div className="technical-footer">
          AI-POWERED · SECURE · INTERVIEW READY
        </div>

      </main>

      {/* ================= CSS ================= */}

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

        /* ================= PAGE ================= */

        .forgot-page {
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

        /* ================= GLOW ================= */

        .glow {
          position: fixed;

          border-radius: 50%;

          filter: blur(110px);

          pointer-events: none;

          opacity: 0.15;
        }

        .glow-one {
          width: 360px;
          height: 360px;

          background: #00e5d0;

          top: 18%;
          left: 12%;
        }

        .glow-two {
          width: 330px;
          height: 330px;

          background: #008f86;

          right: 8%;
          bottom: 8%;
        }

        /* ================= CONTAINER ================= */

        .forgot-container {
          min-height: 100vh;

          display: flex;

          flex-direction: column;

          align-items: center;

          padding:
            65px
            20px
            40px;

          position: relative;

          z-index: 2;
        }

        /* ================= TOP LABEL ================= */

        .component-label {
          color: #18aaa0;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 4px;

          margin-bottom: 13px;

          text-align: center;
        }

        /* ================= TITLE ================= */

        .main-title {
          margin:
            0
            0
            34px;

          text-align: center;

          font-size:
            clamp(
              45px,
              6vw,
              68px
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

        /* ================= CARD ================= */

        .forgot-card {
          width: 100%;

          max-width: 500px;

          padding:
            35px
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
                0.88
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

        /* ================= BRAND ================= */

        .brand-row {
          display: flex;

          align-items: center;

          gap: 11px;

          color: #8a9d9b;

          font-size: 11px;

          letter-spacing: 4px;

          margin-bottom: 28px;
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

        /* ================= HEADING ================= */

        .forgot-card h2 {
          margin:
            0
            0
            7px;

          font-size: 27px;

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
            27px;
        }

        /* ================= INPUT GROUP ================= */

        .input-group {
          width: 100%;

          display: block;

          margin-bottom: 22px;
        }

        .input-group label {
          display: block;

          width: 100%;

          color: #a4b1af;

          font-size: 15px;

          font-weight: 600;

          margin-bottom: 9px;

          text-align: left;
        }

        /* ================= INPUT ================= */

        .input-wrapper {
          width: 100%;

          height: 57px;

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
              0.25s ease,
            background
              0.25s ease;
        }

        .input-wrapper:focus-within,
        .input-wrapper.active {
          border-color: #1ad8ca;

          background:
            rgba(
              3,
              17,
              18,
              0.9
            );

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

        /* ================= ICON ================= */

        .input-icon {
          width: 21px;

          color: #22bdb4;

          font-size: 17px;

          text-align: center;

          flex-shrink: 0;
        }

        /* ================= INPUT TEXT ================= */

        .input-wrapper input {
          flex: 1;

          min-width: 0;

          width: 100%;

          border: none;

          outline: none;

          background:
            transparent;

          color: #e8f1f0;

          font-size: 16px;

          font-family:
            inherit;
        }

        .input-wrapper input::placeholder {
          color: #647573;
        }

        /* ================= CHECK ================= */

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

        /* ================= BUTTON ================= */

        .forgot-button {
          width: 100%;

          height: 57px;

          margin-top: 8px;

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
              0.2s ease,
            filter
              0.2s ease;
        }

        .forgot-button:hover {
          transform:
            translateY(-2px);

          filter:
            brightness(1.07);

          box-shadow:
            0 12px 30px
              rgba(
                20,
                205,
                193,
                0.23
              );
        }

        .forgot-button:active {
          transform:
            translateY(0);
        }

        .forgot-button:disabled {
          cursor: wait;

          opacity: 0.7;

          transform:
            translateY(0);
        }

        .button-arrow {
          font-size: 21px;

          line-height: 1;
        }

        /* ================= STATUS ================= */

        .status-area {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          margin-top: 16px;

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

        /* ================= DIVIDER ================= */

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
            25px
            0
            19px;
        }

        /* ================= BACK LOGIN ================= */

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

          transition:
            color
              0.2s ease,
            text-shadow
              0.2s ease;
        }

        .back-login a:hover {
          color: #61f3eb;

          text-shadow:
            0 0 10px
              rgba(
                97,
                243,
                235,
                0.3
              );
        }

        /* ================= FOOTER ================= */

        .technical-footer {
          margin-top: 30px;

          color: #526260;

          font-size: 9px;

          letter-spacing: 2px;

          text-align: center;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 650px) {

          .forgot-container {
            padding:
              45px
              16px
              30px;
          }

          .component-label {
            font-size: 9px;

            letter-spacing: 3px;
          }

          .main-title {
            font-size: 49px;

            letter-spacing: -2px;

            margin-bottom: 29px;
          }

          .forgot-card {
            padding:
              28px
              22px
              27px;

            border-radius: 21px;
          }

          .forgot-card h2 {
            font-size: 24px;
          }

          .welcome-text {
            font-size: 13px;
          }

          .technical-footer {
            font-size: 8px;

            letter-spacing: 1px;
          }
        }

        @media (max-width: 380px) {

          .main-title {
            font-size: 42px;
          }

          .forgot-card {
            padding:
              24px
              18px;
          }
        }

      `}</style>

    </div>
  );
}

export default ForgotPassword;