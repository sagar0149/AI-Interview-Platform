import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AILoader from "../components/AILoader";

import {
  FaMicrophone,
  FaPaperPlane,
  FaArrowRight,
  FaFilePdf,
  FaRobot,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBrain,
} from "react-icons/fa";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("interviewQuestions") || "[]"
    );

    setQuestions(savedQuestions);
  }, []);

  const currentQuestion =
    questions.length > 0
      ? questions[currentIndex]
      : "";

  const progressPercentage =
    questions.length > 0
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer("");
      setEvaluation("");
    }
  };

  const evaluateAnswer = async () => {
    if (!currentQuestion) {
      alert("No question selected");
      return;
    }

    if (!answer.trim()) {
      alert(
        "Please enter your answer before evaluating."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/interview/evaluate",
        {
          question: currentQuestion,
          answer,
        }
      );

      setEvaluation(response.data.evaluation);
    } catch (error) {
      console.error(error);
      alert(
        "Evaluation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!currentQuestion) {
      return;
    }

    try {
      const response = await axios.post(
        "/api/interview/report",
        {
          question: currentQuestion,
          answer,
        },
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Interview_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to download report"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020707 0%,#061316 45%,#071c22 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =========================
          ANIMATIONS
      ========================= */}

      <style>
        {`
          @keyframes floatOne {
            0%,100% {
              transform: translate(0,0) scale(1);
            }

            50% {
              transform: translate(50px,30px) scale(1.08);
            }
          }

          @keyframes floatTwo {
            0%,100% {
              transform: translate(0,0);
            }

            50% {
              transform: translate(-40px,50px);
            }
          }

          @keyframes pulseGlow {
            0%,100% {
              opacity: .2;
              transform: scale(1);
            }

            50% {
              opacity: .5;
              transform: scale(1.2);
            }
          }

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

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(.97);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -500px 0;
            }

            100% {
              background-position: 500px 0;
            }
          }

          @keyframes scan {
            0% {
              transform: translateY(-100%);
            }

            100% {
              transform: translateY(100%);
            }
          }

          .interview-card {
            transition:
              transform .35s ease,
              border-color .35s ease,
              box-shadow .35s ease;
          }

          .interview-card:hover {
            transform: translateY(-5px);
            border-color:
              rgba(34,211,238,.25) !important;

            box-shadow:
              0 20px 50px rgba(0,0,0,.35),
              0 0 35px rgba(34,211,238,.06);
          }

          .answer-box::placeholder {
            color: #64748b;
          }

          .action-button {
            transition:
              transform .25s ease,
              box-shadow .25s ease,
              background .25s ease;
          }

          .action-button:hover {
            transform: translateY(-3px);
          }
        `}
      </style>

      {/* =========================
          AMBIENT BACKGROUND
      ========================= */}

      <div
        style={{
          position: "fixed",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,220,200,.12),transparent 70%)",
          top: "-180px",
          left: "280px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatOne 11s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,.13),transparent 70%)",
          right: "-180px",
          bottom: "-150px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatTwo 13s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,211,238,.13),transparent 70%)",
          right: "25%",
          top: "45%",
          pointerEvents: "none",
          animation:
            "pulseGlow 6s ease-in-out infinite",
        }}
      />

      <Sidebar />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main
        style={{
          marginLeft: "260px",
          padding: "45px 60px",
          width: "calc(100% - 260px)",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* =========================
            HEADER
        ========================= */}

        <div
          style={{
            marginBottom: "40px",
            animation:
              "fadeUp .7s ease forwards",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "8px 14px",
              borderRadius: "30px",
              background:
                "rgba(34,211,238,.07)",
              border:
                "1px solid rgba(34,211,238,.15)",
              color: "#67e8f9",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22d3ee",
                boxShadow:
                  "0 0 12px #22d3ee",
              }}
            />

            AI INTERVIEW
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              margin: "0 0 12px 0",
              letterSpacing: "-1.5px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              background:
                "linear-gradient(90deg,#ffffff,#67e8f9,#60a5fa)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            AI Mock Interview
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
              margin: 0,
              lineHeight: "1.7",
            }}
          >
            Practice your answers and get
            real-time AI feedback based on
            your interview questions.
          </p>
        </div>

        {/* =========================
            NO QUESTIONS
        ========================= */}

        {questions.length === 0 ? (
          <div
            className="interview-card"
            style={{
              background:
                "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))",
              backdropFilter:
                "blur(25px)",
              border:
                "1px dashed rgba(255,255,255,.15)",
              padding: "70px 50px",
              borderRadius: "26px",
              textAlign: "center",
              animation:
                "fadeUp .8s ease forwards",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 25px",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "rgba(245,158,11,.08)",
                border:
                  "1px solid rgba(245,158,11,.15)",
                boxShadow:
                  "0 0 35px rgba(245,158,11,.08)",
              }}
            >
              <FaExclamationTriangle
                size={34}
                color="#f59e0b"
              />
            </div>

            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "27px",
              }}
            >
              No Questions Found
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "15px",
                maxWidth: "550px",
                margin:
                  "0 auto",
                lineHeight: "1.7",
              }}
            >
              Please upload and analyze
              your resume first to generate
              custom interview questions.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            {/* =========================
                QUESTION CARD
            ========================= */}

            <div
              className="interview-card"
              style={{
                background:
                  "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))",
                backdropFilter:
                  "blur(25px)",
                border:
                  "1px solid rgba(255,255,255,.08)",
                padding: "32px",
                borderRadius: "25px",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.25)",
                animation:
                  "fadeUp .8s ease forwards",
              }}
            >
              {/* Progress background */}

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background:
                    "rgba(255,255,255,.06)",
                }}
              >
                <div
                  style={{
                    width:
                      `${progressPercentage}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#22d3ee,#3b82f6,#60a5fa)",
                    boxShadow:
                      "0 0 15px rgba(34,211,238,.7)",
                    transition:
                      "width .5s ease",
                  }}
                />
              </div>

              {/* Question Header */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "22px",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "center",
                      background:
                        "linear-gradient(135deg,rgba(34,211,238,.12),rgba(59,130,246,.12))",
                      border:
                        "1px solid rgba(34,211,238,.15)",
                      color: "#67e8f9",
                    }}
                  >
                    <FaBrain size={20} />
                  </div>

                  <div>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "11px",
                        letterSpacing:
                          "1px",
                        textTransform:
                          "uppercase",
                      }}
                    >
                      Current Question
                    </div>

                    <div
                      style={{
                        color: "#e2e8f0",
                        fontSize: "14px",
                        fontWeight:
                          "600",
                        marginTop:
                          "3px",
                      }}
                    >
                      AI Interview
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    background:
                      "rgba(34,211,238,.07)",
                    color: "#67e8f9",
                    padding:
                      "8px 14px",
                    borderRadius:
                      "20px",
                    fontSize: "13px",
                    fontWeight:
                      "700",
                    border:
                      "1px solid rgba(34,211,238,.15)",
                  }}
                >
                  {currentIndex + 1} /{" "}
                  {questions.length}
                </span>
              </div>

              {/* Question */}

              <h3
                style={{
                  fontSize: "23px",
                  lineHeight: "1.7",
                  fontWeight: "500",
                  margin: 0,
                  color: "#f8fafc",
                  letterSpacing:
                    "-.2px",
                }}
              >
                {currentQuestion}
              </h3>

              {/* Progress text */}

              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                <span>
                  Interview Progress
                </span>

                <span
                  style={{
                    color: "#67e8f9",
                    fontWeight: "600",
                  }}
                >
                  {Math.round(
                    progressPercentage
                  )}
                  %
                </span>
              </div>
            </div>

            {/* =========================
                ANSWER CARD
            ========================= */}

            <div
              className="interview-card"
              style={{
                background:
                  "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))",
                backdropFilter:
                  "blur(25px)",
                border:
                  "1px solid rgba(255,255,255,.08)",
                padding: "32px",
                borderRadius: "25px",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.25)",
                animation:
                  "fadeUp .9s ease forwards",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "center",
                    background:
                      "rgba(59,130,246,.08)",
                    border:
                      "1px solid rgba(59,130,246,.15)",
                    color: "#60a5fa",
                  }}
                >
                  <FaMicrophone />
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      margin: 0,
                      color:
                        "#e2e8f0",
                    }}
                  >
                    Your Answer
                  </h2>

                  <p
                    style={{
                      margin:
                        "4px 0 0",
                      color:
                        "#64748b",
                      fontSize:
                        "12px",
                    }}
                  >
                    Answer as you would
                    in a real interview.
                  </p>
                </div>
              </div>

              <textarea
                className="answer-box"
                rows="8"
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                placeholder="Type your response here. Be as detailed as you would in a real interview..."
                style={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "18px",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  background:
                    "rgba(0,0,0,.25)",
                  color: "white",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  resize: "vertical",
                  outline: "none",
                  boxSizing:
                    "border-box",
                  fontFamily:
                    "'Inter',sans-serif",
                  transition:
                    "all .3s ease",
                  minHeight: "190px",
                }}
                onFocus={(e) => {
                  e.target.style.background =
                    "rgba(0,0,0,.4)";

                  e.target.style.borderColor =
                    "rgba(34,211,238,.35)";

                  e.target.style.boxShadow =
                    "0 0 25px rgba(34,211,238,.06)";
                }}
                onBlur={(e) => {
                  e.target.style.background =
                    "rgba(0,0,0,.25)";

                  e.target.style.borderColor =
                    "rgba(255,255,255,.08)";

                  e.target.style.boxShadow =
                    "none";
                }}
              />

              {/* =========================
                  ACTION BUTTONS
              ========================= */}

              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {/* Evaluate */}

                <button
                  className="action-button"
                  onClick={
                    evaluateAnswer
                  }
                  disabled={
                    loading ||
                    !answer.trim()
                  }
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "9px",
                    padding:
                      "14px 24px",
                    background:
                      loading ||
                      !answer.trim()
                        ? "rgba(255,255,255,.07)"
                        : "linear-gradient(135deg,#06b6d4,#0891b2)",
                    color:
                      loading ||
                      !answer.trim()
                        ? "#64748b"
                        : "white",
                    border: "none",
                    borderRadius:
                      "13px",
                    fontSize: "14px",
                    fontWeight:
                      "700",
                    cursor:
                      loading ||
                      !answer.trim()
                        ? "not-allowed"
                        : "pointer",
                    boxShadow:
                      loading ||
                      !answer.trim()
                        ? "none"
                        : "0 10px 25px rgba(6,182,212,.2)",
                  }}
                >
                  <FaPaperPlane />

                  {loading
                    ? "Analyzing..."
                    : "Evaluate Answer"}
                </button>

                {/* Next */}

                <button
                  className="action-button"
                  onClick={
                    nextQuestion
                  }
                  disabled={
                    currentIndex >=
                    questions.length - 1
                  }
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "9px",
                    padding:
                      "14px 24px",
                    background:
                      "rgba(59,130,246,.07)",
                    border:
                      "1px solid rgba(59,130,246,.2)",
                    color:
                      currentIndex >=
                      questions.length - 1
                        ? "#475569"
                        : "#60a5fa",
                    borderRadius:
                      "13px",
                    fontSize: "14px",
                    fontWeight:
                      "700",
                    cursor:
                      currentIndex >=
                      questions.length - 1
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      currentIndex >=
                      questions.length - 1
                        ? 0.5
                        : 1,
                  }}
                >
                  Next Question
                  <FaArrowRight />
                </button>

                {/* Download */}

                <button
                  className="action-button"
                  onClick={
                    downloadReport
                  }
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "9px",
                    padding:
                      "14px 24px",
                    marginLeft:
                      "auto",
                    background:
                      "rgba(255,255,255,.025)",
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    color: "#e2e8f0",
                    borderRadius:
                      "13px",
                    fontSize: "14px",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                  onMouseEnter={(
                    e
                  ) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,.07)";

                    e.currentTarget.style.borderColor =
                      "rgba(34,211,238,.2)";
                  }}
                  onMouseLeave={(
                    e
                  ) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,.025)";

                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,.1)";
                  }}
                >
                  <FaFilePdf />

                  Download PDF
                </button>
              </div>
            </div>

            {/* =========================
                AI LOADER
            ========================= */}

            {loading && (
              <div
                style={{
                  padding:
                    "10px 0",
                  animation:
                    "fadeIn .4s ease",
                }}
              >
                <AILoader
                  text="AI is evaluating your response..."
                />
              </div>
            )}

            {/* =========================
                AI FEEDBACK
            ========================= */}

            {evaluation &&
              !loading && (
                <div
                  className="interview-card"
                  style={{
                    background:
                      "linear-gradient(145deg,rgba(34,211,238,.08),rgba(59,130,246,.025))",
                    backdropFilter:
                      "blur(25px)",
                    border:
                      "1px solid rgba(34,211,238,.18)",
                    padding: "32px",
                    borderRadius: "25px",
                    boxShadow:
                      "0 15px 50px rgba(0,0,0,.3),0 0 35px rgba(34,211,238,.05)",
                    animation:
                      "fadeIn .6s ease",
                    position:
                      "relative",
                    overflow:
                      "hidden",
                  }}
                >
                  {/* Animated scan line */}

                  <div
                    style={{
                      position:
                        "absolute",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg,transparent,rgba(34,211,238,.5),transparent)",
                      animation:
                        "scan 5s linear infinite",
                      pointerEvents:
                        "none",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "14px",
                      marginBottom:
                        "22px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius:
                          "15px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        background:
                          "linear-gradient(135deg,rgba(34,211,238,.15),rgba(59,130,246,.15))",
                        border:
                          "1px solid rgba(34,211,238,.2)",
                        color:
                          "#67e8f9",
                        boxShadow:
                          "0 0 25px rgba(34,211,238,.08)",
                      }}
                    >
                      <FaRobot
                        size={23}
                      />
                    </div>

                    <div>
                      <h2
                        style={{
                          fontSize:
                            "21px",
                          margin: 0,
                          color:
                            "#e2e8f0",
                        }}
                      >
                        AI Feedback
                      </h2>

                      <p
                        style={{
                          margin:
                            "4px 0 0",
                          color:
                            "#64748b",
                          fontSize:
                            "12px",
                        }}
                      >
                        Gemini AI
                        Evaluation
                      </p>
                    </div>

                    <div
                      style={{
                        marginLeft:
                          "auto",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: "7px",
                        padding:
                          "7px 12px",
                        borderRadius:
                          "20px",
                        background:
                          "rgba(34,197,94,.07)",
                        border:
                          "1px solid rgba(34,197,94,.15)",
                        color:
                          "#4ade80",
                        fontSize:
                          "11px",
                        fontWeight:
                          "700",
                      }}
                    >
                      <FaCheckCircle />

                      ANALYZED
                    </div>
                  </div>

                  <div
                    style={{
                      color:
                        "#dbeafe",
                      whiteSpace:
                        "pre-wrap",
                      lineHeight:
                        "1.85",
                      fontSize:
                        "15px",
                        background:
                          "rgba(0,0,0,.15)",
                      borderRadius:
                        "18px",
                      padding:
                        "22px",
                      border:
                        "1px solid rgba(255,255,255,.05)",
                    }}
                  >
                    {evaluation}
                  </div>
                </div>
              )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Interview;