
# 🚀 AI Interview Platform

### AI-Powered Interview Preparation Platform using React, FastAPI & Local AI

# 📖 About The Project

The **AI Interview Platform** is an intelligent web application designed to help students, fresh graduates, and professionals prepare for technical and HR interviews using Artificial Intelligence.

Unlike traditional interview platforms, this system performs AI processing **locally using Ollama**, ensuring complete privacy while delivering high-quality interview analysis.

The platform combines multiple interview preparation tools into one application, including:

- 📄 Resume Builder
- 📊 Resume Analyzer
- 🤖 AI Mock Interviews
- 🎥 Video Interviews
- 📈 Performance Analytics
- 📑 ATS Score Analysis
- 📃 PDF Report Generation

Whether you're preparing for campus placements or professional job interviews, this platform provides a complete AI-powered interview preparation experience.

---

# ✨ Features

## 🔐 Authentication Module

- User Registration
- Secure Login
- JWT Authentication
- Forgot Password
- Email OTP Verification
- Password Reset
- Profile Management

---

## 📄 Resume Builder

Create professional resumes with multiple sections including:

- Personal Information
- Education
- Skills
- Experience
- Projects
- Certifications
- Achievements

Export resumes directly as PDF.

---

## 📑 Resume Analyzer

Upload your resume and receive

- ATS Score
- Skills Analysis
- Missing Keywords
- Strength Analysis
- Weakness Analysis
- Improvement Suggestions
- Resume Summary

---

## 🤖 AI Mock Interview

The AI Interview module automatically generates interview questions based on:

- Resume
- Selected Domain
- Skills
- Experience Level

Features include

- Dynamic Question Generation
- Answer Evaluation
- AI Feedback
- Overall Score
- Improvement Suggestions
- PDF Interview Report

---

## 🎥 Video Interview

Practice interviews using webcam support.

Features include

- Live Camera Preview
- Question Display
- Answer Recording
- Practice Sessions
- Real Interview Experience

---

## 📊 Dashboard

A centralized dashboard providing

- ATS Score
- Interview Statistics
- Best Score
- Average Score
- Interview History
- Reports
- Analytics Charts

---

# 🚀 Why This Project?

Unlike many online interview systems that rely on cloud AI services, this project uses **Local AI (Ollama)**, allowing users to:

✅ Protect resume privacy

✅ Process data locally

✅ Reduce API costs

✅ Work without cloud dependency

✅ Get fast AI responses

---

# 🛠 Technology Stack

## 💻 Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| Vite | Build Tool |
| React Router | Routing |
| Axios | API Requests |
| React Icons | Icons |
| CSS | Styling |
| Recharts | Analytics Charts |

---

## ⚙ Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API |
| SQLAlchemy | ORM |
| SQLite | Database |
| Pydantic | Validation |
| Uvicorn | ASGI Server |
| Passlib | Password Hashing |
| Python-dotenv | Environment Variables |

---

## 🤖 Artificial Intelligence

| Technology | Purpose |
|------------|---------|
| Ollama | Local LLM |
| AI Prompt Engineering | Question Generation |
| Resume Parsing | Resume Analysis |
| ATS Scoring | Resume Evaluation |

---

# 🏗 System Architecture

```text
                     User
                      │
          ┌───────────▼───────────┐
          │     React Frontend    │
          └───────────┬───────────┘
                      │
                 Axios REST API
                      │
          ┌───────────▼───────────┐
          │    FastAPI Backend    │
          └───────┬───────┬───────┘
                  │       │
                  │       │
         ┌────────▼───┐   │
         │ Authentication│
         └────────┬────┘   │
                  │        │
        ┌─────────▼────────▼─────────┐
        │      AI Processing         │
        │     (Ollama Local LLM)     │
        └─────────┬────────▲─────────┘
                  │        │
          ┌───────▼────────┴───────┐
          │       SQLite DB        │
          └────────────────────────┘
```

---

# 📂 Project Structure

```text
AI_INTERVIEW_PLATFORM
│
├── backend
│   ├── app
│   │   ├── ai
│   │   ├── config
│   │   ├── core
│   │   ├── database
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── uploads
│   ├── generated_resumes
│   ├── video_uploads
│   ├── interview.db
│   ├── requirements.txt
│   ├── run.py
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── screenshots
│   ├── home.png
│   ├── login.png
│   ├── register.png
│   ├── analytics.png
│   ├── resume-builder.png
│   ├── resume-analysis.png
│   ├── mock-interview.png
│   ├── video-interview.png
│   ├── report.png
│   └── profile.png
│
└── README.md
```

---

---

# ⚙️ Installation Guide

Follow these steps to run the project locally.

