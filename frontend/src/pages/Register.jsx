import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  /* =========================
     STEP 1
  ========================= */

  const handleNext = () => {
    if (!firstName.trim()) {
      setMessage("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      setMessage("Please enter your last name.");
      return;
    }

    setMessage("");
    setStep(2);
  };

  /* =========================
     REGISTER
  ========================= */

  const handleRegister = async () => {
    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setMessage("Please create a password.");
      return;
    }

    if (password.length < 8) {
      setMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const fullName =
        `${firstName.trim()} ${lastName.trim()}`;

      await axios.post(
        "/api/auth/register",
        {
          name: fullName,
          email: email.trim(),
          password,
        }
      );

      setMessage(
        "Registration successful! Redirecting..."
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "Registration failed. Please try again."
      );

      setLoading(false);
    }
  };

  /* =========================
     BACK
  ========================= */

  const handleBack = () => {
    setMessage("");
    setStep(1);
  };

  return (
    <div className="register-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <div className="background-grid"></div>

      {/* =====================================================
          ANIMATED CHARACTER
      ===================================================== */}

      <div className="character-stage">

        <div className="character-shadow"></div>

        <div className="character-walker">

          <svg
            className="character-svg"
            viewBox="0 0 180 420"
            xmlns="http://www.w3.org/2000/svg"
          >

            {/* ================= HEAD ================= */}

            <g className="head-group">

              {/* Hair */}
              <path
                d="
                  M55 47
                  C57 18 91 8 115 28
                  C126 38 126 61 116 72
                  L52 70
                  Z
                "
                fill="#161d20"
              />

              {/* Face */}
              <ellipse
                cx="87"
                cy="70"
                rx="34"
                ry="39"
                fill="#c87555"
              />

              {/* Ear */}
              <circle
                cx="54"
                cy="73"
                r="8"
                fill="#b86449"
              />

              {/* Hair fringe */}
              <path
                d="
                  M53 51
                  C62 25 94 19 113 35
                  L116 51
                  C99 44 82 41 67 51
                  Z
                "
                fill="#101719"
              />

              {/* Sunglasses */}
              <g className="glasses">

                <rect
                  x="57"
                  y="61"
                  width="27"
                  height="13"
                  rx="5"
                  fill="#101516"
                />

                <rect
                  x="90"
                  y="61"
                  width="27"
                  height="13"
                  rx="5"
                  fill="#101516"
                />

                <rect
                  x="82"
                  y="65"
                  width="10"
                  height="4"
                  fill="#101516"
                />

              </g>

              {/* Nose */}
              <path
                d="M87 70 L82 84 L88 86"
                fill="none"
                stroke="#914a38"
                strokeWidth="2"
              />

              {/* Smile */}
              <path
                d="M78 96 Q87 102 97 95"
                fill="none"
                stroke="#74382d"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

            </g>

            {/* ================= NECK ================= */}

            <path
              d="M73 103 L103 103 L105 126 L70 126 Z"
              fill="#b9664b"
            />

            {/* ================= BODY ================= */}

            <g className="body-group">

              {/* Shirt */}
              <path
                d="
                  M67 116
                  L111 116
                  L130 185
                  L52 185
                  Z
                "
                fill="#1b3335"
              />

              {/* Shirt stripes */}
              <path
                d="
                  M62 123 L112 123
                  M58 135 L116 135
                  M56 147 L120 147
                  M54 159 L123 159
                  M53 171 L126 171
                "
                stroke="#4c7372"
                strokeWidth="5"
                opacity="0.65"
              />

              {/* Collar */}
              <path
                d="
                  M73 115
                  L88 137
                  L103 115
                "
                fill="#122326"
              />

              {/* Shirt buttons */}
              <circle
                cx="89"
                cy="146"
                r="2.5"
                fill="#91b8b4"
              />

              <circle
                cx="89"
                cy="158"
                r="2.5"
                fill="#91b8b4"
              />

              {/* ================= LEFT ARM ================= */}

              <g className="left-arm">

                <path
                  d="
                    M59 121
                    C45 127 39 145 43 166
                    L49 198
                    L63 195
                    L59 161
                    L73 139
                    Z
                  "
                  fill="#1a3032"
                />

                {/* Hand */}
                <circle
                  cx="56"
                  cy="198"
                  r="9"
                  fill="#c87555"
                />

              </g>

              {/* ================= RIGHT ARM ================= */}

              <g className="right-arm">

                <path
                  d="
                    M108 121
                    C124 128 132 147 128 167
                    L122 199
                    L108 196
                    L112 162
                    L98 139
                    Z
                  "
                  fill="#1a3032"
                />

                {/* Hand */}
                <circle
                  cx="115"
                  cy="198"
                  r="9"
                  fill="#c87555"
                />

              </g>

            </g>

            {/* ================= LEFT LEG ================= */}

            <g className="left-leg">

              <path
                d="
                  M58 180
                  L89 180
                  L82 292
                  L55 292
                  Z
                "
                fill="#101719"
              />

              {/* Shoe */}
              <path
                d="
                  M55 285
                  C44 286 35 294 34 303
                  C49 309 71 306 82 299
                  L82 287
                  Z
                "
                fill="#c8d1ce"
              />

              <path
                d="
                  M39 298
                  L76 298
                "
                stroke="#6b8580"
                strokeWidth="4"
              />

            </g>

            {/* ================= RIGHT LEG ================= */}

            <g className="right-leg">

              <path
                d="
                  M87 180
                  L118 180
                  L127 288
                  L100 293
                  Z
                "
                fill="#0d1416"
              />

              {/* Shoe */}
              <path
                d="
                  M101 284
                  C91 290 87 300 91 307
                  C106 310 128 304 137 296
                  L126 285
                  Z
                "
                fill="#c8d1ce"
              />

              <path
                d="
                  M94 299
                  L130 298
                "
                stroke="#6b8580"
                strokeWidth="4"
              />

            </g>

          </svg>

        </div>

      </div>

      {/* =====================================================
          REGISTER CONTENT
      ===================================================== */}

      <main className="register-content">

        {/* Top label */}

        <div className="component-label">
          AI INTERVIEW · CREATE ACCOUNT
        </div>

        {/* Heading */}

        <h1 className="main-title">
          Register
          <span>Now</span>
        </h1>

        <p className="main-subtitle">
          Create your account and start your
          AI-powered interview journey.
        </p>

        {/* =================================================
            CARD
        ================================================= */}

        <div className="register-card">

          {/* Brand */}

          <div className="brand-row">

            <div className="brand-orb">
              <div className="orb-dot"></div>
            </div>

            <span>AI INTERVIEW</span>

          </div>

          {/* Step indicator */}

          <div className="steps">

            <div
              className={`step ${
                step === 1
                  ? "active"
                  : "complete"
              }`}
            >
              <span>1</span>
              <label>Profile</label>
            </div>

            <div className="step-line"></div>

            <div
              className={`step ${
                step === 2
                  ? "active"
                  : ""
              }`}
            >
              <span>2</span>
              <label>Account</label>
            </div>

          </div>

          {/* =================================================
              STEP 1
          ================================================= */}

          {step === 1 && (
            <div className="form-step">

              <h2>Let's get started</h2>

              <p className="form-description">
                Tell us your name to create your
                interview profile.
              </p>

              {/* First Name */}

              <div className="input-group">

                <label>First Name</label>

                <div
                  className={`input-wrapper ${
                    firstName
                      ? "filled"
                      : ""
                  }`}
                >

                  <span className="input-icon">
                    ✦
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(
                        e.target.value
                      );
                      setMessage("");
                    }}
                    autoComplete="given-name"
                  />

                  {firstName && (
                    <span className="check-icon">
                      ✓
                    </span>
                  )}

                </div>

              </div>

              {/* Last Name */}

              <div className="input-group">

                <label>Last Name</label>

                <div
                  className={`input-wrapper ${
                    lastName
                      ? "filled"
                      : ""
                  }`}
                >

                  <span className="input-icon">
                    ✦
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(
                        e.target.value
                      );
                      setMessage("");
                    }}
                    autoComplete="family-name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNext();
                      }
                    }}
                  />

                  {lastName && (
                    <span className="check-icon">
                      ✓
                    </span>
                  )}

                </div>

              </div>

              <button
                className="action-button"
                onClick={handleNext}
              >
                <span>NEXT</span>
                <span className="button-arrow">
                  →
                </span>
              </button>

            </div>
          )}

          {/* =================================================
              STEP 2
          ================================================= */}

          {step === 2 && (
            <div className="form-step">

              <h2>Create your account</h2>

              <p className="form-description">
                Add your login details to finish
                creating your account.
              </p>

              {/* Email */}

              <div className="input-group">

                <label>Email Address</label>

                <div
                  className={`input-wrapper ${
                    email
                      ? "filled"
                      : ""
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
                      setEmail(
                        e.target.value
                      );
                      setMessage("");
                    }}
                    autoComplete="email"
                  />

                  {email && (
                    <span className="check-icon">
                      ✓
                    </span>
                  )}

                </div>

              </div>

              {/* Password */}

              <div className="input-group">

                <label>Password</label>

                <div
                  className={`input-wrapper ${
                    password
                      ? "filled"
                      : ""
                  }`}
                >

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(
                        e.target.value
                      );
                      setMessage("");
                    }}
                    autoComplete="new-password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRegister();
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "◉"
                      : "◌"}
                  </button>

                </div>

              </div>

              <button
                className="action-button"
                onClick={handleRegister}
                disabled={loading}
              >

                <span>
                  {loading
                    ? "CREATING..."
                    : "CREATE ACCOUNT"}
                </span>

                {!loading && (
                  <span className="button-arrow">
                    →
                  </span>
                )}

              </button>

              <button
                className="back-button"
                onClick={handleBack}
              >
                ← Back
              </button>

            </div>
          )}

          {/* =================================================
              MESSAGE
          ================================================= */}

          {message && (
            <div
              className={`message ${
                message
                  .toLowerCase()
                  .includes("successful")
                  ? "success"
                  : "error"
              }`}
            >
              <span className="message-dot"></span>
              {message}
            </div>
          )}

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="login-link">

            Already have an account?

            <Link to="/">
              Login
            </Link>

          </div>

        </div>

        <div className="footer-text">
          AI-POWERED · SECURE · INTERVIEW READY
        </div>

      </main>

      {/* =====================================================
          CSS
      ===================================================== */}

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

        /* ===================================================
           PAGE
        =================================================== */

        .register-page {
          min-height: 100vh;
          width: 100%;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 25% 45%,
              rgba(
                0,
                225,
                210,
                0.08
              ),
              transparent 28%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(
                0,
                170,
                160,
                0.06
              ),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #020708 0%,
              #061314 50%,
              #020707 100%
            );

          color: #eef7f5;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* ===================================================
           BACKGROUND
        =================================================== */

        .background-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(120px);

          pointer-events: none;

          opacity: 0.14;
        }

        .glow-one {
          width: 420px;
          height: 420px;

          background: #00dacc;

          left: -180px;
          top: 30%;
        }

        .glow-two {
          width: 380px;
          height: 380px;

          background: #007e79;

          right: -150px;
          bottom: -100px;
        }

        .background-grid {
          position: absolute;

          inset: 0;

          opacity: 0.025;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.5
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.5
              )
              1px,
              transparent 1px
            );

          background-size:
            50px
            50px;

          pointer-events: none;
        }

        /* ===================================================
           CHARACTER STAGE
        =================================================== */

        .character-stage {
          position: absolute;

          width: 330px;
          height: 520px;

          left: 5%;

          top: 50%;

          transform:
            translateY(-50%);

          z-index: 3;

          display: flex;

          align-items: flex-end;

          justify-content: center;

          pointer-events: none;
        }

        /* Character shadow */

        .character-shadow {
          position: absolute;

          bottom: 52px;

          width: 130px;
          height: 20px;

          border-radius: 50%;

          background:
            rgba(
              0,
              0,
              0,
              0.42
            );

          filter: blur(8px);

          animation:
            shadow-pulse
            1.2s
            ease-in-out
            infinite;

          animation-delay:
            1.3s;
        }

        @keyframes shadow-pulse {

          0%,
          100% {
            transform:
              scaleX(1);

            opacity: 0.4;
          }

          50% {
            transform:
              scaleX(0.75);

            opacity: 0.22;
          }

        }

        /* ===================================================
           WALKING CHARACTER
        =================================================== */

        .character-walker {
          width: 180px;
          height: 420px;

          position: absolute;

          bottom: 45px;

          left: -220px;

          animation:
            character-enter
            2.8s
            cubic-bezier(
              0.2,
              0.8,
              0.25,
              1
            )
            forwards,
            character-idle
            3s
            ease-in-out
            2.8s
            infinite;
        }

        @keyframes character-enter {

          0% {
            left: -230px;

            transform:
              scale(0.9);
          }

          15% {
            transform:
              scale(0.93);
          }

          35% {
            transform:
              scale(0.97);
          }

          60% {
            transform:
              scale(1);
          }

          80% {
            left: 55px;
          }

          100% {
            left: 65px;

            transform:
              scale(1);
          }

        }

        @keyframes character-idle {

          0%,
          100% {
            margin-top: 0;

            transform:
              rotate(0deg);
          }

          50% {
            margin-top: -5px;

            transform:
              rotate(
                -1deg
              );
          }

        }

        .character-svg {
          width: 180px;
          height: 420px;

          overflow: visible;

          filter:
            drop-shadow(
              0 18px 22px
              rgba(
                0,
                0,
                0,
                0.3
              )
            );
        }

        /* ===================================================
           WALKING LIMBS
        =================================================== */

        .left-arm {
          transform-origin:
            62px
            125px;

          animation:
            walk-left-arm
            0.7s
            ease-in-out
            2.8s
            infinite;
        }

        .right-arm {
          transform-origin:
            108px
            125px;

          animation:
            walk-right-arm
            0.7s
            ease-in-out
            2.8s
            infinite;
        }

        .left-leg {
          transform-origin:
            72px
            185px;

          animation:
            walk-left-leg
            0.7s
            ease-in-out
            2.8s
            infinite;
        }

        .right-leg {
          transform-origin:
            102px
            185px;

          animation:
            walk-right-leg
            0.7s
            ease-in-out
            2.8s
            infinite;
        }

        @keyframes walk-left-arm {

          0%,
          100% {
            transform:
              rotate(22deg);
          }

          50% {
            transform:
              rotate(-28deg);
          }

        }

        @keyframes walk-right-arm {

          0%,
          100% {
            transform:
              rotate(-25deg);
          }

          50% {
            transform:
              rotate(30deg);
          }

        }

        @keyframes walk-left-leg {

          0%,
          100% {
            transform:
              rotate(7deg);
          }

          50% {
            transform:
              rotate(-12deg);
          }

        }

        @keyframes walk-right-leg {

          0%,
          100% {
            transform:
              rotate(-10deg);
          }

          50% {
            transform:
              rotate(12deg);
          }

        }

        /* ===================================================
           HEADING
        =================================================== */

        .register-content {
          width: 100%;

          max-width: 505px;

          position: relative;

          z-index: 10;

          margin-left: 190px;

          animation:
            content-appear
            1s
            ease
            forwards;
        }

        @keyframes content-appear {

          from {
            opacity: 0;

            transform:
              translateY(18px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        .component-label {
          color: #18aaa0;

          text-align: center;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 4px;

          margin-bottom: 12px;
        }

        .main-title {
          margin: 0;

          color: #f4f8f7;

          text-align: center;

          font-size:
            clamp(
              48px,
              6vw,
              67px
            );

          font-weight: 800;

          line-height: 0.88;

          letter-spacing: -3px;
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
                0.2
              );
        }

        .main-subtitle {
          max-width: 400px;

          margin:
            18px
            auto
            28px;

          color: #7f918e;

          text-align: center;

          font-size: 13px;

          line-height: 1.5;
        }

        /* ===================================================
           CARD
        =================================================== */

        .register-card {
          width: 100%;

          padding:
            31px
            34px
            27px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(
                35,
                53,
                53,
                0.75
              ),
              rgba(
                9,
                24,
                24,
                0.91
              )
            );

          border:
            1px solid
              rgba(
                165,
                205,
                200,
                0.13
              );

          box-shadow:
            0 35px 80px
              rgba(
                0,
                0,
                0,
                0.46
              ),
            inset
            0 1px 0
            rgba(
              255,
              255,
              255,
              0.04
            );

          backdrop-filter:
            blur(18px);
        }

        /* ===================================================
           BRAND
        =================================================== */

        .brand-row {
          display: flex;

          align-items: center;

          gap: 11px;

          margin-bottom: 23px;

          color: #879a97;

          font-size: 10px;

          letter-spacing: 4px;
        }

        .brand-orb {
          width: 25px;
          height: 25px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            2px solid
              #16d8cb;

          border-radius: 50%;

          box-shadow:
            0 0 11px
              rgba(
                22,
                216,
                203,
                0.32
              );
        }

        .orb-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #17d9cc;

          box-shadow:
            0 0 9px
              #17d9cc;
        }

        /* ===================================================
           STEPS
        =================================================== */

        .steps {
          display: flex;

          align-items: center;

          justify-content: center;

          margin-bottom: 24px;
        }

        .step {
          display: flex;

          align-items: center;

          gap: 7px;

          color: #61716e;

          font-size: 10px;

          font-weight: 700;
        }

        .step span {
          width: 23px;
          height: 23px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.1
              );
        }

        .step.active,
        .step.complete {
          color: #19cfc4;
        }

        .step.active span,
        .step.complete span {
          color: #031614;

          background: #19d6ca;

          border-color: #19d6ca;

          box-shadow:
            0 0 10px
              rgba(
                25,
                214,
                202,
                0.22
              );
        }

        .step-line {
          width: 55px;

          height: 1px;

          margin:
            0
            10px;

          background:
            rgba(
              255,
              255,
              255,
              0.1
            );
        }

        /* ===================================================
           FORM
        =================================================== */

        .form-step h2 {
          margin:
            0
            0
            6px;

          color: #e8f0ee;

          font-size: 24px;

          font-weight: 700;
        }

        .form-description {
          margin:
            0
            0
            22px;

          color: #758582;

          font-size: 12px;

          line-height: 1.5;
        }

        /* ===================================================
           INPUT
        =================================================== */

        .input-group {
          width: 100%;

          display: block;

          margin-bottom: 18px;
        }

        .input-group label {
          display: block;

          width: 100%;

          margin-bottom: 8px;

          color: #a5b2af;

          font-size: 13px;

          font-weight: 600;

          text-align: left;
        }

        .input-wrapper {
          width: 100%;

          height: 55px;

          display: flex;

          align-items: center;

          gap: 11px;

          padding:
            0
            14px;

          border-radius: 14px;

          background:
            rgba(
              2,
              12,
              13,
              0.8
            );

          border:
            1px solid
              rgba(
                32,
                170,
                160,
                0.6
              );

          transition:
            border-color
              0.25s ease,
            box-shadow
              0.25s ease;
        }

        .input-wrapper:focus-within,
        .input-wrapper.filled {
          border-color: #19d6ca;

          box-shadow:
            0 0 0 3px
              rgba(
                25,
                214,
                202,
                0.07
              ),
            0 0 17px
              rgba(
                25,
                214,
                202,
                0.1
              );
        }

        .input-icon {
          width: 21px;

          flex-shrink: 0;

          color: #1bcfc4;

          text-align: center;

          font-size: 16px;
        }

        .input-wrapper input {
          flex: 1;

          min-width: 0;

          height: 100%;

          border: none;

          outline: none;

          background: transparent;

          color: #e7f1ef;

          font-size: 14px;

          font-family: inherit;
        }

        .input-wrapper input::placeholder {
          color: #60716e;
        }

        /* ===================================================
           CHECK
        =================================================== */

        .check-icon {
          width: 20px;
          height: 20px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background: #19d1c5;

          color: #03201d;

          font-size: 12px;

          font-weight: 900;
        }

        /* ===================================================
           PASSWORD BUTTON
        =================================================== */

        .password-toggle {
          border: none;

          background: transparent;

          color: #6e807d;

          cursor: pointer;

          padding: 4px;

          font-size: 16px;
        }

        .password-toggle:hover {
          color: #19d6ca;
        }

        /* ===================================================
           ACTION BUTTON
        =================================================== */

        .action-button {
          width: 100%;

          height: 55px;

          margin-top: 5px;

          border: none;

          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              #17cfc3,
              #0fa59d
            );

          color: #021211;

          font-size: 14px;

          font-weight: 900;

          letter-spacing: 0.5px;

          cursor: pointer;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          box-shadow:
            0 9px 25px
              rgba(
                20,
                205,
                193,
                0.14
              );

          transition:
            transform
              0.2s ease,
            filter
              0.2s ease,
            box-shadow
              0.2s ease;
        }

        .action-button:hover {
          transform:
            translateY(-2px);

          filter:
            brightness(1.07);

          box-shadow:
            0 13px 30px
              rgba(
                20,
                205,
                193,
                0.22
              );
        }

        .action-button:disabled {
          opacity: 0.65;

          cursor: wait;

          transform:
            none;
        }

        .button-arrow {
          font-size: 20px;
        }

        /* ===================================================
           BACK
        =================================================== */

        .back-button {
          display: block;

          margin:
            12px
            auto
            0;

          border: none;

          background: transparent;

          color: #70817e;

          cursor: pointer;

          font-size: 12px;
        }

        .back-button:hover {
          color: #19d6ca;
        }

        /* ===================================================
           MESSAGE
        =================================================== */

        .message {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          margin-top: 14px;

          padding:
            9px
            12px;

          border-radius: 9px;

          font-size: 11px;

          text-align: center;
        }

        .message.success {
          color: #6de2d8;

          background:
            rgba(
              27,
              209,
              197,
              0.06
            );
        }

        .message.error {
          color: #ed9696;

          background:
            rgba(
              217,
              95,
              95,
              0.06
            );
        }

        .message-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            currentColor;
        }

        /* ===================================================
           LOGIN
        =================================================== */

        .login-link {
          margin-top: 22px;

          text-align: center;

          color: #73837f;

          font-size: 12px;
        }

        .login-link a {
          margin-left: 5px;

          color: #19d0c5;

          text-decoration: none;

          font-weight: 800;
        }

        .login-link a:hover {
          color: #67f1e9;
        }

        /* ===================================================
           FOOTER
        =================================================== */

        .footer-text {
          margin-top: 25px;

          color: #4f615e;

          text-align: center;

          font-size: 8px;

          letter-spacing: 2px;
        }

        /* ===================================================
           RESPONSIVE
        =================================================== */

        @media (max-width: 1050px) {

          .character-stage {
            left: 0;
          }

          .register-content {
            margin-left: 120px;
          }

        }

        @media (max-width: 850px) {

          .register-page {
            overflow-y: auto;

            padding:
              50px
              20px;
          }

          .character-stage {
            width: 220px;
            height: 330px;

            left: -35px;

            top: 28%;

            transform:
              translateY(-50%)
              scale(0.7);

            opacity: 0.75;
          }

          .register-content {
            margin-left: 90px;

            max-width: 480px;
          }

        }

        @media (max-width: 650px) {

          .register-page {
            display: block;

            min-height: 100vh;

            padding:
              35px
              15px
              30px;

            overflow-y: auto;
          }

          .character-stage {
            position: relative;

            width: 100%;

            height: 180px;

            left: auto;
            top: auto;

            transform: none;

            margin-bottom: 0;

            opacity: 1;
          }

          .character-walker {
            bottom: 0;

            left: -190px;

            transform:
              scale(0.7);

            animation:
              mobile-character-enter
              2.5s
              cubic-bezier(
                0.2,
                0.8,
                0.25,
                1
              )
              forwards,
              mobile-character-idle
              3s
              ease-in-out
              2.5s
              infinite;
          }

          @keyframes mobile-character-enter {

            0% {
              left: -200px;
            }

            100% {
              left: calc(
                50% - 90px
              );
            }

          }

          @keyframes mobile-character-idle {

            0%,
            100% {
              margin-top: 0;
            }

            50% {
              margin-top: -5px;
            }

          }

          .character-shadow {
            bottom: 18px;
          }

          .register-content {
            margin-left: 0;

            max-width: 500px;
          }

          .component-label {
            font-size: 8px;

            letter-spacing: 3px;
          }

          .main-title {
            font-size: 48px;

            letter-spacing: -2px;
          }

          .main-subtitle {
            margin-top: 15px;

            margin-bottom: 24px;
          }

          .register-card {
            padding:
              27px
              21px
              25px;
          }

        }

        @media (max-width: 390px) {

          .register-page {
            padding:
              25px
              12px
              25px;
          }

          .character-stage {
            height: 145px;
          }

          .character-walker {
            transform:
              scale(0.58);
          }

          .register-card {
            padding:
              24px
              17px;
          }

          .main-title {
            font-size: 42px;
          }

          .step label {
            display: none;
          }

          .step-line {
            width: 35px;
          }

        }

      `}</style>

    </div>
  );
}

export default Register;