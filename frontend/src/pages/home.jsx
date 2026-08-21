import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaFileAlt,
  FaMicrophone,
  FaChartLine,
  FaRobot,
  FaVideo,
  FaCheckCircle,
  FaRocket,
  FaBrain,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="home-grid"></div>

      <div className="home-glow home-glow-one"></div>
      <div className="home-glow home-glow-two"></div>
      <div className="home-glow home-glow-three"></div>

      {/* Floating particles */}
      <div className="floating-particle particle-1"></div>
      <div className="floating-particle particle-2"></div>
      <div className="floating-particle particle-3"></div>
      <div className="floating-particle particle-4"></div>
      <div className="floating-particle particle-5"></div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="home-navbar">

        <div className="home-logo">
          <div className="home-logo-icon">
            AI
          </div>

          <span>
            AI Interview
          </span>
        </div>

        <div className="home-nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#how-it-works">
            How it Works
          </a>

          <a href="#about">
            About
          </a>

        </div>

        <div className="home-nav-actions">

          <button
            className="login-nav-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="signup-nav-button"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

        </div>

      </nav>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main>

        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">

              <span className="hero-badge-dot"></span>

              AI-POWERED INTERVIEW PLATFORM

            </div>

            <h1>

              Your Next

              <span className="gradient-text">
                Dream Job
              </span>

              Starts Here.

            </h1>

            <p className="hero-description">

              Practice smarter. Analyze your resume.
              Improve your interview performance with
              intelligent AI-powered feedback designed
              to help you stand out.

            </p>

            <div className="hero-buttons">

              <button
                className="primary-hero-button"
                onClick={() => navigate("/register")}
              >

                Start Your Journey

                <FaArrowRight />

              </button>

              <button
                className="secondary-hero-button"
                onClick={() => navigate("/login")}
              >

                Explore Platform

              </button>

            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <FaCheckCircle />
                AI-powered analysis
              </div>

              <div className="trust-item">
                <FaCheckCircle />
                Real-time feedback
              </div>

              <div className="trust-item">
                <FaCheckCircle />
                Personalized insights
              </div>

            </div>

          </div>

          {/* =================================================
              AI VISUAL
          ================================================= */}

          <div className="hero-visual">

            <div className="ai-orbit orbit-one"></div>

            <div className="ai-orbit orbit-two"></div>

            <div className="ai-orbit orbit-three"></div>

            <div className="orbit-dot orbit-dot-one"></div>
            <div className="orbit-dot orbit-dot-two"></div>
            <div className="orbit-dot orbit-dot-three"></div>

            <div className="ai-core-home">

              <div className="ai-core-inner-home">

                <FaBrain />

                <span>
                  AI
                </span>

              </div>

            </div>

            {/* Resume Card */}

            <div className="floating-card resume-card">

              <div className="floating-card-icon">
                <FaFileAlt />
              </div>

              <div>

                <span>
                  Resume Score
                </span>

                <strong>
                  92%
                </strong>

              </div>

              <div className="score-line">
                <span></span>
              </div>

            </div>

            {/* Interview Card */}

            <div className="floating-card interview-card">

              <div className="floating-card-icon">
                <FaMicrophone />
              </div>

              <div>

                <span>
                  AI Interview
                </span>

                <strong>
                  Ready
                </strong>

              </div>

              <div className="ready-dot"></div>

            </div>

            {/* Performance Card */}

            <div className="floating-card performance-card">

              <div className="floating-card-icon">
                <FaChartLine />
              </div>

              <div>

                <span>
                  Performance
                </span>

                <strong>
                  +28%
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="stats-section">

          <div className="stat-home">

            <strong>
              AI
            </strong>

            <span>
              Powered
            </span>

          </div>

          <div className="stat-home">

            <strong>
              24/7
            </strong>

            <span>
              Practice Anytime
            </span>

          </div>

          <div className="stat-home">

            <strong>
              360°
            </strong>

            <span>
              Performance Insights
            </span>

          </div>

          <div className="stat-home">

            <strong>
              ∞
            </strong>

            <span>
              Practice Sessions
            </span>

          </div>

        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section
          id="features"
          className="features-section"
        >

          <div className="section-heading">

            <div className="section-label">
              POWERFUL FEATURES
            </div>

            <h2>

              Everything You Need

              <span>
                To Succeed
              </span>

            </h2>

            <p>
              One intelligent platform to prepare,
              practice, analyze and improve.
            </p>

          </div>

          <div className="features-grid">

            <FeatureCard
              icon={<FaFileAlt />}
              title="AI Resume Analyzer"
              description="Upload your resume and get intelligent ATS analysis, skill insights and personalized recommendations."
            />

            <FeatureCard
              icon={<FaMicrophone />}
              title="AI Mock Interviews"
              description="Practice realistic interviews and receive AI-powered feedback on your answers and performance."
            />

            <FeatureCard
              icon={<FaVideo />}
              title="Video Interviews"
              description="Prepare for real-world video interviews with an immersive AI interview experience."
            />

            <FeatureCard
              icon={<FaChartLine />}
              title="Performance Analytics"
              description="Track your interview scores, identify weaknesses and visualize your progress over time."
            />

            <FeatureCard
              icon={<FaRobot />}
              title="AI-Powered Insights"
              description="Get intelligent feedback designed around your specific performance and career goals."
            />

            <FeatureCard
              icon={<FaShieldAlt />}
              title="Personal Dashboard"
              description="Keep your resumes, interviews, reports and career progress organized in one secure place."
            />

          </div>

        </section>

        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section
          id="how-it-works"
          className="how-section"
        >

          <div className="section-heading">

            <div className="section-label">
              SIMPLE PROCESS
            </div>

            <h2>

              Prepare.

              <span>
                Practice.
              </span>

              Succeed.

            </h2>

            <p>
              Your journey to interview confidence
              starts in three simple steps.
            </p>

          </div>

          <div className="steps-container">

            <Step
              number="01"
              icon={<FaFileAlt />}
              title="Build Your Profile"
              text="Upload your resume and let our AI understand your skills, experience and career goals."
            />

            <div className="step-line"></div>

            <Step
              number="02"
              icon={<FaMicrophone />}
              title="Practice Interviews"
              text="Take AI-powered mock interviews tailored to your desired role and experience."
            />

            <div className="step-line"></div>

            <Step
              number="03"
              icon={<FaRocket />}
              title="Improve & Succeed"
              text="Analyze your performance, follow AI recommendations and become interview-ready."
            />

          </div>

        </section>

        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section
          id="about"
          className="about-section"
        >

          <div className="about-visual">

            <div className="about-circle">
              <FaBrain />
            </div>

            <div className="about-ring ring-a"></div>

            <div className="about-ring ring-b"></div>

          </div>

          <div className="about-content">

            <div className="section-label">
              INTELLIGENCE THAT WORKS FOR YOU
            </div>

            <h2>

              Turn Every Interview

              <span>
                Into Progress.
              </span>

            </h2>

            <p>

              AI Interview combines intelligent resume
              analysis, realistic mock interviews and
              detailed performance analytics to help you
              continuously improve.

            </p>

            <div className="about-points">

              <div>
                <FaBolt />
                <span>
                  Instant AI feedback
                </span>
              </div>

              <div>
                <FaBrain />
                <span>
                  Personalized recommendations
                </span>
              </div>

              <div>
                <FaChartLine />
                <span>
                  Track improvement over time
                </span>
              </div>

            </div>

            <button
              className="about-button"
              onClick={() => navigate("/register")}
            >

              Start Preparing

              <FaArrowRight />

            </button>

          </div>

        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="cta-section">

          <div className="cta-glow"></div>

          <div className="cta-content">

            <div className="section-label">
              YOUR FUTURE STARTS NOW
            </div>

            <h2>

              Ready to

              <span>
                Ace Your Interview?
              </span>

            </h2>

            <p>
              Stop guessing. Start practicing with AI.
            </p>

            <button
              className="cta-button"
              onClick={() => navigate("/register")}
            >

              Create Free Account

              <FaArrowRight />

            </button>

          </div>

        </section>

      </main>

      {/* =====================================================
          NO FOOTER
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .home-page {

          min-height: 100vh;

          position: relative;

          overflow: hidden;

          color: #e8f1f0;

          background:
            radial-gradient(
              circle at 50% 5%,
              rgba(25, 214, 202, 0.08),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #020707 0%,
              #061314 50%,
              #020707 100%
            );

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =================================================
           GRID BACKGROUND
        ================================================= */

        .home-grid {

          position: fixed;

          inset: 0;

          pointer-events: none;

          opacity: 0.025;

          background-image:

            linear-gradient(
              rgba(25, 214, 202, 0.7) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(25, 214, 202, 0.7) 1px,
              transparent 1px
            );

          background-size: 45px 45px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );
        }

        /* =================================================
           GLOW
        ================================================= */

        .home-glow {

          position: fixed;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(50px);

          z-index: 0;
        }

        .home-glow-one {

          width: 500px;

          height: 500px;

          top: -250px;

          left: 25%;

          background:
            radial-gradient(
              circle,
              rgba(25, 214, 202, 0.1),
              transparent 70%
            );

          animation:
            homeGlowOne
            9s
            ease-in-out
            infinite;
        }

        .home-glow-two {

          width: 400px;

          height: 400px;

          right: -200px;

          top: 30%;

          background:
            radial-gradient(
              circle,
              rgba(59, 130, 246, 0.08),
              transparent 70%
            );

          animation:
            homeGlowTwo
            11s
            ease-in-out
            infinite;
        }

        .home-glow-three {

          width: 350px;

          height: 350px;

          left: -150px;

          bottom: 10%;

          background:
            radial-gradient(
              circle,
              rgba(25, 214, 202, 0.06),
              transparent 70%
            );
        }

        @keyframes homeGlowOne {

          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(80px, 100px);
          }

        }

        @keyframes homeGlowTwo {

          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(-100px, -60px);
          }

        }

        /* =================================================
           PARTICLES
        ================================================= */

        .floating-particle {

          position: fixed;

          width: 4px;

          height: 4px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 12px #19d6ca;

          opacity: 0.5;

          pointer-events: none;
        }

        .particle-1 {
          left: 15%;
          top: 25%;
          animation:
            particleFloat
            6s
            ease-in-out
            infinite;
        }

        .particle-2 {
          left: 70%;
          top: 20%;
          animation:
            particleFloat
            8s
            1s
            ease-in-out
            infinite;
        }

        .particle-3 {
          left: 85%;
          top: 60%;
          animation:
            particleFloat
            7s
            2s
            ease-in-out
            infinite;
        }

        .particle-4 {
          left: 30%;
          top: 70%;
          animation:
            particleFloat
            9s
            1s
            ease-in-out
            infinite;
        }

        .particle-5 {
          left: 55%;
          top: 85%;
          animation:
            particleFloat
            6s
            2s
            ease-in-out
            infinite;
        }

        @keyframes particleFloat {

          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate(25px, -35px);
            opacity: 0.8;
          }

        }

        /* =================================================
           NAVBAR
        ================================================= */

        .home-navbar {

          height: 78px;

          max-width: 1400px;

          margin: auto;

          padding: 0 40px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          position: relative;

          z-index: 100;

          border-bottom:
            1px solid
            rgba(25, 214, 202, 0.07);

          animation:
            navAppear
            0.8s
            ease
            both;
        }

        @keyframes navAppear {

          from {
            opacity: 0;
            transform: translateY(-15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .home-logo {

          display: flex;

          align-items: center;

          gap: 11px;

          color: #e5efed;

          font-size: 19px;

          font-weight: 750;
        }

        .home-logo-icon {

          width: 38px;

          height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #20ddd0,
              #0d938b
            );

          color: #031211;

          font-size: 12px;

          font-weight: 900;

          box-shadow:
            0 0 25px
            rgba(25, 214, 202, 0.2);

          animation:
            logoPulse
            3s
            ease-in-out
            infinite;
        }

        @keyframes logoPulse {

          0%,
          100% {
            box-shadow:
              0 0 15px
              rgba(25, 214, 202, 0.15);
          }

          50% {
            box-shadow:
              0 0 30px
              rgba(25, 214, 202, 0.4);
          }

        }

        .home-nav-links {

          display: flex;

          gap: 38px;
        }

        .home-nav-links a {

          color: #71817f;

          text-decoration: none;

          font-size: 13px;

          transition:
            all 0.3s ease;
        }

        .home-nav-links a:hover {

          color: #19d6ca;
        }

        .home-nav-actions {

          display: flex;

          align-items: center;

          gap: 10px;
        }

        .login-nav-button,
        .signup-nav-button {

          padding: 10px 17px;

          border-radius: 10px;

          cursor: pointer;

          font-size: 12px;

          font-weight: 600;

          transition:
            all 0.3s ease;
        }

        .login-nav-button {

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

          background: transparent;

          color: #9aa8a6;
        }

        .login-nav-button:hover {

          color: #19d6ca;

          border-color:
            rgba(25, 214, 202, 0.25);
        }

        .signup-nav-button {

          border:
            1px solid
            rgba(25, 214, 202, 0.3);

          background:
            rgba(25, 214, 202, 0.08);

          color: #19d6ca;
        }

        .signup-nav-button:hover {

          transform: translateY(-2px);

          background: #19d6ca;

          color: #031211;

          box-shadow:
            0 8px 25px
            rgba(25, 214, 202, 0.2);
        }

        /* =================================================
           HERO
        ================================================= */

        .hero-section {

          max-width: 1400px;

          min-height: 680px;

          margin: auto;

          padding: 80px 60px;

          display: grid;

          grid-template-columns:
            1.05fr 0.95fr;

          align-items: center;

          gap: 40px;

          position: relative;

          z-index: 5;
        }

        .hero-content {

          animation:
            heroContent
            0.9s
            0.15s
            ease
            both;
        }

        @keyframes heroContent {

          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .hero-badge {

          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 8px 13px;

          border-radius: 20px;

          border:
            1px solid
            rgba(25, 214, 202, 0.15);

          background:
            rgba(25, 214, 202, 0.035);

          color: #71817f;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 1.8px;

          margin-bottom: 24px;
        }

        .hero-badge-dot {

          width: 6px;

          height: 6px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 10px #19d6ca;

          animation:
            statusBlink
            2s
            infinite;
        }

        @keyframes statusBlink {

          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.3;
          }

        }

        .hero-content h1 {

          max-width: 760px;

          margin: 0;

          font-size:
            clamp(52px, 6vw, 82px);

          line-height: 1.02;

          letter-spacing: -4px;

          font-weight: 850;

          color: #edf7f5;
        }

        .gradient-text {

          display: block;

          background:
            linear-gradient(
              90deg,
              #ffffff,
              #4cefe3,
              #19d6ca
            );

          -webkit-background-clip: text;

          -webkit-text-fill-color: transparent;

          background-clip: text;
        }

        .hero-description {

          max-width: 620px;

          margin: 25px 0;

          color: #71817f;

          font-size: 16px;

          line-height: 1.8;
        }

        .hero-buttons {

          display: flex;

          gap: 12px;

          margin-top: 30px;
        }

        .primary-hero-button,
        .secondary-hero-button {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          padding: 14px 21px;

          border-radius: 11px;

          cursor: pointer;

          font-size: 13px;

          font-weight: 700;

          transition:
            all 0.3s ease;
        }

        .primary-hero-button {

          border: none;

          color: #031211;

          background:
            linear-gradient(
              135deg,
              #39e9dc,
              #19bcb2
            );

          box-shadow:
            0 10px 30px
            rgba(25, 214, 202, 0.15);
        }

        .primary-hero-button:hover {

          transform:
            translateY(-4px);

          box-shadow:
            0 15px 40px
            rgba(25, 214, 202, 0.3);
        }

        .primary-hero-button svg {

          transition:
            transform 0.3s ease;
        }

        .primary-hero-button:hover svg {

          transform:
            translateX(4px);
        }

        .secondary-hero-button {

          border:
            1px solid
            rgba(255, 255, 255, 0.1);

          background:
            rgba(255, 255, 255, 0.025);

          color: #a0afad;
        }

        .secondary-hero-button:hover {

          color: #19d6ca;

          border-color:
            rgba(25, 214, 202, 0.25);

          background:
            rgba(25, 214, 202, 0.04);
        }

        .hero-trust {

          display: flex;

          flex-wrap: wrap;

          gap: 20px;

          margin-top: 30px;
        }

        .trust-item {

          display: flex;

          align-items: center;

          gap: 6px;

          color: #536360;

          font-size: 10px;
        }

        .trust-item svg {

          color: #19d6ca;

          font-size: 10px;
        }

        /* =================================================
           AI VISUAL
        ================================================= */

        .hero-visual {

          width: 520px;

          height: 520px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          animation:
            visualAppear
            1.2s
            0.2s
            ease
            both;
        }

        @keyframes visualAppear {

          from {
            opacity: 0;
            transform: scale(0.8);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }

        }

        .ai-orbit {

          position: absolute;

          border-radius: 50%;

          border:
            1px solid
            rgba(25, 214, 202, 0.12);
        }

        .orbit-one {

          width: 420px;

          height: 420px;

          animation:
            orbitRotate
            18s
            linear
            infinite;
        }

        .orbit-two {

          width: 320px;

          height: 320px;

          border-style: dashed;

          animation:
            orbitRotateReverse
            12s
            linear
            infinite;
        }

        .orbit-three {

          width: 230px;

          height: 230px;

          border-color:
            rgba(25, 214, 202, 0.25);

          animation:
            orbitRotate
            8s
            linear
            infinite;
        }

        @keyframes orbitRotate {

          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }

        }

        @keyframes orbitRotateReverse {

          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }

        }

        .ai-core-home {

          width: 150px;

          height: 150px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(25, 214, 202, 0.18),
              transparent 70%
            );

          box-shadow:
            0 0 80px
            rgba(25, 214, 202, 0.12);

          animation:
            coreHomePulse
            3s
            ease-in-out
            infinite;

          z-index: 10;
        }

        .ai-core-inner-home {

          width: 100px;

          height: 100px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 6px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 25%,
              #25ddd1,
              #087d77
            );

          color: #031211;

          font-size: 28px;

          font-weight: 900;

          box-shadow:
            0 0 45px
            rgba(25, 214, 202, 0.35);
        }

        .ai-core-inner-home span {

          font-size: 12px;

          letter-spacing: 3px;
        }

        @keyframes coreHomePulse {

          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }

        }

        .orbit-dot {

          position: absolute;

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 15px #19d6ca;

          z-index: 15;
        }

        .orbit-dot-one {
          top: 50px;
          left: 100px;
        }

        .orbit-dot-two {
          right: 40px;
          top: 250px;
        }

        .orbit-dot-three {
          bottom: 80px;
          left: 100px;
        }

        /* =================================================
           FLOATING CARDS
        ================================================= */

        .floating-card {

          position: absolute;

          display: flex;

          align-items: center;

          gap: 10px;

          min-width: 170px;

          padding: 12px;

          border:
            1px solid
            rgba(25, 214, 202, 0.13);

          border-radius: 14px;

          background:
            rgba(5, 17, 18, 0.75);

          backdrop-filter: blur(18px);

          box-shadow:
            0 15px 35px
            rgba(0, 0, 0, 0.3);

          z-index: 30;
        }

        .resume-card {

          top: 70px;

          left: 0;

          animation:
            floatingCard
            5s
            ease-in-out
            infinite;
        }

        .interview-card {

          right: -10px;

          top: 180px;

          animation:
            floatingCard
            5s
            1s
            ease-in-out
            infinite;
        }

        .performance-card {

          bottom: 60px;

          left: 50px;

          animation:
            floatingCard
            5s
            2s
            ease-in-out
            infinite;
        }

        @keyframes floatingCard {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }

        }

        .floating-card-icon {

          width: 35px;

          height: 35px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 9px;

          background:
            rgba(25, 214, 202, 0.08);

          color: #19d6ca;

          font-size: 14px;
        }

        .floating-card span {

          display: block;

          color: #647573;

          font-size: 9px;
        }

        .floating-card strong {

          display: block;

          margin-top: 3px;

          color: #dce9e7;

          font-size: 13px;
        }

        .score-line {

          position: absolute;

          left: 12px;

          bottom: 6px;

          width:
            calc(100% - 24px);

          height: 2px;

          background:
            rgba(255, 255, 255, 0.05);
        }

        .score-line span {

          display: block;

          width: 92%;

          height: 100%;

          background: #19d6ca;

          box-shadow:
            0 0 8px #19d6ca;
        }

        .ready-dot {

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #19d6ca;

          box-shadow:
            0 0 10px #19d6ca;

          margin-left: auto;
        }

        /* =================================================
           STATS
        ================================================= */

        .stats-section {

          max-width: 1200px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          border-top:
            1px solid
            rgba(255, 255, 255, 0.06);

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.06);

          position: relative;

          z-index: 5;
        }

        .stat-home {

          padding: 28px;

          text-align: center;

          border-right:
            1px solid
            rgba(255, 255, 255, 0.05);
        }

        .stat-home:last-child {

          border-right: none;
        }

        .stat-home strong {

          display: block;

          color: #19d6ca;

          font-size: 26px;
        }

        .stat-home span {

          display: block;

          margin-top: 5px;

          color: #596966;

          font-size: 10px;
        }

        /* =================================================
           SECTION COMMON
        ================================================= */

        .features-section,
        .how-section {

          max-width: 1200px;

          margin: auto;

          padding: 130px 40px;

          position: relative;

          z-index: 5;
        }

        .section-heading {

          text-align: center;

          margin-bottom: 55px;
        }

        .section-label {

          color: #19d6ca;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 3px;

          margin-bottom: 12px;
        }

        .section-heading h2 {

          margin: 0;

          color: #e8f1f0;

          font-size:
            clamp(35px, 5vw, 54px);

          letter-spacing: -2px;
        }

        .section-heading h2 span {

          display: block;

          color: #19d6ca;
        }

        .section-heading p {

          max-width: 560px;

          margin: 15px auto 0;

          color: #657572;

          font-size: 14px;

          line-height: 1.7;
        }

        /* =================================================
           FEATURES
        ================================================= */

        .features-grid {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;
        }

        .feature-card {

          padding: 28px;

          min-height: 220px;

          border:
            1px solid
            rgba(255, 255, 255, 0.06);

          border-radius: 20px;

          background:
            rgba(255, 255, 255, 0.025);

          transition:
            all 0.4s ease;

          position: relative;

          overflow: hidden;
        }

        .feature-card:hover {

          transform:
            translateY(-8px);

          border-color:
            rgba(25, 214, 202, 0.2);

          background:
            rgba(25, 214, 202, 0.035);

          box-shadow:
            0 20px 45px
            rgba(0, 0, 0, 0.2);
        }

        .feature-icon {

          width: 48px;

          height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 13px;

          background:
            rgba(25, 214, 202, 0.07);

          color: #19d6ca;

          font-size: 19px;

          margin-bottom: 20px;

          transition:
            all 0.4s ease;
        }

        .feature-card:hover .feature-icon {

          transform:
            scale(1.1)
            rotate(-5deg);

          box-shadow:
            0 0 25px
            rgba(25, 214, 202, 0.12);
        }

        .feature-card h3 {

          margin: 0 0 9px;

          color: #dce7e5;

          font-size: 17px;
        }

        .feature-card p {

          margin: 0;

          color: #62716f;

          font-size: 12px;

          line-height: 1.7;
        }

        /* =================================================
           HOW IT WORKS
        ================================================= */

        .steps-container {

          display: flex;

          align-items: flex-start;

          justify-content: center;
        }

        .step {

          width: 30%;

          text-align: center;
        }

        .step-number {

          color: #19d6ca;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 2px;

          margin-bottom: 12px;
        }

        .step-icon {

          width: 65px;

          height: 65px;

          margin: auto;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 18px;

          border:
            1px solid
            rgba(25, 214, 202, 0.15);

          background:
            rgba(25, 214, 202, 0.04);

          color: #19d6ca;

          font-size: 23px;

          box-shadow:
            0 0 25px
            rgba(25, 214, 202, 0.05);
        }

        .step h3 {

          margin: 18px 0 8px;

          color: #dce7e5;

          font-size: 16px;
        }

        .step p {

          margin: 0;

          color: #62716f;

          font-size: 11px;

          line-height: 1.7;
        }

        .step-line {

          width: 100px;

          height: 1px;

          margin-top: 95px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(25, 214, 202, 0.3),
              transparent
            );
        }

        /* =================================================
           ABOUT
        ================================================= */

        .about-section {

          max-width: 1100px;

          margin: 40px auto 130px;

          padding: 60px;

          display: grid;

          grid-template-columns:
            0.8fr 1.2fr;

          gap: 80px;

          align-items: center;

          position: relative;

          z-index: 5;

          border:
            1px solid
            rgba(25, 214, 202, 0.08);

          border-radius: 28px;

          background:
            rgba(255, 255, 255, 0.02);

          overflow: hidden;
        }

        .about-visual {

          height: 300px;

          display: flex;

          align-items: center;

          justify-content: center;

          position: relative;
        }

        .about-circle {

          width: 130px;

          height: 130px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          color: #031211;

          background:
            linear-gradient(
              135deg,
              #31e7db,
              #0a827c
            );

          font-size: 45px;

          box-shadow:
            0 0 70px
            rgba(25, 214, 202, 0.25);

          animation:
            aboutCore
            3s
            ease-in-out
            infinite;
        }

        @keyframes aboutCore {

          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }

        }

        .about-ring {

          position: absolute;

          border:
            1px solid
            rgba(25, 214, 202, 0.12);

          border-radius: 50%;
        }

        .ring-a {

          width: 230px;

          height: 230px;

          animation:
            orbitRotate
            10s
            linear
            infinite;
        }

        .ring-b {

          width: 300px;

          height: 300px;

          border-style: dashed;

          animation:
            orbitRotateReverse
            15s
            linear
            infinite;
        }

        .about-content h2 {

          margin: 0;

          color: #e8f1f0;

          font-size: 43px;

          line-height: 1.1;

          letter-spacing: -2px;
        }

        .about-content h2 span {

          display: block;

          color: #19d6ca;
        }

        .about-content > p {

          color: #687875;

          font-size: 13px;

          line-height: 1.8;

          margin: 20px 0;
        }

        .about-points {

          display: flex;

          flex-direction: column;

          gap: 12px;

          margin: 20px 0;
        }

        .about-points div {

          display: flex;

          align-items: center;

          gap: 10px;

          color: #7d8c89;

          font-size: 11px;
        }

        .about-points svg {

          color: #19d6ca;
        }

        .about-button {

          display: flex;

          align-items: center;

          gap: 10px;

          padding: 12px 18px;

          border:
            1px solid
            rgba(25, 214, 202, 0.2);

          border-radius: 10px;

          background:
            rgba(25, 214, 202, 0.06);

          color: #19d6ca;

          font-size: 11px;

          font-weight: 700;

          cursor: pointer;

          transition:
            all 0.3s ease;
        }

        .about-button:hover {

          background: #19d6ca;

          color: #031211;

          transform:
            translateY(-3px);
        }

        /* =================================================
           CTA
        ================================================= */

        .cta-section {

          max-width: 1000px;

          margin: 0 auto 100px;

          padding: 80px 40px;

          text-align: center;

          position: relative;

          z-index: 5;

          border:
            1px solid
            rgba(25, 214, 202, 0.12);

          border-radius: 28px;

          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              rgba(25, 214, 202, 0.05),
              rgba(255, 255, 255, 0.02)
            );
        }

        .cta-glow {

          position: absolute;

          width: 400px;

          height: 400px;

          left: 50%;

          top: 50%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(25, 214, 202, 0.1),
              transparent 70%
            );

          filter: blur(30px);

          animation:
            ctaGlow
            5s
            ease-in-out
            infinite;
        }

        @keyframes ctaGlow {

          0%,
          100% {

            transform:
              translate(-50%, -50%)
              scale(0.8);
          }

          50% {

            transform:
              translate(-50%, -50%)
              scale(1.2);
          }

        }

        .cta-content {

          position: relative;

          z-index: 2;
        }

        .cta-content h2 {

          margin: 0;

          color: #edf7f5;

          font-size: 50px;

          letter-spacing: -2px;
        }

        .cta-content h2 span {

          display: block;

          color: #19d6ca;
        }

        .cta-content p {

          color: #637370;

          margin: 15px 0 25px;

          font-size: 13px;
        }

        .cta-button {

          display: inline-flex;

          align-items: center;

          gap: 10px;

          padding: 14px 22px;

          border: none;

          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #3ce9dc,
              #18bcb2
            );

          color: #031211;

          font-size: 12px;

          font-weight: 800;

          cursor: pointer;

          transition:
            all 0.3s ease;
        }

        .cta-button:hover {

          transform:
            translateY(-4px);

          box-shadow:
            0 15px 35px
            rgba(25, 214, 202, 0.25);
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1000px) {

          .home-nav-links {
            display: none;
          }

          .hero-section {

            grid-template-columns: 1fr;

            text-align: center;

            padding: 70px 30px;
          }

          .hero-description {

            margin-left: auto;

            margin-right: auto;
          }

          .hero-buttons,
          .hero-trust {

            justify-content: center;
          }

          .hero-visual {

            margin:
              20px auto 0;

            transform:
              scale(0.85);
          }

          .features-grid {

            grid-template-columns:
              repeat(2, 1fr);
          }

          .about-section {

            grid-template-columns: 1fr;

            text-align: center;

            gap: 30px;
          }

          .about-points {

            align-items: center;
          }

          .about-button {

            margin: auto;
          }

        }

        @media (max-width: 700px) {

          .home-navbar {

            padding: 0 18px;
          }

          .login-nav-button {

            display: none;
          }

          .hero-section {

            min-height: auto;

            padding:
              70px 20px;
          }

          .hero-content h1 {

            font-size: 48px;

            letter-spacing: -2px;
          }

          .hero-buttons {

            flex-direction: column;
          }

          .hero-buttons button {

            width: 100%;
          }

          .hero-visual {

            width: 350px;

            height: 400px;

            transform:
              scale(0.75);
          }

          .stats-section {

            grid-template-columns:
              repeat(2, 1fr);
          }

          .stat-home {

            border-bottom:
              1px solid
              rgba(255, 255, 255, 0.05);
          }

          .features-section,
          .how-section {

            padding:
              90px 20px;
          }

          .features-grid {

            grid-template-columns: 1fr;
          }

          .steps-container {

            flex-direction: column;

            gap: 35px;
          }

          .step {

            width: 100%;
          }

          .step-line {

            display: none;
          }

          .about-section {

            margin: 20px;

            padding:
              35px 20px;
          }

          .about-content h2 {

            font-size: 36px;
          }

          .cta-section {

            margin: 20px 20px 60px;

            padding:
              60px 20px;
          }

          .cta-content h2 {

            font-size: 38px;
          }

        }

      `}</style>

    </div>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  icon,
  title,
  text,
}) {
  return (
    <div className="step">

      <div className="step-number">
        {number}
      </div>

      <div className="step-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}

export default Home;