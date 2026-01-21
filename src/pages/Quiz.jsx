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
          background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)",
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
                color: "#60a5fa", 
                marginBottom: "16px",
                fontWeight: "600",
                letterSpacing: "1px"
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
                        ? "2px solid #10b981"
                        : isWrong
                        ? "2px solid #ef4444"
                        : isSelected
                        ? "2px solid #3b82f6"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      background: isCorrect
                        ? "rgba(16, 185, 129, 0.2)"
                        : isWrong
                        ? "rgba(239, 68, 68, 0.2)"
                        : isSelected
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(255, 255, 255, 0.03)",
                      color: isCorrect
                        ? "#10b981"
                        : isWrong
                        ? "#ef4444"
                        : isSelected
                        ? "#60a5fa"
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
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              fontSize: "18px",
              fontWeight: "600",
              marginTop: "20px",
              boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
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
              background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px"
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
