import { useEffect, useState } from "react";

function AILoader({
  text = "AI is analyzing...",
}) {
  const [status, setStatus] = useState(0);

  const statuses = [
    "Scanning your data",
    "Understanding your profile",
    "Analyzing patterns",
    "Generating AI insights",
    "Optimizing results",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => (prev + 1) % statuses.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-loader">

      <style>{`

        /* =====================================================
           MAIN
        ===================================================== */

        .ai-loader {

          min-height: 330px;

          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          position: relative;

          overflow: hidden;

          background:
            radial-gradient(
              circle at center,
              rgba(
                25,
                214,
                202,
                0.08
              ),
              transparent 50%
            );

          color: white;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =====================================================
           AMBIENT GLOW
        ===================================================== */

        .loader-glow {

          position: absolute;

          width: 260px;

          height: 260px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                25,
                214,
                202,
                0.13
              ),
              transparent 70%
            );

          filter:
            blur(25px);

          animation:
            ambientGlow
            4s
            ease-in-out
            infinite;
        }

        @keyframes ambientGlow {

          0%,
          100% {

            transform:
              scale(0.8);

            opacity:
              0.5;
          }

          50% {

            transform:
              scale(1.25);

            opacity:
              1;
          }
        }

        /* =====================================================
           AI SYSTEM
        ===================================================== */

        .ai-system {

          width: 190px;

          height: 190px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          z-index: 5;
        }

        /* =====================================================
           OUTER ENERGY RING
        ===================================================== */

        .energy-ring {

          position: absolute;

          width: 185px;

          height: 185px;

          border-radius: 50%;

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.2
              );

          border-top-color:
            #19d6ca;

          border-right-color:
            rgba(
              25,
              214,
              202,
              0.1
            );

          animation:
            rotateClockwise
            5s
            linear
            infinite;

          box-shadow:
            0 0 25px
              rgba(
                25,
                214,
                202,
                0.08
              );
        }

        /* =====================================================
           SECOND RING
        ===================================================== */

        .energy-ring-two {

          position: absolute;

          width: 155px;

          height: 155px;

          border-radius: 50%;

          border:
            1px dashed
              rgba(
                25,
                214,
                202,
                0.35
              );

          animation:
            rotateCounter
            7s
            linear
            infinite;
        }

        /* =====================================================
           THIRD RING
        ===================================================== */

        .energy-ring-three {

          position: absolute;

          width: 125px;

          height: 125px;

          border-radius: 50%;

          border:
            2px solid
              transparent;

          border-left-color:
            #19d6ca;

          border-bottom-color:
            rgba(
              25,
              214,
              202,
              0.25
            );

          animation:
            rotateClockwise
            3s
            linear
            infinite;
        }

        /* =====================================================
           INNER CORE
        ===================================================== */

        .ai-core {

          width: 75px;

          height: 75px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              #3ff5e9,
              #0e9d94 55%,
              #075e5a
            );

          box-shadow:

            0 0 20px
              rgba(
                25,
                214,
                202,
                0.6
              ),

            0 0 60px
              rgba(
                25,
                214,
                202,
                0.25
              );

          animation:
            coreFloat
            2.5s
            ease-in-out
            infinite;

          z-index: 10;
        }

        .ai-core-inner {

          width: 60px;

          height: 60px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #071d1d,
              #030b0c
            );

          color:
            #19d6ca;

          font-size: 17px;

          font-weight: 900;

          letter-spacing:
            2px;

          box-shadow:
            inset 0 0 20px
              rgba(
                25,
                214,
                202,
                0.15
              );
        }

        /* =====================================================
           CORE PULSE WAVES
        ===================================================== */

        .pulse-wave {

          position: absolute;

          width: 75px;

          height: 75px;

          border-radius: 50%;

          border:
            1px solid
              rgba(
                25,
                214,
                202,
                0.5
              );

          animation:
            pulseWave
            2.5s
            ease-out
            infinite;

          pointer-events: none;
        }

        .pulse-wave-two {

          animation-delay:
            1.25s;
        }

        @keyframes pulseWave {

          0% {

            transform:
              scale(0.7);

            opacity:
              0.7;
          }

          100% {

            transform:
              scale(2.4);

            opacity:
              0;
          }
        }

        /* =====================================================
           ORBIT PARTICLES
        ===================================================== */

        .orbit-particle {

          position: absolute;

          width: 6px;

          height: 6px;

          border-radius: 50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 12px
              #19d6ca;

          z-index: 20;
        }

        .particle-a {

          top: 5px;

          left: 92px;

          animation:
            particleA
            4s
            ease-in-out
            infinite;
        }

        .particle-b {

          right: 3px;

          top: 90px;

          animation:
            particleB
            3.5s
            ease-in-out
            infinite;
        }

        .particle-c {

          bottom: 12px;

          left: 48px;

          animation:
            particleC
            4.5s
            ease-in-out
            infinite;
        }

        .particle-d {

          left: 7px;

          top: 70px;

          animation:
            particleD
            3s
            ease-in-out
            infinite;
        }

        @keyframes particleA {

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
                35px,
                25px
              );

          }
        }

        @keyframes particleB {

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
                -30px,
                30px
              );

          }
        }

        @keyframes particleC {

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
                25px,
                -30px
              );

          }
        }

        @keyframes particleD {

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
                35px,
                -20px
              );

          }
        }

        /* =====================================================
           RADAR SCAN
        ===================================================== */

        .radar {

          position: absolute;

          width: 165px;

          height: 165px;

          border-radius: 50%;

          overflow: hidden;

          opacity: 0.5;

          z-index: 2;
        }

        .radar::before {

          content: "";

          position: absolute;

          width: 50%;

          height: 2px;

          left: 50%;

          top: 50%;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              #19d6ca,
              transparent
            );

          box-shadow:
            0 0 8px
              #19d6ca;

          animation:
            radarSweep
            2s
            linear
            infinite;
        }

        @keyframes radarSweep {

          from {

            transform:
              rotate(
                0deg
              );
          }

          to {

            transform:
              rotate(
                360deg
              );
          }
        }

        /* =====================================================
           SCAN LINE
        ===================================================== */

        .scan-line {

          position: absolute;

          width: 90px;

          height: 2px;

          left: 50%;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              90deg,
              transparent,
              #54fff4,
              transparent
            );

          box-shadow:
            0 0 10px
              #19d6ca;

          animation:
            verticalScan
            1.8s
            ease-in-out
            infinite;

          z-index: 30;
        }

        @keyframes verticalScan {

          0% {

            top:
              calc(
                50% - 60px
              );

            opacity:
              0;
          }

          25% {

            opacity:
              1;
          }

          75% {

            opacity:
              1;
          }

          100% {

            top:
              calc(
                50% + 60px
              );

            opacity:
              0;
          }
        }

        /* =====================================================
           DATA STREAM
        ===================================================== */

        .data-stream {

          position: absolute;

          display: flex;

          gap: 5px;

          opacity: 0.35;

          color:
            #19d6ca;

          font-family:
            monospace;

          font-size: 9px;

          letter-spacing:
            2px;

          white-space: nowrap;
        }

        .stream-left {

          right:
            calc(
              50% + 115px
            );

          animation:
            streamLeft
            3s
            linear
            infinite;
        }

        .stream-right {

          left:
            calc(
              50% + 115px
            );

          animation:
            streamRight
            3s
            linear
            infinite;
        }

        @keyframes streamLeft {

          0% {

            transform:
              translateX(
                40px
              );

            opacity:
              0;
          }

          30% {

            opacity:
              0.5;
          }

          100% {

            transform:
              translateX(
                -40px
              );

            opacity:
              0;
          }
        }

        @keyframes streamRight {

          0% {

            transform:
              translateX(
                -40px
              );

            opacity:
              0;
          }

          30% {

            opacity:
              0.5;
          }

          100% {

            transform:
              translateX(
                40px
              );

            opacity:
              0;
          }
        }

        /* =====================================================
           TEXT
        ===================================================== */

        .loader-title {

          margin:
            25px
            0
            0;

          color:
            #19d6ca;

          font-size:
            19px;

          font-weight:
            700;

          letter-spacing:
            0.3px;

          text-align:
            center;

          text-shadow:
            0 0 15px
              rgba(
                25,
                214,
                202,
                0.25
              );
        }

        .loader-status {

          margin:
            9px
            0
            0;

          color:
            #72817f;

          font-size:
            12px;

          text-align:
            center;

          min-height:
            18px;

          animation:
            statusChange
            0.5s
            ease;
        }

        .loader-dots {

          display:
            inline-flex;

          gap:
            4px;

          margin-left:
            5px;
        }

        .loader-dot {

          width:
            4px;

          height:
            4px;

          border-radius:
            50%;

          background:
            #19d6ca;

          animation:
            loadingDot
            1.2s
            ease-in-out
            infinite;
        }

        .loader-dot:nth-child(2) {

          animation-delay:
            0.2s;
        }

        .loader-dot:nth-child(3) {

          animation-delay:
            0.4s;
        }

        @keyframes loadingDot {

          0%,
          100% {

            opacity:
              0.25;

            transform:
              translateY(
                0
              );
          }

          50% {

            opacity:
              1;

            transform:
              translateY(
                -4px
              );
          }
        }

        @keyframes statusChange {

          from {

            opacity:
              0;

            transform:
              translateY(
                5px
              );
          }

          to {

            opacity:
              1;

            transform:
              translateY(
                0
              );
          }
        }

        /* =====================================================
           ROTATION
        ===================================================== */

        @keyframes rotateClockwise {

          from {

            transform:
              rotate(
                0deg
              );
          }

          to {

            transform:
              rotate(
                360deg
              );
          }
        }

        @keyframes rotateCounter {

          from {

            transform:
              rotate(
                360deg
              );
          }

          to {

            transform:
              rotate(
                0deg
              );
          }
        }

        @keyframes coreFloat {

          0%,
          100% {

            transform:
              translateY(
                0
              )
              scale(
                1
              );
          }

          50% {

            transform:
              translateY(
                -7px
              )
              scale(
                1.08
              );
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 600px) {

          .ai-loader {

            min-height:
              280px;
          }

          .data-stream {

            display:
              none;
          }

          .ai-system {

            transform:
              scale(
                0.85
              );
          }

        }

      `}</style>

      {/* Ambient glow */}

      <div className="loader-glow"></div>

      {/* Data streams */}

      <div className="data-stream stream-left">
        101001 010101 110010
      </div>

      <div className="data-stream stream-right">
        110101 001011 101100
      </div>

      {/* AI System */}

      <div className="ai-system">

        {/* Radar */}

        <div className="radar"></div>

        {/* Pulse waves */}

        <div className="pulse-wave"></div>

        <div className="pulse-wave pulse-wave-two"></div>

        {/* Rings */}

        <div className="energy-ring"></div>

        <div className="energy-ring-two"></div>

        <div className="energy-ring-three"></div>

        {/* Orbit particles */}

        <div className="orbit-particle particle-a"></div>

        <div className="orbit-particle particle-b"></div>

        <div className="orbit-particle particle-c"></div>

        <div className="orbit-particle particle-d"></div>

        {/* AI Core */}

        <div className="ai-core">

          <div className="ai-core-inner">
            AI
          </div>

        </div>

        {/* Scan */}

        <div className="scan-line"></div>

      </div>

      {/* Main text */}

      <h2 className="loader-title">

        {text}

        <span className="loader-dots">

          <span className="loader-dot"></span>

          <span className="loader-dot"></span>

          <span className="loader-dot"></span>

        </span>

      </h2>

      {/* Dynamic status */}

      <div
        key={status}
        className="loader-status"
      >
        {statuses[status]}
      </div>

    </div>
  );
}

export default AILoader;