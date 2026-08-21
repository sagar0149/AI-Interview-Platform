import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Sidebar from "../components/Sidebar";
import AILoader from "../components/AILoader";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaMicrophone,
  FaStopCircle,
  FaVolumeUp,
  FaArrowRight,
  FaFilePdf,
  FaRobot,
  FaCheckCircle,
  FaWaveSquare,
  FaBrain,
  FaBolt,
  FaHeadphones,
} from "react-icons/fa";

function VoiceInterview() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // =========================================================
  // LOAD INTERVIEW QUESTIONS
  // =========================================================

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

  const progressPercentage =
    questions.length > 0
      ? ((currentQuestion + 1) / questions.length) * 100
      : 0;

  // =========================================================
  // BROWSER SUPPORT CHECK
  // =========================================================

  if (!browserSupportsSpeechRecognition) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #020617, #0f172a, #1e3a8a)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
          padding: "30px",
        }}
      >
        <div
          style={{
            padding: "40px",
            maxWidth: "600px",
            textAlign: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            backdropFilter: "blur(20px)",
          }}
        >
          <FaMicrophone
            size={50}
            color="#60a5fa"
            style={{ marginBottom: "20px" }}
          />

          <h2>Speech Recognition Not Supported</h2>

          <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
            Your browser does not support speech recognition. Please use
            Google Chrome for the AI Voice Interview.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // TEXT TO SPEECH
  // =========================================================

  const speakQuestion = () => {
    if (!questions[currentQuestion]) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      questions[currentQuestion]
    );

    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  // =========================================================
  // START LISTENING
  // =========================================================

  const startListening = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  // =========================================================
  // STOP LISTENING
  // =========================================================

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // =========================================================
  // SUBMIT ANSWER
  // =========================================================

  const nextQuestion = async () => {
    if (!transcript.trim()) {
      alert("Please provide an answer before moving to the next question.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/interview/evaluate",
        {
          question: questions[currentQuestion],
          answer: transcript,
        }
      );

      setScore(response.data.score);
      setFeedback(response.data.evaluation);

      const updatedAnswers = [
        ...answers,
        {
          question: questions[currentQuestion],
          answer: transcript,
        },
      ];

      setAnswers(updatedAnswers);

      resetTranscript();

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert("Interview Completed! Check your final feedback below.");
      }
    } catch (error) {
      console.error(error);

      alert(
        "Backend interview API not working. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DOWNLOAD REPORT
  // =========================================================

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138);

    doc.text(
      "AI Interview Performance Report",
      20,
      20
    );

    doc.setFontSize(14);
    doc.setTextColor(22, 163, 74);

    doc.text(
      `Latest Answer Score: ${score}/10`,
      20,
      35
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text("AI Feedback:", 20, 50);

    const splitFeedback = doc.splitTextToSize(
      feedback || "No Feedback available.",
      170
    );

    doc.text(splitFeedback, 20, 60);

    doc.save("Voice_Interview_Report.pdf");
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.15), transparent 30%), radial-gradient(circle at 80% 70%, rgba(124,58,237,0.15), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.08)",
          filter: "blur(100px)",
          top: "-150px",
          right: "10%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(139,92,246,0.08)",
          filter: "blur(100px)",
          bottom: "-100px",
          left: "30%",
          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        style={{
          marginLeft: "260px",
          padding: "40px 60px",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "1250px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          style={{
            marginBottom: "35px",
            animation: "slideDown 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 14px",
              borderRadius: "30px",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(96,165,250,0.2)",
              color: "#93c5fd",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            <FaBrain />
            AI POWERED VOICE INTERVIEW
          </div>

          <h1
            style={{
              fontSize: "42px",
              fontWeight: "900",
              margin: "0 0 10px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              letterSpacing: "-1px",
            }}
          >
            <div
              style={{
                padding: "14px",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
                borderRadius: "18px",
                color: "#60a5fa",
                display: "flex",
                boxShadow: "0 0 30px rgba(59,130,246,0.15)",
              }}
            >
              <FaMicrophone size={28} />
            </div>

            AI Voice Interview
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
              margin: 0,
              lineHeight: "1.6",
            }}
          >
            Speak naturally, answer AI-generated questions, and receive
            intelligent interview feedback.
          </p>
        </div>

        {questions.length > 0 && (
          <>
            {/* =================================================
                STATUS BAR
            ================================================= */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                padding: "14px 18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                backdropFilter: "blur(15px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  color: listening ? "#f87171" : "#94a3b8",
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: listening
                      ? "#ef4444"
                      : "#64748b",
                    boxShadow: listening
                      ? "0 0 12px rgba(239,68,68,0.8)"
                      : "none",
                    animation: listening
                      ? "blink 1s infinite"
                      : "none",
                  }}
                />

                {listening
                  ? "Listening to your answer..."
                  : "Voice system ready"}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                <FaBolt color="#facc15" />

                AI Interview Engine
              </div>
            </div>

            {/* =================================================
                MAIN INTERVIEW CARD
            ================================================= */}

            <div
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))",
                backdropFilter: "blur(25px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "28px",
                padding: "45px",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.35)",
                position: "relative",
                overflow: "hidden",
                animation: "fadeIn 0.7s ease",
              }}
            >
              {/* Progress */}

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    width: `${progressPercentage}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #2563eb, #7c3aed, #60a5fa)",
                    transition:
                      "width 0.5s cubic-bezier(.4,0,.2,1)",
                    boxShadow:
                      "0 0 15px rgba(96,165,250,0.7)",
                  }}
                />
              </div>

              {/* Question Number */}

              <div
                style={{
                  textAlign: "center",
                  marginBottom: "28px",
                  marginTop: "5px",
                }}
              >
                <span
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    color: "#93c5fd",
                    padding: "8px 18px",
                    borderRadius: "30px",
                    fontSize: "14px",
                    fontWeight: "600",
                    border:
                      "1px solid rgba(96,165,250,0.25)",
                  }}
                >
                  Question {currentQuestion + 1} of{" "}
                  {questions.length}
                </span>
              </div>

              {/* Question */}

              <div
                style={{
                  maxWidth: "850px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto 20px",
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                    color: "#60a5fa",
                  }}
                >
                  <FaRobot size={27} />
                </div>

                <h1
                  style={{
                    fontSize: "30px",
                    lineHeight: "1.5",
                    margin: "0 0 35px",
                    color: "#f8fafc",
                    fontWeight: "700",
                  }}
                >
                  {questions[currentQuestion]}
                </h1>
              </div>

              {/* =================================================
                  VOICE CONTROL AREA
              ================================================= */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "35px",
                  marginBottom: "35px",
                  flexWrap: "wrap",
                }}
              >
                {/* Read Question */}

                <button
                  onClick={speakQuestion}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 24px",
                    borderRadius: "14px",
                    background:
                      "rgba(255,255,255,0.04)",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontWeight: "600",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(59,130,246,0.1)";
                    e.currentTarget.style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.04)";
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  <FaVolumeUp color="#60a5fa" />

                  {isSpeaking
                    ? "Speaking..."
                    : "Read Question"}
                </button>

                {/* MICROPHONE */}

                <div
                  style={{
                    position: "relative",
                    width: "110px",
                    height: "110px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {listening && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          width: "110px",
                          height: "110px",
                          borderRadius: "50%",
                          border:
                            "1px solid rgba(239,68,68,0.5)",
                          animation:
                            "micPulse 1.6s infinite",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          width: "140px",
                          height: "140px",
                          borderRadius: "50%",
                          border:
                            "1px solid rgba(239,68,68,0.2)",
                          animation:
                            "micPulse 1.6s infinite 0.4s",
                        }}
                      />
                    </>
                  )}

                  <button
                    onClick={startListening}
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      border: "none",
                      background: listening
                        ? "linear-gradient(135deg, #ef4444, #b91c1c)"
                        : "linear-gradient(135deg, #2563eb, #7c3aed)",
                      color: "white",
                      fontSize: "32px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 2,
                      boxShadow: listening
                        ? "0 0 40px rgba(239,68,68,0.5)"
                        : "0 10px 35px rgba(37,99,235,0.4)",
                      transition: "all 0.3s",
                      animation: listening
                        ? "micFloat 1.5s infinite"
                        : "none",
                    }}
                  >
                    <FaMicrophone />
                  </button>
                </div>

                {/* Stop */}

                <button
                  onClick={stopListening}
                  disabled={!listening}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 24px",
                    borderRadius: "14px",
                    background: listening
                      ? "rgba(239,68,68,0.1)"
                      : "rgba(255,255,255,0.03)",
                    border: listening
                      ? "1px solid rgba(239,68,68,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                    color: listening
                      ? "#fca5a5"
                      : "#64748b",
                    fontWeight: "600",
                    fontSize: "15px",
                    cursor: listening
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  <FaStopCircle />

                  Stop Recording
                </button>
              </div>

              {/* =================================================
                  AUDIO WAVE
              ================================================= */}

              {listening && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                    height: "35px",
                    marginBottom: "25px",
                  }}
                >
                  {[...Array(22)].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: "4px",
                        height: `${8 +
                          Math.random() * 25}px`,
                        borderRadius: "5px",
                        background:
                          "linear-gradient(to top, #3b82f6, #a855f7)",
                        animation: `wave 0.8s ease-in-out infinite`,
                        animationDelay: `${index * 0.04}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* =================================================
                  LIVE ANSWER
              ================================================= */}

              <div
                style={{
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      color: "#cbd5e1",
                      margin: 0,
                    }}
                  >
                    Your Live Answer
                  </h3>

                  {listening && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#f87171",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#ef4444",
                        }}
                      />
                      RECORDING
                    </span>
                  )}
                </div>

                <div
                  style={{
                    background:
                      "rgba(0,0,0,0.25)",
                    border: listening
                      ? "1px solid rgba(96,165,250,0.45)"
                      : "1px solid rgba(255,255,255,0.08)",
                    padding: "24px",
                    borderRadius: "18px",
                    minHeight: "145px",
                    color: transcript
                      ? "#f8fafc"
                      : "#64748b",
                    fontSize: "16px",
                    lineHeight: "1.8",
                    transition: "all 0.3s",
                    boxShadow: listening
                      ? "0 0 30px rgba(59,130,246,0.08)"
                      : "none",
                  }}
                >
                  {transcript ||
                    (listening
                      ? "Listening... start speaking."
                      : "Click the microphone button to start recording your answer.")}
                </div>
              </div>

              {/* =================================================
                  SUBMIT BUTTON
              ================================================= */}

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <button
                  onClick={nextQuestion}
                  disabled={
                    loading || !transcript.trim()
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "16px 38px",
                    border: "none",
                    borderRadius: "14px",
                    background:
                      loading || !transcript.trim()
                        ? "rgba(255,255,255,0.05)"
                        : "linear-gradient(135deg, #2563eb, #7c3aed)",
                    color:
                      loading || !transcript.trim()
                        ? "#64748b"
                        : "white",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor:
                      loading || !transcript.trim()
                        ? "not-allowed"
                        : "pointer",
                    boxShadow:
                      loading || !transcript.trim()
                        ? "none"
                        : "0 12px 30px rgba(37,99,235,0.3)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    if (
                      !loading &&
                      transcript.trim()
                    ) {
                      e.currentTarget.style.transform =
                        "translateY(-3px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  {loading
                    ? "Analyzing Answer..."
                    : currentQuestion ===
                      questions.length - 1
                    ? "Finish Interview"
                    : "Submit Answer & Continue"}

                  {!loading && <FaArrowRight />}
                </button>
              </div>

              {/* LOADER */}

              {loading && (
                <div
                  style={{
                    marginTop: "30px",
                    animation: "fadeIn 0.4s ease",
                  }}
                >
                  <AILoader text="AI is evaluating your response..." />
                </div>
              )}
            </div>

            {/* =================================================
                FEEDBACK CARD
            ================================================= */}

            {score !== null && !loading && (
              <div
                style={{
                  marginTop: "25px",
                  background:
                    "linear-gradient(145deg, rgba(34,197,94,0.08), rgba(34,197,94,0.015))",
                  backdropFilter: "blur(20px)",
                  border:
                    "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "26px",
                  padding: "35px",
                  animation: "fadeIn 0.6s ease",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.25)",
                }}
              >
                {/* Score Header */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "25px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "18px",
                        background:
                          "rgba(34,197,94,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4ade80",
                      }}
                    >
                      <FaCheckCircle size={28} />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: "0 0 4px",
                          color: "#94a3b8",
                          fontSize: "13px",
                        }}
                      >
                        AI EVALUATION
                      </p>

                      <h2
                        style={{
                          margin: 0,
                          fontSize: "24px",
                          color: "#86efac",
                        }}
                      >
                        Answer Score: {score}/10
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={downloadReport}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 20px",
                      borderRadius: "12px",
                      background:
                        "rgba(34,197,94,0.1)",
                      color: "#4ade80",
                      fontWeight: "700",
                      cursor: "pointer",
                      border:
                        "1px solid rgba(34,197,94,0.25)",
                    }}
                  >
                    <FaFilePdf />

                    Download Report
                  </button>
                </div>

                {/* Feedback */}

                <div
                  style={{
                    background:
                      "rgba(0,0,0,0.2)",
                    padding: "25px",
                    borderRadius: "18px",
                    border:
                      "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 15px",
                      fontSize: "16px",
                      color: "#cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <FaRobot color="#a855f7" />

                    AI Feedback
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#e2e8f0",
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.8",
                      fontSize: "15px",
                    }}
                  >
                    {feedback}
                  </p>
                </div>

                {/* Stats */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, 1fr)",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <MiniStat
                    icon={<FaMicrophone />}
                    title="Voice"
                    value="Captured"
                  />

                  <MiniStat
                    icon={<FaBrain />}
                    title="AI Analysis"
                    value="Complete"
                  />

                  <MiniStat
                    icon={<FaWaveSquare />}
                    title="Response"
                    value="Evaluated"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }

          50% {
            opacity: 0.25;
          }
        }

        @keyframes micPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }

          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes micFloat {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.05);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: scaleY(0.4);
          }

          50% {
            transform: scaleY(1.2);
          }
        }

        @media (max-width: 900px) {
          main {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 700px) {
          h1 {
            font-size: 30px !important;
          }

          .voice-card {
            padding: 25px !important;
          }
        }
      `}</style>
    </div>
  );
}

// =========================================================
// MINI STAT
// =========================================================

function MiniStat({ icon, title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.035)",
        border:
          "1px solid rgba(255,255,255,0.06)",
        borderRadius: "14px",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          background:
            "rgba(59,130,246,0.1)",
          color: "#60a5fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      <div>
        <p
          style={{
            margin: "0 0 3px",
            color: "#64748b",
            fontSize: "11px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>

        <p
          style={{
            margin: 0,
            color: "#e2e8f0",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default VoiceInterview;