## 📋 Prerequisites

Before starting, make sure the following software is installed on your system.

| Software | Version |
|----------|----------|
| Python | 3.10+ |
| Node.js | 18+ |
| npm | Latest |
| Git | Latest |
| Ollama | Latest |

---

## 📥 Clone Repository

```bash
git clone https://github.com/your-github-username/AI_Interview_Platform.git

cd AI_Interview_Platform
```

> Replace `your-github-username` with your actual GitHub username.

---

# 🖥 Backend Setup

Move into backend directory

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install required packages

```bash
pip install -r requirements.txt
```

Run backend server

```bash
python run.py
```

Backend Server

```text
http://127.0.0.1:8000
```

---

# 🌐 Frontend Setup

Move into frontend directory

```bash
cd ../frontend
```

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend Server

```text
http://localhost:5173
```

---

# 🤖 Install Ollama

Download Ollama from

https://ollama.com

Install a model

Example:

```bash
ollama pull llama3
```

or

```bash
ollama pull mistral
```

Verify installation

```bash
ollama list
```

Run Ollama

```bash
ollama serve
```

---

# 🔧 Environment Variables

Create a `.env` file inside the backend folder.

```env
# ============================
# Server Configuration
# ============================

HOST=127.0.0.1
PORT=8000

# ============================
# JWT Authentication
# ============================

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30

# ============================
# Database
# ============================

DATABASE_URL=sqlite:///./interview.db

# ============================
# Email Configuration
# ============================

MAIL_USERNAME=your_email@gmail.com

MAIL_PASSWORD=your_app_password

MAIL_FROM=your_email@gmail.com

MAIL_SERVER=smtp.gmail.com

MAIL_PORT=587
```

---

# 📡 API Documentation

The backend exposes REST APIs for Authentication, Resume Processing, AI Interviews and Dashboard.

---

# 🔐 Authentication APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User Login |
| POST | `/auth/forgot-password` | Send Email OTP |
| POST | `/auth/reset-password` | Reset Password |
| GET | `/auth/profile` | User Profile |
| PUT | `/auth/profile` | Update Profile |

---

# 📄 Resume APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/resume/upload` | Upload Resume |
| POST | `/resume/analyze` | Analyze Resume |
| POST | `/resume/build` | Build Resume |
| GET | `/resume/download/{id}` | Download PDF |
| DELETE | `/resume/delete/{id}` | Delete Resume |

---

# 🤖 Interview APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/interview/start` | Start Interview |
| POST | `/interview/generate` | Generate Questions |
| POST | `/interview/submit-answer` | Submit Answer |
| POST | `/interview/evaluate` | Evaluate Performance |
| GET | `/interview/history` | Interview History |
| GET | `/interview/report/{id}` | Download Report |

---

# 📊 Dashboard APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/dashboard/stats` | Dashboard Statistics |
| GET | `/dashboard/analytics` | Performance Analytics |
| GET | `/dashboard/reports` | Reports |
| GET | `/dashboard/history` | Complete History |

---

# 🔄 Application Workflow

```text
                  User
                    │
                    ▼
              User Login
                    │
                    ▼
          JWT Authentication
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 Resume Builder          Resume Upload
        │                       │
        ▼                       ▼
  PDF Generation         Resume Analysis
        │                       │
        └───────────┬───────────┘
                    ▼
           AI Interview Module
                    │
      Generate Questions (Ollama)
                    │
                    ▼
             User Answers
                    │
                    ▼
            AI Evaluation Engine
                    │
                    ▼
         Performance Analytics
                    │
                    ▼
            Dashboard & Reports
```

---

# 🔒 Security Features

Security is a major focus of this platform.

### Authentication

- JWT Authentication
- Token Verification
- Protected Routes
- Session Management

---

### Password Security

- Password Hashing
- Secure Password Storage
- Email OTP Verification
- Password Reset

---

### Database Security

- SQLAlchemy ORM
- Input Validation
- SQL Injection Protection
- Data Integrity

---

### API Security

- Request Validation
- Authentication Middleware
- Error Handling
- Secure API Responses

---

### User Privacy

One of the biggest advantages of this project is that **AI processing happens locally**.

This means:

- Resume data never leaves the user's computer.
- No third-party AI API is required.
- Faster response times.
- Better privacy and security.

---

## 📦 Python Dependencies

Major backend libraries include:

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- Passlib
- PyPDF
- ReportLab
- python-dotenv
- email-validator
- python-multipart
- bcrypt

---

## 📦 Frontend Dependencies

Major frontend libraries include:

- React
- Vite
- Axios
- React Router DOM
- React Icons
- Recharts

---

---

# 🤖 AI Features

