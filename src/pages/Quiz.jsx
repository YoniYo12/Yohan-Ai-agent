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
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Quiz Generator
      </h1>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. Flask basics)"
        style={{
          padding: "12px",
          width: "350px",
          borderRadius: "6px",
          border: "1px solid #aaa",
          marginRight: "10px",
        }}
      />

      <button
        onClick={fetchQuiz}
        style={{
          padding: "12px 20px",
          background: "#1e90ff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {/* Quiz Content */}
      <div style={{ marginTop: "40px" }}>
        {quiz.map((q, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              color:"black"
            }}
          >
            <h3>{q.question}</h3>

            {Object.entries(q.options).map(([letter, text]) => {
              const isSelected = selectedAnswers[index] === letter;
              const isCorrect = submitted && letter === q.answer;
              const isWrong =
                submitted && isSelected && letter !== q.answer;

              return (
                <button
                  key={letter}
                  onClick={() => selectAnswer(index, letter)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    marginTop: "10px",
                    color:"black",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #aaa",
                    backgroundColor: isCorrect
                      ? "#6c9676ff"
                      : isWrong
                      ? "#f8d7da"
                      : isSelected
                      ? "#557ac5ff"
                      : "white",
                    cursor: submitted ? "not-allowed" : "pointer",
                  }}
                >
                  {letter} {text}
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
            padding: "15px 25px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Submit Quiz
        </button>
      )}

      {/* Score */}
      {submitted && (
        <h2 style={{ marginTop: "30px" }}>
          Score: {score} / {quiz.length}
        </h2>
      )}
    </div>
  );
}
