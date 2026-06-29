
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
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
          width: "450px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Join the AI Interview Platform
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "15px",
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
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "15px",
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
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "25px",
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
          onClick={handleRegister}
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
            boxShadow:
              "0px 10px 30px rgba(37,99,235,0.5)",
          }}
        >
          Create Account
        </button>

        <div
          style={{
            marginTop: "25px",
            color: "#e2e8f0",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