The AI Interview Platform integrates **Local Large Language Models (LLMs)** through **Ollama** to deliver intelligent interview preparation while keeping all user data private.

---

## 🧠 Resume-Based Question Generation

Instead of asking generic interview questions, the platform analyzes the uploaded resume and generates personalized interview questions based on:

- Technical Skills
- Programming Languages
- Projects
- Experience
- Education
- Certifications

This creates a realistic interview experience tailored to each candidate.

---

## 📊 ATS Resume Analysis

The AI Resume Analyzer evaluates resumes using Applicant Tracking System (ATS) principles.

### It analyzes:

- Resume Structure
- Keyword Matching
- Skills Coverage
- Formatting
- Education
- Experience
- Projects
- Contact Information

### Generated Output

- ATS Score
- Missing Keywords
- Resume Strengths
- Resume Weaknesses
- Improvement Suggestions

---

## 🎤 AI Interview Evaluation

During interviews, the AI evaluates every answer and provides feedback based on:

- Technical Accuracy
- Communication Skills
- Confidence
- Completeness
- Problem Solving
- Clarity

The platform also generates an overall interview score.

---

## 📄 AI Report Generation

At the end of every interview, users receive a detailed PDF report containing:

- Candidate Information
- Interview Date
- Questions Asked
- Answers Submitted
- Individual Scores
- Overall Performance
- AI Suggestions
- Areas for Improvement

---

# 📊 Dashboard

The Dashboard serves as the central hub of the platform.

Users can monitor their complete interview preparation journey through interactive analytics.

---

## Dashboard Includes

### 📈 Performance Analytics

- Average Interview Score
- Highest Score
- Lowest Score
- Recent Interviews
- Total Interviews

---

### 📑 Resume Statistics

- ATS Score
- Resume Upload History
- Generated Resume Count

---

### 📋 Interview Reports

Users can download:

- Resume Reports
- Interview Reports
- Performance Reports

---

### 📊 Interactive Charts

Charts are built using **Recharts** and display:

- Interview Progress
- Performance Trends
- ATS Improvements
- Historical Results

---

# 📸 Application Screenshots

Below are the major screens of the application.

> **Note:** Place all images inside the `screenshots/` folder in the root directory.

---

## 🏠 Home Page

<p align="center">
<img src="screenshots/home.png" width="900">
</p>

---

## 🔐 Login & Registration

<table>
<tr>

<td align="center">

### Login

<img src="screenshots/login.png" width="420">

</td>

<td align="center">

### Register

<img src="screenshots/register.png" width="420">

</td>

</tr>
</table>

---

## 📄 Resume Builder & Resume Analyzer

<table>
<tr>

<td align="center">

### Resume Builder

<img src="screenshots/resume-builder.png" width="420">

</td>

<td align="center">

### Resume Analyzer

<img src="screenshots/resume-analysis.png" width="420">

</td>

</tr>
</table>

---

## 🤖 Mock Interview & Video Interview

<table>
<tr>

<td align="center">

### Mock Interview

<img src="screenshots/mock-interview.png" width="420">

</td>

<td align="center">

### Video Interview

<img src="screenshots/video-interview.png" width="420">

</td>

</tr>
</table>

---

## 📊 Analytics Dashboard

<p align="center">
<img src="screenshots/analytics.png" width="900">
</p>

---

## 👤 User Profile

<p align="center">
<img src="screenshots/profile.png" width="900">
</p>

---

## 📑 AI Generated Report

<p align="center">
<img src="screenshots/report.png" width="900">
</p>

---

# 📈 Performance Metrics

The platform continuously tracks candidate performance.

Metrics include:

- ATS Score
- Interview Score
- Total Interviews
- Best Performance
- Weak Areas
- Improvement Rate
- Skill Progress
- Report Downloads

---

# 🎯 Why Choose This Platform?

Unlike traditional interview preparation websites, this project offers:

✅ Local AI Processing

✅ No Paid API Required

✅ Resume-Based Interviews

✅ Privacy First

✅ Professional Resume Builder

✅ AI Resume Analysis

✅ Performance Dashboard

✅ Downloadable Reports

✅ Responsive UI

✅ FastAPI Backend

---

# 🚀 Future Scope

The project can be extended with several advanced features.

### Planned Features

- 🎙 Voice-Based Interviews
- 😀 Facial Emotion Detection
- 🌍 Multi-language Support
- ☁ Cloud Deployment
- 🐳 Docker Support
- 🗄 PostgreSQL Integration
- 📱 Mobile Application
- 👨‍💼 Recruiter Dashboard
- 📹 AI Video Analysis
- 📧 Email Interview Invitations
- 🔔 Notifications
- 📅 Interview Scheduling
- 📈 Advanced Analytics
- 🤝 Team Interview Mode
- 🏢 Company-Specific Interview Sets

