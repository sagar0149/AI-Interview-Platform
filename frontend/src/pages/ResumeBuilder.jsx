import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
// Swapped fa6 for fa to prevent version crashing
import {
  FaMagic,
  FaFilePdf,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "", github: "", linkedin: "",
    summary: "", experience: "", education: "", skills: "", projects: "",
    certifications: "", achievements: "", languages: "", interests: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAISummary = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/resume-builder/generate-summary",
        { skills: formData.skills, projects: formData.projects }
      );
      setFormData({ ...formData, summary: response.data.summary });
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/resume-builder/generate-pdf",
        formData,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${formData.name || "My"}_Resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderBulletList = (text) => {
    if (!text) return null;
    return (
      <ul style={{ margin: "10px 0", paddingLeft: "20px", color: "#334155" }}>
        {text.split("\n").filter((item) => item.trim() !== "").map((item, index) => (
          <li key={index} style={{ marginBottom: "6px", lineHeight: "1.6" }}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ fontSize: "42px", fontWeight: "900", margin: 0 }}>📄 AI Resume Builder</h1>
            <p style={{ color: "#94a3b8", marginTop: "10px", fontSize: "16px" }}>
              Fill out your details and let AI craft your perfect summary.
            </p>
          </div>

          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "14px 28px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)", border: "none",
              borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "16px",
              cursor: isDownloading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 25px -5px rgba(34,197,94,0.4)", opacity: isDownloading ? 0.7 : 1,
            }}
          >
            <FaFilePdf size={20} />
            {isDownloading ? "Generating PDF..." : "Download Resume PDF"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "30px", flex: 1, minHeight: 0 }}>
          {/* LEFT: FORM SECTION */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)", padding: "30px",
              borderRadius: "24px", overflowY: "auto",
            }}
          >
            <h2 style={{ fontSize: "20px", marginBottom: "25px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
              Personal Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <InputGroup icon={<FaUser />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
              <InputGroup icon={<FaEnvelope />} name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} />
              <InputGroup icon={<FaPhone />} name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
              <InputGroup icon={<FaMapMarkerAlt />} name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
              <InputGroup icon={<FaGithub />} name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} />
              <InputGroup icon={<FaLinkedin />} name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
            </div>

            <div style={{ marginTop: "35px", marginBottom: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
              <h2 style={{ fontSize: "20px", margin: 0 }}>Professional Summary</h2>
              <button
                onClick={generateAISummary}
                disabled={isGenerating}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px",
                  background: "rgba(139, 92, 246, 0.15)", border: "1px solid rgba(139, 92, 246, 0.5)",
                  borderRadius: "8px", color: "#c4b5fd", fontSize: "14px", fontWeight: "600",
                  cursor: isGenerating ? "not-allowed" : "pointer",
                }}
              >
                <FaMagic />
                {isGenerating ? "Generating..." : "AI Generate"}
              </button>
            </div>
            
            <TextAreaGroup name="summary" placeholder="Write or generate your professional summary..." value={formData.summary} onChange={handleChange} />

            <h2 style={{ fontSize: "20px", marginTop: "35px", marginBottom: "25px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>Details & Experience</h2>
            <TextAreaGroup name="experience" placeholder="Work Experience (use new lines for bullet points)" value={formData.experience} onChange={handleChange} />
            <TextAreaGroup name="education" placeholder="Education details..." value={formData.education} onChange={handleChange} />
            <TextAreaGroup name="skills" placeholder="Skills (use new lines for bullet points)" value={formData.skills} onChange={handleChange} />
            <TextAreaGroup name="projects" placeholder="Projects (use new lines for bullet points)" value={formData.projects} onChange={handleChange} />
            
            <h2 style={{ fontSize: "20px", marginTop: "35px", marginBottom: "25px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>Additional Info</h2>
            <TextAreaGroup name="certifications" placeholder="Certifications" value={formData.certifications} onChange={handleChange} />
            <TextAreaGroup name="achievements" placeholder="Achievements" value={formData.achievements} onChange={handleChange} />
            <TextAreaGroup name="languages" placeholder="Languages" value={formData.languages} onChange={handleChange} />
            <TextAreaGroup name="interests" placeholder="Interests" value={formData.interests} onChange={handleChange} />
          </div>

          {/* RIGHT: RESUME PREVIEW */}
          <div
            style={{
              background: "#ffffff", color: "#0f172a", padding: "50px", borderRadius: "8px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", overflowY: "auto",
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            <div style={{ textAlign: "center", borderBottom: "2px solid #cbd5e1", paddingBottom: "20px", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "36px", margin: "0 0 10px 0", textTransform: "uppercase" }}>{formData.name || "YOUR NAME"}</h1>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px", fontSize: "14px", color: "#475569" }}>
                {formData.email && <span>{formData.email}</span>}
                {formData.phone && <span>• {formData.phone}</span>}
                {formData.location && <span>• {formData.location}</span>}
              </div>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px", fontSize: "14px", color: "#475569", marginTop: "5px" }}>
                {formData.github && <span>GitHub: {formData.github}</span>}
                {formData.linkedin && <span>• LinkedIn: {formData.linkedin}</span>}
              </div>
            </div>

            {(formData.summary || !formData.name) && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>PROFESSIONAL SUMMARY</h2>
                <p style={{ lineHeight: "1.6", color: "#334155" }}>{formData.summary || "Your professional summary will appear here once generated or typed."}</p>
              </div>
            )}
            {(formData.experience || !formData.name) && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>WORK EXPERIENCE</h2>
                {formData.experience ? renderBulletList(formData.experience) : <p style={placeholderStyle}>Add your work experience...</p>}
              </div>
            )}
            {(formData.education || !formData.name) && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>EDUCATION</h2>
                <p style={{ lineHeight: "1.6", color: "#334155" }}>{formData.education || "Add your education details..."}</p>
              </div>
            )}
            {(formData.projects || !formData.name) && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>PROJECTS</h2>
                {formData.projects ? renderBulletList(formData.projects) : <p style={placeholderStyle}>Add your projects...</p>}
              </div>
            )}
            {(formData.skills || !formData.name) && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>SKILLS</h2>
                {formData.skills ? renderBulletList(formData.skills) : <p style={placeholderStyle}>Add your skills...</p>}
              </div>
            )}
            {formData.certifications && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>CERTIFICATIONS</h2>
                {renderBulletList(formData.certifications)}
              </div>
            )}
            {formData.achievements && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>ACHIEVEMENTS</h2>
                {renderBulletList(formData.achievements)}
              </div>
            )}
            {formData.languages && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>LANGUAGES</h2>
                {renderBulletList(formData.languages)}
              </div>
            )}
            {formData.interests && (
              <div style={{ marginBottom: "25px" }}>
                <h2 style={previewHeaderStyle}>INTERESTS</h2>
                {renderBulletList(formData.interests)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const previewHeaderStyle = { fontSize: "16px", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid #cbd5e1", paddingBottom: "5px", marginBottom: "10px", color: "#0f172a" };
const placeholderStyle = { color: "#94a3b8", fontStyle: "italic" };

function InputGroup({ icon, name, placeholder, type = "text", value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#64748b" }}>{icon}</div>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", padding: "14px 15px 14px 45px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", color: "white", outline: "none", fontSize: "14px", boxSizing: "border-box" }} />
    </div>
  );
}

function TextAreaGroup({ name, placeholder, value, onChange }) {
  return (
    <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", minHeight: "120px", padding: "15px", marginBottom: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", color: "white", outline: "none", fontSize: "14px", resize: "vertical", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }} />
  );
}

export default ResumeBuilder;