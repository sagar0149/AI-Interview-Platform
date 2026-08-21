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
    const saved = JSON.parse(
      localStorage.getItem("interviewQuestions") || "[]"
    );

    const introQuestions = [
      "To start off, could you please tell me a little bit about yourself?",
      "Can you walk me through your past work experience and what you learned from it?",
    ];

    if (saved && saved.length > 0) {
      const technicalQuestions = saved.filter(
        (q) =>
          !q.toLowerCase().includes("tell me about yourself") &&
          !q.toLowerCase().includes("walk me through")
      );

      setQuestions([...introQuestions, ...technicalQuestions]);
    } else {
      setQuestions([
        ...introQuestions,
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
      const stream =
        await navigator.mediaDevices.getUserMedia({
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
      console.error(error);

      try {
        recorder = new MediaRecorder(stream);
      } catch (err) {
        alert("Your browser does not support video recording.");
        return;
      }
    }

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
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
        console.error(error);

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
      setCurrentIndex(currentIndex + 1);
      setAnalysis(null);
      setMessage("");
    }
  };

  /* =====================================================
     CLEAN CAMERA WHEN PAGE CLOSES
  ===================================================== */

  useEffect(() => {
    return () => {
      const stream =
        videoRef.current?.srcObject;

      if (stream) {
        stream.getTracks().forEach((track) =>
          track.stop()
        );
      }
    };
  }, []);

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="video-page">

      <Sidebar />

      {/* Animated Background */}

      <div className="background-effects">
        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />

        <div className="particle particle-one" />
        <div className="particle particle-two" />
        <div className="particle particle-three" />
        <div className="particle particle-four" />
        <div className="particle particle-five" />
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
              <h1>Video Interview</h1>

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
            MAIN CONTENT
        ================================================= */}

        {questions.length === 0 ? (
          <div className="empty-card">

            <div className="empty-icon">
              <FaExclamationTriangle size={42} />
            </div>

            <h2>Preparing Your Interview</h2>

            <p>
              Loading your personalized interview
              questions...
            </p>

          </div>
        ) : (
          <div className="interview-grid">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="left-column">

              {/* Question */}

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

              {/* Video */}

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

                {/* Video container */}

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

                {/* Controls */}

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
                RIGHT SIDE
            ================================================= */}

            <div className="right-column">

              {/* Status */}

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

              {/* AI Analysis */}

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

                  {/* Transcript */}

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

                  {/* Answer feedback */}

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

                  {/* Metrics */}

                  <div className="metrics-title">
                    <FaWaveSquare />
                    Behavioral Metrics
                  </div>

                  <div className="metrics-grid">

                    <MetricCard
                      icon={<FaUser />}
                      title="Confidence"
                      value={
                        analysis.confidence_score
                          ? `${analysis.confidence_score}%`
                          : "N/A"
                      }
                      color="blue"
                    />

                    <MetricCard
                      icon={<FaEye />}
                      title="Eye Contact"
                      value={
                        analysis.eye_contact ||
                        "N/A"
                      }
                      color="purple"
                    />

                    <MetricCard
                      icon={<FaSmile />}
                      title="Expression"
                      value={
                        analysis.facial_expression ||
                        "N/A"
                      }
                      color="pink"
                    />

                    <MetricCard
                      icon={<FaUser />}
                      title="Body Language"
                      value={
                        analysis.body_language ||
                        "N/A"
                      }
                      color="green"
                    />

                  </div>

                  {/* Vocal delivery */}

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

                  {/* Recommendation */}

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

                  {/* Next */}

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
                    <FaRobot />

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

        .video-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(37,99,235,0.15),
              transparent 35%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(139,92,246,0.14),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #020617 0%,
              #071126 45%,
              #0f172a 75%,
              #111c3a 100%
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

        /* ================================
           BACKGROUND
        ================================= */

        .background-effects {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.18;
          animation: floatGlow 10s ease-in-out infinite;
        }

        .glow-one {
          width: 400px;
          height: 400px;
          background: #2563eb;
          top: -150px;
          left: 15%;
        }

        .glow-two {
          width: 350px;
          height: 350px;
          background: #7c3aed;
          right: -100px;
          top: 35%;
          animation-delay: 2s;
        }

        .glow-three {
          width: 300px;
          height: 300px;
          background: #06b6d4;
          left: 25%;
          bottom: -150px;
          animation-delay: 4s;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(147,197,253,0.8);
          border-radius: 50%;
          box-shadow:
            0 0 15px rgba(96,165,250,0.8);
          animation: particleFloat 8s linear infinite;
        }

        .particle-one {
          left: 30%;
          top: 15%;
        }

        .particle-two {
          left: 70%;
          top: 30%;
          animation-delay: 2s;
        }

        .particle-three {
          left: 50%;
          top: 75%;
          animation-delay: 4s;
        }

        .particle-four {
          left: 85%;
          top: 80%;
          animation-delay: 1s;
        }

        .particle-five {
          left: 20%;
          top: 60%;
          animation-delay: 5s;
        }

        @keyframes floatGlow {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(40px,-30px) scale(1.15);
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
              translateY(-300px)
              translateX(80px);
            opacity: 0;
          }
        }

        /* ================================
           MAIN
        ================================= */

        .video-main {
          margin-left: 260px;
          padding: 45px 50px 70px;
          width: calc(100% - 260px);
          max-width: 1600px;
          position: relative;
          z-index: 2;
        }

        /* ================================
           HEADER
        ================================= */

        .page-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 30px;
          animation: slideDown 0.7s ease;
        }

        .header-icon {
          width: 68px;
          height: 68px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60a5fa;
          background:
            linear-gradient(
              135deg,
              rgba(59,130,246,0.25),
              rgba(96,165,250,0.05)
            );
          border: 1px solid rgba(96,165,250,0.3);
          box-shadow:
            0 0 35px rgba(59,130,246,0.2);
          animation: iconFloat 3s ease-in-out infinite;
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
              #93c5fd,
              #c4b5fd
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
          padding: 6px 11px;
          border-radius: 20px;
          color: #93c5fd;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(96,165,250,0.25);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .ai-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
          animation: blink 1.5s infinite;
        }

        /* ================================
           PROGRESS
        ================================= */

        .progress-card {
          padding: 18px 22px;
          margin-bottom: 25px;
          border-radius: 18px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          animation: fadeUp 0.7s ease;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
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
          color: #60a5fa;
          font-size: 14px;
          font-weight: 800;
        }

        .progress-track {
          height: 7px;
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 20px;
          background:
            linear-gradient(
              90deg,
              #2563eb,
              #60a5fa,
              #a78bfa
            );
          box-shadow:
            0 0 18px rgba(96,165,250,0.6);
          transition: width 0.6s ease;
        }

        /* ================================
           GRID
        ================================= */

        .interview-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(400px, 0.95fr);
          gap: 25px;
          align-items: start;
        }

        .left-column,
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ================================
           GLASS CARD
        ================================= */

        .glass-card {
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.018)
            );
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          box-shadow:
            0 20px 50px rgba(0,0,0,0.22);
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .glass-card:hover {
          transform: translateY(-3px);
          border-color: rgba(96,165,250,0.2);
          box-shadow:
            0 25px 60px rgba(0,0,0,0.3);
        }

        /* ================================
           QUESTION
        ================================= */

        .question-card {
          padding: 28px;
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.6s ease;
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
              #2563eb,
              #8b5cf6,
              #06b6d4
            );
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .question-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #93c5fd;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 7px 12px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
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
          background: rgba(59,130,246,0.05);
          border: 1px solid rgba(59,130,246,0.1);
          font-size: 13px;
          line-height: 1.5;
        }

        .question-tip svg {
          color: #facc15;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* ================================
           CAMERA
        ================================= */

        .camera-card {
          padding: 25px;
          animation: fadeUp 0.8s ease;
        }

        .camera-header {
          display: flex;
          justify-content: space-between;
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
          color: #60a5fa;
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
          padding: 7px 12px;
          border-radius: 20px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          animation: recordingPulse 1.3s infinite;
        }

        .recording-badge span {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 12px #ef4444;
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
              #172554,
              #020617 70%
            );
          border: 1px solid rgba(255,255,255,0.08);
        }

        .camera-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scaleX(-1);
          opacity: 0;
          transition: opacity 0.5s ease;
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
          color: #60a5fa;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(96,165,250,0.15);
          animation: iconFloat 3s infinite;
        }

        .camera-placeholder h3 {
          margin: 15px 0 5px;
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
          padding: 8px 12px;
          border-radius: 20px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(10px);
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
          animation: wave 0.7s ease-in-out infinite;
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
            transform: scaleY(.6);
          }
          50% {
            transform: scaleY(1.2);
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
          transition: all .25s ease;
        }

        .camera-controls button:hover:not(:disabled) {
          transform: translateY(-3px);
        }

        .primary-button {
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
          box-shadow:
            0 10px 25px rgba(37,99,235,.25);
        }

        .record-button {
          background:
            linear-gradient(
              135deg,
              #ef4444,
              #dc2626
            );
          box-shadow:
            0 10px 25px rgba(239,68,68,.25);
        }

        .stop-button {
          background:
            linear-gradient(
              135deg,
              #334155,
              #1e293b
            );
          border: 1px solid rgba(255,255,255,.1) !important;
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
          box-shadow: 0 0 10px #22c55e;
        }

        /* ================================
           STATUS
        ================================= */

        .status-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 17px;
          border-radius: 16px;
          animation: fadeUp .4s ease;
        }

        .status-card strong {
          display: block;
          font-size: 14px;
        }

        .status-card p {
          margin: 3px 0 0;
          font-size: 12px;
          opacity: .8;
        }

        .status-card.processing {
          color: #93c5fd;
          background: rgba(59,130,246,.08);
          border: 1px solid rgba(59,130,246,.2);
        }

        .status-card.success {
          color: #86efac;
          background: rgba(34,197,94,.08);
          border: 1px solid rgba(34,197,94,.2);
        }

        .spinner {
          animation: spin 1s linear infinite;
          font-size: 22px;
        }

        /* ================================
           WAITING
        ================================= */

        .waiting-card {
          padding: 45px 30px;
          border-radius: 24px;
          text-align: center;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.045),
              rgba(255,255,255,.015)
            );
          border: 1px solid rgba(255,255,255,.08);
          backdrop-filter: blur(20px);
          animation: fadeUp .8s ease;
        }

        .waiting-animation {
          width: 110px;
          height: 110px;
          margin: 0 auto 25px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #60a5fa;
          font-size: 30px;
        }

        .orbit {
          position: absolute;
          border: 1px solid rgba(96,165,250,.25);
          border-radius: 50%;
          animation: rotateOrbit 5s linear infinite;
        }

        .orbit-one {
          width: 85px;
          height: 85px;
        }

        .orbit-two {
          width: 110px;
          height: 110px;
          animation-duration: 8s;
          animation-direction: reverse;
        }

        .waiting-card h2 {
          margin: 0 0 10px;
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
          padding: 11px 13px;
          border-radius: 10px;
          background: rgba(255,255,255,.03);
          color: #cbd5e1;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .waiting-items svg {
          color: #22c55e;
        }

        /* ================================
           ANALYSIS
        ================================= */

        .analysis-card {
          padding: 28px;
          border-radius: 24px;
          background:
            linear-gradient(
              145deg,
              rgba(139,92,246,.12),
              rgba(59,130,246,.035)
            );
          border: 1px solid rgba(139,92,246,.25);
          backdrop-filter: blur(25px);
          box-shadow:
            0 20px 50px rgba(0,0,0,.2);
          animation: analysisAppear .7s ease;
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
          color: #c4b5fd;
          background: rgba(139,92,246,.15);
          border: 1px solid rgba(139,92,246,.25);
          font-size: 21px;
          animation: iconFloat 3s infinite;
        }

        .analysis-header span {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #a78bfa;
        }

        .analysis-header h2 {
          margin: 3px 0 0;
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
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.05);
        }

        .analysis-section p,
        .feedback-box p,
        .vocal-card p,
        .recommendation p {
          color: #cbd5e1;
          font-size: 13.5px;
          line-height: 1.7;
          margin: 9px 0 0;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #93c5fd;
          font-size: 13px;
          font-weight: 800;
        }

        .section-title.green {
          color: #4ade80;
        }

        .feedback-box {
          background: rgba(34,197,94,.08);
          border-left: 3px solid #22c55e;
        }

        .metrics-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 23px 0 14px;
          color: #cbd5e1;
          font-size: 13px;
          font-weight: 800;
        }

        .metrics-title svg {
          color: #a78bfa;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .metric-card {
          padding: 15px;
          border-radius: 14px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.06);
          transition: all .3s ease;
        }

        .metric-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,.07);
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

        .metric-icon.blue {
          color: #60a5fa;
          background: rgba(59,130,246,.12);
        }

        .metric-icon.purple {
          color: #c4b5fd;
          background: rgba(139,92,246,.12);
        }

        .metric-icon.pink {
          color: #f9a8d4;
          background: rgba(236,72,153,.12);
        }

        .metric-icon.green {
          color: #86efac;
          background: rgba(34,197,94,.12);
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
          background: rgba(0,0,0,.18);
          border: 1px solid rgba(255,255,255,.05);
        }

        .recommendation {
          display: flex;
          gap: 13px;
          margin-top: 20px;
          padding: 18px;
          border-radius: 15px;
          background: rgba(59,130,246,.08);
          border-left: 3px solid #3b82f6;
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
          background: rgba(250,204,21,.1);
        }

        .recommendation h3 {
          margin: 0;
          color: #60a5fa;
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
              #2563eb,
              #4f46e5
            );
          box-shadow:
            0 10px 25px rgba(37,99,235,.25);
          transition: all .3s ease;
        }

        .next-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow:
            0 15px 35px rgba(37,99,235,.35);
        }

        .next-button:disabled {
          color: #64748b;
          background: rgba(255,255,255,.05);
          box-shadow: none;
          cursor: not-allowed;
        }

        /* ================================
           EMPTY
        ================================= */

        .empty-card {
          padding: 80px 30px;
          text-align: center;
          border-radius: 25px;
          background: rgba(255,255,255,.03);
          border: 1px dashed rgba(255,255,255,.15);
          animation: fadeUp .7s ease;
        }

        .empty-icon {
          color: #f59e0b;
          margin-bottom: 20px;
          animation: iconFloat 2s infinite;
        }

        .empty-card h2 {
          margin: 0 0 8px;
        }

        .empty-card p {
          color: #64748b;
        }

        /* ================================
           ANIMATIONS
        ================================= */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes analysisAppear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconFloat {
          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes recordingPulse {
          0%,100% {
            box-shadow:
              0 0 0 rgba(239,68,68,0);
          }

          50% {
            box-shadow:
              0 0 20px rgba(239,68,68,.25);
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
            transform: rotate(360deg);
          }
        }

        @keyframes rotateOrbit {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================================
           RESPONSIVE
        ================================= */

        @media (max-width: 1100px) {

          .video-main {
            padding: 35px 30px;
          }

          .interview-grid {
            grid-template-columns: 1fr;
          }

          .right-column {
            min-width: 0;
          }

        }

        @media (max-width: 700px) {

          .video-main {
            margin-left: 0;
            width: 100%;
            padding: 25px 18px 50px;
          }

          .title-row h1 {
            font-size: 30px;
          }

          .page-header {
            align-items: flex-start;
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
            grid-template-columns: 1fr;
          }

          .progress-label {
            display: block;
            margin-bottom: 4px;
          }

          .progress-question {
            display: block;
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

      <div className={`metric-icon ${color}`}>
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