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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const selectAnswer = (qIndex, option) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

const submitQuiz = () => {
  let newScore = 0;

  quiz.forEach((q, index) => {
    const selected = selectedAnswers[index]?.toLowerCase().trim();
    const correct = q.answer.toLowerCase().trim();

    if (selected === correct) {
      newScore++;
    }
  });

  setScore(newScore);
  setSubmitted(true);
};

  return (
    <div className="container">
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>Quiz Generator</h1>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. React basics)"
        style={{
          padding: "12px",
          width: "350px",
          borderRadius: "6px",
          border: "1px solid #aaa",
          marginRight: "10px",
        }}
      />

      <button onClick={fetchQuiz}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {/* Quiz */}
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
            }}
          >
            <h3>{q.question}</h3>

            {q.options.map((opt, i) => {
              const isSelected = selectedAnswers[index] === opt;
              const isCorrect = submitted && opt === q.answer;
              const isWrong = submitted && isSelected && opt !== q.answer;

              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(index, opt)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #aaa",
                    backgroundColor: isCorrect
                      ? "#51a765ff"
                      : isWrong
                      ? "#f8d7da"
                      : isSelected
                      ? "#4d5769ff"
                      : "white",
                    cursor: submitted ? "not-allowed" : "pointer",
                    color: "black"
                  }}
                >
                  {opt}
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
            background: "#1e90ff",
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

      {/* Final Score */}
      {submitted && (
        <h2 style={{ marginTop: "30px" }}>
          You scored {score} / {quiz.length}
        </h2>
      )}
    </div>
  );
}
