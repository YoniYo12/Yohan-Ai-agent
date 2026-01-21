export default function Home() {
  return (
    <div className="container">
      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto",
        animation: "fadeIn 1s ease-in"
      }}>
        <h1 style={{ 
          fontSize: "64px", 
          marginBottom: "24px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "2px"
        }}>
          Welcome to Yohan AI
        </h1>

        <p style={{ 
          maxWidth: "650px", 
          margin: "0 auto 60px", 
          fontSize: "20px", 
          color: "#b0b0b0",
          lineHeight: "1.8",
          fontWeight: "400"
        }}>
          Your AI-powered study companion. Generate flashcards, take quizzes,
          and learn any topic with intelligent AI assistance.
        </p>

        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginTop: "60px",
          maxWidth: "900px",
          margin: "60px auto 0"
        }}>
          <div 
            className="card"
            onClick={() => window.location.href = "/flashcards"}
            style={{ 
              cursor: "pointer",
              textAlign: "center",
              padding: "40px 30px"
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>📚</div>
            <h3 style={{ 
              fontSize: "24px", 
              marginBottom: "12px",
              color: "#ffffff",
              fontWeight: "600"
            }}>
              Flashcards
            </h3>
            <p style={{ color: "#a0a0a0", fontSize: "15px", lineHeight: "1.6" }}>
              Generate AI-powered flashcards on any topic to enhance your learning
            </p>
          </div>

          <div 
            className="card"
            onClick={() => window.location.href = "/quiz"}
            style={{ 
              cursor: "pointer",
              textAlign: "center",
              padding: "40px 30px"
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎯</div>
            <h3 style={{ 
              fontSize: "24px", 
              marginBottom: "12px",
              color: "#ffffff",
              fontWeight: "600"
            }}>
              Quiz
            </h3>
            <p style={{ color: "#a0a0a0", fontSize: "15px", lineHeight: "1.6" }}>
              Test your knowledge with automatically generated quizzes
            </p>
          </div>

          <div 
            className="card"
            onClick={() => window.location.href = "/agent"}
            style={{ 
              cursor: "pointer",
              textAlign: "center",
              padding: "40px 30px"
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🤖</div>
            <h3 style={{ 
              fontSize: "24px", 
              marginBottom: "12px",
              color: "#ffffff",
              fontWeight: "600"
            }}>
              AI Assistant
            </h3>
            <p style={{ color: "#a0a0a0", fontSize: "15px", lineHeight: "1.6" }}>
              Chat with your personal AI tutor for instant help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
