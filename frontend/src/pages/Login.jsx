import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Slider state
  const [sliderValue, setSliderValue] = useState(0); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState(false);
  const sliderTrackRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter your email and password.");
      setSliderValue(0);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSliderValue(100);

      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user_id", response.data.user_id);
      setMessage("Login successful.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error(error);
      setMessage("Invalid email or password.");
      setLoading(false);
      setSliderValue(0); // Reset slider on error
    }
  };

  // Dragging logic for Slide-to-Login using Pointer Events
  const handlePointerDown = (e) => {
    if (loading) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || loading || !sliderTrackRef.current) return;

    const rect = sliderTrackRef.current.getBoundingClientRect();
    const thumbWidth = 52; // Width of the slider thumb in px
    const maxDrag = rect.width - thumbWidth - 4; // Max travel distance

    let currentX = e.clientX - rect.left - thumbWidth / 2;
    if (currentX < 0) currentX = 0;
    if (currentX > maxDrag) currentX = maxDrag;

    const percentage = (currentX / maxDrag) * 100;
    setSliderValue(percentage);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If slid past 85%, complete the slide and trigger login
    if (sliderValue >= 85) {
      setSliderValue(100);
      handleLogin();
    } else {
      // Snap back to start
      setSliderValue(0);
    }
  };

  return (
    <div className="login-page">
      {/* Background glow */}
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <main className="login-container">
        {/* Small heading */}
        <div className="component-label">
          AI INTERVIEW · SECURE ACCESS
        </div>

        {/* Main title */}
        <h1 className="main-title">
          AI Interview
          <span>Login</span>
        </h1>

        {/* Login card */}
        <div className="login-card">
          {/* Brand */}
          <div className="brand-row">
            <div className="brand-orb">
              <div className="orb-dot"></div>
            </div>
            <span>AI INTERVIEW</span>
          </div>

          {/* Card title */}
          <h2>Welcome back</h2>
          <p className="welcome-text">
            Sign in to continue your AI-powered interview experience.
          </p>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>
            <div className={`input-wrapper ${email ? "active" : ""}`}>
              <span className="input-icon">✉</span>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {email && <span className="check-icon">✓</span>}
            </div>
          </div>

          {/* Password */}
          <div className="input-group password-group">
            <label>Password</label>
            <div className={`input-wrapper ${password ? "active" : ""}`}>
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSliderValue(100);
                    handleLogin();
                  }
                }}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Slide to Login Button */}
          <div className="slider-area">
            <div
              className={`slider-track ${loading ? "disabled" : ""}`}
              ref={sliderTrackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Progress Fill */}
              <div
                className="slider-fill"
                style={{
                  width: `calc(${sliderValue}% + 26px)`,
                  transition: isDragging ? "none" : "width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              ></div>

              {/* Text Label */}
              <span
                className="slider-text"
                style={{
                  opacity: loading ? 0.5 : Math.max(0, 1 - sliderValue / 65),
                }}
              >
                {loading ? "Authenticating..." : "Slide to Log In ➔"}
              </span>

              {/* Draggable Handle */}
              <div
                className={`slider-thumb ${isDragging ? "grabbing" : ""}`}
                style={{
                  left: `calc(2px + (${sliderValue} / 100) * (100% - 56px))`,
                  transition: isDragging ? "none" : "left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <span className="thumb-icon">➜</span>
                )}
              </div>
            </div>
          </div>

          {/* Status message */}
          <div
            className={`status-area ${
              message.includes("Invalid") || message.includes("Please")
                ? "error"
                : ""
            }`}
          >
            <div className="status-dot"></div>
            <span>
              {message ? message : "Secure access · Slide handle to sign in."}
            </span>
          </div>

          {/* Keyboard hint */}
          <div className="keyboard-hint">
            <span className="key">Enter</span>
            <span>to sign in</span>
            <span className="hint-divider">·</span>
            <span className="key">Tab</span>
            <span>to navigate</span>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Account options */}
          <div className="account-options">
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
            <span className="option-divider">•</span>
            <span className="new-user">New here?</span>
            <Link to="/register" className="create-link">
              Create one
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="technical-footer">
          AI-POWERED · SECURE · INTERVIEW READY
        </div>
      </main>

      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          background: #020707;
        }

        .login-page {
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at 50% 25%, rgba(0, 220, 200, 0.07), transparent 35%),
                      linear-gradient(180deg, #020708 0%, #061314 48%, #020707 100%);
          color: #f2f7f6;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
        }

        /* Background glow */
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

        /* Main container */
        .login-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 65px 20px 40px;
          position: relative;
          z-index: 2;
        }

        /* Top label */
        .component-label {
          color: #18aaa0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 4px;
          margin-bottom: 13px;
          text-align: center;
        }

        /* Main title */
        .main-title {
          margin: 0 0 34px;
          text-align: center;
          font-size: clamp(45px, 6vw, 68px);
          line-height: 0.92;
          letter-spacing: -3px;
          font-weight: 800;
        }

        .main-title span {
          display: block;
          color: #19d6ca;
          text-shadow: 0 0 20px rgba(25, 214, 202, 0.18), 0 0 45px rgba(25, 214, 202, 0.08);
        }

        /* Login card */
        .login-card {
          width: 100%;
          max-width: 500px;
          padding: 35px 36px 30px;
          border-radius: 25px;
          background: linear-gradient(145deg, rgba(36, 54, 54, 0.72), rgba(10, 26, 26, 0.88));
          border: 1px solid rgba(170, 210, 205, 0.12);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(18px);
        }

        /* Brand */
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
          border: 2px solid #16d8cb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(22, 216, 203, 0.35);
        }

        .orb-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #17d9cc;
          box-shadow: 0 0 10px #17d9cc;
        }

        /* Card heading */
        .login-card h2 {
          margin: 0 0 7px;
          font-size: 27px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .welcome-text {
          color: #7e8e8c;
          font-size: 14px;
          line-height: 1.5;
          margin: 0 0 27px;
        }

        /* Input Group */
        .input-group {
          width: 100%;
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .input-group label {
          color: #a4b1af;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
          letter-spacing: 0.3px;
        }

        /* Input Wrapper */
        .input-wrapper {
          width: 100%;
          height: 56px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          border-radius: 12px;
          background: rgba(2, 12, 13, 0.78);
          border: 1px solid rgba(32, 170, 160, 0.45);
          box-sizing: border-box;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .input-wrapper:focus-within,
        .input-wrapper.active {
          border-color: #1ad8ca;
          background: rgba(3, 17, 18, 0.95);
          box-shadow: 0 0 0 3px rgba(22, 216, 203, 0.08), 0 0 18px rgba(22, 216, 203, 0.12);
        }

        /* Icons & Inner Input */
        .input-icon {
          width: 20px;
          color: #22bdb4;
          font-size: 16px;
          text-align: center;
          flex-shrink: 0;
        }

        .input-wrapper input {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #e8f1f0;
          font-size: 15px;
          font-family: inherit;
        }

        .input-wrapper input::placeholder {
          color: #5b6f6d;
        }

        /* Email check */
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

        /* Password eye */
        .eye-button {
          border: none;
          background: transparent;
          color: #70807e;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
          transition: color 0.2s ease;
        }

        .eye-button:hover {
          color: #20d3c8;
        }

        /* --- Slide to Login Button Area --- */
        .slider-area {
          width: 100%;
          margin-top: 26px;
          margin-bottom: 12px;
        }

        .slider-track {
          position: relative;
          width: 100%;
          height: 56px;
          background: rgba(1, 11, 12, 0.85);
          border: 1px solid rgba(32, 170, 160, 0.45);
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          user-select: none;
          touch-action: none; /* Prevents page scroll on mobile while sliding */
          cursor: pointer;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .slider-track.disabled {
          cursor: wait;
          opacity: 0.8;
        }

        .slider-fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(22, 216, 203, 0.15), rgba(22, 216, 203, 0.45));
          border-radius: 28px;
          pointer-events: none;
        }

        .slider-text {
          color: #1bd1c5;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.15s ease;
        }

        .slider-thumb {
          position: absolute;
          top: 2px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1ad8ca, #0e8d84);
          color: #020707;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          z-index: 2;
          box-shadow: 0 0 12px rgba(26, 216, 202, 0.4), 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .slider-thumb.grabbing {
          cursor: grabbing;
          background: linear-gradient(135deg, #5df3e8, #18aaa0);
          box-shadow: 0 0 20px rgba(26, 216, 202, 0.7);
        }

        .thumb-icon {
          font-size: 18px;
          font-weight: bold;
        }

        /* Spinner for loading state inside slider handle */
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(2, 7, 7, 0.2);
          border-top-color: #020707;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Status */
        .status-area {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #84918f;
          font-size: 13px;
          margin-top: 3px;
          text-align: center;
        }

        .status-area.error {
          color: #e88383;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b7c0bf;
          flex-shrink: 0;
        }

        .status-area.error .status-dot {
          background: #ef6b6b;
        }

        /* Keyboard hint */
        .keyboard-hint {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          color: #687775;
          font-size: 12px;
          margin-top: 10px;
        }

        .key {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 5px;
          padding: 2px 6px;
          color: #9da8a6;
          font-family: monospace;
        }

        .hint-divider {
          color: #465654;
          margin: 0 3px;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 23px 0 18px;
        }

        /* Account options */
        .account-options {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          font-size: 13px;
          text-align: center;
        }

        .forgot-link,
        .create-link {
          color: #19cfc4;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }

        .forgot-link:hover,
        .create-link:hover {
          color: #61f3eb;
          text-shadow: 0 0 10px rgba(97, 243, 235, 0.3);
        }

        .new-user {
          color: #788684;
        }

        .option-divider {
          color: #435553;
          margin: 0 3px;
        }

        /* Footer */
        .technical-footer {
          margin-top: 30px;
          color: #526260;
          font-size: 10px;
          letter-spacing: 2px;
          text-align: center;
        }

        /* Mobile */
        @media (max-width: 650px) {
          .login-container {
            padding: 45px 16px 30px;
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
          .login-card {
            padding: 28px 22px 27px;
            border-radius: 21px;
          }
          .login-card h2 {
            font-size: 24px;
          }
          .welcome-text {
            font-size: 13px;
          }
          .technical-footer {
            font-size: 8px;
            letter-spacing: 1px;
          }
          .account-options {
            font-size: 12px;
          }
        }

        @media (max-width: 380px) {
          .main-title {
            font-size: 42px;
          }
          .login-card {
            padding: 24px 18px;
          }
          .account-options {
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;