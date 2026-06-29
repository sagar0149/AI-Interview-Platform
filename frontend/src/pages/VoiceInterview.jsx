import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Sidebar from "../components/Sidebar";
import AILoader from "../components/AILoader";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaMicrophone,
  FaStopCircle,
  FaVolumeUp,
  FaArrowRight,
  FaFilePdf,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";

function VoiceInterview() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // --- NEW LOGIC: Always start with Intro Questions ---
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("interviewQuestions") || "[]");
    
    // 1. Define your mandatory starting questions here
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
      // Fallback if they didn't upload a resume
      setQuestions([
        ...introQuestions,
        "What do you consider to be your greatest professional strength?",
        "Why are you interested in this specific career path?"
      ]);
    }
  }, []);

  const progressPercentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2>Browser does not support speech recognition. Please use Google Chrome.</h2>
      </div>
    );
  }

  const speakQuestion = () => {
    window.speechSynthesis.cancel(); 
    const speech = new SpeechSynthesisUtterance(questions[currentQuestion]);
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true, 
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const nextQuestion = async () => {
    if (!transcript.trim()) {
      alert("Please provide an answer before moving to the next question.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/interview/evaluate",
        {
          question: questions[currentQuestion],
          answer: transcript,
        }
      );

      setScore(response.data.score);
      setFeedback(response.data.evaluation);

      const updatedAnswers = [
        ...answers,
        {
          question: questions[currentQuestion],
          answer: transcript,
        },
      ];
      setAnswers(updatedAnswers);

      resetTranscript();

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert("Interview Completed! Check your final feedback below.");
      }
    } catch (error) {
      console.error(error);
      alert("Backend interview API not working. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); 
    doc.text("AI Interview Performance Report", 20, 20);

    doc.setFontSize(14);
    doc.setTextColor(22, 163, 74); 
    doc.text(`Latest Answer Score: ${score}/10`, 20, 35);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("AI Feedback:", 20, 50);

    const splitFeedback = doc.splitTextToSize(feedback || "No Feedback available.", 170);
    doc.text(splitFeedback, 20, 60);

    doc.save("Voice_Interview_Report.pdf");
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
            AI Voice Interview
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
            Listen to the question, speak your answer naturally, and receive instant AI grading.
          </p>
        </div>

        {questions.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
            
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "40px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "rgba(255,255,255,0.1)" }}>
                <div style={{ width: `${progressPercentage}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", transition: "width 0.4s ease" }} />
              </div>

              <div style={{ textAlign: "center", marginBottom: "30px", marginTop: "10px" }}>
                <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", padding: "8px 18px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              <h1 style={{ textAlign: "center", fontSize: "32px", lineHeight: "1.4", margin: "0 0 40px 0", color: "#f8fafc" }}>
                {questions[currentQuestion]}
              </h1>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "25px", marginBottom: "40px", flexWrap: "wrap" }}>
                <button
                  onClick={speakQuestion}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "16px 32px", border: "none", borderRadius: "50px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "white", fontWeight: "bold", fontSize: "16px", cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                >
                  <FaVolumeUp size={20} color="#60a5fa" /> Read Question
                </button>

                <button
                  onClick={startListening}
                  style={{
                    width: "85px", height: "85px", borderRadius: "50%", border: "none",
                    background: listening ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "white", fontSize: "32px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center",
                    boxShadow: listening ? "0 0 30px rgba(239, 68, 68, 0.6)" : "0 10px 25px -5px rgba(34, 197, 94, 0.5)",
                    animation: listening ? "pulse 1.5s infinite" : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaMicrophone />
                </button>

                <button
                  onClick={stopListening}
                  disabled={!listening}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "16px 32px", border: "none", borderRadius: "50px",
                    background: listening ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)", 
                    border: listening ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(255,255,255,0.1)",
                    color: listening ? "#fca5a5" : "#94a3b8", fontWeight: "bold", fontSize: "16px", 
                    cursor: listening ? "pointer" : "not-allowed", transition: "all 0.2s",
                  }}
                >
                  <FaStopCircle size={20} /> Stop Recording
                </button>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "16px", color: "#cbd5e1", margin: "0 0 10px 0" }}>Your Live Answer:</h3>
                <div
                  style={{
                    background: "rgba(0,0,0,0.2)", border: listening ? "1px solid rgba(96, 165, 250, 0.5)" : "1px solid rgba(255,255,255,0.1)",
                    padding: "25px", borderRadius: "16px", minHeight: "150px", color: transcript ? "white" : "#64748b",
                    fontSize: "16px", lineHeight: "1.8", transition: "all 0.3s ease",
                  }}
                >
                  {transcript || (listening ? "Listening... start speaking." : "Click the microphone button to start recording your answer.")}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  onClick={nextQuestion}
                  disabled={loading || !transcript.trim()}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "16px 40px", border: "none", borderRadius: "14px",
                    background: loading || !transcript.trim() ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: loading || !transcript.trim() ? "#64748b" : "white", fontWeight: "bold", fontSize: "16px",
                    cursor: loading || !transcript.trim() ? "not-allowed" : "pointer",
                    boxShadow: loading || !transcript.trim() ? "none" : "0 10px 25px -5px rgba(59,130,246,0.5)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {loading ? "Analyzing Answer..." : "Submit Answer & Continue"} 
                  {!loading && <FaArrowRight />}
                </button>
              </div>

              {loading && (
                <div style={{ marginTop: "30px" }}>
                  <AILoader text="AI is evaluating your response..." />
                </div>
              )}
            </div>

            {score !== null && !loading && (
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.01) 100%)",
                  backdropFilter: "blur(20px)", border: "1px solid rgba(34, 197, 94, 0.2)",
                  borderRadius: "24px", padding: "35px", animation: "fadeIn 0.5s ease-out",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
                  <h2 style={{ margin: 0, fontSize: "24px", color: "#86efac", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaCheckCircle /> Previous Answer Score: {score}/10
                  </h2>

                  <button
                    onClick={downloadReport}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "12px 24px", border: "none", borderRadius: "12px",
                      background: "rgba(34, 197, 94, 0.15)", color: "#4ade80",
                      fontWeight: "bold", cursor: "pointer", border: "1px solid rgba(34, 197, 94, 0.3)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(34, 197, 94, 0.25)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(34, 197, 94, 0.15)"}
                  >
                    <FaFilePdf size={18} /> Download Report
                  </button>
                </div>

                <div style={{ background: "rgba(0,0,0,0.2)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaRobot color="#a855f7" /> AI Feedback
                  </h3>
                  <p style={{ margin: 0, color: "#e2e8f0", whiteSpace: "pre-wrap", lineHeight: "1.8", fontSize: "15px" }}>
                    {feedback}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default VoiceInterview;