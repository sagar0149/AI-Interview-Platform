
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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

        {/* Authentication */}
        <Route
          path="/"
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

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Resume Builder */}
        <Route
          path="/resume-builder"
          element={<ResumeBuilder />}
        />

        {/* Resume Analyzer */}
        <Route
          path="/resume"
          element={<ResumeUpload />}
        />

        {/* Mock Interview */}
        <Route
          path="/interview"
          element={<Interview />}
        />

        {/* Voice Interview */}
        <Route
          path="/voice-interview"
          element={<VoiceInterview />}
        />

        {/* Video Interview */}
        <Route
          path="/video-interview"
          element={<VideoInterview />}
        />

        {/* History */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
