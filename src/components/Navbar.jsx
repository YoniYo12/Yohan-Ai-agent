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
            color: isActive("/") ? "#60a5fa" : "#e0e0e0",
            fontWeight: isActive("/") ? "600" : "500"
          }}
        >
          Home
        </a>
        <a 
          href="/flashcards"
          style={{
            color: isActive("/flashcards") ? "#60a5fa" : "#e0e0e0",
            fontWeight: isActive("/flashcards") ? "600" : "500"
          }}
        >
          Flashcards
        </a>
        <a 
          href="/quiz"
          style={{
            color: isActive("/quiz") ? "#60a5fa" : "#e0e0e0",
            fontWeight: isActive("/quiz") ? "600" : "500"
          }}
        >
          Quiz
        </a>
        <a 
          href="/agent"
          style={{
            color: isActive("/agent") ? "#60a5fa" : "#e0e0e0",
            fontWeight: isActive("/agent") ? "600" : "500"
          }}
        >
          AI Assistant
        </a>
      </div>
    </nav>
  );
}
