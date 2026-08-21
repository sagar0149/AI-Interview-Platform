import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("/api/interview/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch interview history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020707 0%, #061316 45%, #071c22 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>
        {`
          @keyframes floatOne {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(50px, 30px) scale(1.08);
            }
          }

          @keyframes floatTwo {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-40px, 50px);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.25;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.15);
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

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .history-card {
            animation: fadeUp 0.6s ease forwards;
          }

          .history-card:hover {
            transform: translateY(-7px) scale(1.01);
            border-color: rgba(34, 211, 238, 0.35) !important;
            box-shadow:
              0 20px 50px rgba(0, 0, 0, 0.35),
              0 0 30px rgba(34, 211, 238, 0.08);
          }

          .question-card {
            transition: all 0.3s ease;
          }

          .question-card:hover {
            background: rgba(255,255,255,0.055) !important;
          }
        `}
      </style>

      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,220,200,0.12), transparent 70%)",
          top: "-180px",
          left: "250px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation: "floatOne 10s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
          right: "-150px",
          bottom: "-120px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation: "floatTwo 12s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)",
          top: "45%",
          right: "20%",
          pointerEvents: "none",
          animation: "pulseGlow 5s ease-in-out infinite",
        }}
      />

      <Sidebar />

      <main
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          padding: "45px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Page heading */}
        <section
          style={{
            marginBottom: "40px",
            animation: "fadeUp 0.7s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 14px",
              borderRadius: "30px",
              background: "rgba(34,211,238,0.07)",
              border: "1px solid rgba(34,211,238,0.15)",
              color: "#67e8f9",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "18px",
              letterSpacing: "0.5px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22d3ee",
                boxShadow: "0 0 12px #22d3ee",
              }}
            />
            INTERVIEW ACTIVITY
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "52px",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              background:
                "linear-gradient(90deg, #ffffff, #67e8f9, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Interview History
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#94a3b8",
              fontSize: "16px",
              maxWidth: "650px",
              lineHeight: "1.7",
            }}
          >
            Review your previous AI interviews, answers, evaluations,
            and performance feedback in one place.
          </p>
        </section>

        {/* Statistics */}
        {!loading && (
          <section
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "35px",
              animation: "fadeUp 0.8s ease",
            }}
          >
            <HistoryStat
              label="Total Interviews"
              value={history.length}
              icon="🎤"
            />

            <HistoryStat
              label="AI Evaluations"
              value={history.length}
              icon="🤖"
            />

            <HistoryStat
              label="Practice Sessions"
              value={history.length}
              icon="📈"
            />
          </section>
        )}

        {/* Loading */}
        {loading && (
          <div
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              animation: "fadeUp 0.5s ease",
            }}
          >
            <div
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                border: "4px solid rgba(34,211,238,0.12)",
                borderTop: "4px solid #22d3ee",
                borderRight: "4px solid #60a5fa",
                animation: "spin 1s linear infinite",
                boxShadow: "0 0 25px rgba(34,211,238,0.15)",
              }}
            />

            <h2
              style={{
                marginTop: "25px",
                color: "#e2e8f0",
                fontSize: "20px",
              }}
            >
              Loading Interview History
            </h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "5px",
              }}
            >
              Fetching your previous sessions...
            </p>
          </div>
        )}

        {/* Empty history */}
        {!loading && history.length === 0 && (
          <div
            style={{
              padding: "70px 30px",
              textAlign: "center",
              borderRadius: "25px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))",
              border:
                "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(25px)",
              animation: "fadeUp 0.8s ease",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
              }}
            >
              🎤
            </div>

            <h2
              style={{
                fontSize: "28px",
                marginBottom: "10px",
              }}
            >
              No Interviews Yet
            </h2>

            <p
              style={{
                color: "#94a3b8",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Complete your first AI mock interview and your
              interview history will appear here.
            </p>
          </div>
        )}

        {/* History records */}
        {!loading && history.length > 0 && (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            {history.map((item, index) => (
              <article
                key={item.id}
                className="history-card"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "24px",
                  padding: "30px",
                  backdropFilter: "blur(25px)",
                  transition:
                    "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)",
                  }}
                />

                {/* Session header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
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
                        width: "42px",
                        height: "42px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(59,130,246,0.15))",
                        border:
                          "1px solid rgba(34,211,238,0.2)",
                        color: "#67e8f9",
                        fontWeight: "700",
                      }}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Interview Session
                      </div>

                      <div
                        style={{
                          color: "#e2e8f0",
                          fontWeight: "600",
                          marginTop: "3px",
                        }}
                      >
                        AI Evaluation
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "7px 12px",
                      borderRadius: "20px",
                      background:
                        "rgba(34,197,94,0.08)",
                      border:
                        "1px solid rgba(34,197,94,0.15)",
                      color: "#4ade80",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Completed
                  </div>
                </div>

                {/* Question */}
                <HistorySection
                  title="Question"
                  color="#67e8f9"
                  text={item.question}
                />

                {/* Answer */}
                <HistorySection
                  title="Your Answer"
                  color="#60a5fa"
                  text={item.answer || "No answer recorded."}
                />

                {/* Evaluation */}
                <div
                  className="question-card"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.055), rgba(59,130,246,0.035))",
                    border:
                      "1px solid rgba(34,211,238,0.1)",
                    borderRadius: "18px",
                    padding: "22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      🤖
                    </span>

                    <span
                      style={{
                        color: "#67e8f9",
                        fontSize: "12px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      AI Evaluation
                    </span>
                  </div>

                  <pre
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: "'Inter', sans-serif",
                      color: "#cbd5e1",
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    {item.evaluation ||
                      "No evaluation available."}
                  </pre>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function HistorySection({ title, color, text }) {
  return (
    <div
      className="question-card"
      style={{
        background: "rgba(255,255,255,0.025)",
        border:
          "1px solid rgba(255,255,255,0.05)",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          color,
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>

      <p
        style={{
          margin: 0,
          color: "#cbd5e1",
          fontSize: "15px",
          lineHeight: "1.7",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function HistoryStat({ label, value, icon }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        border:
          "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "22px",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-5px)";
        e.currentTarget.style.borderColor =
          "rgba(34,211,238,0.25)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
        e.currentTarget.style.borderColor =
          "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow =
          "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "#64748b",
              fontSize: "13px",
              marginBottom: "8px",
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontSize: "34px",
              fontWeight: "800",
              color: "#f8fafc",
            }}
          >
            {value}
          </div>
        </div>

        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "23px",
            background:
              "rgba(34,211,238,0.08)",
            border:
              "1px solid rgba(34,211,238,0.12)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default History;