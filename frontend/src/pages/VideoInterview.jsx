import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  FaVideo,
  FaStopCircle,
  FaPlayCircle,
  FaArrowRight,
  FaRobot,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaEye,
  FaSmile,
  FaUser,
  FaMicrophone,
  FaLightbulb,
  FaWaveSquare,
} from "react-icons/fa";

function VideoInterview() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);

  /* =====================================================
     LOAD QUESTIONS
  ===================================================== */

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("interviewQuestions") || "[]"
      );

      const introQuestions = [
        "To start off, could you please tell me a little bit about yourself?",
        "Can you walk me through your past work experience and what you learned from it?",
      ];

      if (Array.isArray(saved) && saved.length > 0) {
        const technicalQuestions = saved.filter(
          (q) =>
            typeof q === "string" &&
            !q.toLowerCase().includes("tell me about yourself") &&
            !q.toLowerCase().includes("walk me through")
        );

        setQuestions([
          ...introQuestions,
          ...technicalQuestions,
        ]);
      } else {
        setQuestions([
          ...introQuestions,
          "What do you consider to be your greatest professional strength?",
          "Why are you interested in this specific career path?",
        ]);
      }
    } catch (error) {
      console.error("Question loading error:", error);

      setQuestions([
        "To start off, could you please tell me a little bit about yourself?",
        "Can you walk me through your past work experience and what you learned from it?",
        "What do you consider to be your greatest professional strength?",
        "Why are you interested in this specific career path?",
      ]);
    }
  }, []);

  const currentQuestion =
    questions.length > 0 ? questions[currentIndex] : "";

  const progressPercentage =
    questions.length > 0
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;

  /* =====================================================
     CAMERA
  ===================================================== */

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraActive(true);
      setMessage("Camera activated. Ready to record.");
    } catch (error) {
      console.error("Camera Error:", error);

      alert(
        "Unable to access camera and microphone. Please check browser permissions."
      );
    }
  };

  /* =====================================================
     START RECORDING
  ===================================================== */

  const startRecording = () => {
    const stream = videoRef.current?.srcObject;

    if (!stream) {
      alert("Please start the camera first.");
      return;
    }

    let recorder;

    try {
      recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
    } catch (error) {
      console.warn(
        "video/webm not supported. Using browser default."
      );

      try {
        recorder = new MediaRecorder(stream);
      } catch (err) {
        console.error(err);

        alert(
          "Your browser does not support video recording."
        );

        return;
      }
    }

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.start();

    setRecording(true);
    setAnalysis(null);
    setMessage("Recording your answer...");
  };

  /* =====================================================
     STOP RECORDING
  ===================================================== */

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = async () => {
      try {
        setUploading(true);

        setMessage(
          "AI is transcribing and analyzing your response..."
        );

        const blob = new Blob(chunksRef.current, {
          type: "video/webm",
        });

        const formData = new FormData();

        formData.append(
          "file",
          blob,
          "interview.webm"
        );

        formData.append(
          "question",
          currentQuestion
        );

        const response = await axios.post(
          "/api/video/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setAnalysis(response.data.analysis);

        setMessage(
          "AI analysis completed successfully."
        );
      } catch (error) {
        console.error(
          "Video upload/evaluation error:",
          error
        );

        setMessage(
          "Upload or evaluation failed. Please try again."
        );
      } finally {
        setUploading(false);
        setRecording(false);
      }
    };

    mediaRecorderRef.current.stop();
  };

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnalysis(null);
      setMessage("");
    }
  };

  /* =====================================================
     CLEAN CAMERA
  ===================================================== */

  useEffect(() => {
    return () => {
      const stream =
        videoRef.current?.srcObject;

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="video-page">

      <Sidebar />

      {/* =================================================
          ANIMATED BACKGROUND
      ================================================= */}

      <div className="background-effects">

        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />

        <div className="grid-overlay" />

        <div className="particle particle-one" />
        <div className="particle particle-two" />
        <div className="particle particle-three" />
        <div className="particle particle-four" />
        <div className="particle particle-five" />
        <div className="particle particle-six" />
        <div className="particle particle-seven" />
        <div className="particle particle-eight" />

      </div>

      <main className="video-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="page-header">

          <div className="header-icon">
            <FaVideo size={30} />
          </div>

          <div>

            <div className="title-row">

              <h1>
                Video Interview
              </h1>

              <span className="ai-badge">
                <span className="ai-dot" />
                AI POWERED
              </span>

            </div>

            <p>
              Practice realistic interviews on camera and
              receive intelligent feedback on your answers,
              confidence and presentation.
            </p>

          </div>

        </section>

        {/* =================================================
            PROGRESS
        ================================================= */}

        {questions.length > 0 && (
          <div className="progress-card">

            <div className="progress-top">

              <div>

                <span className="progress-label">
                  INTERVIEW PROGRESS
                </span>

                <span className="progress-question">
                  Question {currentIndex + 1} of{" "}
                  {questions.length}
                </span>

              </div>

              <span className="progress-percent">
                {Math.round(progressPercentage)}%
              </span>

            </div>

            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />

            </div>

          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {questions.length === 0 ? (

          <div className="empty-card">

            <div className="empty-icon">
              <FaExclamationTriangle size={42} />
            </div>

            <h2>
              Preparing Your Interview
            </h2>

            <p>
              Loading your personalized interview
              questions...
            </p>

          </div>

        ) : (

          <div className="interview-grid">

            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="left-column">

              {/* QUESTION */}

              <div className="glass-card question-card">

                <div className="card-top">

                  <span className="question-badge">
                    <FaRobot />
                    AI QUESTION
                  </span>

                  <span className="question-number">
                    #{currentIndex + 1}
                  </span>

                </div>

                <h2>
                  {currentQuestion}
                </h2>

                <div className="question-tip">

                  <FaLightbulb />

                  <span>
                    Take a moment to think before
                    answering. Speak naturally and
                    maintain eye contact with the camera.
                  </span>

                </div>

              </div>

              {/* CAMERA */}

              <div className="glass-card camera-card">

                <div className="camera-header">

                  <div>

                    <h3>
                      <FaVideo />
                      Camera Preview
                    </h3>

                    <p>
                      {recording
                        ? "Recording your response..."
                        : isCameraActive
                        ? "Camera ready"
                        : "Camera is currently off"}
                    </p>

                  </div>

                  {recording && (
                    <div className="recording-badge">
                      <span />
                      REC
                    </div>
                  )}

                </div>

                {/* VIDEO */}

                <div className="video-container">

                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={
                      isCameraActive
                        ? "camera-video active"
                        : "camera-video"
                    }
                  />

                  {!isCameraActive && (
                    <div className="camera-placeholder">

                      <div className="camera-placeholder-icon">
                        <FaVideo size={40} />
                      </div>

                      <h3>
                        Camera Preview
                      </h3>

                      <p>
                        Turn on your camera to begin
                        your interview.
                      </p>

                    </div>
                  )}

                  {recording && (
                    <div className="recording-overlay">

                      <div className="recording-wave">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>

                      <span>
                        Recording
                      </span>

                    </div>
                  )}

                </div>

                {/* CONTROLS */}

                <div className="camera-controls">

                  {!isCameraActive ? (

                    <button
                      className="primary-button"
                      onClick={startCamera}
                    >
                      <FaVideo />
                      Turn Camera On
                    </button>

                  ) : !recording ? (

                    <button
                      className="record-button"
                      onClick={startRecording}
                      disabled={uploading}
                    >
                      <FaPlayCircle size={20} />
                      Start Recording
                    </button>

                  ) : (

                    <button
                      className="stop-button"
                      onClick={stopRecording}
                    >
                      <FaStopCircle size={20} />
                      Stop & Submit Answer
                    </button>

                  )}

                </div>

                <div className="camera-status">

                  <span
                    className={
                      isCameraActive
                        ? "status-dot active"
                        : "status-dot"
                    }
                  />

                  {isCameraActive
                    ? recording
                      ? "Recording in progress"
                      : "Camera and microphone ready"
                    : "Camera disconnected"}

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="right-column">

              {/* STATUS */}

              {(message || uploading) && (

                <div
                  className={
                    uploading
                      ? "status-card processing"
                      : "status-card success"
                  }
                >

                  {uploading ? (
                    <FaSpinner className="spinner" />
                  ) : (
                    <FaCheckCircle />
                  )}

                  <div>

                    <strong>
                      {uploading
                        ? "AI Processing"
                        : "Analysis Ready"}
                    </strong>

                    <p>
                      {message}
                    </p>

                  </div>

                </div>

              )}

              {/* =================================================
                  ANALYSIS
              ================================================= */}

              {analysis ? (

                <div className="analysis-card">

                  <div className="analysis-header">

                    <div className="analysis-icon">
                      <FaRobot />
                    </div>

                    <div>

                      <span>
                        AI INTERVIEW ANALYSIS
                      </span>

                      <h2>
                        Your Performance
                      </h2>

                    </div>

                  </div>

                  {/* TRANSCRIPT */}

                  {analysis.transcript && (

                    <div className="analysis-section transcript">

                      <div className="section-title">

                        <FaMicrophone />

                        <span>
                          What We Heard
                        </span>

                      </div>

                      <p>
                        "{analysis.transcript}"
                      </p>

                    </div>

                  )}

                  {/* ANSWER FEEDBACK */}

                  {analysis.answer_feedback && (

                    <div className="feedback-box">

                      <div className="section-title green">

                        <FaCheckCircle />

                        <span>
                          Answer Quality
                        </span>

                      </div>

                      <p>
                        {analysis.answer_feedback}
                      </p>

                    </div>

                  )}

                  {/* METRICS */}

                  <div className="metrics-title">

                    <FaWaveSquare />

                    Behavioral Metrics

                  </div>

                  <div className="metrics-grid">

                    <MetricCard
                      icon={<FaUser />}
                      title="Confidence"
                      value={
                        analysis.confidence_score !==
                          null &&
                        analysis.confidence_score !==
                          undefined
                          ? `${analysis.confidence_score}%`
                          : "N/A"
                      }
                      color="cyan"
                    />

                    <MetricCard
                      icon={<FaEye />}
                      title="Eye Contact"
                      value={
                        analysis.eye_contact ||
                        "N/A"
                      }
                      color="teal"
                    />

                    <MetricCard
                      icon={<FaSmile />}
                      title="Expression"
                      value={
                        analysis.facial_expression ||
                        "N/A"
                      }
                      color="green"
                    />

                    <MetricCard
                      icon={<FaUser />}
                      title="Body Language"
                      value={
                        analysis.body_language ||
                        "N/A"
                      }
                      color="orange"
                    />

                  </div>

                  {/* VOCAL */}

                  {analysis.speaking_confidence && (

                    <div className="vocal-card">

                      <div className="section-title">

                        <FaMicrophone />

                        Vocal Delivery

                      </div>

                      <p>
                        {analysis.speaking_confidence}
                      </p>

                    </div>

                  )}

                  {/* RECOMMENDATION */}

                  {analysis.recommendation && (

                    <div className="recommendation">

                      <div className="recommendation-icon">
                        <FaLightbulb />
                      </div>

                      <div>

                        <h3>
                          AI Recommendation
                        </h3>

                        <p>
                          {analysis.recommendation}
                        </p>

                      </div>

                    </div>

                  )}

                  {/* NEXT */}

                  <button
                    className="next-button"
                    onClick={nextQuestion}
                    disabled={
                      currentIndex >=
                      questions.length - 1
                    }
                  >

                    {currentIndex >=
                    questions.length - 1
                      ? "Interview Complete"
                      : "Move to Next Question"}

                    {currentIndex <
                      questions.length - 1 && (
                      <FaArrowRight />
                    )}

                  </button>

                </div>

              ) : (

                <div className="waiting-card">

                  <div className="waiting-animation">

                    <div className="orbit orbit-one" />
                    <div className="orbit orbit-two" />

                    <div className="ai-core">
                      <FaRobot />
                    </div>

                  </div>

                  <h2>
                    AI Analysis
                  </h2>

                  <p>
                    Complete your answer and submit
                    the recording to receive detailed
                    AI feedback.
                  </p>

                  <div className="waiting-items">

                    <span>
                      <FaCheckCircle />
                      Answer Quality
                    </span>

                    <span>
                      <FaCheckCircle />
                      Confidence
                    </span>

                    <span>
                      <FaCheckCircle />
                      Body Language
                    </span>

                    <span>
                      <FaCheckCircle />
                      AI Recommendations
                    </span>

                  </div>

                </div>

              )}

            </div>

          </div>

        )}

      </main>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =====================================================
           MAIN PAGE
        ===================================================== */

        .video-page {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(20,184,166,0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(34,211,238,0.09),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #020707 0%,
              #061316 45%,
              #071c22 100%
            );

          color: white;

          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          display: flex;

          position: relative;

          overflow-x: hidden;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .background-effects {
          position: fixed;
          inset: 0;

          pointer-events: none;

          overflow: hidden;

          z-index: 0;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(34,211,238,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(34,211,238,0.025) 1px,
              transparent 1px
            );

          background-size: 70px 70px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 85%
            );

          animation:
            gridMove 18s linear infinite;
        }

        .glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(90px);

          opacity: 0.22;

          animation:
            floatGlow 12s ease-in-out infinite;
        }

        .glow-one {
          width: 430px;
          height: 430px;

          background: #14b8a6;

          top: -180px;
          left: 15%;
        }

        .glow-two {
          width: 380px;
          height: 380px;

          background: #06b6d4;

          right: -120px;
          top: 30%;

          animation-delay: 3s;
        }

        .glow-three {
          width: 320px;
          height: 320px;

          background: #10b981;

          left: 30%;
          bottom: -180px;

          animation-delay: 6s;
        }

        .particle {
          position: absolute;

          width: 3px;
          height: 3px;

          background: #67e8f9;

          border-radius: 50%;

          box-shadow:
            0 0 14px #22d3ee;

          animation:
            particleFloat 9s linear infinite;
        }

        .particle-one {
          left: 25%;
          top: 20%;
        }

        .particle-two {
          left: 55%;
          top: 35%;
          animation-delay: 1s;
        }

        .particle-three {
          left: 75%;
          top: 70%;
          animation-delay: 2s;
        }

        .particle-four {
          left: 15%;
          top: 65%;
          animation-delay: 3s;
        }

        .particle-five {
          left: 85%;
          top: 25%;
          animation-delay: 4s;
        }

        .particle-six {
          left: 45%;
          top: 80%;
          animation-delay: 5s;
        }

        .particle-seven {
          left: 65%;
          top: 15%;
          animation-delay: 6s;
        }

        .particle-eight {
          left: 35%;
          top: 50%;
          animation-delay: 7s;
        }

        @keyframes floatGlow {

          0%,100% {
            transform:
              translate(0,0)
              scale(1);
          }

          50% {
            transform:
              translate(45px,-35px)
              scale(1.15);
          }

        }

        @keyframes particleFloat {

          0% {
            transform:
              translateY(100px)
              translateX(0);

            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform:
              translateY(-350px)
              translateX(90px);

            opacity: 0;
          }

        }

        @keyframes gridMove {

          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(70px);
          }

        }

        /* =====================================================
           MAIN
        ===================================================== */

        .video-main {
          margin-left: 260px;

          padding:
            45px 50px 70px;

          width:
            calc(100% - 260px);

          max-width: 1600px;

          position: relative;

          z-index: 2;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .page-header {
          display: flex;

          align-items: center;

          gap: 18px;

          margin-bottom: 30px;

          animation:
            slideDown .7s ease;
        }

        .header-icon {
          width: 68px;
          height: 68px;

          border-radius: 20px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #67e8f9;

          background:
            linear-gradient(
              135deg,
              rgba(20,184,166,.18),
              rgba(34,211,238,.04)
            );

          border:
            1px solid
            rgba(34,211,238,.25);

          box-shadow:
            0 0 35px
            rgba(20,184,166,.14);

          animation:
            iconFloat 3s ease-in-out infinite;
        }

        .title-row {
          display: flex;

          align-items: center;

          gap: 15px;

          flex-wrap: wrap;
        }

        .title-row h1 {
          margin: 0;

          font-size: 42px;

          font-weight: 900;

          letter-spacing: -1px;

          background:
            linear-gradient(
              90deg,
              #ffffff,
              #67e8f9,
              #5eead4
            );

          -webkit-background-clip: text;

          -webkit-text-fill-color: transparent;
        }

        .page-header p {
          margin: 8px 0 0;

          color: #94a3b8;

          font-size: 16px;

          max-width: 850px;

          line-height: 1.6;
        }

        .ai-badge {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          padding:
            6px 11px;

          border-radius: 20px;

          color: #67e8f9;

          background:
            rgba(20,184,166,.07);

          border:
            1px solid
            rgba(34,211,238,.2);

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1px;
        }

        .ai-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 10px #22c55e;

          animation:
            blink 1.5s infinite;
        }

        /* =====================================================
           PROGRESS
        ===================================================== */

        .progress-card {
          padding: 18px 22px;

          margin-bottom: 25px;

          border-radius: 18px;

          background:
            rgba(255,255,255,.035);

          border:
            1px solid
            rgba(255,255,255,.07);

          backdrop-filter:
            blur(20px);

          animation:
            fadeUp .7s ease;
        }

        .progress-top {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin-bottom: 12px;
        }

        .progress-label {
          color: #64748b;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 1px;

          margin-right: 15px;
        }

        .progress-question {
          color: #cbd5e1;

          font-size: 13px;
        }

        .progress-percent {
          color: #5eead4;

          font-size: 14px;

          font-weight: 800;
        }

        .progress-track {
          height: 7px;

          background:
            rgba(255,255,255,.06);

          border-radius: 20px;

          overflow: hidden;
        }

        .progress-fill {
          height: 100%;

          border-radius: 20px;

          background:
            linear-gradient(
              90deg,
              #0d9488,
              #22d3ee,
              #5eead4
            );

          box-shadow:
            0 0 18px
            rgba(34,211,238,.5);

          transition:
            width .6s ease;
        }

        /* =====================================================
           GRID
        ===================================================== */

        .interview-grid {
          display: grid;

          grid-template-columns:
            minmax(0,1.05fr)
            minmax(400px,.95fr);

          gap: 25px;

          align-items: start;
        }

        .left-column,
        .right-column {
          display: flex;

          flex-direction: column;

          gap: 20px;
        }

        /* =====================================================
           GLASS
        ===================================================== */

        .glass-card {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.05),
              rgba(255,255,255,.012)
            );

          backdrop-filter:
            blur(25px);

          border:
            1px solid
            rgba(255,255,255,.08);

          border-radius: 24px;

          box-shadow:
            0 20px 50px
            rgba(0,0,0,.22);

          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .glass-card:hover {
          transform:
            translateY(-3px);

          border-color:
            rgba(34,211,238,.18);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,.3),
            0 0 35px
            rgba(20,184,166,.04);
        }

        /* =====================================================
           QUESTION
        ===================================================== */

        .question-card {
          padding: 28px;

          position: relative;

          overflow: hidden;

          animation:
            fadeUp .6s ease;
        }

        .question-card::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 3px;

          background:
            linear-gradient(
              90deg,
              #0d9488,
              #22d3ee,
              #5eead4
            );
        }

        .card-top {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin-bottom: 20px;
        }

        .question-badge {
          display: flex;

          align-items: center;

          gap: 8px;

          color: #67e8f9;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 1px;

          padding:
            7px 12px;

          background:
            rgba(20,184,166,.07);

          border:
            1px solid
            rgba(34,211,238,.18);

          border-radius: 20px;
        }

        .question-number {
          color: #64748b;

          font-size: 13px;

          font-weight: bold;
        }

        .question-card h2 {
          margin: 0;

          font-size: 22px;

          line-height: 1.6;

          font-weight: 600;

          color: #f8fafc;
        }

        .question-tip {
          display: flex;

          gap: 10px;

          align-items: flex-start;

          margin-top: 22px;

          padding: 14px;

          border-radius: 13px;

          color: #94a3b8;

          background:
            rgba(20,184,166,.035);

          border:
            1px solid
            rgba(34,211,238,.08);

          font-size: 13px;

          line-height: 1.5;
        }

        .question-tip svg {
          color: #facc15;

          margin-top: 2px;

          flex-shrink: 0;
        }

        /* =====================================================
           CAMERA
        ===================================================== */

        .camera-card {
          padding: 25px;

          animation:
            fadeUp .8s ease;
        }

        .camera-header {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin-bottom: 18px;
        }

        .camera-header h3 {
          margin: 0;

          display: flex;

          gap: 9px;

          align-items: center;

          font-size: 17px;
        }

        .camera-header h3 svg {
          color: #5eead4;
        }

        .camera-header p {
          margin: 5px 0 0;

          color: #64748b;

          font-size: 12px;
        }

        .recording-badge {
          display: flex;

          align-items: center;

          gap: 8px;

          padding:
            7px 12px;

          border-radius: 20px;

          background:
            rgba(239,68,68,.15);

          border:
            1px solid
            rgba(239,68,68,.3);

          color: #fca5a5;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 1px;

          animation:
            recordingPulse 1.3s infinite;
        }

        .recording-badge span {
          width: 8px;
          height: 8px;

          background: #ef4444;

          border-radius: 50%;

          box-shadow:
            0 0 12px #ef4444;
        }

        .video-container {
          width: 100%;

          aspect-ratio: 16 / 9;

          border-radius: 18px;

          overflow: hidden;

          position: relative;

          background:
            radial-gradient(
              circle at center,
              #123c3b,
              #020707 70%
            );

          border:
            1px solid
            rgba(255,255,255,.08);

          box-shadow:
            inset 0 0 60px
            rgba(20,184,166,.04);
        }

        .camera-video {
          width: 100%;
          height: 100%;

          object-fit: cover;

          transform:
            scaleX(-1);

          opacity: 0;

          transition:
            opacity .5s ease;
        }

        .camera-video.active {
          opacity: 1;
        }

        .camera-placeholder {
          position: absolute;

          inset: 0;

          display: flex;

          flex-direction: column;

          justify-content: center;

          align-items: center;

          text-align: center;

          color: #64748b;
        }

        .camera-placeholder-icon {
          width: 75px;
          height: 75px;

          border-radius: 50%;

          display: flex;

          justify-content: center;

          align-items: center;

          color: #5eead4;

          background:
            rgba(20,184,166,.08);

          border:
            1px solid
            rgba(34,211,238,.15);

          animation:
            iconFloat 3s infinite;
        }

        .camera-placeholder h3 {
          margin:
            15px 0 5px;

          color: #cbd5e1;
        }

        .camera-placeholder p {
          margin: 0;

          font-size: 13px;
        }

        .recording-overlay {
          position: absolute;

          left: 15px;
          bottom: 15px;

          display: flex;

          align-items: center;

          gap: 10px;

          padding:
            8px 12px;

          border-radius: 20px;

          background:
            rgba(0,0,0,.65);

          backdrop-filter:
            blur(10px);

          font-size: 12px;

          color: #fca5a5;
        }

        .recording-wave {
          display: flex;

          align-items: center;

          gap: 2px;

          height: 18px;
        }

        .recording-wave span {
          width: 3px;

          background: #ef4444;

          border-radius: 3px;

          animation:
            wave .7s ease-in-out infinite;
        }

        .recording-wave span:nth-child(1) {
          height: 7px;
        }

        .recording-wave span:nth-child(2) {
          height: 15px;

          animation-delay: .1s;
        }

        .recording-wave span:nth-child(3) {
          height: 10px;

          animation-delay: .2s;
        }

        .recording-wave span:nth-child(4) {
          height: 17px;

          animation-delay: .3s;
        }

        .recording-wave span:nth-child(5) {
          height: 8px;

          animation-delay: .4s;
        }

        @keyframes wave {

          0%,100% {
            transform:
              scaleY(.6);
          }

          50% {
            transform:
              scaleY(1.2);
          }

        }

        .camera-controls {
          display: flex;

          gap: 12px;

          margin-top: 18px;
        }

        .camera-controls button {
          width: 100%;

          border-radius: 13px;

          padding: 14px;

          color: white;

          font-size: 14px;

          font-weight: 700;

          border: none;

          cursor: pointer;

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 9px;

          transition:
            all .25s ease;
        }

        .camera-controls button:hover:not(:disabled) {
          transform:
            translateY(-3px);
        }

        .primary-button {
          background:
            linear-gradient(
              135deg,
              #0d9488,
              #06b6d4
            );

          box-shadow:
            0 10px 25px
            rgba(20,184,166,.22);
        }

        .record-button {
          background:
            linear-gradient(
              135deg,
              #ef4444,
              #dc2626
            );

          box-shadow:
            0 10px 25px
            rgba(239,68,68,.25);
        }

        .stop-button {
          background:
            linear-gradient(
              135deg,
              #334155,
              #1e293b
            );

          border:
            1px solid
            rgba(255,255,255,.1) !important;
        }

        .camera-status {
          display: flex;

          justify-content: center;

          align-items: center;

          gap: 7px;

          color: #64748b;

          font-size: 11px;

          margin-top: 12px;
        }

        .status-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #64748b;
        }

        .status-dot.active {
          background: #22c55e;

          box-shadow:
            0 0 10px #22c55e;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .status-card {
          display: flex;

          align-items: center;

          gap: 14px;

          padding: 17px;

          border-radius: 16px;

          animation:
            fadeUp .4s ease;
        }

        .status-card strong {
          display: block;

          font-size: 14px;
        }

        .status-card p {
          margin:
            3px 0 0;

          font-size: 12px;

          opacity: .8;
        }

        .status-card.processing {
          color: #67e8f9;

          background:
            rgba(20,184,166,.06);

          border:
            1px solid
            rgba(34,211,238,.18);
        }

        .status-card.success {
          color: #86efac;

          background:
            rgba(34,197,94,.06);

          border:
            1px solid
            rgba(34,197,94,.18);
        }

        .spinner {
          animation:
            spin 1s linear infinite;

          font-size: 22px;
        }

        /* =====================================================
           WAITING
        ===================================================== */

        .waiting-card {
          padding:
            45px 30px;

          border-radius: 24px;

          text-align: center;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.045),
              rgba(255,255,255,.012)
            );

          border:
            1px solid
            rgba(255,255,255,.08);

          backdrop-filter:
            blur(20px);

          animation:
            fadeUp .8s ease;
        }

        .waiting-animation {
          width: 110px;
          height: 110px;

          margin:
            0 auto 25px;

          position: relative;

          display: flex;

          justify-content: center;

          align-items: center;

          color: #5eead4;

          font-size: 30px;
        }

        .ai-core {
          width: 54px;
          height: 54px;

          display: flex;

          justify-content: center;
          align-items: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(34,211,238,.18),
              rgba(20,184,166,.04)
            );

          border:
            1px solid
            rgba(34,211,238,.25);

          box-shadow:
            0 0 35px
            rgba(34,211,238,.12);

          animation:
            aiPulse 2s infinite;
        }

        .orbit {
          position: absolute;

          border:
            1px solid
            rgba(34,211,238,.22);

          border-radius: 50%;

          animation:
            rotateOrbit 5s linear infinite;
        }

        .orbit-one {
          width: 85px;
          height: 85px;
        }

        .orbit-two {
          width: 110px;
          height: 110px;

          animation-duration: 8s;

          animation-direction:
            reverse;
        }

        .waiting-card h2 {
          margin:
            0 0 10px;

          font-size: 22px;
        }

        .waiting-card > p {
          color: #94a3b8;

          line-height: 1.6;

          font-size: 14px;

          max-width: 400px;

          margin: auto;
        }

        .waiting-items {
          display: flex;

          flex-direction: column;

          gap: 11px;

          margin-top: 25px;

          text-align: left;
        }

        .waiting-items span {
          padding:
            11px 13px;

          border-radius: 10px;

          background:
            rgba(255,255,255,.03);

          color: #cbd5e1;

          font-size: 13px;

          display: flex;

          align-items: center;

          gap: 10px;

          transition:
            transform .25s ease,
            background .25s ease;
        }

        .waiting-items span:hover {
          transform:
            translateX(5px);

          background:
            rgba(20,184,166,.05);
        }

        .waiting-items svg {
          color: #22c55e;
        }

        /* =====================================================
           ANALYSIS
        ===================================================== */

        .analysis-card {
          padding: 28px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(20,184,166,.08),
              rgba(34,211,238,.025)
            );

          border:
            1px solid
            rgba(34,211,238,.18);

          backdrop-filter:
            blur(25px);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,.2);

          animation:
            analysisAppear .7s ease;
        }

        .analysis-header {
          display: flex;

          gap: 14px;

          align-items: center;

          margin-bottom: 25px;
        }

        .analysis-icon {
          width: 48px;
          height: 48px;

          border-radius: 15px;

          display: flex;

          justify-content: center;

          align-items: center;

          color: #67e8f9;

          background:
            rgba(20,184,166,.1);

          border:
            1px solid
            rgba(34,211,238,.2);

          font-size: 21px;

          animation:
            iconFloat 3s infinite;
        }

        .analysis-header span {
          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1px;

          color: #5eead4;
        }

        .analysis-header h2 {
          margin:
            3px 0 0;

          font-size: 21px;
        }

        .analysis-section,
        .feedback-box,
        .vocal-card {
          padding: 17px;

          border-radius: 15px;

          margin-bottom: 18px;
        }

        .transcript {
          background:
            rgba(255,255,255,.035);

          border:
            1px solid
            rgba(255,255,255,.05);
        }

        .analysis-section p,
        .feedback-box p,
        .vocal-card p,
        .recommendation p {
          color: #cbd5e1;

          font-size: 13.5px;

          line-height: 1.7;

          margin:
            9px 0 0;
        }

        .section-title {
          display: flex;

          align-items: center;

          gap: 8px;

          color: #67e8f9;

          font-size: 13px;

          font-weight: 800;
        }

        .section-title.green {
          color: #4ade80;
        }

        .feedback-box {
          background:
            rgba(34,197,94,.06);

          border-left:
            3px solid #22c55e;
        }

        .metrics-title {
          display: flex;

          align-items: center;

          gap: 8px;

          margin:
            23px 0 14px;

          color: #cbd5e1;

          font-size: 13px;

          font-weight: 800;
        }

        .metrics-title svg {
          color: #5eead4;
        }

        .metrics-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 10px;
        }

        .metric-card {
          padding: 15px;

          border-radius: 14px;

          background:
            rgba(255,255,255,.035);

          border:
            1px solid
            rgba(255,255,255,.06);

          transition:
            all .3s ease;
        }

        .metric-card:hover {
          transform:
            translateY(-3px);

          background:
            rgba(20,184,166,.05);

          border-color:
            rgba(34,211,238,.15);
        }

        .metric-icon {
          width: 32px;
          height: 32px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 9px;

          margin-bottom: 10px;
        }

        .metric-icon.cyan {
          color: #67e8f9;

          background:
            rgba(34,211,238,.1);
        }

        .metric-icon.teal {
          color: #5eead4;

          background:
            rgba(20,184,166,.1);
        }

        .metric-icon.green {
          color: #86efac;

          background:
            rgba(34,197,94,.1);
        }

        .metric-icon.orange {
          color: #fdba74;

          background:
            rgba(249,115,22,.1);
        }

        .metric-title {
          color: #64748b;

          font-size: 11px;

          margin-bottom: 5px;
        }

        .metric-value {
          color: #f8fafc;

          font-size: 14px;

          font-weight: 800;
        }

        .vocal-card {
          margin-top: 18px;

          background:
            rgba(0,0,0,.18);

          border:
            1px solid
            rgba(255,255,255,.05);
        }

        .recommendation {
          display: flex;

          gap: 13px;

          margin-top: 20px;

          padding: 18px;

          border-radius: 15px;

          background:
            rgba(20,184,166,.05);

          border-left:
            3px solid #14b8a6;
        }

        .recommendation-icon {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          color: #facc15;

          background:
            rgba(250,204,21,.1);
        }

        .recommendation h3 {
          margin: 0;

          color: #5eead4;

          font-size: 14px;
        }

        .next-button {
          width: 100%;

          margin-top: 22px;

          padding: 15px;

          border: none;

          border-radius: 13px;

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 10px;

          font-size: 14px;

          font-weight: 800;

          color: white;

          cursor: pointer;

          background:
            linear-gradient(
              135deg,
              #0d9488,
              #06b6d4
            );

          box-shadow:
            0 10px 25px
            rgba(20,184,166,.22);

          transition:
            all .3s ease;
        }

        .next-button:hover:not(:disabled) {
          transform:
            translateY(-3px);

          box-shadow:
            0 15px 35px
            rgba(20,184,166,.32);
        }

        .next-button:disabled {
          color: #64748b;

          background:
            rgba(255,255,255,.05);

          box-shadow: none;

          cursor: not-allowed;
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .empty-card {
          padding:
            80px 30px;

          text-align: center;

          border-radius: 25px;

          background:
            rgba(255,255,255,.03);

          border:
            1px dashed
            rgba(255,255,255,.15);

          animation:
            fadeUp .7s ease;
        }

        .empty-icon {
          color: #f59e0b;

          margin-bottom: 20px;

          animation:
            iconFloat 2s infinite;
        }

        .empty-card h2 {
          margin:
            0 0 8px;
        }

        .empty-card p {
          color: #64748b;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes fadeUp {

          from {
            opacity: 0;

            transform:
              translateY(25px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        @keyframes slideDown {

          from {
            opacity: 0;

            transform:
              translateY(-20px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        @keyframes analysisAppear {

          from {
            opacity: 0;

            transform:
              translateY(20px)
              scale(.98);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }

        @keyframes iconFloat {

          0%,100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-6px);
          }

        }

        @keyframes recordingPulse {

          0%,100% {
            box-shadow:
              0 0 0
              rgba(239,68,68,0);
          }

          50% {
            box-shadow:
              0 0 20px
              rgba(239,68,68,.25);
          }

        }

        @keyframes blink {

          0%,100% {
            opacity: 1;
          }

          50% {
            opacity: .3;
          }

        }

        @keyframes spin {

          to {
            transform:
              rotate(360deg);
          }

        }

        @keyframes rotateOrbit {

          to {
            transform:
              rotate(360deg);
          }

        }

        @keyframes aiPulse {

          0%,100% {
            box-shadow:
              0 0 10px
              rgba(34,211,238,.05);
          }

          50% {
            box-shadow:
              0 0 35px
              rgba(34,211,238,.2);
          }

        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .video-main {
            padding:
              35px 30px;
          }

          .interview-grid {
            grid-template-columns:
              1fr;
          }

          .right-column {
            min-width: 0;
          }

        }

        @media (max-width: 700px) {

          .video-main {
            margin-left: 0;

            width: 100%;

            padding:
              25px 18px 50px;
          }

          .title-row h1 {
            font-size: 30px;
          }

          .page-header {
            align-items:
              flex-start;
          }

          .header-icon {
            width: 52px;
            height: 52px;

            border-radius: 15px;
          }

          .header-icon svg {
            width: 22px;
          }

          .question-card,
          .camera-card,
          .analysis-card {
            padding: 20px;
          }

          .metrics-grid {
            grid-template-columns:
              1fr;
          }

          .progress-label {
            display: block;

            margin-bottom: 4px;
          }

          .progress-question {
            display: block;
          }

          .camera-controls {
            flex-direction:
              column;
          }

        }

      `}</style>

    </div>
  );
}

/* =====================================================
   METRIC CARD
===================================================== */

function MetricCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div className="metric-card">

      <div
        className={`metric-icon ${color}`}
      >
        {icon}
      </div>

      <div className="metric-title">
        {title}
      </div>

      <div className="metric-value">
        {value}
      </div>

    </div>
  );
}

export default VideoInterview;