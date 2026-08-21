import React from "react";
import Sidebar from "../components/Sidebar";

import {
  FaFilePdf,
  FaFileAlt,
  FaDownload,
  FaRobot,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

function Reports() {
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
      {/* =====================================
          ANIMATIONS
      ===================================== */}

      <style>
        {`
          @keyframes floatOne {
            0%,100% {
              transform: translate(0,0) scale(1);
            }

            50% {
              transform: translate(50px,35px) scale(1.08);
            }
          }

          @keyframes floatTwo {
            0%,100% {
              transform: translate(0,0);
            }

            50% {
              transform: translate(-40px,-35px);
            }
          }

          @keyframes pulseGlow {
            0%,100% {
              opacity:.18;
              transform:scale(1);
            }

            50% {
              opacity:.45;
              transform:scale(1.2);
            }
          }

          @keyframes fadeUp {
            from {
              opacity:0;
              transform:translateY(30px);
            }

            to {
              opacity:1;
              transform:translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity:0;
              transform:scale(.97);
            }

            to {
              opacity:1;
              transform:scale(1);
            }
          }

          @keyframes iconPulse {
            0%,100% {
              box-shadow:0 0 0 rgba(34,211,238,0);
            }

            50% {
              box-shadow:0 0 30px rgba(34,211,238,.15);
            }
          }

          .report-card {
            transition:
              transform .35s ease,
              border-color .35s ease,
              box-shadow .35s ease;
          }

          .report-card:hover {
            transform:translateY(-7px);

            border-color:
              rgba(34,211,238,.22) !important;

            box-shadow:
              0 25px 60px rgba(0,0,0,.35),
              0 0 40px rgba(34,211,238,.06);
          }

          .download-button {
            transition:
              transform .25s ease,
              box-shadow .25s ease,
              background .25s ease;
          }

          .download-button:hover {
            transform:translateY(-3px);
          }
        `}
      </style>

      {/* =====================================
          AMBIENT BACKGROUND
      ===================================== */}

      <div
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,220,200,.12),transparent 70%)",
          top: "-220px",
          left: "280px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatOne 12s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)",
          right: "-220px",
          bottom: "-180px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatTwo 14s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,211,238,.13),transparent 70%)",
          right: "30%",
          top: "45%",
          pointerEvents: "none",
          animation:
            "pulseGlow 7s ease-in-out infinite",
        }}
      />

      <Sidebar />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

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
        {/* =====================================
            HEADER
        ===================================== */}

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
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "17px",
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

            AI REPORT CENTER
          </div>

          <h1
            style={{
              fontSize: "50px",
              fontWeight: "900",
              margin: "0 0 12px",
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
            Interview Reports
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
              margin: 0,
              lineHeight: "1.7",
              maxWidth: "700px",
            }}
          >
            Review your AI-generated interview
            reports, performance feedback, and
            interview results in one place.
          </p>
        </div>

        {/* =====================================
            REPORT SUMMARY
        ===================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <SummaryCard
            icon={<FaFileAlt />}
            title="Total Reports"
            value="0"
            color="#22d3ee"
            delay=".8s"
          />

          <SummaryCard
            icon={<FaChartLine />}
            title="AI Evaluations"
            value="0"
            color="#60a5fa"
            delay="1s"
          />

          <SummaryCard
            icon={<FaCheckCircle />}
            title="Completed"
            value="0"
            color="#22c55e"
            delay="1.2s"
          />
        </div>

        {/* =====================================
            REPORT CONTAINER
        ===================================== */}

        <div
          className="report-card"
          style={{
            background:
              "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))",
            backdropFilter:
              "blur(25px)",
            border:
              "1px solid rgba(255,255,255,.08)",
            borderRadius: "25px",
            padding: "35px",
            boxShadow:
              "0 15px 40px rgba(0,0,0,.25)",
            animation:
              "fadeUp 1.1s ease forwards",
          }}
        >
          {/* Header */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "30px",
              paddingBottom: "20px",
              borderBottom:
                "1px solid rgba(255,255,255,.07)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg,rgba(34,211,238,.12),rgba(59,130,246,.12))",
                border:
                  "1px solid rgba(34,211,238,.15)",
                color: "#67e8f9",
                animation:
                  "iconPulse 4s ease-in-out infinite",
              }}
            >
              <FaFilePdf size={21} />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "21px",
                }}
              >
                Available Reports
              </h2>

              <p
                style={{
                  margin:
                    "5px 0 0",
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                Your generated interview
                reports will appear here.
              </p>
            </div>
          </div>

          {/* Empty State */}

          <div
            style={{
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "30px",
              animation:
                "fadeIn 1.3s ease forwards",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg,rgba(34,211,238,.08),rgba(59,130,246,.08))",
                border:
                  "1px solid rgba(34,211,238,.12)",
                color: "#67e8f9",
                marginBottom: "25px",
                boxShadow:
                  "0 0 40px rgba(34,211,238,.05)",
                animation:
                  "iconPulse 4s ease-in-out infinite",
              }}
            >
              <FaFilePdf size={38} />
            </div>

            <h2
              style={{
                margin:
                  "0 0 12px",
                fontSize: "25px",
              }}
            >
              No Reports Available
            </h2>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                maxWidth: "560px",
                fontSize: "15px",
                lineHeight: "1.7",
              }}
            >
              Complete an AI mock interview
              to generate your first
              personalized interview report.
              Your AI evaluation and
              performance feedback will be
              available here.
            </p>

            {/* AI indicator */}

            <div
              style={{
                marginTop: "25px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding:
                  "9px 15px",
                borderRadius: "25px",
                background:
                  "rgba(34,211,238,.05)",
                border:
                  "1px solid rgba(34,211,238,.1)",
                color: "#67e8f9",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              <FaRobot />

              AI reports will appear
              automatically
            </div>
          </div>
        </div>

        {/* =====================================
            INFORMATION CARD
        ===================================== */}

        <div
          style={{
            marginTop: "25px",
            padding: "20px 22px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background:
              "rgba(34,211,238,.025)",
            border:
              "1px solid rgba(34,211,238,.08)",
            color: "#64748b",
            fontSize: "12px",
            animation:
              "fadeUp 1.4s ease forwards",
          }}
        >
          <FaRobot color="#22d3ee" />

          <span>
            AI-generated reports contain
            interview questions, your
            answers, performance scores,
            and personalized feedback.
          </span>
        </div>
      </main>
    </div>
  );
}

/* =====================================
   SUMMARY CARD
===================================== */

function SummaryCard({
  icon,
  title,
  value,
  color,
  delay,
}) {
  return (
    <div
      className="report-card"
      style={{
        background:
          "linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.015))",
        backdropFilter:
          "blur(20px)",
        border:
          "1px solid rgba(255,255,255,.08)",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        animation:
          `fadeUp .8s ease ${delay} forwards`,
        opacity: 0,
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            `${color}12`,
          border:
            `1px solid ${color}25`,
          color,
          fontSize: "20px",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            color: "#64748b",
            fontSize: "12px",
            marginBottom: "5px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "27px",
            fontWeight: "800",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default Reports;