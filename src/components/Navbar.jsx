import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav>
      <h1 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "32px" }}>🧠</span>
        Yohan AI
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <div style={{ display: "flex", gap: "32px" }}>
          <a 
            href="/" 
            style={{
              color: isActive("/") ? "#ffffff" : "#c0c0c0",
              fontWeight: isActive("/") ? "600" : "500",
              textShadow: isActive("/") ? "0 0 10px rgba(138, 43, 226, 0.8)" : "none"
            }}
          >
            Home
          </a>
          <a 
            href="/flashcards"
            style={{
              color: isActive("/flashcards") ? "#ffffff" : "#c0c0c0",
              fontWeight: isActive("/flashcards") ? "600" : "500",
              textShadow: isActive("/flashcards") ? "0 0 10px rgba(138, 43, 226, 0.8)" : "none"
            }}
          >
            Flashcards
          </a>
          <a 
            href="/quiz"
            style={{
              color: isActive("/quiz") ? "#ffffff" : "#c0c0c0",
              fontWeight: isActive("/quiz") ? "600" : "500",
              textShadow: isActive("/quiz") ? "0 0 10px rgba(138, 43, 226, 0.8)" : "none"
            }}
          >
            Quiz
          </a>
          <a 
            href="/agent"
            style={{
              color: isActive("/agent") ? "#ffffff" : "#c0c0c0",
              fontWeight: isActive("/agent") ? "600" : "500",
              textShadow: isActive("/agent") ? "0 0 10px rgba(138, 43, 226, 0.8)" : "none"
            }}
          >
            AI Assistant
          </a>
        </div>

        <div style={{ 
          borderLeft: "1px solid rgba(138, 43, 226, 0.3)",
          paddingLeft: "32px",
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          {user ? (
            <>
              <span style={{ 
                color: "#b794f6", 
                fontSize: "14px",
                fontWeight: "600"
              }}>
                👤 {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 20px",
                  margin: "0",
                  fontSize: "14px",
                  background: "rgba(255, 0, 85, 0.2)",
                  border: "1px solid rgba(255, 0, 85, 0.3)"
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a 
                href="/login"
                style={{
                  color: "#c0c0c0",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
              >
                Login
              </a>
              <a 
                href="/register"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "8px 20px",
                  background: "linear-gradient(135deg, rgba(138, 43, 226, 0.6) 0%, rgba(0, 255, 255, 0.4) 100%)",
                  borderRadius: "8px",
                  border: "1px solid rgba(138, 43, 226, 0.3)"
                }}
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
