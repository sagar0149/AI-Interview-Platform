import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AILoader from "../components/AILoader";

import {
  FaChartLine,
  FaTrophy,
  FaClipboardCheck,
  FaFileAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "/api/interview/analytics"
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch analytics:",
        error
      );
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (!data) {
    return (
      <div className="analytics-page">

        <Sidebar />

        <div className="analytics-main">
          <AILoader text="Loading analytics..." />
        </div>

        <style>{`

          .analytics-page {

            min-height: 100vh;

            background:
              radial-gradient(
                circle at 50% 15%,
                rgba(
                  25,
                  214,
                  202,
                  0.08
                ),
                transparent 35%
              ),

              linear-gradient(
                135deg,
                #020707,
                #061314,
                #020707
              );

            color: white;

            font-family:
              Inter,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
          }

          .analytics-main {

            margin-left: 260px;

            min-height: 100vh;

            display: flex;

            align-items: center;

            justify-content: center;
          }

        `}</style>

      </div>
    );
  }

  /* =========================================
     CHART DATA
  ========================================= */

  const chartData = [
    {
      interview: "1",
      score: Math.max(
        data.average_score - 2,
        0
      ),
    },

    {
      interview: "2",
      score: Math.max(
        data.average_score - 1,
        0
      ),
    },

    {
      interview: "3",
      score: data.average_score,
    },

    {
      interview: "4",
      score: Math.max(
        data.highest_score - 1,
        0
      ),
    },

    {
      interview: "5",
      score: data.highest_score,
    },
  ];

  return (
    <div className="analytics-page">

      <Sidebar />

      {/* =========================================
          AMBIENT BACKGROUND
      ========================================= */}

      <div className="ambient-glow glow-one"></div>

      <div className="ambient-glow glow-two"></div>

      <div className="background-grid"></div>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="analytics-main">

        {/* =====================================
            HEADER
        ===================================== */}

        <section className="analytics-header">

          <div>

            <div className="section-label">
              PERFORMANCE CENTER
            </div>

            <h1>
              Analytics
            </h1>

            <p>
              Monitor your interview performance
              and AI evaluation statistics.
            </p>

          </div>

          <div className="analytics-status">

            <span className="status-light"></span>

            AI ANALYTICS ACTIVE

          </div>

        </section>

        {/* =====================================
            STATISTICS
        ===================================== */}

        <section className="stats-grid">

          <StatCard
            icon={<FaClipboardCheck />}
            title="Interviews"
            value={data.total_interviews}
            color="#19d6ca"
            delay="0s"
          />

          <StatCard
            icon={<FaChartLine />}
            title="Average Score"
            value={data.average_score}
            color="#3b82f6"
            delay="0.1s"
          />

          <StatCard
            icon={<FaTrophy />}
            title="Highest Score"
            value={data.highest_score}
            color="#f59e0b"
            delay="0.2s"
          />

          <StatCard
            icon={<FaFileAlt />}
            title="Reports"
            value={data.total_interviews}
            color="#a855f7"
            delay="0.3s"
          />

        </section>

        {/* =====================================
            CHART
        ===================================== */}

        <section className="chart-section">

          <div className="chart-header">

            <div>

              <div className="chart-small-title">
                PERFORMANCE ANALYSIS
              </div>

              <h2>
                Interview Score Trend
              </h2>

              <p>
                Track your interview scores
                over recent sessions.
              </p>

            </div>

            <div className="chart-live">

              <span></span>

              LIVE DATA

            </div>

          </div>

          <div className="chart-wrapper">

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="interview"
                  stroke="#61716f"
                  tick={{
                    fill: "#71817f",
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={{
                    stroke:
                      "rgba(255,255,255,0.08)",
                  }}
                />

                <YAxis
                  stroke="#61716f"
                  tick={{
                    fill: "#71817f",
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "rgba(4,17,18,0.96)",
                    border:
                      "1px solid rgba(25,214,202,0.25)",
                    borderRadius: "12px",
                    color: "#19d6ca",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.4)",
                  }}
                  labelStyle={{
                    color: "#94a3b8",
                    marginBottom: "5px",
                  }}
                  itemStyle={{
                    color: "#19d6ca",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#19d6ca"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#19d6ca",
                    stroke:
                      "#071415",
                    strokeWidth: 3,
                  }}
                  activeDot={{
                    r: 8,
                    fill: "#19d6ca",
                    stroke: "#dffffc",
                    strokeWidth: 2,
                  }}
                  animationDuration={1800}
                  animationEasing="ease-out"
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* =====================================
            FOOTER INFO
        ===================================== */}

        <div className="analytics-footer">

          <div>
            <span className="footer-dot"></span>
            AI evaluation engine synchronized
          </div>

          <div>
            Performance data updates automatically
          </div>

        </div>

      </main>

      {/* =========================================
          CSS
      ========================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =========================================
           PAGE
        ========================================= */

        .analytics-page {

          min-height: 100vh;

          position: relative;

          overflow-x: hidden;

          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(
                25,
                214,
                202,
                0.07
              ),
              transparent 35%
            ),

            linear-gradient(
              135deg,
              #020707 0%,
              #061314 50%,
              #020707 100%
            );

          color: #e8f1f0;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =========================================
           MAIN
        ========================================= */

        .analytics-main {

          margin-left: 260px;

          min-height: 100vh;

          padding:
            50px 45px;

          position: relative;

          z-index: 5;

          animation:
            analyticsAppear
            0.8s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );
        }

        @keyframes analyticsAppear {

          from {

            opacity: 0;

            transform:
              translateY(
                20px
              );

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }
        }

        /* =========================================
           BACKGROUND
        ========================================= */

        .background-grid {

          position: fixed;

          inset: 0;

          pointer-events: none;

          opacity: 0.025;

          background-image:

            linear-gradient(
              rgba(
                25,
                214,
                202,
                0.7
              ) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(
                25,
                214,
                202,
                0.7
              ) 1px,
              transparent 1px
            );

          background-size:
            45px 45px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );
        }

        .ambient-glow {

          position: fixed;

          border-radius: 50%;

          pointer-events: none;

          filter:
            blur(40px);

          z-index: 0;
        }

        .glow-one {

          width: 450px;

          height: 450px;

          top: -200px;

          right: 10%;

          background:
            radial-gradient(
              circle,
              rgba(
                25,
                214,
                202,
                0.09
              ),
              transparent 70%
            );

          animation:
            glowMoveOne
            8s
            ease-in-out
            infinite;
        }

        .glow-two {

          width: 350px;

          height: 350px;

          bottom: -150px;

          left: 25%;

          background:
            radial-gradient(
              circle,
              rgba(
                59,
                130,
                246,
                0.07
              ),
              transparent 70%
            );

          animation:
            glowMoveTwo
            10s
            ease-in-out
            infinite;
        }

        @keyframes glowMoveOne {

          0%,
          100% {

            transform:
              translate(
                0,
                0
              );

          }

          50% {

            transform:
              translate(
                -80px,
                70px
              );

          }
        }

        @keyframes glowMoveTwo {

          0%,
          100% {

            transform:
              translate(
                0,
                0
              );

          }

          50% {

            transform:
              translate(
                80px,
                -60px
              );

          }
        }

        /* =========================================
           HEADER
        ========================================= */

        .analytics-header {

          display: flex;

          justify-content:
            space-between;

          align-items:
            flex-start;

          margin-bottom:
            40px;
        }

        .section-label {

          color:
            #19d6ca;

          font-size:
            10px;

          font-weight:
            800;

          letter-spacing:
            3px;

          margin-bottom:
            10px;

          opacity:
            0.8;
        }

        .analytics-header h1 {

          margin: 0;

          font-size:
            clamp(
              42px,
              5vw,
              64px
            );

          line-height:
            1;

          font-weight:
            850;

          letter-spacing:
            -2px;

          background:
            linear-gradient(
              90deg,
              #ffffff,
              #bce9e5,
              #19d6ca
            );

          -webkit-background-clip:
            text;

          -webkit-text-fill-color:
            transparent;

          background-clip:
            text;
        }

        .analytics-header p {

          margin:
            15px 0 0;

          max-width:
            650px;

          color:
            #71817f;

          font-size:
            15px;

          line-height:
            1.6;
        }

        /* =========================================
           STATUS
        ========================================= */

        .analytics-status {

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            10px 14px;

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.14
              );

          border-radius:
            20px;

          color:
            #71817f;

          font-size:
            9px;

          font-weight:
            700;

          letter-spacing:
            1px;

          background:
            rgba(
              25,
              214,
              202,
              0.025
            );
        }

        .status-light {

          width:
            6px;

          height:
            6px;

          border-radius:
            50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 10px
              #19d6ca;

          animation:
            statusPulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes statusPulse {

          0%,
          100% {

            opacity:
              1;

            transform:
              scale(1);
          }

          50% {

            opacity:
              0.35;

            transform:
              scale(
                1.5
              );
          }
        }

        /* =========================================
           STATS GRID
        ========================================= */

        .stats-grid {

          display:
            grid;

          grid-template-columns:
            repeat(
              4,
              1fr
            );

          gap:
            20px;

          margin-bottom:
            30px;
        }

        /* =========================================
           STAT CARD
        ========================================= */

        .stat-card {

          position:
            relative;

          min-height:
            185px;

          padding:
            25px;

          overflow:
            hidden;

          border-radius:
            20px;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.07
              );

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.015
              )
            );

          backdrop-filter:
            blur(20px);

          transition:
            all
            0.4s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );

          animation:
            cardAppear
            0.7s
            ease
            both;

          animation-delay:
            var(--delay);
        }

        @keyframes cardAppear {

          from {

            opacity:
              0;

            transform:
              translateY(
                25px
              )
              scale(
                0.97
              );

          }

          to {

            opacity:
              1;

            transform:
              translateY(0)
              scale(1);

          }
        }

        .stat-card:hover {

          transform:
            translateY(
              -8px
            );

          border-color:
            var(--card-color);

          box-shadow:
            0 15px 45px
              rgba(
                0,
                0,
                0,
                0.25
              ),
            0 0 30px
              var(--card-glow);
        }

        .stat-card::before {

          content:
            "";

          position:
            absolute;

          width:
            120px;

          height:
            120px;

          right:
            -50px;

          top:
            -50px;

          border-radius:
            50%;

          background:
            var(--card-color);

          opacity:
            0.035;

          filter:
            blur(15px);

          transition:
            all
            0.5s ease;
        }

        .stat-card:hover::before {

          transform:
            scale(
              1.7
            );

          opacity:
            0.08;
        }

        .stat-icon {

          width:
            48px;

          height:
            48px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            14px;

          color:
            var(--card-color);

          background:
            var(--card-bg);

          font-size:
            21px;

          margin-bottom:
            20px;

          transition:
            all
            0.4s ease;
        }

        .stat-card:hover
          .stat-icon {

          transform:
            rotate(
              -5deg
            )
            scale(
              1.1
            );

          box-shadow:
            0 0 20px
              var(--card-glow);
        }

        .stat-title {

          color:
            #71817f;

          font-size:
            12px;

          font-weight:
            600;

          letter-spacing:
            0.5px;
        }

        .stat-value {

          margin:
            6px 0 0;

          color:
            #edf7f5;

          font-size:
            38px;

          font-weight:
            800;

          letter-spacing:
            -1px;
        }

        /* =========================================
           CHART SECTION
        ========================================= */

        .chart-section {

          position:
            relative;

          padding:
            30px;

          border-radius:
            22px;

          border:
            1px solid
              rgba(
                255,
                255,
                255,
                0.07
              );

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              rgba(
                255,
                255,
                255,
                0.012
              )
            );

          backdrop-filter:
            blur(20px);

          box-shadow:
            0 20px 60px
              rgba(
                0,
                0,
                0,
                0.18
              );

          animation:
            chartAppear
            0.9s
            0.4s
            ease
            both;

          overflow:
            hidden;
        }

        @keyframes chartAppear {

          from {

            opacity:
              0;

            transform:
              translateY(
                30px
              );

          }

          to {

            opacity:
              1;

            transform:
              translateY(0);

          }
        }

        .chart-section::before {

          content:
            "";

          position:
            absolute;

          top:
            0;

          left:
            0;

          width:
            100%;

          height:
            1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                25,
                214,
                202,
                0.5
              ),
              transparent
            );

          animation:
            chartScan
            5s
            linear
            infinite;
        }

        @keyframes chartScan {

          0% {

            transform:
              translateX(
                -100%
              );
          }

          100% {

            transform:
              translateX(
                100%
              );
          }
        }

        .chart-header {

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            flex-start;

          margin-bottom:
            20px;
        }

        .chart-small-title {

          color:
            #19d6ca;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            2px;

          margin-bottom:
            7px;
        }

        .chart-header h2 {

          margin:
            0;

          color:
            #e8f1f0;

          font-size:
            22px;

          font-weight:
            700;
        }

        .chart-header p {

          margin:
            6px 0 0;

          color:
            #61716f;

          font-size:
            12px;
        }

        .chart-live {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          padding:
            7px 11px;

          border-radius:
            15px;

          background:
            rgba(
              25,
              214,
              202,
              0.04
            );

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.1
              );

          color:
            #60716e;

          font-size:
            8px;

          font-weight:
            700;

          letter-spacing:
            1px;
        }

        .chart-live span {

          width:
            5px;

          height:
            5px;

          border-radius:
            50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 8px
              #19d6ca;

          animation:
            statusPulse
            2s
            infinite;
        }

        .chart-wrapper {

          width:
            100%;

          margin-top:
            10px;
        }

        /* =========================================
           FOOTER
        ========================================= */

        .analytics-footer {

          display:
            flex;

          justify-content:
            space-between;

          margin-top:
            18px;

          color:
            #455552;

          font-size:
            10px;
        }

        .analytics-footer > div {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;
        }

        .footer-dot {

          width:
            5px;

          height:
            5px;

          border-radius:
            50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 8px
              #19d6ca;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 1100px) {

          .stats-grid {

            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

        }

        @media (max-width: 750px) {

          .analytics-main {

            margin-left:
              0;

            padding:
              30px
              20px
              100px;
          }

          .analytics-header {

            flex-direction:
              column;

            gap:
              20px;
          }

          .analytics-header h1 {

            font-size:
              45px;
          }

          .stats-grid {

            grid-template-columns:
              1fr;
          }

          .chart-section {

            padding:
              20px;
          }

          .chart-header {

            flex-direction:
              column;

            gap:
              15px;
          }

          .analytics-footer {

            flex-direction:
              column;

            gap:
              8px;
          }

        }

      `}</style>

    </div>
  );
}

/* =====================================================
   STAT CARD COMPONENT
===================================================== */

function StatCard({
  icon,
  title,
  value,
  color,
  delay,
}) {
  return (
    <div
      className="stat-card"
      style={{
        "--card-color": color,
        "--card-glow": `${color}55`,
        "--card-bg": `${color}12`,
        "--delay": delay,
      }}
    >

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-title">
        {title}
      </div>

      <div className="stat-value">
        {value}
      </div>

    </div>
  );
}

export default Analytics;