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
  FaExclamationTriangle 
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

  const currentQuestion = questions.length > 0 ? questions[currentIndex] : "";
  const progressPercentage = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

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
      alert("Please enter your answer before evaluating.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/interview/evaluate",
        {
          question: currentQuestion,
          answer,
        }
      );
      setEvaluation(response.data.evaluation);
    } catch (error) {
      console.error(error);
      alert("Evaluation failed. Please try again.");
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
        "http://127.0.0.1:8000/interview/report",
        {
          question: currentQuestion,
          answer,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Interview_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Failed to download report");
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
          padding: "40px 60px",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: "1200px",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "16px", color: "#60a5fa", display: "flex" }}>
              <FaMicrophone size={30} />
            </div>
            AI Mock Interview
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
            Practice your answers and get real-time feedback based on your resume.
          </p>
        </div>

        {questions.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              border: "1px dashed rgba(255,255,255,0.2)",
              padding: "50px",
              borderRadius: "24px",
              textAlign: "center",
            }}
          >
            <FaExclamationTriangle size={40} color="#f59e0b" style={{ marginBottom: "20px" }} />
            <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>No Questions Found</h2>
            <p style={{ color: "#94a3b8", fontSize: "16px" }}>
              Please upload and analyze your resume first to generate custom interview questions.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Question Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "30px",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
              }}
            >
              {/* Progress Bar Background */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "rgba(255,255,255,0.1)" }}>
                {/* Active Progress */}
                <div style={{ width: `${progressPercentage}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", transition: "width 0.4s ease" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", marginTop: "10px" }}>
                <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              <h3 style={{ fontSize: "22px", lineHeight: "1.6", fontWeight: "500", margin: 0, color: "#f8fafc" }}>
                {currentQuestion}
              </h3>
            </div>

            {/* Answer Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "30px",
                borderRadius: "24px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
              }}
            >
              <h2 style={{ fontSize: "18px", margin: "0 0 20px 0", color: "#cbd5e1" }}>Your Answer</h2>

              <textarea
                rows="8"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your response here. Be as detailed as you would in a real interview..."
                style={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.2)",
                  color: "white",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.background = "rgba(0,0,0,0.4)";
                  e.target.style.borderColor = "rgba(96, 165, 250, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.background = "rgba(0,0,0,0.2)";
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />

              {/* Action Buttons */}
              <div style={{ marginTop: "25px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <button
                  onClick={evaluateAnswer}
                  disabled={loading || !answer.trim()}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                    background: loading || !answer.trim() ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: loading || !answer.trim() ? "#94a3b8" : "white",
                    border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600",
                    cursor: loading || !answer.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: loading || !answer.trim() ? "none" : "0 8px 20px -5px rgba(34,197,94,0.4)",
                  }}
                  onMouseEnter={(e) => { if (!loading && answer.trim()) e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { if (!loading && answer.trim()) e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <FaPaperPlane />
                  {loading ? "Analyzing..." : "Evaluate Answer"}
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={currentIndex >= questions.length - 1}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                    background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.4)",
                    color: currentIndex >= questions.length - 1 ? "#64748b" : "#60a5fa",
                    borderRadius: "12px", fontSize: "16px", fontWeight: "600",
                    cursor: currentIndex >= questions.length - 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease", opacity: currentIndex >= questions.length - 1 ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => { if (currentIndex < questions.length - 1) e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)"; }}
                  onMouseLeave={(e) => { if (currentIndex < questions.length - 1) e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"; }}
                >
                  Next Question <FaArrowRight />
                </button>

                <button
                  onClick={downloadReport}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "14px 28px", marginLeft: "auto",
                    background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                    color: "white", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <FaFilePdf /> Download PDF
                </button>
              </div>
            </div>

            {loading && (
              <div style={{ padding: "20px 0" }}>
                <AILoader text="AI is evaluating your response..." />
              </div>
            )}

            {/* Evaluation Feedback */}
            {evaluation && !loading && (
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  padding: "30px",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                <h2 style={{ fontSize: "20px", margin: "0 0 15px 0", color: "#c4b5fd", display: "flex", alignItems: "center", gap: "10px" }}>
                  <FaRobot size={24} /> AI Feedback
                </h2>
                <div
                  style={{
                    color: "#f8fafc",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.8",
                    fontSize: "15.5px",
                  }}
                >
                  {evaluation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;