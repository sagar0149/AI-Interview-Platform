import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
      }}
    >
      <div
        style={{
          width: "420px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          AI Interview
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "20px",
            marginBottom: "40px",
          }}
        >
          Smart Resume Analysis & AI Mock Interviews
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "18px",
            borderRadius: "15px",
            border:
              "1px solid rgba(255,255,255,0.15)",
            background:
              "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "20px",
            borderRadius: "15px",
            border:
              "1px solid rgba(255,255,255,0.15)",
            background:
              "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "15px",
            background:
              "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "white",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
  style={{
    marginTop: "15px",
    textAlign: "center",
  }}
>
  <a
    href="/forgot-password"
    style={{
      color: "#60a5fa",
      textDecoration: "none",
    }}
  >
    Forgot Password?
  </a>
</p>

        <div
          style={{
            marginTop: "25px",
            color: "#e2e8f0",
            fontSize: "16px",
          }}
        >
          New User?{" "}
          <Link
            to="/register"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;