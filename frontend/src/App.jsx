import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Interview from "./pages/Interview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import VoiceInterview from "./pages/VoiceInterview";
import VideoInterview from "./pages/VideoInterview";
import ResumeBuilder from "./pages/ResumeBuilder";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            HOME PAGE
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================================
            AUTHENTICATION
        ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* =========================================
            DASHBOARD
        ========================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =========================================
            PROFILE
        ========================================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =========================================
            RESUME
        ========================================= */}

        <Route
          path="/resume-builder"
          element={<ResumeBuilder />}
        />

        <Route
          path="/resume"
          element={<ResumeUpload />}
        />

        {/* =========================================
            INTERVIEWS
        ========================================= */}

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/voice-interview"
          element={<VoiceInterview />}
        />

        <Route
          path="/video-interview"
          element={<VideoInterview />}
        />

        {/* =========================================
            HISTORY
        ========================================= */}

        <Route
          path="/history"
          element={<History />}
        />

        {/* =========================================
            ANALYTICS
        ========================================= */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* =========================================
            REPORTS
        ========================================= */}

        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* =========================================
            FALLBACK
        ========================================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;