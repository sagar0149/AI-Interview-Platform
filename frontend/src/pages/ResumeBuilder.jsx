import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

import {
  FaMagic,
  FaFilePdf,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaSparkles,
} from "react-icons/fa";

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    projects: "",
    certifications: "",
    achievements: "",
    languages: "",
    interests: "",
  });

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isDownloading, setIsDownloading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================================
     AI SUMMARY
  ========================================= */

  const generateAISummary = async () => {
    if (!formData.skills.trim() && !formData.projects.trim()) {
      alert(
        "Please enter your skills or projects first."
      );
      return;
    }

    try {
      setIsGenerating(true);

      const response = await axios.post(
        "/api/resume-builder/generate-summary",
        {
          skills: formData.skills,
          projects: formData.projects,
        }
      );

      setFormData({
        ...formData,
        summary: response.data.summary,
      });
    } catch (error) {
      console.error(error);

      alert(
        "Failed to generate AI summary. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* =========================================
     PDF DOWNLOAD
  ========================================= */

  const downloadPDF = async () => {
    if (!formData.name.trim()) {
      alert("Please enter your name first.");
      return;
    }

    try {
      setIsDownloading(true);

      const response = await axios.post(
        "/api/resume-builder/generate-pdf",
        formData,
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `${formData.name || "My"}_Resume.pdf`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to generate PDF. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  /* =========================================
     BULLET LIST
  ========================================= */

  const renderBulletList = (text) => {
    if (!text) return null;

    return (
      <ul
        style={{
          margin: "10px 0",
          paddingLeft: "20px",
          color: "#334155",
        }}
      >
        {text
          .split("\n")
          .filter(
            (item) => item.trim() !== ""
          )
          .map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: "6px",
                lineHeight: "1.6",
              }}
            >
              {item}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div
      className="resume-builder-page"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020707 0%,#061316 45%,#071c22 100%)",
        color: "white",
        fontFamily:
          "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =========================================
          ANIMATIONS
      ========================================= */}

      <style>
        {`

        @keyframes floatGlowOne {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(60px,40px) scale(1.1);
          }
        }

        @keyframes floatGlowTwo {
          0%,100% {
            transform: translate(0,0);
          }

          50% {
            transform: translate(-50px,-40px);
          }
        }

        @keyframes pulseGlow {
          0%,100% {
            opacity:.12;
            transform:scale(1);
          }

          50% {
            opacity:.35;
            transform:scale(1.25);
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
          }

          to {
            opacity:1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position:-300px 0;
          }

          100% {
            background-position:300px 0;
          }
        }

        @keyframes spin {
          from {
            transform:rotate(0deg);
          }

          to {
            transform:rotate(360deg);
          }
        }

        @keyframes aiPulse {
          0%,100% {
            box-shadow:
              0 0 0 rgba(34,211,238,0);
          }

          50% {
            box-shadow:
              0 0 35px rgba(34,211,238,.25);
          }
        }

        .resume-glass {
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .resume-glass:hover {
          border-color:
            rgba(34,211,238,.18) !important;

          box-shadow:
            0 25px 60px rgba(0,0,0,.3),
            0 0 40px rgba(34,211,238,.04);
        }

        .resume-input {
          transition:
            border-color .25s ease,
            background .25s ease,
            box-shadow .25s ease,
            transform .25s ease;
        }

        .resume-input:focus {
          border-color:
            rgba(34,211,238,.55) !important;

          background:
            rgba(0,0,0,.35) !important;

          box-shadow:
            0 0 20px rgba(34,211,238,.08);

          outline:none;
        }

        .ai-button {
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .ai-button:hover:not(:disabled) {
          transform:translateY(-3px);

          box-shadow:
            0 12px 30px rgba(139,92,246,.25);
        }

        .pdf-button {
          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .pdf-button:hover:not(:disabled) {
          transform:translateY(-3px);

          box-shadow:
            0 15px 35px rgba(34,211,238,.25);
        }

        .preview-paper {
          transition:
            transform .4s ease,
            box-shadow .4s ease;
        }

        .preview-paper:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 35px 80px rgba(0,0,0,.5);
        }

        @media(max-width:1000px) {
          .resume-main-grid {
            grid-template-columns:1fr !important;
          }

          .resume-preview {
            min-height:900px;
          }
        }

        @media(max-width:700px) {
          .resume-content {
            margin-left:0 !important;
            padding:25px !important;
          }

          .resume-header {
            flex-direction:column !important;
            align-items:flex-start !important;
          }

          .resume-title {
            font-size:36px !important;
          }
        }

        `}
      </style>

      {/* =========================================
          AMBIENT BACKGROUND
      ========================================= */}

      <div
        style={{
          position: "fixed",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,220,200,.12),transparent 70%)",
          top: "-250px",
          left: "300px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatGlowOne 13s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)",
          right: "-250px",
          bottom: "-200px",
          filter: "blur(10px)",
          pointerEvents: "none",
          animation:
            "floatGlowTwo 15s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,211,238,.15),transparent 70%)",
          right: "30%",
          top: "40%",
          pointerEvents: "none",
          animation:
            "pulseGlow 8s ease-in-out infinite",
        }}
      />

      <Sidebar />

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div
        className="resume-content"
        style={{
          marginLeft: "260px",
          padding: "45px 50px",
          position: "relative",
          zIndex: 2,
          boxSizing: "border-box",
        }}
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="resume-header"
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "25px",
            marginBottom: "35px",
            animation:
              "fadeUp .7s ease forwards",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "30px",
                background:
                  "rgba(34,211,238,.06)",
                border:
                  "1px solid rgba(34,211,238,.15)",
                color: "#67e8f9",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              <FaSparkles />

              AI RESUME STUDIO
            </div>

            <h1
              className="resume-title"
              style={{
                fontSize: "48px",
                fontWeight: "900",
                margin: "0 0 10px",
                letterSpacing: "-1.5px",
                background:
                  "linear-gradient(90deg,#ffffff,#67e8f9,#60a5fa)",
                WebkitBackgroundClip:
                  "text",
                WebkitTextFillColor:
                  "transparent",
              }}
            >
              AI Resume Builder
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "15px",
                margin: 0,
                lineHeight: "1.7",
              }}
            >
              Build a professional resume
              and let AI help you create a
              powerful career summary.
            </p>
          </div>

          {/* PDF BUTTON */}

          <button
            className="pdf-button"
            onClick={downloadPDF}
            disabled={isDownloading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding:
                "14px 22px",
              background:
                "linear-gradient(135deg,#0891b2,#2563eb)",
              border: "none",
              borderRadius: "13px",
              color: "white",
              fontWeight: "700",
              fontSize: "14px",
              cursor: isDownloading
                ? "not-allowed"
                : "pointer",
              opacity: isDownloading
                ? .7
                : 1,
              boxShadow:
                "0 10px 30px rgba(8,145,178,.2)",
              whiteSpace:
                "nowrap",
            }}
          >
            <FaFilePdf size={18} />

            {isDownloading
              ? "Generating..."
              : "Download PDF"}
          </button>
        </div>

        {/* =========================================
            MAIN GRID
        ========================================= */}

        <div
          className="resume-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(420px,1fr) minmax(500px,1.2fr)",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* =====================================
              LEFT FORM
          ===================================== */}

          <div
            className="resume-glass"
            style={{
              background:
                "linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.015))",
              backdropFilter:
                "blur(25px)",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "25px",
              padding: "30px",
              animation:
                "fadeUp .9s ease forwards",
            }}
          >
            {/* Personal */}

            <SectionTitle>
              <FaUser color="#22d3ee" />
              Personal Information
            </SectionTitle>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "15px",
              }}
            >
              <InputGroup
                icon={<FaUser />}
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputGroup
                icon={<FaEnvelope />}
                name="email"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputGroup
                icon={<FaPhone />}
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputGroup
                icon={<FaMapMarkerAlt />}
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />

              <InputGroup
                icon={<FaGithub />}
                name="github"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={handleChange}
              />

              <InputGroup
                icon={<FaLinkedin />}
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            {/* Summary */}

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: "15px",
                  borderBottom:
                    "1px solid rgba(255,255,255,.08)",
                  paddingBottom: "15px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    fontSize: "19px",
                    margin: 0,
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "9px",
                  }}
                >
                  <FaMagic color="#a78bfa" />

                  Professional Summary
                </h2>

                <button
                  className="ai-button"
                  onClick={
                    generateAISummary
                  }
                  disabled={
                    isGenerating
                  }
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "8px",
                    padding:
                      "9px 15px",
                    background:
                      "rgba(139,92,246,.1)",
                    border:
                      "1px solid rgba(139,92,246,.35)",
                    borderRadius:
                      "10px",
                    color: "#c4b5fd",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor:
                      isGenerating
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      isGenerating
                        ? .6
                        : 1,
                  }}
                >
                  {isGenerating ? (
                    <span
                      style={{
                        width: "13px",
                        height: "13px",
                        border:
                          "2px solid rgba(255,255,255,.3)",
                        borderTop:
                          "2px solid #c4b5fd",
                        borderRadius:
                          "50%",
                        animation:
                          "spin .8s linear infinite",
                      }}
                    />
                  ) : (
                    <FaMagic />
                  )}

                  {isGenerating
                    ? "Generating..."
                    : "AI Generate"}
                </button>
              </div>

              <TextAreaGroup
                name="summary"
                placeholder="Write your professional summary or let AI generate one..."
                value={
                  formData.summary
                }
                onChange={
                  handleChange
                }
              />
            </div>

            {/* Details */}

            <SectionTitle
              marginTop="30px"
            >
              <FaUser color="#60a5fa" />
              Details & Experience
            </SectionTitle>

            <TextAreaGroup
              name="experience"
              placeholder="Work Experience — use new lines for bullet points"
              value={
                formData.experience
              }
              onChange={
                handleChange
              }
            />

            <TextAreaGroup
              name="education"
              placeholder="Education details..."
              value={
                formData.education
              }
              onChange={
                handleChange
              }
            />

            <TextAreaGroup
              name="skills"
              placeholder="Skills — use new lines for bullet points"
              value={
                formData.skills
              }
              onChange={
                handleChange
              }
            />

            <TextAreaGroup
              name="projects"
              placeholder="Projects — use new lines for bullet points"
              value={
                formData.projects
              }
              onChange={
                handleChange
              }
            />

            {/* Additional */}

            <SectionTitle
              marginTop="30px"
            >
              <FaSparkles color="#22d3ee" />
              Additional Information
            </SectionTitle>

            <TextAreaGroup
              name="certifications"
              placeholder="Certifications"
              value={
                formData.certifications
              }
              onChange={
                handleChange
              }
            />

            <TextAreaGroup
              name="achievements"
              placeholder="Achievements"
              value={
                formData.achievements
              }
              onChange={
                handleChange
              }
            />

            <TextAreaGroup
              name="languages"
              placeholder="Languages"
              value={
                formData.languages
              }
              onChange={
                handleChange
              }
            />

            <TextAreaGroup
              name="interests"
              placeholder="Interests"
              value={
                formData.interests
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* =====================================
              RIGHT RESUME PREVIEW
          ===================================== */}

          <div
            style={{
              animation:
                "fadeUp 1.1s ease forwards",
              position:
                "sticky",
              top: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "12px",
                padding:
                  "0 5px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  letterSpacing:
                    "1px",
                  fontWeight: "700",
                }}
              >
                LIVE PREVIEW
              </span>

              <span
                style={{
                  fontSize: "11px",
                  color: "#22d3ee",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background:
                      "#22d3ee",
                    borderRadius:
                      "50%",
                    boxShadow:
                      "0 0 10px #22d3ee",
                  }}
                />

                LIVE
              </span>
            </div>

            <div
              className="preview-paper"
              style={{
                background:
                  "#ffffff",
                color: "#0f172a",
                padding: "50px",
                borderRadius: "8px",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,.45)",
                overflowY:
                  "auto",
                minHeight:
                  "900px",
                fontFamily:
                  "'Times New Roman',Times,serif",
              }}
            >
              {/* Resume Header */}

              <div
                style={{
                  textAlign:
                    "center",
                  borderBottom:
                    "2px solid #cbd5e1",
                  paddingBottom:
                    "20px",
                  marginBottom:
                    "20px",
                }}
              >
                <h1
                  style={{
                    fontSize:
                      "36px",
                    margin:
                      "0 0 10px",
                    textTransform:
                      "uppercase",
                  }}
                >
                  {formData.name ||
                    "YOUR NAME"}
                </h1>

                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "center",
                    flexWrap:
                      "wrap",
                    gap: "15px",
                    fontSize:
                      "14px",
                    color:
                      "#475569",
                  }}
                >
                  {formData.email && (
                    <span>
                      {
                        formData.email
                      }
                    </span>
                  )}

                  {formData.phone && (
                    <span>
                      •{" "}
                      {
                        formData.phone
                      }
                    </span>
                  )}

                  {formData.location && (
                    <span>
                      •{" "}
                      {
                        formData.location
                      }
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "center",
                    flexWrap:
                      "wrap",
                    gap: "15px",
                    fontSize:
                      "14px",
                    color:
                      "#475569",
                    marginTop:
                      "5px",
                  }}
                >
                  {formData.github && (
                    <span>
                      GitHub:{" "}
                      {
                        formData.github
                      }
                    </span>
                  )}

                  {formData.linkedin && (
                    <span>
                      • LinkedIn:{" "}
                      {
                        formData.linkedin
                      }
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}

              {(formData.summary ||
                !formData.name) && (
                <PreviewSection
                  title="PROFESSIONAL SUMMARY"
                >
                  <p
                    style={{
                      lineHeight:
                        "1.6",
                      color:
                        "#334155",
                    }}
                  >
                    {formData.summary ||
                      "Your professional summary will appear here once generated or typed."}
                  </p>
                </PreviewSection>
              )}

              {/* Experience */}

              {(formData.experience ||
                !formData.name) && (
                <PreviewSection
                  title="WORK EXPERIENCE"
                >
                  {formData.experience
                    ? renderBulletList(
                        formData.experience
                      )
                    : (
                      <p
                        style={
                          placeholderStyle
                        }
                      >
                        Add your work
                        experience...
                      </p>
                    )}
                </PreviewSection>
              )}

              {/* Education */}

              {(formData.education ||
                !formData.name) && (
                <PreviewSection
                  title="EDUCATION"
                >
                  <p
                    style={{
                      lineHeight:
                        "1.6",
                      color:
                        "#334155",
                    }}
                  >
                    {formData.education ||
                      "Add your education details..."}
                  </p>
                </PreviewSection>
              )}

              {/* Projects */}

              {(formData.projects ||
                !formData.name) && (
                <PreviewSection
                  title="PROJECTS"
                >
                  {formData.projects
                    ? renderBulletList(
                        formData.projects
                      )
                    : (
                      <p
                        style={
                          placeholderStyle
                        }
                      >
                        Add your
                        projects...
                      </p>
                    )}
                </PreviewSection>
              )}

              {/* Skills */}

              {(formData.skills ||
                !formData.name) && (
                <PreviewSection
                  title="SKILLS"
                >
                  {formData.skills
                    ? renderBulletList(
                        formData.skills
                      )
                    : (
                      <p
                        style={
                          placeholderStyle
                        }
                      >
                        Add your
                        skills...
                      </p>
                    )}
                </PreviewSection>
              )}

              {/* Certifications */}

              {formData.certifications && (
                <PreviewSection
                  title="CERTIFICATIONS"
                >
                  {renderBulletList(
                    formData.certifications
                  )}
                </PreviewSection>
              )}

              {/* Achievements */}

              {formData.achievements && (
                <PreviewSection
                  title="ACHIEVEMENTS"
                >
                  {renderBulletList(
                    formData.achievements
                  )}
                </PreviewSection>
              )}

              {/* Languages */}

              {formData.languages && (
                <PreviewSection
                  title="LANGUAGES"
                >
                  {renderBulletList(
                    formData.languages
                  )}
                </PreviewSection>
              )}

              {/* Interests */}

              {formData.interests && (
                <PreviewSection
                  title="INTERESTS"
                >
                  {renderBulletList(
                    formData.interests
                  )}
                </PreviewSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   SECTION TITLE
========================================= */

function SectionTitle({
  children,
  marginTop = "0px",
}) {
  return (
    <div
      style={{
        marginTop,
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "9px",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
        paddingBottom: "15px",
      }}
    >
      <h2
        style={{
          fontSize: "19px",
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "9px",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

/* =========================================
   INPUT
========================================= */

function InputGroup({
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div
      style={{
        position:
          "relative",
      }}
    >
      <div
        style={{
          position:
            "absolute",
          top: "50%",
          left: "15px",
          transform:
            "translateY(-50%)",
          color: "#64748b",
          zIndex: 2,
        }}
      >
        {icon}
      </div>

      <input
        className="resume-input"
        type={type}
        name={name}
        placeholder={
          placeholder
        }
        value={value}
        onChange={
          onChange
        }
        style={{
          width: "100%",
          padding:
            "14px 15px 14px 45px",
          borderRadius:
            "12px",
          border:
            "1px solid rgba(255,255,255,.08)",
          background:
            "rgba(0,0,0,.2)",
          color: "white",
          outline: "none",
          fontSize: "14px",
          boxSizing:
            "border-box",
        }}
      />
    </div>
  );
}

/* =========================================
   TEXTAREA
========================================= */

function TextAreaGroup({
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <textarea
      className="resume-input"
      name={name}
      placeholder={
        placeholder
      }
      value={value}
      onChange={
        onChange
      }
      style={{
        width: "100%",
        minHeight:
          "115px",
        padding: "15px",
        marginBottom:
          "18px",
        borderRadius:
          "12px",
        border:
          "1px solid rgba(255,255,255,.08)",
        background:
          "rgba(0,0,0,.2)",
        color: "white",
        outline: "none",
        fontSize: "14px",
        resize:
          "vertical",
        boxSizing:
          "border-box",
        fontFamily:
          "'Inter',sans-serif",
        lineHeight:
          "1.6",
      }}
    />
  );
}

/* =========================================
   PREVIEW SECTION
========================================= */

function PreviewSection({
  title,
  children,
}) {
  return (
    <div
      style={{
        marginBottom:
          "25px",
      }}
    >
      <h2
        style={{
          fontSize:
            "16px",
          fontWeight:
            "bold",
          textTransform:
            "uppercase",
          borderBottom:
            "1px solid #cbd5e1",
          paddingBottom:
            "5px",
          marginBottom:
            "10px",
          color:
            "#0f172a",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

const placeholderStyle = {
  color: "#94a3b8",
  fontStyle:
    "italic",
};

export default ResumeBuilder;