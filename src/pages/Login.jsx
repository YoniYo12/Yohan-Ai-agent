import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
        window.location.reload();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Could not connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ 
        maxWidth: "450px", 
        margin: "0 auto",
        animation: "fadeIn 0.5s ease-in"
      }}>
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "16px",
          fontWeight: "700",
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #b794f6 50%, #00ffff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🔐 Welcome Back
        </h1>

        <p style={{ 
          color: "#b0b0b0", 
          marginBottom: "40px",
          fontSize: "16px",
          textAlign: "center"
        }}>
          Login to continue your learning journey
        </p>

        <div className="card" style={{ padding: "40px" }}>
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{
                background: "rgba(255, 0, 85, 0.15)",
                border: "1px solid #ff0055",
                color: "#ff0055",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                textAlign: "center"
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px",
                color: "#e0e0e0",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px",
                color: "#e0e0e0",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                margin: "0"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={{ 
            marginTop: "24px", 
            textAlign: "center",
            color: "#b0b0b0"
          }}>
            Don't have an account?{" "}
            <a 
              href="/register" 
              style={{ 
                color: "#b794f6",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
