import { useState } from "react";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const fetchQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setQuiz([]);
    setSelectedAnswers({});
    setScore(0);
    setSubmitted(false);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/quiz", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      console.log("QUIZ RECEIVED:", data);
      setQuiz(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }

    setLoading(false);
  };

  const selectAnswer = (qIndex, letter) => {
    if (submitted) return;

    setSelectedAnswers((prev) => {
      const updated = { ...prev, [qIndex]: letter };
      console.log("Selected:", updated);
      return updated;
    });
  };

  const submitQuiz = () => {
    let newScore = 0;

    quiz.forEach((q, index) => {
      const selected = selectedAnswers[index];
      if (selected && selected === q.answer) {
        newScore++;
      }
    });

    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "16px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #ffffff 0%, #b794f6 50%, #00ffff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🎯 Quiz Generator
        </h1>

        <p style={{ 
          color: "#b0b0b0", 
          marginBottom: "40px",
          fontSize: "18px"
        }}>
          Test your knowledge with AI-generated quizzes
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
            onKeyPress={(e) => e.key === "Enter" && fetchQuiz()}
            placeholder="e.g. React hooks, Biology, European history..."
            style={{
              width: "400px",
              maxWidth: "100%"
            }}
          />

          <button onClick={fetchQuiz} disabled={loading}>
            {loading ? "⚡ Generating..." : "Generate Quiz"}
          </button>
        </div>

        {/* Quiz Content */}
        <div style={{ marginTop: "40px" }}>
          {quiz.map((q, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: "32px",
                marginBottom: "24px",
                textAlign: "left"
              }}
            >
              <div style={{ 
                fontSize: "14px", 
                color: "#b794f6", 
                marginBottom: "16px",
                fontWeight: "600",
                letterSpacing: "1px",
                textShadow: "0 0 10px rgba(138, 43, 226, 0.8)"
              }}>
                QUESTION {index + 1}
              </div>
              <h3 style={{ 
                color: "#ffffff",
                fontSize: "20px",
                marginBottom: "24px",
                lineHeight: "1.5"
              }}>
                {q.question}
              </h3>

              {Object.entries(q.options).map(([letter, text]) => {
                const isSelected = selectedAnswers[index] === letter;
                const isCorrect = submitted && letter === q.answer;
                const isWrong = submitted && isSelected && letter !== q.answer;

                return (
                  <button
                    key={letter}
                    onClick={() => selectAnswer(index, letter)}
                    disabled={submitted}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      marginTop: "12px",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: isCorrect 
                        ? "2px solid #00ff88"
                        : isWrong
                        ? "2px solid #ff0055"
                        : isSelected
                        ? "2px solid #8a2be2"
                        : "1px solid rgba(138, 43, 226, 0.2)",
                      background: isCorrect
                        ? "rgba(0, 255, 136, 0.15)"
                        : isWrong
                        ? "rgba(255, 0, 85, 0.15)"
                        : isSelected
                        ? "rgba(138, 43, 226, 0.2)"
                        : "rgba(20, 20, 20, 0.4)",
                      color: isCorrect
                        ? "#00ff88"
                        : isWrong
                        ? "#ff0055"
                        : isSelected
                        ? "#b794f6"
                        : "#e0e0e0",
                      cursor: submitted ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "15px",
                      fontWeight: isSelected || isCorrect || isWrong ? "600" : "400",
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <span style={{ 
                      fontWeight: "700",
                      marginRight: "12px",
                      fontSize: "16px"
                    }}>
                      {letter}.
                    </span>
                    {text}
                    {isCorrect && " ✓"}
                    {isWrong && " ✗"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {quiz.length > 0 && !submitted && (
          <button
            onClick={submitQuiz}
            style={{
              padding: "18px 40px",
              background: "linear-gradient(135deg, rgba(0, 255, 136, 0.6) 0%, rgba(0, 200, 100, 0.6) 100%)",
              fontSize: "18px",
              fontWeight: "600",
              marginTop: "20px",
              boxShadow: "0 4px 15px rgba(0, 255, 136, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)",
              border: "1px solid rgba(0, 255, 136, 0.4)"
            }}
          >
            Submit Quiz
          </button>
        )}

        {/* Score */}
        {submitted && (
          <div className="card" style={{
            marginTop: "40px",
            padding: "40px",
            textAlign: "center"
          }}>
            <h2 style={{ 
              fontSize: "36px",
              color: "#ffffff",
              marginBottom: "16px"
            }}>
              Your Score
            </h2>
            <div style={{ 
              fontSize: "64px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #b794f6 0%, #00ffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
              textShadow: "0 0 40px rgba(138, 43, 226, 0.6)"
            }}>
              {score} / {quiz.length}
            </div>
            <p style={{ 
              color: "#b0b0b0",
              fontSize: "18px"
            }}>
              {score === quiz.length 
                ? "Perfect! 🎉" 
                : score >= quiz.length * 0.7 
                ? "Great job! 🌟" 
                : "Keep practicing! 💪"}
            </p>
          </div>
        )}

        {quiz.length === 0 && !loading && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#808080"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px", opacity: 0.5 }}>📝</div>
            <p style={{ fontSize: "18px" }}>No quiz yet. Enter a topic to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
