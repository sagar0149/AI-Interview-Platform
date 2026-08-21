import React, { useState } from "react";
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
} from "react-icons/fa";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setAnalysis(null);

      const response = await axios.post(
        "/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("FULL RESPONSE:", response.data);

      if (response.data.success && response.data.analysis) {
        setAnalysis(response.data.analysis);

        localStorage.setItem(
          "interviewQuestions",
          JSON.stringify(response.data.questions || [])
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
      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Resume analysis failed. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) {
      return "Excellent! Your resume is highly optimized.";
    }

    if (score >= 60) {
      return "Good score, but there is room for improvement.";
    }

    return "Your resume needs significant improvement.";
  };

  return (
    <div className="resume-page">

      {/* ================================
          ANIMATED BACKGROUND
      ================================= */}

      <div className="background-animation">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="glow glow-three"></div>

        {[...Array(35)].map((_, index) => (
          <span
            key={index}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <Sidebar />

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <div className="main-content">

        {/* ================================
            LOADING OVERLAY
        ================================= */}

        {loading && (
          <div className="loading-overlay">
            <div className="loader-container">
              <AILoader
                text="Analyzing Resume & Generating Custom Questions..."
              />
            </div>
          </div>
        )}

        {/* ================================
            HEADER
        ================================= */}

        <div className="page-header fade-up">

          <div>

            <div className="title-wrapper">

              <div className="title-icon">
                <FaFileAlt size={30} />
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

        {/* ================================
            UPLOAD SECTION
        ================================= */}

        {!analysis && (

          <label
            className={`upload-zone ${
              isHovering ? "upload-hover" : ""
            } fade-up`}

            onMouseEnter={() =>
              setIsHovering(true)
            }

            onMouseLeave={() =>
              setIsHovering(false)
            }
          >

            <div className="upload-glow"></div>

            <div className="upload-icon">

              <FaCloudUploadAlt size={55} />

            </div>

            <h2>
              {isHovering
                ? "Drop Your Resume Here"
                : "Upload Your Resume"}
            </h2>

            <p>
              Click anywhere to select your resume
            </p>

            <span className="upload-format">
              PDF files only • Maximum 5MB
            </span>

            <div className="upload-button">

              <FaCloudUploadAlt />

              Choose PDF

            </div>

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              hidden
            />

          </label>

        )}

        {/* ================================
            RESULTS
        ================================= */}

        {!loading &&
          file &&
          analysis && (

            <div className="results-layout">

              {/* ================================
                  LEFT COLUMN
              ================================= */}

              <div className="left-column">

                {/* ATS SCORE */}

                <div className="glass-card score-card fade-up">

                  <div className="card-top-line"></div>

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
                            rgba(255,255,255,0.06)
                            ${analysis.ats_score}%
                          )`,
                        boxShadow:
                          `0 0 50px
                          ${getScoreColor(
                            analysis.ats_score
                          )}45`,
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
                      <FaFilePdf size={28} />
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
                        accept=".pdf"
                        onChange={handleFileChange}
                        hidden
                      />

                    </label>

                  </div>

                </div>

              </div>

              {/* ================================
                  RIGHT COLUMN
              ================================= */}

              <div className="right-column">

                {/* PROFILE OVERVIEW */}

                <div className="glass-card analysis-card fade-up">

                  <div className="section-heading">

                    <div className="heading-icon blue">
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

                      <div className="overview-icon blue-text">
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

                      <div className="overview-icon purple-text">
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
                      .map((skill, index) => (

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

                      ))}

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
                        .map((item, index) => (

                          <li key={index}>

                            <span className="success-dot"></span>

                            {item}

                          </li>

                        ))}

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
                        .map((item, index) => (

                          <li key={index}>

                            <span className="danger-dot"></span>

                            {item}

                          </li>

                        ))}

                    </ul>

                  </div>

                </div>

                {/* RECOMMENDED JOBS */}

                <div className="glass-card jobs-card fade-up">

                  <div className="jobs-header">

                    <div className="heading-icon purple">
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
                      .map((job, index) => (

                        <span
                          key={index}
                          className="job-tag"
                        >
                          {job}
                        </span>

                      ))}

                  </div>

                </div>

              </div>

            </div>

          )}

        {/* ================================
            PDF MODAL
        ================================= */}

        {showResume && file && (

          <div className="pdf-modal">

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
                src={URL.createObjectURL(file)}
                title="Resume Viewer"
                className="pdf-viewer"
              />

            </div>

          </div>

        )}

      </div>

      {/* ================================
          PAGE CSS
      ================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .resume-page {

          min-height: 100vh;

          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(37,99,235,.15),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #020617 0%,
              #0f172a 50%,
              #172554 100%
            );

          color: white;

          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          display: flex;

          position: relative;

          overflow-x: hidden;

        }

        /* ==========================
           BACKGROUND
        ========================== */

        .background-animation {

          position: fixed;

          inset: 0;

          overflow: hidden;

          pointer-events: none;

          z-index: 0;

        }

        .glow {

          position: absolute;

          border-radius: 50%;

          filter: blur(100px);

          opacity: .22;

          animation:
            floatingGlow 14s
            ease-in-out
            infinite;

        }

        .glow-one {

          width: 450px;
          height: 450px;

          background: #2563eb;

          top: -180px;
          left: -100px;

        }

        .glow-two {

          width: 400px;
          height: 400px;

          background: #7c3aed;

          right: -150px;
          bottom: -100px;

          animation-delay: 4s;

        }

        .glow-three {

          width: 300px;
          height: 300px;

          background: #06b6d4;

          left: 50%;
          top: 45%;

          animation-delay: 8s;

        }

        .particle {

          position: absolute;

          bottom: -20px;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: #60a5fa;

          opacity: .45;

          animation:
            particleRise
            linear
            infinite;

        }

        /* ==========================
           MAIN
        ========================== */

        .main-content {

          margin-left: 260px;

          padding: 45px 55px;

          width: calc(100% - 260px);

          max-width: 1500px;

          position: relative;

          z-index: 2;

        }

        /* ==========================
           HEADER
        ========================== */

        .page-header {

          margin-bottom: 45px;

        }

        .title-wrapper {

          display: flex;

          align-items: center;

          gap: 18px;

        }

        .title-icon {

          width: 62px;
          height: 62px;

          border-radius: 18px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #60a5fa;

          background:
            linear-gradient(
              135deg,
              rgba(59,130,246,.2),
              rgba(139,92,246,.12)
            );

          border:
            1px solid
            rgba(96,165,250,.3);

          box-shadow:
            0 0 30px
            rgba(59,130,246,.18);

          animation:
            iconPulse
            3s
            ease-in-out
            infinite;

        }

        .page-header h1 {

          margin: 0;

          font-size: 44px;

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

        .title-line {

          height: 3px;

          width: 85px;

          margin-top: 8px;

          border-radius: 10px;

          background:
            linear-gradient(
              90deg,
              #3b82f6,
              #8b5cf6
            );

          box-shadow:
            0 0 15px
            rgba(96,165,250,.5);

        }

        .page-header p {

          color: #94a3b8;

          font-size: 16px;

          margin:
            18px
            0
            0
            80px;

          line-height: 1.7;

        }

        /* ==========================
           UPLOAD
        ========================== */

        .upload-zone {

          min-height: 410px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          position: relative;

          overflow: hidden;

          cursor: pointer;

          text-align: center;

          border:
            2px dashed
            rgba(255,255,255,.15);

          border-radius: 30px;

          background:
            rgba(255,255,255,.035);

          backdrop-filter:
            blur(25px);

          transition:
            .4s ease;

          margin-bottom: 40px;

        }

        .upload-zone::before {

          content: "";

          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              circle at center,
              rgba(59,130,246,.13),
              transparent 60%
            );

          opacity: .7;

        }

        .upload-zone:hover {

          transform:
            translateY(-6px);

          border-color:
            rgba(96,165,250,.7);

          box-shadow:
            0 0 50px
            rgba(59,130,246,.18);

        }

        .upload-icon {

          width: 100px;
          height: 100px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #60a5fa;

          background:
            radial-gradient(
              circle,
              rgba(59,130,246,.2),
              rgba(59,130,246,.03)
            );

          border:
            1px solid
            rgba(96,165,250,.25);

          box-shadow:
            0 0 40px
            rgba(59,130,246,.18);

          animation:
            uploadFloat
            3s
            ease-in-out
            infinite;

          position: relative;

          z-index: 1;

        }

        .upload-zone h2 {

          font-size: 27px;

          margin:
            25px
            0
            8px;

          position: relative;

          z-index: 1;

        }

        .upload-zone p {

          color: #cbd5e1;

          margin: 0;

          position: relative;

          z-index: 1;

        }

        .upload-format {

          color: #64748b;

          font-size: 13px;

          margin-top: 8px;

          position: relative;

          z-index: 1;

        }

        .upload-button {

          margin-top: 25px;

          padding:
            13px
            24px;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              #3b82f6,
              #6366f1
            );

          display: flex;

          align-items: center;

          gap: 9px;

          font-weight: 600;

          box-shadow:
            0 10px 30px
            rgba(59,130,246,.25);

          position: relative;

          z-index: 1;

        }

        /* ==========================
           RESULTS
        ========================== */

        .results-layout {

          display: grid;

          grid-template-columns:
            350px
            minmax(0, 1fr);

          gap: 30px;

          align-items: start;

        }

        .left-column {

          display: flex;

          flex-direction: column;

          gap: 25px;

          position: sticky;

          top: 30px;

        }

        .right-column {

          display: flex;

          flex-direction: column;

          gap: 25px;

          min-width: 0;

        }

        /* ==========================
           GLASS CARD
        ========================== */

        .glass-card {

          position: relative;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.065),
              rgba(255,255,255,.018)
            );

          backdrop-filter:
            blur(24px);

          border:
            1px solid
            rgba(255,255,255,.08);

          border-radius: 24px;

          box-shadow:
            0 15px 40px
            rgba(0,0,0,.25);

          transition:
            transform .35s ease,
            border .35s ease,
            box-shadow .35s ease;

        }

        .glass-card:hover {

          transform:
            translateY(-5px);

          border-color:
            rgba(96,165,250,.28);

          box-shadow:
            0 20px 50px
            rgba(37,99,235,.13);

        }

        .card-top-line {

          height: 3px;

          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          background:
            linear-gradient(
              90deg,
              #3b82f6,
              #8b5cf6,
              #06b6d4
            );

        }

        /* ==========================
           SCORE
        ========================== */

        .score-card {

          padding:
            32px
            25px;

          text-align: center;

        }

        .card-heading {

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 8px;

          color: #60a5fa;

          font-size: 13px;

          font-weight: 700;

          text-transform:
            uppercase;

          letter-spacing: 1px;

          margin-bottom: 20px;

        }

        .score-card h2 {

          font-size: 19px;

          margin-bottom: 28px;

        }

        .score-wrapper {

          display: flex;

          justify-content: center;

        }

        .score-ring {

          width: 185px;
          height: 185px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          animation:
            scorePulse
            3s
            ease-in-out
            infinite;

          transition: .5s;

        }

        .score-inner {

          width: 155px;
          height: 155px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #172554,
              #0f172a
            );

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(255,255,255,.08);

        }

        .score-number {

          font-size: 47px;

          font-weight: 900;

          line-height: 1;

        }

        .score-percent {

          color: #94a3b8;

          font-size: 20px;

        }

        .score-label {

          color: #64748b;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 2px;

          margin-top: 5px;

        }

        .score-message {

          color: #94a3b8;

          font-size: 13px;

          line-height: 1.6;

          margin:
            20px
            0
            0;

        }

        /* ==========================
           FILE
        ========================== */

        .file-card {

          padding: 25px;

        }

        .file-header {

          display: flex;

          align-items: center;

          gap: 15px;

          margin-bottom: 22px;

        }

        .pdf-icon {

          width: 52px;
          height: 52px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #f87171;

          background:
            rgba(239,68,68,.1);

          border:
            1px solid
            rgba(239,68,68,.2);

        }

        .file-details {

          min-width: 0;

        }

        .file-details h3 {

          margin: 0 0 5px;

          font-size: 15px;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;

        }

        .file-details p {

          margin: 0;

          color: #64748b;

          font-size: 12px;

        }

        .file-actions {

          display: flex;

          flex-direction: column;

          gap: 10px;

        }

        .secondary-button,
        .primary-button {

          width: 100%;

          min-height: 48px;

          border-radius: 12px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: .3s ease;

        }

        .secondary-button {

          background:
            rgba(255,255,255,.025);

          color: white;

          border:
            1px solid
            rgba(255,255,255,.15);

        }

        .secondary-button:hover {

          background:
            rgba(255,255,255,.08);

          border-color:
            rgba(96,165,250,.4);

          transform:
            translateY(-2px);

        }

        .primary-button {

          background:
            linear-gradient(
              135deg,
              #3b82f6,
              #6366f1
            );

          box-shadow:
            0 8px 25px
            rgba(59,130,246,.25);

        }

        .primary-button:hover {

          transform:
            translateY(-3px);

          box-shadow:
            0 12px 35px
            rgba(59,130,246,.4);

        }

        /* ==========================
           SECTION
        ========================== */

        .analysis-card {

          padding: 30px;

        }

        .section-heading {

          display: flex;

          align-items: center;

          gap: 14px;

          margin-bottom: 25px;

        }

        .section-heading h2 {

          margin: 0;

          font-size: 19px;

        }

        .section-heading p {

          margin: 5px 0 0;

          color: #64748b;

          font-size: 12px;

        }

        .heading-icon {

          width: 45px;
          height: 45px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 13px;

        }

        .heading-icon.blue {

          color: #60a5fa;

          background:
            rgba(59,130,246,.12);

        }

        .heading-icon.cyan {

          color: #22d3ee;

          background:
            rgba(6,182,212,.12);

        }

        .heading-icon.purple {

          color: #c4b5fd;

          background:
            rgba(139,92,246,.12);

        }

        .overview-grid {

          display: grid;

          grid-template-columns:
            1fr
            1fr;

          gap: 20px;

        }

        .overview-item {

          display: flex;

          gap: 15px;

          padding: 18px;

          border-radius: 15px;

          background:
            rgba(255,255,255,.025);

          border:
            1px solid
            rgba(255,255,255,.05);

        }

        .overview-icon {

          font-size: 21px;

          margin-top: 2px;

        }

        .blue-text {
          color: #60a5fa;
        }

        .purple-text {
          color: #a78bfa;
        }

        .overview-item span {

          color: #64748b;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1px;

        }

        .overview-item p {

          color: #e2e8f0;

          font-size: 14px;

          line-height: 1.6;

          margin:
            6px
            0
            0;

        }

        /* ==========================
           SKILLS
        ========================== */

        .skills-container {

          display: flex;

          gap: 10px;

          flex-wrap: wrap;

        }

        .skill-tag {

          padding:
            9px
            16px;

          border-radius: 20px;

          color: #93c5fd;

          background:
            rgba(59,130,246,.08);

          border:
            1px solid
            rgba(59,130,246,.25);

          font-size: 13px;

          font-weight: 600;

          animation:
            tagAppear
            .5s
            ease
            both;

          transition: .25s;

        }

        .skill-tag:hover {

          transform:
            translateY(-3px)
            scale(1.03);

          background:
            rgba(59,130,246,.17);

          box-shadow:
            0 0 18px
            rgba(59,130,246,.15);

        }

        .empty-text {

          color: #64748b;

        }

        /* ==========================
           STRENGTHS
        ========================== */

        .two-column {

          display: grid;

          grid-template-columns:
            1fr
            1fr;

          gap: 25px;

        }

        .strength-card,
        .weakness-card {

          padding: 28px;

        }

        .strength-card {

          background:
            linear-gradient(
              145deg,
              rgba(34,197,94,.08),
              rgba(34,197,94,.015)
            );

          border-color:
            rgba(34,197,94,.18);

        }

        .weakness-card {

          background:
            linear-gradient(
              145deg,
              rgba(239,68,68,.08),
              rgba(239,68,68,.015)
            );

          border-color:
            rgba(239,68,68,.18);

        }

        .strength-heading,
        .weakness-heading {

          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 20px;

        }

        .strength-heading h2,
        .weakness-heading h2 {

          margin: 0;

          font-size: 18px;

        }

        .strength-heading {

          color: #4ade80;

        }

        .weakness-heading {

          color: #f87171;

        }

        .success-icon,
        .danger-icon {

          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 10px;

        }

        .success-icon {

          background:
            rgba(34,197,94,.12);

        }

        .danger-icon {

          background:
            rgba(239,68,68,.12);

        }

        .strength-card ul,
        .weakness-card ul {

          padding: 0;

          margin: 0;

          list-style: none;

          display: flex;

          flex-direction: column;

          gap: 13px;

        }

        .strength-card li,
        .weakness-card li {

          color: #e2e8f0;

          font-size: 13.5px;

          line-height: 1.6;

          display: flex;

          align-items: flex-start;

          gap: 10px;

        }

        .success-dot,
        .danger-dot {

          width: 7px;
          height: 7px;

          border-radius: 50%;

          flex-shrink: 0;

          margin-top: 8px;

        }

        .success-dot {

          background: #4ade80;

          box-shadow:
            0 0 10px
            rgba(74,222,128,.6);

        }

        .danger-dot {

          background: #f87171;

          box-shadow:
            0 0 10px
            rgba(248,113,113,.6);

        }

        /* ==========================
           JOBS
        ========================== */

        .jobs-card {

          padding: 30px;

          background:
            linear-gradient(
              145deg,
              rgba(139,92,246,.1),
              rgba(139,92,246,.015)
            );

          border-color:
            rgba(139,92,246,.2);

        }

        .jobs-header {

          display: flex;

          align-items: center;

          gap: 14px;

          margin-bottom: 22px;

        }

        .jobs-header h2 {

          margin: 0;

          font-size: 20px;

          color: #ddd6fe;

        }

        .jobs-header p {

          margin: 5px 0 0;

          color: #64748b;

          font-size: 12px;

        }

        .jobs-container {

          display: flex;

          gap: 12px;

          flex-wrap: wrap;

        }

        .job-tag {

          padding:
            11px
            18px;

          border-radius: 12px;

          background:
            rgba(0,0,0,.25);

          border:
            1px solid
            rgba(255,255,255,.08);

          color: #f8fafc;

          font-size: 13px;

          font-weight: 600;

          transition: .3s ease;

        }

        .job-tag:hover {

          transform:
            translateY(-3px);

          border-color:
            rgba(167,139,250,.5);

          box-shadow:
            0 0 20px
            rgba(139,92,246,.15);

        }

        /* ==========================
           LOADING
        ========================== */

        .loading-overlay {

          position: fixed;

          inset: 0;

          z-index: 5000;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            rgba(2,6,23,.82);

          backdrop-filter:
            blur(15px);

        }

        .loader-container {

          animation:
            loaderAppear
            .5s
            ease;

        }

        /* ==========================
           PDF MODAL
        ========================== */

        .pdf-modal {

          position: fixed;

          inset: 0;

          z-index: 9999;

          padding: 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            rgba(2,6,23,.88);

          backdrop-filter:
            blur(14px);

          animation:
            fadeIn
            .3s
            ease;

        }

        .pdf-window {

          width: 100%;

          max-width: 1100px;

          height: 92vh;

          display: flex;

          flex-direction: column;

          overflow: hidden;

          background:
            #0f172a;

          border:
            1px solid
            rgba(255,255,255,.1);

          border-radius: 20px;

          box-shadow:
            0 30px 80px
            rgba(0,0,0,.6);

          animation:
            modalOpen
            .4s
            ease;

        }

        .pdf-header {

          height: 65px;

          padding:
            0
            20px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid
            rgba(255,255,255,.07);

          background:
            rgba(0,0,0,.2);

        }

        .pdf-title {

          display: flex;

          align-items: center;

          gap: 10px;

          min-width: 0;

          color: white;

        }

        .pdf-title svg {

          color: #ef4444;

          flex-shrink: 0;

        }

        .pdf-title span {

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;

        }

        .close-button {

          width: 40px;
          height: 40px;

          border: none;

          border-radius: 10px;

          background:
            transparent;

          color: #94a3b8;

          display: flex;

          align-items: center;
          justify-content: center;

          cursor: pointer;

          transition: .25s;

        }

        .close-button:hover {

          color: white;

          background:
            rgba(239,68,68,.15);

          transform:
            rotate(90deg);

        }

        .pdf-viewer {

          width: 100%;

          flex: 1;

          border: none;

          background: white;

        }

        /* ==========================
           ANIMATIONS
        ========================== */

        .fade-up {

          animation:
            fadeUp
            .7s
            ease
            both;

        }

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

        @keyframes floatingGlow {

          0%,100% {

            transform:
              translate3d(0,0,0)
              scale(1);

          }

          50% {

            transform:
              translate3d(35px,-35px,0)
              scale(1.08);

          }

        }

        @keyframes particleRise {

          0% {

            transform:
              translateY(0);

            opacity: 0;

          }

          20% {

            opacity: .5;

          }

          100% {

            transform:
              translateY(-110vh);

            opacity: 0;

          }

        }

        @keyframes iconPulse {

          0%,100% {

            transform:
              scale(1);

          }

          50% {

            transform:
              scale(1.05);

          }

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

        @keyframes tagAppear {

          from {

            opacity: 0;

            transform:
              translateY(10px)
              scale(.9);

          }

          to {

            opacity: 1;

            transform:
              translateY(0)
              scale(1);

          }

        }

        @keyframes loaderAppear {

          from {

            opacity: 0;

            transform:
              scale(.9);

          }

          to {

            opacity: 1;

            transform:
              scale(1);

          }

        }

        @keyframes fadeIn {

          from {

            opacity: 0;

          }

          to {

            opacity: 1;

          }

        }

        @keyframes modalOpen {

          from {

            opacity: 0;

            transform:
              scale(.94)
              translateY(20px);

          }

          to {

            opacity: 1;

            transform:
              scale(1)
              translateY(0);

          }

        }

        /* ==========================
           RESPONSIVE
        ========================== */

        @media (max-width: 1100px) {

          .main-content {

            padding:
              35px;

          }

          .results-layout {

            grid-template-columns:
              1fr;

          }

          .left-column {

            position: static;

            display: grid;

            grid-template-columns:
              1fr
              1fr;

          }

        }

        @media (max-width: 800px) {

          .main-content {

            margin-left: 0;

            width: 100%;

            padding:
              30px
              20px;

          }

          .page-header h1 {

            font-size: 34px;

          }

          .page-header p {

            margin-left: 0;

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

        @media (max-width: 600px) {

          .main-content {

            padding:
              25px
              15px;

          }

          .page-header h1 {

            font-size: 29px;

          }

          .title-icon {

            width: 52px;
            height: 52px;

          }

          .upload-zone {

            min-height: 350px;

            padding:
              25px;

          }

          .upload-zone h2 {

            font-size: 22px;

          }

          .analysis-card,
          .strength-card,
          .weakness-card,
          .jobs-card {

            padding: 22px;

          }

          .pdf-modal {

            padding: 10px;

          }

          .pdf-window {

            height: 95vh;

            border-radius: 12px;

          }

        }

      `}</style>

    </div>
  );
}

export default ResumeUpload;