---

# 💡 Learning Outcomes

This project demonstrates practical implementation of:

- Full Stack Web Development
- REST API Design
- Authentication
- AI Integration
- Local LLMs
- Database Design
- PDF Generation
- Resume Parsing
- Data Visualization
- Responsive UI Design
- Software Architecture
- Secure Development Practices

---

---

# 🤝 Contributing

Contributions are welcome and greatly appreciated!

If you'd like to improve this project, follow these steps:

### 1️⃣ Fork the Repository

Click the **Fork** button at the top-right of this repository.

---

### 2️⃣ Clone Your Fork

```bash
git clone https://github.com/your-github-username/AI_Interview_Platform.git
```

---

### 3️⃣ Create a New Branch

```bash
git checkout -b feature/YourFeature
```

---

### 4️⃣ Commit Changes

```bash
git add .

git commit -m "Added new feature"
```

---

### 5️⃣ Push Changes

```bash
git push origin feature/YourFeature
```

---

### 6️⃣ Create Pull Request

Open a Pull Request describing your changes.

---

# 👥 Contributors

<table>
<tr>

<td align="center">

<img src="https://avatars.githubusercontent.com/u/1?v=4" width="120"/>

### Sagar Raj Sharma

**Backend Development**

FastAPI • AI Integration • Database • Authentication

</td>

<td align="center">

<img src="https://avatars.githubusercontent.com/u/1?v=4" width="120"/>

### Shivam Vishwakarma

**Frontend Development**

React • UI Design • API Integration

</td>

<td align="center">

<img src="https://avatars.githubusercontent.com/u/1?v=4" width="120"/>

### Roshan Kushwaha

**Testing & Documentation**

Quality Assurance • Testing • Documentation

</td>

</tr>
</table>

> **Tip:** Replace the avatar images above with your GitHub profile images or team photos.

---

# 👨‍💻 Author


# Sagar Raj Sharma

### B.Tech Computer Science & Engineering

Passionate about

🤖 Artificial Intelligence

🌐 Full Stack Development

⚡ FastAPI

⚛ React

🐍 Python

📊 Data Analytics

🚀 Building Practical Software Solutions


---

## 🌐 Connect With Me

Replace these links with your own profiles.

```text
GitHub   : https://github.com/your-github-username

LinkedIn : https://linkedin.com/in/your-profile

Email    : your-email@example.com
```

---

# 📂 Repository Information

```text
Repository Name

AI_Interview_Platform

Language

Python
JavaScript
React
FastAPI

Database

SQLite

License

Copyright © 2026 Sagar Raj Sharma

Status

Active Development
```

---

# 📈 Project Statistics

| Module | Status |
|---------|--------|
| Authentication | ✅ Completed |
| Resume Builder | ✅ Completed |
| Resume Analyzer | ✅ Completed |
| ATS Score | ✅ Completed |
| AI Interview | ✅ Completed |
| Video Interview | ✅ Completed |
| Dashboard | ✅ Completed |
| PDF Report | ✅ Completed |
| Analytics | ✅ Completed |

---

# 🛣 Project Roadmap

## ✅ Completed

- User Authentication
- Resume Builder
- Resume Analysis
- ATS Score
- AI Interview
- Dashboard
- Reports
- Analytics
- Profile Management

---

## 🚀 Planned

- Voice Interview
- Facial Expression Analysis
- AI Speech Evaluation
- PostgreSQL Support
- Docker Deployment
- Kubernetes
- Multi-language Support
- Recruiter Dashboard
- Mobile Application
- Interview Scheduler
- Notification System

---

# 📜 Copyright

Copyright © 2026 **Sagar Raj Sharma**

All Rights Reserved.

This project was developed for **educational and portfolio purposes**.

No part of this repository may be copied, reproduced, modified, distributed, or published without prior written permission from the author.

You may view this repository for learning and demonstration purposes only.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ **Star** on GitHub.

It helps others discover the project and motivates future improvements.

---

# 🙏 Acknowledgements

Special thanks to the following technologies and open-source communities:

- ⚛ React Team
- ⚡ FastAPI Team
- 🤖 Ollama Team
- 🐍 Python Community
- 🗄 SQLAlchemy Developers
- 📊 Recharts
- 📄 ReportLab
- 🔐 Passlib
- 📑 Pydantic
- ❤️ Open Source Contributors

---


# 🌟 Thank You for Visiting 🌟

### If you like this project, don't forget to ⭐ Star the repository.

Made with ❤️ by **Sagar Raj Sharma**
