import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";
import Sidebar from "../components/Sidebar";
import AILoader from "../components/AILoader";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBriefcase,
  FaGraduationCap,
  FaTimes,
  FaFileAlt,
  FaMagic,
  FaArrowRight,
  FaSparkles,
} from "react-icons/fa";

function ResumeUpload() {

  /* =========================================
     STATE
  ========================================= */

  const [file, setFile] = useState(null);

  const [showResume, setShowResume] =
    useState(false);

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [isHovering, setIsHovering] =
    useState(false);

  const [pdfUrl, setPdfUrl] =
    useState(null);


  /* =========================================
     PARTICLES
  ========================================= */

  const particles = useMemo(() => {

    return Array.from(
      { length: 45 },
      (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 7 + Math.random() * 9,
        size: 2 + Math.random() * 2,
      })
    );

  }, []);


  /* =========================================
     PDF URL
  ========================================= */

  useEffect(() => {

    if (!file) {

      setPdfUrl(null);

      return;
    }

    const url =
      URL.createObjectURL(file);

    setPdfUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };

  }, [file]);


  /* =========================================
     FILE UPLOAD
  ========================================= */

  const handleFileChange = async (e) => {

    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;


    /* PDF ONLY */

    if (
      selectedFile.type !==
      "application/pdf"
    ) {

      alert(
        "Please upload a PDF file only."
      );

      e.target.value = "";

      return;
    }


    /* 5MB */

    if (
      selectedFile.size >
      5 * 1024 * 1024
    ) {

      alert(
        "File size must be less than 5MB."
      );

      e.target.value = "";

      return;
    }


    setFile(selectedFile);

    const formData =
      new FormData();

    formData.append(
      "file",
      selectedFile
    );


    try {

      setLoading(true);

      setAnalysis(null);


      const response =
        await axios.post(
          "/api/resume/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );


      console.log(
        "FULL RESPONSE:",
        response.data
      );


      if (
        response.data.success &&
        response.data.analysis
      ) {

        setAnalysis(
          response.data.analysis
        );


        /* Save interview questions */

        localStorage.setItem(
          "interviewQuestions",
          JSON.stringify(
            response.data.questions || []
          )
        );


        console.log(
          "Saved Questions:",
          response.data.questions
        );

      } else {

        console.log(
          "Backend Error:",
          response.data
        );

        alert(
          response.data.message ||
          "Resume analysis failed"
        );
      }

    } catch (error) {

      console.error(
        "Resume upload error:",
        error
      );


      alert(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Resume analysis failed. Please check your backend connection."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =========================================
     SCORE COLOR
  ========================================= */

  const getScoreColor = (score) => {

    if (score >= 80) {
      return "#22c55e";
    }

    if (score >= 60) {
      return "#19d6ca";
    }

    return "#ef4444";
  };


  /* =========================================
     SCORE MESSAGE
  ========================================= */

  const getScoreMessage = (score) => {

    if (score >= 80) {

      return (
        "Excellent! Your resume is highly optimized."
      );
    }

    if (score >= 60) {

      return (
        "Good score, but there is room for improvement."
      );
    }

    return (
      "Your resume needs significant improvement."
    );
  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="resume-page">

      {/* =====================================
          AMBIENT BACKGROUND
      ===================================== */}

      <div className="background-animation">

        {/* Main glow */}

        <div className="ambient-glow glow-one"></div>

        <div className="ambient-glow glow-two"></div>

        <div className="ambient-glow glow-three"></div>


        {/* Grid */}

        <div className="background-grid"></div>


        {/* Particles */}

        <div className="particles">

          {particles.map((particle) => (

            <span
              key={particle.id}
              className="particle"
              style={{
                left:
                  `${particle.left}%`,

                animationDelay:
                  `${particle.delay}s`,

                animationDuration:
                  `${particle.duration}s`,

                width:
                  `${particle.size}px`,

                height:
                  `${particle.size}px`,
              }}
            />

          ))}

        </div>

      </div>


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <Sidebar />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="main-content">


        {/* ===================================
            LOADING OVERLAY
        =================================== */}

        {loading && (

          <div className="loading-overlay">

            <div className="loader-container">

              <AILoader
                text=
                  "Analyzing Resume & Generating Custom Questions..."
              />

            </div>

          </div>

        )}


        {/* ===================================
            HEADER
        =================================== */}

        <div className="page-header fade-up">

          <div className="header-content">

            <div className="title-badge">

              <FaSparkles />

              AI RESUME ANALYSIS

            </div>


            <div className="title-wrapper">

              <div className="title-icon">

                <FaFileAlt size={27} />

              </div>


              <div>

                <h1>
                  Resume Analyzer
                </h1>

                <div className="title-line"></div>

              </div>

            </div>


            <p>

              Upload your resume to get an ATS score,
              deep AI feedback, and personalized
              interview questions.

            </p>

          </div>

        </div>


        {/* ===================================
            UPLOAD
        =================================== */}

        {!analysis && (

          <label
            className={`upload-zone ${
              isHovering
                ? "upload-hover"
                : ""
            } fade-up`}

            onMouseEnter={() =>
              setIsHovering(true)
            }

            onMouseLeave={() =>
              setIsHovering(false)
            }
          >

            <div className="upload-ring ring-one">
            </div>

            <div className="upload-ring ring-two">
            </div>


            <div className="upload-icon">

              <FaCloudUploadAlt size={48} />

            </div>


            <h2>

              {isHovering
                ? "Drop Your Resume Here"
                : "Upload Your Resume"}

            </h2>


            <p>

              Click anywhere to select your
              resume

            </p>


            <span className="upload-format">

              PDF files only
              <span className="separator">
                •
              </span>
              Maximum 5MB

            </span>


            <div className="upload-button">

              <FaCloudUploadAlt />

              Choose PDF

            </div>


            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              hidden
            />

          </label>

        )}


        {/* ===================================
            RESULTS
        =================================== */}

        {!loading &&
          file &&
          analysis && (

            <div className="results-layout">


              {/* =================================
                  LEFT
              ================================= */}

              <div className="left-column">


                {/* ATS SCORE */}

                <div className="glass-card score-card fade-up">

                  <div className="card-top-line">
                  </div>


                  <div className="card-heading">

                    <FaMagic />

                    <span>
                      ATS Performance
                    </span>

                  </div>


                  <h2>
                    Overall ATS Score
                  </h2>


                  <div className="score-wrapper">

                    <div
                      className="score-ring"
                      style={{
                        background:
                          `conic-gradient(
                            ${getScoreColor(
                              analysis.ats_score
                            )}
                            ${analysis.ats_score}%,
                            rgba(255,255,255,.05)
                            ${analysis.ats_score}%
                          )`,

                        boxShadow:
                          `0 0 55px
                          ${getScoreColor(
                            analysis.ats_score
                          )}35`,
                      }}
                    >

                      <div className="score-inner">

                        <span className="score-number">

                          {analysis.ats_score || 0}

                        </span>


                        <span className="score-percent">

                          %

                        </span>


                        <span className="score-label">

                          ATS SCORE

                        </span>

                      </div>

                    </div>

                  </div>


                  <div className="score-status">

                    <span
                      className="score-status-dot"
                      style={{
                        background:
                          getScoreColor(
                            analysis.ats_score
                          ),

                        boxShadow:
                          `0 0 10px
                          ${getScoreColor(
                            analysis.ats_score
                          )}`,
                      }}
                    />

                    {analysis.ats_score >= 80
                      ? "Excellent"
                      : analysis.ats_score >= 60
                      ? "Good"
                      : "Needs Improvement"}

                  </div>


                  <p className="score-message">

                    {getScoreMessage(
                      analysis.ats_score
                    )}

                  </p>

                </div>


                {/* FILE CARD */}

                <div className="glass-card file-card fade-up">

                  <div className="file-header">

                    <div className="pdf-icon">

                      <FaFilePdf size={25} />

                    </div>


                    <div className="file-details">

                      <h3>
                        {file.name}
                      </h3>

                      <p>

                        {(file.size / 1024).toFixed(2)}
                        {" "}KB

                      </p>

                    </div>

                  </div>


                  <div className="file-actions">

                    <button
                      className="secondary-button"
                      onClick={() =>
                        setShowResume(true)
                      }
                    >

                      <FaFilePdf />

                      View PDF

                    </button>


                    <label className="primary-button">

                      <FaCloudUploadAlt />

                      Upload New Resume

                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                        hidden
                      />

                    </label>

                  </div>

                </div>

              </div>


              {/* =================================
                  RIGHT
              ================================= */}

              <div className="right-column">


                {/* PROFILE */}

                <div className="glass-card analysis-card fade-up">

                  <div className="section-heading">

                    <div className="heading-icon teal">

                      <FaBriefcase />

                    </div>


                    <div>

                      <h2>
                        Profile Overview
                      </h2>

                      <p>
                        AI extracted information
                        from your resume
                      </p>

                    </div>

                  </div>


                  <div className="overview-grid">


                    <div className="overview-item">

                      <div className="overview-icon teal-text">

                        <FaBriefcase />

                      </div>


                      <div>

                        <span>
                          EXPERIENCE
                        </span>

                        <p>

                          {analysis.experience ||
                            "Not detected"}

                        </p>

                      </div>

                    </div>


                    <div className="overview-item">

                      <div className="overview-icon green-text">

                        <FaGraduationCap />

                      </div>


                      <div>

                        <span>
                          EDUCATION
                        </span>

                        <p>

                          {analysis.education ||
                            "Not detected"}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* SKILLS */}

                <div className="glass-card analysis-card fade-up">

                  <div className="section-heading">

                    <div className="heading-icon cyan">

                      <FaMagic />

                    </div>


                    <div>

                      <h2>
                        Detected Skills
                      </h2>

                      <p>
                        Skills identified by AI
                      </p>

                    </div>

                  </div>


                  <div className="skills-container">

                    {(analysis.skills || [])
                      .map(
                        (skill, index) => (

                          <span
                            key={index}
                            className="skill-tag"
                            style={{
                              animationDelay:
                                `${index * 0.08}s`,
                            }}
                          >

                            {skill}

                          </span>

                        )
                      )}


                    {(!analysis.skills ||
                      analysis.skills.length === 0) && (

                      <p className="empty-text">

                        No specific skills detected.

                      </p>

                    )}

                  </div>

                </div>


                {/* STRENGTHS / WEAKNESSES */}

                <div className="two-column">


                  {/* STRENGTHS */}

                  <div className="glass-card strength-card fade-up">

                    <div className="strength-heading">

                      <div className="success-icon">

                        <FaCheckCircle />

                      </div>

                      <h2>
                        Strengths
                      </h2>

                    </div>


                    <ul>

                      {(analysis.strengths || [])
                        .map(
                          (item, index) => (

                            <li key={index}>

                              <span className="success-dot">
                              </span>

                              {item}

                            </li>

                          )
                        )}

                    </ul>

                  </div>


                  {/* WEAKNESSES */}

                  <div className="glass-card weakness-card fade-up">

                    <div className="weakness-heading">

                      <div className="danger-icon">

                        <FaExclamationTriangle />

                      </div>

                      <h2>
                        Areas to Improve
                      </h2>

                    </div>


                    <ul>

                      {(analysis.weaknesses || [])
                        .map(
                          (item, index) => (

                            <li key={index}>

                              <span className="danger-dot">
                              </span>

                              {item}

                            </li>

                          )
                        )}

                    </ul>

                  </div>

                </div>


                {/* TARGET ROLES */}

                <div className="glass-card jobs-card fade-up">

                  <div className="jobs-header">

                    <div className="heading-icon teal">

                      <FaArrowRight />

                    </div>


                    <div>

                      <h2>
                        Target Roles
                      </h2>

                      <p>
                        Recommended career paths
                      </p>

                    </div>

                  </div>


                  <div className="jobs-container">

                    {(analysis.recommended_jobs || [])
                      .map(
                        (job, index) => (

                          <span
                            key={index}
                            className="job-tag"
                            style={{
                              animationDelay:
                                `${index * 0.1}s`,
                            }}
                          >

                            {job}

                          </span>

                        )
                      )}

                  </div>

                </div>

              </div>

            </div>

          )}


        {/* ===================================
            PDF MODAL
        =================================== */}

        {showResume &&
          file &&
          pdfUrl && (

            <div
              className="pdf-modal"
              onClick={(e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {
                  setShowResume(false);
                }

              }}
            >

              <div className="pdf-window">


                <div className="pdf-header">

                  <div className="pdf-title">

                    <FaFilePdf />

                    <span>
                      {file.name}
                    </span>

                  </div>


                  <button
                    onClick={() =>
                      setShowResume(false)
                    }
                    className="close-button"
                  >

                    <FaTimes />

                  </button>

                </div>


                <iframe
                  src={pdfUrl}
                  title="Resume Viewer"
                  className="pdf-viewer"
                />

              </div>

            </div>

          )}

      </div>


      {/* =====================================
          CSS
      ===================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }


        /* =====================================
           PAGE
        ===================================== */

        .resume-page {

          min-height: 100vh;

          position: relative;

          overflow-x: hidden;

          color: #e8f1f0;

          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          background:

            radial-gradient(
              circle at 55% 15%,
              rgba(25,214,202,.055),
              transparent 32%
            ),

            radial-gradient(
              circle at 90% 80%,
              rgba(25,214,202,.035),
              transparent 30%
            ),

            linear-gradient(
              135deg,
              #020707 0%,
              #061314 48%,
              #02090a 100%
            );

        }


        /* =====================================
           BACKGROUND
        ===================================== */

        .background-animation {

          position: fixed;

          inset: 0;

          overflow: hidden;

          pointer-events: none;

          z-index: 0;

        }


        /* GRID */

        .background-grid {

          position: absolute;

          inset: 0;

          opacity: .025;

          background-image:

            linear-gradient(
              rgba(25,214,202,.8) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(25,214,202,.8) 1px,
              transparent 1px
            );

          background-size:
            42px 42px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 85%
            );

          animation:
            gridMove
            25s
            linear
            infinite;

        }


        @keyframes gridMove {

          from {
            transform:
              translateY(0);
          }

          to {
            transform:
              translateY(42px);
          }

        }


        /* =====================================
           GLOWS
        ===================================== */

        .ambient-glow {

          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter:
            blur(30px);

        }


        .glow-one {

          width: 600px;

          height: 600px;

          left: -330px;

          top: -250px;

          background:

            radial-gradient(
              circle,
              rgba(25,214,202,.13),
              transparent 70%
            );

          animation:
            glowFloatOne
            14s
            ease-in-out
            infinite;

        }


        .glow-two {

          width: 550px;

          height: 550px;

          right: -300px;

          bottom: -250px;

          background:

            radial-gradient(
              circle,
              rgba(25,214,202,.09),
              transparent 70%
            );

          animation:
            glowFloatTwo
            17s
            ease-in-out
            infinite;

        }


        .glow-three {

          width: 400px;

          height: 400px;

          left: 55%;

          top: 35%;

          background:

            radial-gradient(
              circle,
              rgba(20,184,166,.06),
              transparent 70%
            );

          animation:
            glowFloatThree
            12s
            ease-in-out
            infinite;

        }


        @keyframes glowFloatOne {

          0%,100% {

            transform:
              translate(0,0)
              scale(1);

            opacity:
              .55;

          }

          50% {

            transform:
              translate(80px,60px)
              scale(1.12);

            opacity:
              1;

          }

        }


        @keyframes glowFloatTwo {

          0%,100% {

            transform:
              translate(0,0)
              scale(1);

          }

          50% {

            transform:
              translate(-60px,-50px)
              scale(1.16);

          }

        }


        @keyframes glowFloatThree {

          0%,100% {

            transform:
              translate(0,0);

            opacity:
              .3;

          }

          50% {

            transform:
              translate(-50px,45px);

            opacity:
              .7;

          }

        }


        /* =====================================
           PARTICLES
        ===================================== */

        .particle {

          position: absolute;

          bottom: -15px;

          border-radius: 50%;

          background:
            #19d6ca;

          box-shadow:
            0 0 8px
            rgba(25,214,202,.8);

          opacity: .25;

          animation:
            particleRise
            linear
            infinite;

        }


        @keyframes particleRise {

          0% {

            transform:
              translateY(0)
              translateX(0);

            opacity:
              0;

          }

          15% {

            opacity:
              .3;

          }

          50% {

            transform:
              translateY(-50vh)
              translateX(30px);

            opacity:
              .2;

          }

          100% {

            transform:
              translateY(-115vh)
              translateX(-25px);

            opacity:
              0;

          }

        }


        /* =====================================
           MAIN CONTENT
        ===================================== */

        .main-content {

          margin-left:
            260px;

          width:
            calc(100% - 260px);

          max-width:
            1550px;

          padding:
            45px 55px;

          position:
            relative;

          z-index:
            2;

        }


        /* =====================================
           HEADER
        ===================================== */

        .page-header {

          margin-bottom:
            40px;

        }


        .header-content {

          position:
            relative;

        }


        .title-badge {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            8px 13px;

          margin-bottom:
            17px;

          border-radius:
            30px;

          color:
            #19d6ca;

          background:
            rgba(25,214,202,.055);

          border:
            1px solid
            rgba(25,214,202,.16);

          font-size:
            10px;

          font-weight:
            800;

          letter-spacing:
            2px;

          box-shadow:
            0 0 25px
            rgba(25,214,202,.035);

          animation:
            badgePulse
            3s
            ease-in-out
            infinite;

        }


        @keyframes badgePulse {

          0%,100% {

            box-shadow:
              0 0 15px
              rgba(25,214,202,.025);

          }

          50% {

            box-shadow:
              0 0 30px
              rgba(25,214,202,.1);

          }

        }


        .title-wrapper {

          display:
            flex;

          align-items:
            center;

          gap:
            17px;

        }


        .title-icon {

          width:
            60px;

          height:
            60px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          flex-shrink:
            0;

          border-radius:
            17px;

          color:
            #19d6ca;

          background:
            linear-gradient(
              135deg,
              rgba(25,214,202,.14),
              rgba(25,214,202,.035)
            );

          border:
            1px solid
            rgba(25,214,202,.25);

          box-shadow:
            0 0 30px
            rgba(25,214,202,.1);

          animation:
            titleIconFloat
            4s
            ease-in-out
            infinite;

        }


        @keyframes titleIconFloat {

          0%,100% {

            transform:
              translateY(0);

          }

          50% {

            transform:
              translateY(-5px);

          }

        }


        .page-header h1 {

          margin:
            0;

          font-size:
            clamp(
              36px,
              4vw,
              48px
            );

          font-weight:
            900;

          letter-spacing:
            -1.5px;

          line-height:
            1.05;

          background:
            linear-gradient(
              90deg,
              #ffffff,
              #b7cfcc,
              #19d6ca
            );

          -webkit-background-clip:
            text;

          -webkit-text-fill-color:
            transparent;

        }


        .title-line {

          width:
            75px;

          height:
            3px;

          margin-top:
            9px;

          border-radius:
            10px;

          background:
            linear-gradient(
              90deg,
              #19d6ca,
              #0d938b
            );

          box-shadow:
            0 0 15px
            rgba(25,214,202,.4);

          animation:
            titleLine
            2.5s
            ease-in-out
            infinite;

        }


        @keyframes titleLine {

          0%,100% {

            width:
              75px;

          }

          50% {

            width:
              115px;

          }

        }


        .page-header p {

          max-width:
            800px;

          margin:
            18px
            0
            0
            78px;

          color:
            #7f9491;

          font-size:
            15px;

          line-height:
            1.7;

        }


        /* =====================================
           UPLOAD ZONE
        ===================================== */

        .upload-zone {

          min-height:
            430px;

          position:
            relative;

          overflow:
            hidden;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          text-align:
            center;

          cursor:
            pointer;

          border:
            1px dashed
            rgba(25,214,202,.22);

          border-radius:
            28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.045),
              rgba(255,255,255,.012)
            );

          backdrop-filter:
            blur(25px);

          box-shadow:
            0 20px 60px
            rgba(0,0,0,.2);

          transition:
            transform .4s ease,
            border-color .4s ease,
            box-shadow .4s ease,
            background .4s ease;

        }


        .upload-zone::before {

          content:
            "";

          position:
            absolute;

          inset:
            0;

          background:
            radial-gradient(
              circle at center,
              rgba(25,214,202,.08),
              transparent 55%
            );

          pointer-events:
            none;

          animation:
            uploadAmbient
            5s
            ease-in-out
            infinite;

        }


        .upload-zone::after {

          content:
            "";

          position:
            absolute;

          width:
            300px;

          height:
            1px;

          left:
            -300px;

          top:
            0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(25,214,202,.5),
              transparent
            );

          animation:
            scanLine
            6s
            linear
            infinite;

        }


        @keyframes uploadAmbient {

          0%,100% {

            opacity:
              .45;

            transform:
              scale(1);

          }

          50% {

            opacity:
              1;

            transform:
              scale(1.12);

          }

        }


        @keyframes scanLine {

          0% {

            left:
              -300px;

            top:
              0;

          }

          50% {

            left:
              100%;

            top:
              100%;

          }

          100% {

            left:
              100%;

            top:
              100%;

          }

        }


        .upload-zone:hover,
        .upload-zone.upload-hover {

          transform:
            translateY(-5px);

          border-color:
            rgba(25,214,202,.55);

          background:
            linear-gradient(
              145deg,
              rgba(25,214,202,.07),
              rgba(255,255,255,.018)
            );

          box-shadow:
            0 30px 75px
            rgba(0,0,0,.3),
            0 0 45px
            rgba(25,214,202,.08);

        }


        /* =====================================
           UPLOAD RINGS
        ===================================== */

        .upload-ring {

          position:
            absolute;

          left:
            50%;

          top:
            50%;

          border:
            1px solid
            rgba(25,214,202,.08);

          border-radius:
            50%;

          transform:
            translate(-50%,-50%);

          pointer-events:
            none;

        }


        .ring-one {

          width:
            230px;

          height:
            230px;

          animation:
            ringPulse
            5s
            ease-in-out
            infinite;

        }


        .ring-two {

          width:
            350px;

          height:
            350px;

          border-style:
            dashed;

          animation:
            ringRotate
            25s
            linear
            infinite;

        }


        @keyframes ringPulse {

          0%,100% {

            transform:
              translate(-50%,-50%)
              scale(.9);

            opacity:
              .3;

          }

          50% {

            transform:
              translate(-50%,-50%)
              scale(1.08);

            opacity:
              .8;

          }

        }


        @keyframes ringRotate {

          from {

            transform:
              translate(-50%,-50%)
              rotate(0deg);

          }

          to {

            transform:
              translate(-50%,-50%)
              rotate(360deg);

          }

        }


        /* =====================================
           UPLOAD ICON
        ===================================== */

        .upload-icon {

          width:
            95px;

          height:
            95px;

          position:
            relative;

          z-index:
            2;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            50%;

          color:
            #19d6ca;

          background:
            radial-gradient(
              circle,
              rgba(25,214,202,.15),
              rgba(25,214,202,.025)
            );

          border:
            1px solid
            rgba(25,214,202,.22);

          box-shadow:
            0 0 40px
            rgba(25,214,202,.12);

          animation:
            uploadFloat
            3.5s
            ease-in-out
            infinite;

        }


        @keyframes uploadFloat {

          0%,100% {

            transform:
              translateY(0);

          }

          50% {

            transform:
              translateY(-10px);

          }

        }


        .upload-zone h2 {

          position:
            relative;

          z-index:
            2;

          margin:
            25px 0 8px;

          color:
            #eaf7f5;

          font-size:
            27px;

          font-weight:
            800;

        }


        .upload-zone p {

          position:
            relative;

          z-index:
            2;

          margin:
            0;

          color:
            #8ba09d;

          font-size:
            14px;

        }


        .upload-format {

          position:
            relative;

          z-index:
            2;

          margin-top:
            9px;

          color:
            #526563;

          font-size:
            11px;

        }


        .separator {

          margin:
            0 8px;

          color:
            #19d6ca;

        }


        .upload-button {

          position:
            relative;

          z-index:
            2;

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          margin-top:
            25px;

          padding:
            13px 23px;

          border-radius:
            12px;

          color:
            #031211;

          background:
            linear-gradient(
              135deg,
              #20ddd0,
              #12aaa2
            );

          font-size:
            14px;

          font-weight:
            800;

          box-shadow:
            0 12px 30px
            rgba(25,214,202,.17);

          transition:
            all .3s ease;

        }


        .upload-zone:hover
        .upload-button {

          transform:
            translateY(-3px);

          box-shadow:
            0 16px 40px
            rgba(25,214,202,.28);

        }


        /* =====================================
           RESULTS
        ===================================== */

        .results-layout {

          display:
            grid;

          grid-template-columns:
            350px
            minmax(0,1fr);

          gap:
            30px;

          align-items:
            start;

        }


        .left-column {

          display:
            flex;

          flex-direction:
            column;

          gap:
            25px;

          position:
            sticky;

          top:
            30px;

        }


        .right-column {

          display:
            flex;

          flex-direction:
            column;

          gap:
            25px;

          min-width:
            0;

        }


        /* =====================================
           GLASS CARD
        ===================================== */

        .glass-card {

          position:
            relative;

          overflow:
            hidden;

          border:
            1px solid
            rgba(255,255,255,.075);

          border-radius:
            23px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.05),
              rgba(255,255,255,.012)
            );

          backdrop-filter:
            blur(25px);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,.2);

          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;

        }


        .glass-card:hover {

          transform:
            translateY(-4px);

          border-color:
            rgba(25,214,202,.18);

          box-shadow:
            0 25px 65px
            rgba(0,0,0,.3),
            0 0 35px
            rgba(25,214,202,.035);

        }


        .card-top-line {

          position:
            absolute;

          top:
            0;

          left:
            0;

          right:
            0;

          height:
            2px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #19d6ca,
              transparent
            );

          opacity:
            .8;

          animation:
            cardLine
            4s
            ease-in-out
            infinite;

        }


        @keyframes cardLine {

          0%,100% {

            opacity:
              .35;

          }

          50% {

            opacity:
              1;

          }

        }


        /* =====================================
           SCORE
        ===================================== */

        .score-card {

          padding:
            32px 25px;

          text-align:
            center;

        }


        .card-heading {

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            8px;

          color:
            #19d6ca;

          font-size:
            11px;

          font-weight:
            800;

          letter-spacing:
            2px;

          text-transform:
            uppercase;

          margin-bottom:
            18px;

        }


        .score-card h2 {

          margin:
            0 0 27px;

          color:
            #e7f3f1;

          font-size:
            19px;

        }


        .score-wrapper {

          display:
            flex;

          justify-content:
            center;

        }


        .score-ring {

          width:
            185px;

          height:
            185px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            50%;

          animation:
            scorePulse
            4s
            ease-in-out
            infinite;

          transition:
            box-shadow .5s ease;

        }


        @keyframes scorePulse {

          0%,100% {

            transform:
              scale(1);

          }

          50% {

            transform:
              scale(1.045);

          }

        }


        .score-inner {

          width:
            155px;

          height:
            155px;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              #0c2020,
              #061011
            );

          border:
            1px solid
            rgba(25,214,202,.1);

        }


        .score-number {

          color:
            #eefcf9;

          font-size:
            47px;

          font-weight:
            900;

          line-height:
            1;

        }


        .score-percent {

          color:
            #6e8581;

          font-size:
            18px;

        }


        .score-label {

          margin-top:
            5px;

          color:
            #526562;

          font-size:
            8px;

          font-weight:
            800;

          letter-spacing:
            2px;

        }


        .score-status {

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            7px;

          margin-top:
            18px;

          color:
            #8da09d;

          font-size:
            11px;

          font-weight:
            700;

          text-transform:
            uppercase;

          letter-spacing:
            1px;

        }


        .score-status-dot {

          width:
            6px;

          height:
            6px;

          border-radius:
            50%;

        }


        .score-message {

          margin:
            12px 0 0;

          color:
            #6e8581;

          font-size:
            12px;

          line-height:
            1.6;

        }


        /* =====================================
           FILE CARD
        ===================================== */

        .file-card {

          padding:
            25px;

        }


        .file-header {

          display:
            flex;

          align-items:
            center;

          gap:
            14px;

          margin-bottom:
            20px;

        }


        .pdf-icon {

          width:
            52px;

          height:
            52px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          flex-shrink:
            0;

          border-radius:
            14px;

          color:
            #ff7777;

          background:
            rgba(239,68,68,.07);

          border:
            1px solid
            rgba(239,68,68,.16);

          transition:
            .3s ease;

        }


        .file-card:hover
        .pdf-icon {

          transform:
            rotate(-5deg)
            scale(1.05);

        }


        .file-details {

          min-width:
            0;

        }


        .file-details h3 {

          margin:
            0 0 5px;

          color:
            #dce9e7;

          font-size:
            14px;

          white-space:
            nowrap;

          overflow:
            hidden;

          text-overflow:
            ellipsis;

        }


        .file-details p {

          margin:
            0;

          color:
            #536764;

          font-size:
            11px;

        }


        .file-actions {

          display:
            flex;

          flex-direction:
            column;

          gap:
            10px;

        }


        .secondary-button,
        .primary-button {

          width:
            100%;

          min-height:
            46px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            9px;

          border-radius:
            11px;

          font-size:
            13px;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all .3s ease;

        }


        .secondary-button {

          color:
            #d5e5e2;

          background:
            rgba(255,255,255,.025);

          border:
            1px solid
            rgba(255,255,255,.09);

        }


        .secondary-button:hover {

          color:
            #19d6ca;

          border-color:
            rgba(25,214,202,.3);

          background:
            rgba(25,214,202,.04);

          transform:
            translateY(-2px);

        }


        .primary-button {

          color:
            #031211;

          background:
            linear-gradient(
              135deg,
              #20ddd0,
              #12aaa2
            );

          border:
            none;

          box-shadow:
            0 9px 25px
            rgba(25,214,202,.12);

        }


        .primary-button:hover {

          transform:
            translateY(-3px);

          box-shadow:
            0 14px 35px
            rgba(25,214,202,.22);

        }


        /* =====================================
           ANALYSIS
        ===================================== */

        .analysis-card {

          padding:
            29px;

        }


        .section-heading {

          display:
            flex;

          align-items:
            center;

          gap:
            14px;

          margin-bottom:
            24px;

        }


        .section-heading h2 {

          margin:
            0;

          color:
            #dfeceb;

          font-size:
            19px;

        }


        .section-heading p {

          margin:
            5px 0 0;

          color:
            #5e7370;

          font-size:
            11px;

        }


        .heading-icon {

          width:
            45px;

          height:
            45px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          flex-shrink:
            0;

          border-radius:
            13px;

        }


        .heading-icon.teal {

          color:
            #19d6ca;

          background:
            rgba(25,214,202,.08);

          border:
            1px solid
            rgba(25,214,202,.13);

        }


        .heading-icon.cyan {

          color:
            #22d3ee;

          background:
            rgba(34,211,238,.07);

        }


        .overview-grid {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            17px;

        }


        .overview-item {

          display:
            flex;

          gap:
            14px;

          padding:
            18px;

          border-radius:
            15px;

          background:
            rgba(255,255,255,.022);

          border:
            1px solid
            rgba(255,255,255,.05);

          transition:
            .3s ease;

        }


        .overview-item:hover {

          transform:
            translateY(-3px);

          border-color:
            rgba(25,214,202,.15);

          background:
            rgba(25,214,202,.025);

        }


        .overview-icon {

          margin-top:
            2px;

          font-size:
            19px;

        }


        .teal-text {

          color:
            #19d6ca;

        }


        .green-text {

          color:
            #4ade80;

        }


        .overview-item span {

          color:
            #526562;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            1.5px;

        }


        .overview-item p {

          margin:
            6px 0 0;

          color:
            #c7d8d5;

          font-size:
            13px;

          line-height:
            1.6;

        }


        /* =====================================
           SKILLS
        ===================================== */

        .skills-container {

          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            9px;

        }


        .skill-tag {

          padding:
            8px 14px;

          border-radius:
            20px;

          color:
            #8cece6;

          background:
            rgba(25,214,202,.055);

          border:
            1px solid
            rgba(25,214,202,.18);

          font-size:
            12px;

          font-weight:
            650;

          animation:
            tagAppear
            .5s
            ease
            both;

          transition:
            .3s ease;

        }


        .skill-tag:hover {

          color:
            #dffffb;

          transform:
            translateY(-3px)
            scale(1.03);

          background:
            rgba(25,214,202,.1);

          border-color:
            rgba(25,214,202,.4);

          box-shadow:
            0 0 18px
            rgba(25,214,202,.1);

        }


        .empty-text {

          color:
            #566966;

          font-size:
            13px;

        }


        /* =====================================
           TWO COLUMN
        ===================================== */

        .two-column {

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            22px;

        }


        .strength-card,
        .weakness-card {

          padding:
            27px;

        }


        .strength-card {

          background:
            linear-gradient(
              145deg,
              rgba(34,197,94,.055),
              rgba(255,255,255,.012)
            );

          border-color:
            rgba(34,197,94,.14);

        }


        .weakness-card {

          background:
            linear-gradient(
              145deg,
              rgba(239,68,68,.055),
              rgba(255,255,255,.012)
            );

          border-color:
            rgba(239,68,68,.14);

        }


        .strength-heading,
        .weakness-heading {

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          margin-bottom:
            20px;

        }


        .strength-heading h2,
        .weakness-heading h2 {

          margin:
            0;

          font-size:
            17px;

        }


        .strength-heading {

          color:
            #4ade80;

        }


        .weakness-heading {

          color:
            #f87171;

        }


        .success-icon,
        .danger-icon {

          width:
            37px;

          height:
            37px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            10px;

        }


        .success-icon {

          background:
            rgba(34,197,94,.08);

        }


        .danger-icon {

          background:
            rgba(239,68,68,.08);

        }


        .strength-card ul,
        .weakness-card ul {

          margin:
            0;

          padding:
            0;

          list-style:
            none;

          display:
            flex;

          flex-direction:
            column;

          gap:
            12px;

        }


        .strength-card li,
        .weakness-card li {

          display:
            flex;

          align-items:
            flex-start;

          gap:
            9px;

          color:
            #bacbc8;

          font-size:
            12.5px;

          line-height:
            1.6;

        }


        .success-dot,
        .danger-dot {

          width:
            6px;

          height:
            6px;

          flex-shrink:
            0;

          margin-top:
            7px;

          border-radius:
            50%;

        }


        .success-dot {

          background:
            #4ade80;

          box-shadow:
            0 0 9px
            rgba(74,222,128,.55);

        }


        .danger-dot {

          background:
            #f87171;

          box-shadow:
            0 0 9px
            rgba(248,113,113,.5);

        }


        /* =====================================
           JOBS
        ===================================== */

        .jobs-card {

          padding:
            29px;

          background:
            linear-gradient(
              145deg,
              rgba(25,214,202,.045),
              rgba(255,255,255,.012)
            );

        }


        .jobs-header {

          display:
            flex;

          align-items:
            center;

          gap:
            14px;

          margin-bottom:
            21px;

        }


        .jobs-header h2 {

          margin:
            0;

          color:
            #dfeceb;

          font-size:
            19px;

        }


        .jobs-header p {

          margin:
            5px 0 0;

          color:
            #5e7370;

          font-size:
            11px;

        }


        .jobs-container {

          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            10px;

        }


        .job-tag {

          padding:
            10px 16px;

          border-radius:
            11px;

          color:
            #bde8e4;

          background:
            rgba(25,214,202,.04);

          border:
            1px solid
            rgba(25,214,202,.13);

          font-size:
            12px;

          font-weight:
            650;

          animation:
            tagAppear
            .5s
            ease
            both;

          transition:
            .3s ease;

        }


        .job-tag:hover {

          transform:
            translateY(-3px);

          color:
            #e9fffc;

          border-color:
            rgba(25,214,202,.35);

          background:
            rgba(25,214,202,.08);

          box-shadow:
            0 0 20px
            rgba(25,214,202,.08);

        }


        /* =====================================
           LOADING
        ===================================== */

        .loading-overlay {

          position:
            fixed;

          inset:
            0;

          z-index:
            5000;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            rgba(2,7,7,.82);

          backdrop-filter:
            blur(18px);

          animation:
            fadeIn
            .3s
            ease;

        }


        .loader-container {

          animation:
            loaderAppear
            .5s
            ease;

        }


        /* =====================================
           PDF MODAL
        ===================================== */

        .pdf-modal {

          position:
            fixed;

          inset:
            0;

          z-index:
            9999;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            30px;

          background:
            rgba(2,7,7,.9);

          backdrop-filter:
            blur(16px);

          animation:
            fadeIn
            .3s
            ease;

        }


        .pdf-window {

          width:
            100%;

          max-width:
            1100px;

          height:
            92vh;

          display:
            flex;

          flex-direction:
            column;

          overflow:
            hidden;

          background:
            #071111;

          border:
            1px solid
            rgba(25,214,202,.15);

          border-radius:
            20px;

          box-shadow:
            0 35px 90px
            rgba(0,0,0,.65),
            0 0 40px
            rgba(25,214,202,.04);

          animation:
            modalOpen
            .4s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            );

        }


        .pdf-header {

          height:
            65px;

          flex-shrink:
            0;

          padding:
            0 20px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          background:
            rgba(0,0,0,.22);

          border-bottom:
            1px solid
            rgba(255,255,255,.06);

        }


        .pdf-title {

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          min-width:
            0;

          color:
            #dce9e7;

          font-size:
            13px;

        }


        .pdf-title svg {

          color:
            #ff7777;

          flex-shrink:
            0;

        }


        .pdf-title span {

          overflow:
            hidden;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;

        }


        .close-button {

          width:
            40px;

          height:
            40px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid
            transparent;

          border-radius:
            10px;

          background:
            transparent;

          color:
            #738682;

          cursor:
            pointer;

          transition:
            .3s ease;

        }


        .close-button:hover {

          color:
            #ff8585;

          background:
            rgba(239,68,68,.08);

          border-color:
            rgba(239,68,68,.15);

          transform:
            rotate(90deg);

        }


        .pdf-viewer {

          width:
            100%;

          flex:
            1;

          border:
            none;

          background:
            white;

        }


        /* =====================================
           ANIMATIONS
        ===================================== */

        .fade-up {

          animation:
            fadeUp
            .7s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            )
            both;

        }


        @keyframes fadeUp {

          from {

            opacity:
              0;

            transform:
              translateY(25px);

          }

          to {

            opacity:
              1;

            transform:
              translateY(0);

          }

        }


        @keyframes fadeIn {

          from {

            opacity:
              0;

          }

          to {

            opacity:
              1;

          }

        }


        @keyframes loaderAppear {

          from {

            opacity:
              0;

            transform:
              scale(.9)
              translateY(15px);

          }

          to {

            opacity:
              1;

            transform:
              scale(1)
              translateY(0);

          }

        }


        @keyframes modalOpen {

          from {

            opacity:
              0;

            transform:
              scale(.94)
              translateY(25px);

          }

          to {

            opacity:
              1;

            transform:
              scale(1)
              translateY(0);

          }

        }


        @keyframes tagAppear {

          from {

            opacity:
              0;

            transform:
              translateY(10px)
              scale(.9);

          }

          to {

            opacity:
              1;

            transform:
              translateY(0)
              scale(1);

          }

        }


        /* =====================================
           RESPONSIVE
        ===================================== */

        @media(max-width:1100px) {

          .main-content {

            padding:
              35px;

          }


          .results-layout {

            grid-template-columns:
              1fr;

          }


          .left-column {

            position:
              static;

            display:
              grid;

            grid-template-columns:
              1fr 1fr;

          }

        }


        @media(max-width:800px) {

          .main-content {

            margin-left:
              0;

            width:
              100%;

            padding:
              30px 20px;

          }


          .page-header p {

            margin-left:
              0;

          }


          .left-column {

            grid-template-columns:
              1fr;

          }


          .overview-grid,
          .two-column {

            grid-template-columns:
              1fr;

          }

        }


        @media(max-width:600px) {

          .main-content {

            padding:
              25px 15px 90px;

          }


          .title-wrapper {

            align-items:
              flex-start;

          }


          .title-icon {

            width:
              50px;

            height:
              50px;

          }


          .page-header h1 {

            font-size:
              30px;

          }


          .upload-zone {

            min-height:
              370px;

            padding:
              25px 15px;

          }


          .upload-zone h2 {

            font-size:
              22px;

          }


          .upload-ring.ring-two {

            width:
              290px;

            height:
              290px;

          }


          .analysis-card,
          .strength-card,
          .weakness-card,
          .jobs-card {

            padding:
              22px;

          }


          .pdf-modal {

            padding:
              10px;

          }


          .pdf-window {

            height:
              95vh;

            border-radius:
              13px;

          }

        }

      `}</style>

    </div>
  );
}

export default ResumeUpload;