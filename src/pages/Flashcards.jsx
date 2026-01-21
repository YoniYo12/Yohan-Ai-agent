import { useState } from "react";

export default function Flashcards() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "16px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          📚 Flashcards
        </h1>

        <p style={{ 
          color: "#b0b0b0", 
          marginBottom: "40px",
          fontSize: "18px"
        }}>
          Enter a topic and let AI generate flashcards for you
        </p>

        <div style={{ 
          display: "flex", 
          gap: "16px", 
          justifyContent: "center",
          marginBottom: "60px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g. Python basics, World War II, Calculus..."
            style={{
              width: "400px",
              maxWidth: "100%"
            }}
          />

          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "✨ Generating..." : "Generate Flashcards"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                textAlign: "left",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ 
                fontSize: "14px", 
                color: "#60a5fa", 
                marginBottom: "12px",
                fontWeight: "600",
                letterSpacing: "1px"
              }}>
                CARD {index + 1}
              </div>
              <h3 style={{ 
                marginBottom: "16px", 
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "600",
                lineHeight: "1.4"
              }}>
                {card.question}
              </h3>
              <div style={{ 
                height: "1px", 
                background: "linear-gradient(90deg, rgba(59, 130, 246, 0.5), transparent)",
                marginBottom: "16px"
              }}></div>
              <p style={{ 
                color: "#b0b0b0",
                lineHeight: "1.6",
                fontSize: "15px"
              }}>
                {card.answer}
              </p>
            </div>
          ))}
        </div>

        {cards.length === 0 && !loading && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#808080"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px", opacity: 0.5 }}>🎴</div>
            <p style={{ fontSize: "18px" }}>No flashcards yet. Enter a topic to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
