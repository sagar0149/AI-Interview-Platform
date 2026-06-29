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

  // --- NEW LOGIC: Always start with Intro Questions ---
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("interviewQuestions") || "[]");
    
    // 1. Define mandatory starting questions
    const introQuestions = [
      "To start off, could you please tell me a little bit about yourself?",
      "Can you walk me through your past work experience and what you learned from it?"
    ];

    if (saved && saved.length > 0) {
      // 2. Filter out duplicates just in case the AI generated a similar intro question
      const technicalQuestions = saved.filter(q => 
        !q.toLowerCase().includes("tell me about yourself") &&
        !q.toLowerCase().includes("walk me through")
      );
      
      // 3. Combine them: Intros first, then technicals
      setQuestions([...introQuestions, ...technicalQuestions]);
    } else {
      // Fallback if they didn't upload a resume (Allows practice without a resume!)
      setQuestions([
        ...introQuestions,
        "What do you consider to be your greatest professional strength?",
        "Why are you interested in this specific career path?"
      ]);
    }
  }, []);

  const currentQuestion = questions.length > 0 ? questions[currentIndex] : "";
  const progressPercentage = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true, // Audio must be true to analyze the spoken answer
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setMessage("Camera activated. Ready to record.");
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Unable to access camera and microphone. Please check permissions.");
    }
  };

  const startRecording = () => {
    const stream = videoRef.current?.srcObject;
    if (!stream) {
      alert("Please start the camera first.");
      return;
    }

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.start();
    setRecording(true);
    setAnalysis(null);
    setMessage("🔴 Recording...");
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      try {
        setUploading(true);
        setMessage("🤖 Transcribing audio and analyzing behavior...");

        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const formData = new FormData();
        formData.append("file", blob, "interview.webm");
        formData.append("question", currentQuestion);

        const response = await axios.post(
          "http://127.0.0.1:8000/video/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setAnalysis(response.data.analysis);
        setMessage("✅ Analysis Complete!");
      } catch (error) {
        console.error(error);
        setMessage("❌ Upload or Evaluation Failed. Please try again.");
      } finally {
        setUploading(false);
        setRecording(false);
      }
    };
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnalysis(null);
      setMessage("");
    }
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
          padding: "40px",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "1400px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "16px", color: "#60a5fa", display: "flex" }}>
              <FaVideo size={30} />
            </div>
            Video Interview
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
            Record your answers on camera and receive AI-powered behavioral and content analysis.
          </p>
        </div>

        {questions.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
              border: "1px dashed rgba(255,255,255,0.2)", padding: "50px",
              borderRadius: "24px", textAlign: "center",
            }}
          >
            <FaExclamationTriangle size={40} color="#f59e0b" style={{ marginBottom: "20px" }} />
            <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>Loading Questions...</h2>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            
            {/* LEFT COLUMN: Question & Video Feed */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)", padding: "25px",
                  borderRadius: "24px", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "rgba(255,255,255,0.1)" }}>
                  <div style={{ width: `${progressPercentage}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", transition: "width 0.4s ease" }} />
                </div>
                <div style={{ marginBottom: "15px", marginTop: "10px" }}>
                  <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>
                <h3 style={{ fontSize: "20px", lineHeight: "1.5", fontWeight: "500", margin: 0 }}>
                  {currentQuestion}
                </h3>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)", padding: "25px",
                  borderRadius: "24px",
                }}
              >
                <div style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", background: "#000", aspectRatio: "16/9" }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transform: "scaleX(-1)", 
                      opacity: isCameraActive ? 1 : 0,
                    }}
                  />
                  {!isCameraActive && (
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                      <FaVideo size={40} />
                    </div>
                  )}
                  {recording && (
                    <div style={{ position: "absolute", top: "15px", right: "15px", background: "rgba(239, 68, 68, 0.8)", padding: "6px 12px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "bold", animation: "pulse 1.5s infinite" }}>
                      <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%" }} />
                      REC
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div style={{ display: "flex", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
                  {!isCameraActive ? (
                    <button
                      onClick={startCamera}
                      style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "white", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
                    >
                      <FaVideo /> Turn Camera On
                    </button>
                  ) : !recording ? (
                    <button
                      onClick={startRecording}
                      disabled={uploading}
                      style={{ flex: 1, padding: "14px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", borderRadius: "12px", color: "white", fontWeight: "600", cursor: uploading ? "not-allowed" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", opacity: uploading ? 0.5 : 1 }}
                    >
                      <FaPlayCircle size={18} /> Start Recording Answer
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "white", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
                    >
                      <FaStopCircle size={18} /> Stop & Submit Answer
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Feedback & Next Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {(message || uploading) && (
                <div style={{ background: uploading ? "rgba(59, 130, 246, 0.1)" : "rgba(34, 197, 94, 0.1)", border: uploading ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(34, 197, 94, 0.3)", padding: "20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "15px", color: uploading ? "#93c5fd" : "#86efac" }}>
                  {uploading ? <FaSpinner className="spin" size={24} /> : <FaCheckCircle size={24} />}
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>{message}</span>
                </div>
              )}

              {analysis && (
                <div style={{ background: "linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%)", backdropFilter: "blur(20px)", border: "1px solid rgba(139, 92, 246, 0.3)", padding: "30px", borderRadius: "24px", animation: "fadeIn 0.5s ease-out", maxHeight: "80vh", overflowY: "auto" }}>
                  <h2 style={{ fontSize: "20px", margin: "0 0 20px 0", color: "#c4b5fd", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaRobot size={24} /> Comprehensive AI Analysis
                  </h2>

                  {/* 1. CONTENT ANALYSIS SECTION (What they said) */}
                  {analysis.transcript && (
                    <div style={{ marginBottom: "20px", padding: "15px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "bold" }}>🗣️ What We Heard (Transcript)</p>
                      <p style={{ margin: 0, fontSize: "15px", color: "#e2e8f0", fontStyle: "italic", lineHeight: "1.6" }}>
                        "{analysis.transcript}"
                      </p>
                    </div>
                  )}

                  {analysis.answer_feedback && (
                    <div style={{ marginBottom: "25px", padding: "20px", background: "rgba(34, 197, 94, 0.1)", borderRadius: "16px", borderLeft: "4px solid #22c55e" }}>
                      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#4ade80" }}>💡 Answer Quality Feedback</h3>
                      <p style={{ margin: 0, lineHeight: "1.6", color: "#e2e8f0", fontSize: "15px" }}>{analysis.answer_feedback}</p>
                    </div>
                  )}

                  <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "25px 0" }} />

                  {/* 2. BEHAVIORAL ANALYSIS SECTION (How they acted) */}
                  <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#cbd5e1" }}>👁️ Behavioral Metrics</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                    <StatCard title="Confidence Score" value={analysis.confidence_score ? `${analysis.confidence_score}%` : "N/A"} />
                    <StatCard title="Eye Contact" value={analysis.eye_contact || "N/A"} />
                    <StatCard title="Facial Expression" value={analysis.facial_expression || "N/A"} />
                    <StatCard title="Body Language" value={analysis.body_language || "N/A"} />
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 5px 0" }}>Vocal Delivery</p>
                    <p style={{ margin: 0, fontSize: "15px", color: "white", lineHeight: "1.5" }}>{analysis.speaking_confidence || "N/A"}</p>
                  </div>

                  {analysis.recommendation && (
                    <div style={{ marginTop: "20px", padding: "20px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "16px", borderLeft: "4px solid #3b82f6" }}>
                      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#60a5fa" }}>Overall Recommendation</h3>
                      <p style={{ margin: 0, lineHeight: "1.6", color: "#e2e8f0", fontSize: "15px" }}>{analysis.recommendation}</p>
                    </div>
                  )}

                  {/* Next Question Button */}
                  <button
                    onClick={nextQuestion}
                    disabled={currentIndex >= questions.length - 1}
                    style={{ width: "100%", marginTop: "25px", padding: "16px", background: currentIndex >= questions.length - 1 ? "rgba(255,255,255,0.05)" : "#2563eb", border: "none", borderRadius: "12px", color: currentIndex >= questions.length - 1 ? "#64748b" : "white", fontWeight: "bold", fontSize: "16px", cursor: currentIndex >= questions.length - 1 ? "not-allowed" : "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", transition: "0.2s" }}
                  >
                    {currentIndex >= questions.length - 1 ? "Interview Complete" : "Move to Next Question"}
                    {currentIndex < questions.length - 1 && <FaArrowRight />}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Custom Scrollbar for Analysis pane */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
      <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#94a3b8" }}>{title}</p>
      <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "white" }}>{value}</p>
    </div>
  );
}

export default VideoInterview;