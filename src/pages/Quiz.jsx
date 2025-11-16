import { useState } from "react";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);

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
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <p><strong>Answer:</strong> {q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
