import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <h1 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "32px" }}>🧠</span>
        Yohan AI
      </h1>

      <div>
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
    </nav>
  );
}
