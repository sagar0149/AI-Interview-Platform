import { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [step, setStep] = useState(1);

  const [rotating, setRotating] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const otpRefs = useRef([]);

  const navigate = useNavigate();

  const email =
    localStorage.getItem("reset_email");


  // =====================================================
  // OTP INPUT
  // =====================================================

  const handleOtpChange = (
    index,
    value
  ) => {
    const digit = value
      .replace(/\D/g, "")
      .slice(-1);

    if (!digit || rotating) {
      return;
    }

    const otpArray = Array(6).fill("");

    for (let i = 0; i < otp.length; i++) {
      otpArray[i] = otp[i];
    }

    otpArray[index] = digit;

    const newOtp =
      otpArray.join("").slice(0, 6);

    setOtp(newOtp);

    setMessage("");


    // Move to next box

    if (
      index < 5 &&
      otpRefs.current[index + 1]
    ) {
      otpRefs.current[index + 1].focus();
    }


    // =================================================
    // SIXTH DIGIT ENTERED
    // =================================================

    if (newOtp.length === 6) {
      verifyOtp(newOtp);
    }
  };


  // =====================================================
  // OTP KEYBOARD
  // =====================================================

  const handleOtpKeyDown = (
    index,
    event
  ) => {

    if (rotating) {
      return;
    }

    if (event.key === "Backspace") {

      if (otp[index]) {

        const newOtp =
          otp.substring(0, index) +
          otp.substring(index + 1);

        setOtp(newOtp);

        return;
      }

      if (
        index > 0 &&
        otpRefs.current[index - 1]
      ) {

        otpRefs.current[
          index - 1
        ].focus();
      }
    }
  };


  // =====================================================
  // VERIFY OTP
  // =====================================================

  const verifyOtp = async (
    enteredOtp
  ) => {

    if (rotating) {
      return;
    }

    if (!email) {

      setMessage(
        "Reset session expired. Please request a new OTP."
      );

      return;
    }


    /*
     * Start circular animation immediately.
     */

    setRotating(true);

    setLoading(true);

    setMessage("");


    try {

      await axios.post(
        "/api/auth/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );


      /*
       * Keep animation visible
       * for a smooth effect.
       */

      setTimeout(() => {

        setStep(2);

        setRotating(false);

        setLoading(false);

      }, 1600);


    } catch (error) {

      console.error(
        "OTP verification error:",
        error
      );


      /*
       * Keep the circular animation
       * for a short moment before
       * showing the error.
       */

      setTimeout(() => {

        setRotating(false);

        setLoading(false);

        setOtp("");

        setMessage(
          error.response?.data?.detail ||
          "Invalid OTP. Please try again."
        );


        setTimeout(() => {

          if (
            otpRefs.current[0]
          ) {
            otpRefs.current[0].focus();
          }

        }, 100);

      }, 1200);
    }
  };


  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const resetPassword =
    async () => {

      if (!newPassword) {

        setMessage(
          "Please enter a new password."
        );

        return;
      }


      if (
        newPassword.length < 8
      ) {

        setMessage(
          "Password must contain at least 8 characters."
        );

        return;
      }


      if (
        newPassword !==
        confirmPassword
      ) {

        setMessage(
          "Passwords do not match."
        );

        return;
      }


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
          "/api/auth/reset-password",
          {
            email,
            otp,
            new_password:
              newPassword,
          }
        );


        setMessage(
          "Password reset successful! Redirecting..."
        );


        localStorage.removeItem(
          "reset_email"
        );


        setTimeout(() => {

          navigate("/");

        }, 1500);


      } catch (error) {

        console.error(
          "Password reset error:",
          error
        );


        setMessage(
          error.response?.data?.detail ||
          "Password reset failed."
        );

        setLoading(false);
      }
    };


  return (
    <div className="reset-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="background-glow glow-one"></div>

      <div className="background-glow glow-two"></div>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <main className="reset-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="component-label">
          AI INTERVIEW · ACCOUNT SECURITY
        </div>


        <h1 className="main-title">

          Reset

          <span>
            Password
          </span>

        </h1>


        <p className="main-subtitle">

          Securely recover access to your
          AI Interview account.

        </p>


        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="reset-card">


          {/* =================================================
              STEP 1
              OTP VERIFICATION
          ================================================= */}

          {step === 1 && (

            <div className="card-content">


              {/* BRAND */}

              <div className="brand-row">

                <div className="brand-orb">

                  <div className="orb-dot"></div>

                </div>

                <span>
                  AI INTERVIEW
                </span>

              </div>


              {/* ICON */}

              <div className="step-icon">
                ✉
              </div>


              <h2>
                Verify your email
              </h2>


              <p className="description">

                Enter the 6-digit verification
                code sent to your email.

              </p>


              {/* EMAIL */}

              <div className="email-display">

                {email ||
                  "your email address"}

              </div>


              {/* =================================================
                  OTP AREA
              ================================================= */}

              <div
                className={`otp-orbit-container ${
                  rotating
                    ? "orbit-active"
                    : ""
                }`}
              >


                {/* OTP BOXES */}

                <div className="otp-boxes">

                  {Array.from({
                    length: 6,
                  }).map(
                    (_, index) => (

                      <input
                        key={index}

                        ref={(element) => {
                          otpRefs.current[
                            index
                          ] = element;
                        }}

                        className="otp-input"

                        type="text"

                        inputMode="numeric"

                        autoComplete="one-time-code"

                        maxLength={1}

                        value={
                          otp[index] || ""
                        }

                        onChange={(event) =>
                          handleOtpChange(
                            index,
                            event.target
                              .value
                          )
                        }

                        onKeyDown={(event) =>
                          handleOtpKeyDown(
                            index,
                            event
                          )
                        }

                        disabled={
                          rotating
                        }

                        autoFocus={
                          index === 0
                        }
                      />

                    )
                  )}

                </div>


                {/* =================================================
                    CENTER VERIFYING
                ================================================= */}

                {rotating && (

                  <div className="orbit-center">

                    <div className="orbit-spinner"></div>

                    <span>
                      VERIFYING
                    </span>

                  </div>

                )}

              </div>


              {/* OTP HINT */}

              {!rotating && (

                <p className="otp-hint">

                  Enter all 6 digits to continue

                </p>

              )}


              {/* =================================================
                  LOADING
              ================================================= */}

              {loading && !rotating && (

                <div className="verification-loading">

                  <div className="spinner"></div>

                  <span>
                    Verifying code...
                  </span>

                </div>

              )}


              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {message && (

                <div className="message error">

                  <span className="message-dot"></span>

                  {message}

                </div>

              )}


              {/* BACK */}

              {!rotating && (

                <Link
                  to="/forgot-password"
                  className="back-link"
                >
                  ← Request a new code
                </Link>

              )}

            </div>

          )}


          {/* =================================================
              STEP 2
              CREATE NEW PASSWORD
          ================================================= */}

          {step === 2 && (

            <div className="card-content">


              {/* BRAND */}

              <div className="brand-row">

                <div className="brand-orb">

                  <div className="orb-dot"></div>

                </div>

                <span>
                  AI INTERVIEW
                </span>

              </div>


              {/* SUCCESS ICON */}

              <div className="step-icon success-icon">

                ✓

              </div>


              <h2>
                Create new password
              </h2>


              <p className="description">

                Verification successful.
                Create a new password below.

              </p>


              {/* =================================================
                  NEW PASSWORD
              ================================================= */}

              <div className="input-group">

                <label>
                  New Password
                </label>


                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>


                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    placeholder="Enter new password"

                    value={
                      newPassword
                    }

                    onChange={(event) => {

                      setNewPassword(
                        event.target.value
                      );

                      setMessage("");

                    }}
                  />


                  <button
                    type="button"

                    className="eye-button"

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


              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}

              <div className="input-group">

                <label>
                  Confirm Password
                </label>


                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>


                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }

                    placeholder="Confirm new password"

                    value={
                      confirmPassword
                    }

                    onChange={(event) => {

                      setConfirmPassword(
                        event.target.value
                      );

                      setMessage("");

                    }}
                  />


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


              {/* =================================================
                  RESET BUTTON
              ================================================= */}

              <button
                className="reset-button"

                onClick={
                  resetPassword
                }

                disabled={
                  loading
                }
              >

                {loading
                  ? "RESETTING..."
                  : "RESET PASSWORD"}


                {!loading && (

                  <span>
                    →
                  </span>

                )}

              </button>


              {/* MESSAGE */}

              {message && (

                <div className="message success">

                  <span className="message-dot"></span>

                  {message}

                </div>

              )}

            </div>

          )}

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

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


        /* =====================================================
           PAGE
        ===================================================== */

        .reset-page {

          min-height: 100vh;
          width: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          position: relative;

          overflow: hidden;

          color: #eef7f5;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

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
              #061314 50%,
              #020707 100%
            );
        }


        /* =====================================================
           BACKGROUND GLOW
        ===================================================== */

        .background-glow {

          position: absolute;

          border-radius: 50%;

          filter: blur(120px);

          opacity: 0.14;

          pointer-events: none;
        }


        .glow-one {

          width: 400px;
          height: 400px;

          background: #00e5d0;

          left: -180px;
          top: 25%;
        }


        .glow-two {

          width: 380px;
          height: 380px;

          background: #008d85;

          right: -150px;
          bottom: -100px;
        }


        /* =====================================================
           CONTAINER
        ===================================================== */

        .reset-container {

          width: 100%;

          max-width: 510px;

          padding:
            50px 20px;

          position: relative;

          z-index: 2;

          text-align: center;
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .component-label {

          color: #18aaa0;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 4px;

          margin-bottom: 13px;
        }


        .main-title {

          margin: 0;

          font-size:
            clamp(
              48px,
              6vw,
              65px
            );

          line-height: 0.88;

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
              0.2
            );
        }


        .main-subtitle {

          margin:
            17px auto 28px;

          max-width: 390px;

          color: #7f918e;

          font-size: 13px;

          line-height: 1.5;
        }


        /* =====================================================
           MAIN CARD
        ===================================================== */

        .reset-card {

          width: 100%;

          min-height: 430px;

          position: relative;

          padding:
            32px 35px;

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


        /* =====================================================
           CARD CONTENT
        ===================================================== */

        .card-content {

          width: 100%;

          text-align: left;

          animation:
            content-fade
            0.4s
            ease;
        }


        @keyframes content-fade {

          from {

            opacity: 0;

            transform:
              translateY(12px)
              scale(0.98);
          }

          to {

            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }


        /* =====================================================
           BRAND
        ===================================================== */

        .brand-row {

          display: flex;

          align-items: center;

          gap: 11px;

          margin-bottom: 25px;

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


        /* =====================================================
           ICON
        ===================================================== */

        .step-icon {

          width: 46px;
          height: 46px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-bottom: 15px;

          border-radius: 14px;

          background:
            rgba(
              25,
              214,
              202,
              0.08
            );

          border:
            1px solid
            rgba(
              25,
              214,
              202,
              0.2
            );

          color: #1bd6ca;

          font-size: 19px;
        }


        .success-icon {

          color: #021c19;

          background:
            #19d6ca;

          box-shadow:
            0 0 20px
            rgba(
              25,
              214,
              202,
              0.2
            );
        }


        /* =====================================================
           TEXT
        ===================================================== */

        .card-content h2 {

          margin:
            0 0 6px;

          color: #e8f0ee;

          font-size: 25px;

          font-weight: 700;
        }


        .description {

          margin:
            0 0 10px;

          color: #758582;

          font-size: 12px;

          line-height: 1.5;
        }


        .email-display {

          margin:
            0 0 20px;

          color: #1acbc1;

          font-size: 12px;

          font-weight: 700;

          text-align: center;

          word-break: break-word;
        }


        /* =====================================================
           OTP CONTAINER
        ===================================================== */

        .otp-orbit-container {

          width: 100%;

          height: 125px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          perspective: 900px;
        }


        /* =====================================================
           NORMAL OTP LINE
        ===================================================== */

        .otp-boxes {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          position: relative;

          z-index: 5;
        }


        /* =====================================================
           OTP INPUT
        ===================================================== */

        .otp-input {

          width: 50px;

          height: 57px;

          border-radius: 13px;

          border:
            1px solid
            rgba(
              32,
              170,
              160,
              0.65
            );

          background:
            rgba(
              2,
              12,
              13,
              0.8
            );

          color: #e8f1f0;

          text-align: center;

          font-size: 21px;

          font-weight: 800;

          outline: none;

          transition:
            transform
              0.15s ease,

            border-color
              0.2s ease,

            box-shadow
              0.2s ease;
        }


        .otp-input:focus {

          border-color:
            #19d6ca;

          transform:
            translateY(-2px)
            scale(1.03);

          box-shadow:
            0 0 0 3px
            rgba(
              25,
              214,
              202,
              0.08
            ),

            0 0 18px
            rgba(
              25,
              214,
              202,
              0.12
            );
        }


        /* =====================================================
           CIRCULAR ORBIT MODE
        ===================================================== */

        .orbit-active .otp-boxes {

          width: 150px;

          height: 150px;

          position: absolute;

          left: 50%;

          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          display: block;
        }


        /* =====================================================
           INDIVIDUAL OTP BOX
        ===================================================== */

        .orbit-active .otp-input {

          position: absolute;

          left: 50%;

          top: 50%;

          margin: 0;

          transform:
            translate(
              -50%,
              -50%
            );

          animation:
            otp-orbit
            1.6s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            )
            forwards;

          box-shadow:
            0 0 15px
            rgba(
              25,
              214,
              202,
              0.18
            );
        }


        /* =====================================================
           SIX ORBIT POSITIONS
        ===================================================== */

        .orbit-active
        .otp-input:nth-child(1) {

          --start-angle: 0deg;
        }


        .orbit-active
        .otp-input:nth-child(2) {

          --start-angle: 60deg;
        }


        .orbit-active
        .otp-input:nth-child(3) {

          --start-angle: 120deg;
        }


        .orbit-active
        .otp-input:nth-child(4) {

          --start-angle: 180deg;
        }


        .orbit-active
        .otp-input:nth-child(5) {

          --start-angle: 240deg;
        }


        .orbit-active
        .otp-input:nth-child(6) {

          --start-angle: 300deg;
        }


        /* =====================================================
           ORBIT ANIMATION
        ===================================================== */

        @keyframes otp-orbit {

          0% {

            transform:
              translate(
                -50%,
                -50%
              )
              rotate(
                0deg
              )
              translateX(0)
              rotate(0deg)
              scale(1);

            opacity: 1;
          }


          15% {

            transform:
              translate(
                -50%,
                -50%
              )
              rotate(
                var(--start-angle)
              )
              translateX(0)
              rotate(
                calc(
                  var(--start-angle) * -1
                )
              )
              scale(0.95);

            opacity: 1;
          }


          50% {

            transform:
              translate(
                -50%,
                -50%
              )
              rotate(
                calc(
                  var(--start-angle) + 180deg
                )
              )
              translateX(58px)
              rotate(
                calc(
                  (
                    var(--start-angle) + 180deg
                  ) * -1
                )
              )
              scale(0.82);

            opacity: 1;
          }


          80% {

            transform:
              translate(
                -50%,
                -50%
              )
              rotate(
                calc(
                  var(--start-angle) + 300deg
                )
              )
              translateX(58px)
              rotate(
                calc(
                  (
                    var(--start-angle) + 300deg
                  ) * -1
                )
              )
              scale(0.78);

            opacity: 0.85;
          }


          100% {

            transform:
              translate(
                -50%,
                -50%
              )
              rotate(
                calc(
                  var(--start-angle) + 360deg
                )
              )
              translateX(58px)
              rotate(
                calc(
                  (
                    var(--start-angle) + 360deg
                  ) * -1
                )
              )
              scale(0.72);

            opacity: 0;
          }
        }


        /* =====================================================
           CENTER VERIFYING CIRCLE
        ===================================================== */

        .orbit-center {

          position: absolute;

          left: 50%;

          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          z-index: 10;

          width: 72px;

          height: 72px;

          border-radius: 50%;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 5px;

          background:
            rgba(
              3,
              20,
              20,
              0.96
            );

          border:
            1px solid
            rgba(
              25,
              214,
              202,
              0.4
            );

          box-shadow:
            0 0 30px
            rgba(
              25,
              214,
              202,
              0.2
            );

          animation:
            center-appear
            0.25s
            ease;
        }


        @keyframes center-appear {

          from {

            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.5);
          }

          to {

            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }
        }


        /* =====================================================
           CENTER SPINNER
        ===================================================== */

        .orbit-spinner {

          width: 22px;

          height: 22px;

          border:
            2px solid
            rgba(
              25,
              214,
              202,
              0.2
            );

          border-top-color:
            #19d6ca;

          border-right-color:
            #19d6ca;

          border-radius: 50%;

          animation:
            orbit-loading
            0.6s
            linear
            infinite;
        }


        @keyframes orbit-loading {

          to {

            transform:
              rotate(
                360deg
              );
          }
        }


        .orbit-center span {

          color:
            #19d6ca;

          font-size: 7px;

          font-weight: 800;

          letter-spacing: 1px;
        }


        /* =====================================================
           OTP HINT
        ===================================================== */

        .otp-hint {

          margin:
            5px 0 0;

          color: #61716e;

          text-align: center;

          font-size: 10px;
        }


        /* =====================================================
           VERIFICATION LOADING
        ===================================================== */

        .verification-loading {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          margin-top: 17px;

          color: #6bded6;

          font-size: 11px;
        }


        .spinner {

          width: 14px;

          height: 14px;

          border:
            2px solid
            rgba(
              25,
              214,
              202,
              0.2
            );

          border-top-color:
            #19d6ca;

          border-radius: 50%;

          animation:
            spin
            0.7s
            linear
            infinite;
        }


        @keyframes spin {

          to {

            transform:
              rotate(
                360deg
              );
          }
        }


        /* =====================================================
           PASSWORD INPUT
        ===================================================== */

        .input-group {

          margin-bottom: 18px;
        }


        .input-group label {

          display: block;

          margin-bottom: 8px;

          color: #a4b1af;

          font-size: 13px;

          font-weight: 600;
        }


        .input-wrapper {

          width: 100%;

          height: 55px;

          display: flex;

          align-items: center;

          gap: 11px;

          padding:
            0 14px;

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
              0.2s ease,

            box-shadow
              0.2s ease;
        }


        .input-wrapper:focus-within {

          border-color:
            #19d6ca;

          box-shadow:
            0 0 0 3px
            rgba(
              25,
              214,
              202,
              0.07
            );
        }


        .input-icon {

          width: 20px;

          color: #1bcfc4;

          flex-shrink: 0;
        }


        .input-wrapper input {

          flex: 1;

          min-width: 0;

          height: 100%;

          border: none;

          outline: none;

          background:
            transparent;

          color: #e7f1ef;

          font-size: 14px;
        }


        .input-wrapper input::placeholder {

          color: #60716e;
        }


        .eye-button {

          border: none;

          background:
            transparent;

          color: #6e807d;

          cursor: pointer;

          font-size: 16px;
        }


        .eye-button:hover {

          color: #19d6ca;
        }


        /* =====================================================
           RESET BUTTON
        ===================================================== */

        .reset-button {

          width: 100%;

          height: 55px;

          margin-top: 3px;

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

          cursor: pointer;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          transition:
            transform
              0.2s ease,

            filter
              0.2s ease;
        }


        .reset-button:hover {

          filter:
            brightness(1.07);

          transform:
            translateY(-2px);
        }


        .reset-button:disabled {

          opacity: 0.65;

          cursor: wait;
        }


        /* =====================================================
           MESSAGE
        ===================================================== */

        .message {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          margin-top: 15px;

          padding:
            9px 11px;

          border-radius: 9px;

          font-size: 11px;

          text-align: center;
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


        .message-dot {

          width: 5px;

          height: 5px;

          border-radius: 50%;

          background:
            currentColor;
        }


        /* =====================================================
           BACK LINK
        ===================================================== */

        .back-link {

          display: block;

          margin:
            23px auto 0;

          color: #19cfc4;

          font-size: 11px;

          text-align: center;

          text-decoration: none;
        }


        .back-link:hover {

          color: #69f2eb;
        }


        /* =====================================================
           FOOTER
        ===================================================== */

        .footer-text {

          margin-top: 25px;

          color: #4f615e;

          font-size: 8px;

          letter-spacing: 2px;
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .reset-container {

            padding:
              35px 15px;
          }


          .main-title {

            font-size: 48px;
          }


          .reset-card {

            padding:
              28px 20px;
          }


          .otp-input {

            width: 43px;

            height: 53px;

            font-size: 19px;
          }


          .otp-boxes {

            gap: 6px;
          }


          .orbit-active
          .otp-boxes {

            width: 140px;

            height: 140px;
          }

        }


        @media (max-width: 380px) {

          .otp-input {

            width: 39px;

            height: 49px;

            font-size: 18px;
          }


          .reset-card {

            padding:
              24px 16px;
          }


          .otp-boxes {

            gap: 4px;
          }

        }

      `}</style>

    </div>
  );
}

export default ResetPassword;