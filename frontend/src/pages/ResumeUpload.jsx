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

    setFile(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setAnalysis(null); // Clear previous analysis

      const response = await axios.post(
        "http://127.0.0.1:8000/resume/upload",
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
        
        // Save generated questions for the Mock Interview page
        localStorage.setItem(
          "interviewQuestions",
          JSON.stringify(response.data.questions || [])
        );
        console.log("Saved Questions:", response.data.questions);
      } else {
        console.log("Backend Error:", response.data);
        alert(response.data.message || "Resume analysis failed");
      }
    } catch (error) {
      console.error(error);
      alert("Resume analysis failed. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get dynamic color for ATS score
  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e"; // Green
    if (score >= 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "40px 60px",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "1400px",
        }}
      >
        {/* Loading Overlay */}
        {loading && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(5px)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <AILoader text="Analyzing Resume & Generating Custom Questions..." />
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "16px", color: "#60a5fa", display: "flex" }}>
              <FaFileAlt size={30} />
            </div>
            Resume Analyzer
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
            Upload your resume to get an ATS score, deep AI feedback, and generate custom interview questions.
          </p>
        </div>

        {/* Upload Zone */}
        {!analysis && (
          <label
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: isHovering ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border: isHovering ? "2px dashed rgba(96, 165, 250, 0.6)" : "2px dashed rgba(255,255,255,0.2)",
              borderRadius: "24px",
              padding: "60px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: isHovering ? "0 0 30px rgba(96, 165, 250, 0.1)" : "none",
              marginBottom: "40px",
            }}
          >
            <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "20px", borderRadius: "50%", marginBottom: "20px", color: "#60a5fa" }}>
              <FaCloudUploadAlt size={50} />
            </div>
            <h2 style={{ fontSize: "24px", margin: "0 0 10px 0", color: isHovering ? "#60a5fa" : "white", transition: "color 0.3s" }}>
              Click to Upload Resume
            </h2>
            <p style={{ color: "#94a3b8", margin: 0, fontSize: "15px" }}>Supports PDF files only (Max 5MB)</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              hidden
            />
          </label>
        )}

        {/* Results Grid */}
        {!loading && file && analysis && (
          <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px", alignItems: "start" }}>
            
            {/* LEFT COLUMN: File Info & ATS Score */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px", position: "sticky", top: "40px" }}>
              
              {/* ATS Score Card */}
              <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "35px 25px", textAlign: "center", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}>
                <h2 style={{ margin: "0 0 25px 0", fontSize: "20px", color: "#e2e8f0" }}>Overall ATS Score</h2>
                
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: "160px", height: "160px", borderRadius: "50%", background: `conic-gradient(${getScoreColor(analysis.ats_score)} ${analysis.ats_score}%, rgba(255,255,255,0.05) ${analysis.ats_score}%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: `0 0 40px ${getScoreColor(analysis.ats_score)}40` }}>
                    {/* Inner cutout to make it a ring */}
                    <div style={{ width: "135px", height: "135px", borderRadius: "50%", background: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "42px", fontWeight: "900", color: "white", lineHeight: "1" }}>
                        {analysis.ats_score || 0}<span style={{ fontSize: "24px", color: "#94a3b8" }}>%</span>
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: "20px", color: "#94a3b8", fontSize: "14px" }}>
                  {analysis.ats_score >= 80 ? "Excellent! Your resume is highly optimized." : analysis.ats_score >= 60 ? "Good, but there is room for improvement." : "Needs significant improvement to pass ATS."}
                </p>
              </div>

              {/* Uploaded File Card */}
              <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "25px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                  <div style={{ background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "12px", color: "#ef4444" }}>
                    <FaFilePdf size={28} />
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</h3>
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px" }}>{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    onClick={() => setShowResume(true)}
                    style={{ width: "100%", padding: "14px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", background: "transparent", color: "white", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={(e) => (e.target.style.background = "transparent")}
                  >
                    View PDF Document
                  </button>
                  <label style={{ width: "100%", padding: "14px", border: "none", borderRadius: "12px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", fontWeight: "600", cursor: "pointer", textAlign: "center", boxSizing: "border-box", transition: "transform 0.2s" }} onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}>
                    Upload New Resume
                    <input type="file" accept=".pdf" onChange={handleFileChange} hidden />
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Analysis Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* Summary */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "30px" }}>
                <h2 style={{ fontSize: "20px", margin: "0 0 20px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>Profile Overview</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <FaBriefcase size={20} color="#60a5fa" style={{ marginTop: "3px" }} />
                    <div>
                      <p style={{ margin: "0 0 5px 0", color: "#94a3b8", fontSize: "13px", fontWeight: "bold", textTransform: "uppercase" }}>Experience</p>
                      <p style={{ margin: 0, color: "#e2e8f0", lineHeight: "1.6" }}>{analysis.experience}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                    <FaGraduationCap size={22} color="#a78bfa" style={{ marginTop: "2px" }} />
                    <div>
                      <p style={{ margin: "0 0 5px 0", color: "#94a3b8", fontSize: "13px", fontWeight: "bold", textTransform: "uppercase" }}>Education</p>
                      <p style={{ margin: 0, color: "#e2e8f0", lineHeight: "1.6" }}>{analysis.education}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "30px" }}>
                <h2 style={{ fontSize: "20px", margin: "0 0 20px 0" }}>Detected Skills</h2>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {(analysis.skills || []).map((skill, index) => (
                    <span key={index} style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#93c5fd", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
                {/* Strengths */}
                <div style={{ background: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.2)", borderRadius: "24px", padding: "30px" }}>
                  <h2 style={{ fontSize: "18px", margin: "0 0 20px 0", color: "#4ade80", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaCheckCircle /> Strengths
                  </h2>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {(analysis.strengths || []).map((item, index) => (
                      <li key={index} style={{ color: "#e2e8f0", fontSize: "14.5px", lineHeight: "1.5", position: "relative", paddingLeft: "20px" }}>
                        <span style={{ position: "absolute", left: 0, top: "6px", width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "24px", padding: "30px" }}>
                  <h2 style={{ fontSize: "18px", margin: "0 0 20px 0", color: "#f87171", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaExclamationTriangle /> Areas for Improvement
                  </h2>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {(analysis.weaknesses || []).map((item, index) => (
                      <li key={index} style={{ color: "#e2e8f0", fontSize: "14.5px", lineHeight: "1.5", position: "relative", paddingLeft: "20px" }}>
                        <span style={{ position: "absolute", left: 0, top: "6px", width: "6px", height: "6px", background: "#f87171", borderRadius: "50%" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Jobs */}
              <div style={{ background: "linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%)", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "24px", padding: "30px" }}>
                <h2 style={{ fontSize: "20px", margin: "0 0 20px 0", color: "#c4b5fd" }}>Target Roles & Recommended Jobs</h2>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {(analysis.recommended_jobs || []).map((job, index) => (
                    <span key={index} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", padding: "10px 18px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", color: "white" }}>
                      {job}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Full-Screen PDF Modal */}
        {showResume && file && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "40px" }}>
            <div style={{ width: "100%", maxWidth: "1000px", height: "100%", background: "#1e293b", borderRadius: "20px", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              
              {/* Modal Header */}
              <div style={{ padding: "15px 25px", background: "rgba(0,0,0,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ margin: 0, fontSize: "16px", color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
                  <FaFilePdf color="#ef4444" /> {file.name}
                </h3>
                <button
                  onClick={() => setShowResume(false)}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* PDF iframe */}
              <iframe
                src={URL.createObjectURL(file)}
                style={{ width: "100%", height: "100%", border: "none", background: "white" }}
                title="Resume Viewer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;