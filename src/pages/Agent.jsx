import { useState, useEffect, useRef } from "react";

export default function Agent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      const aiMessage = { sender: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log("Error contacting backend:", error);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error: Could not connect to the backend." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "16px",
          fontWeight: "700",
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🤖 AI Assistant
        </h1>

        <p style={{ 
          color: "#b0b0b0", 
          marginBottom: "40px",
          fontSize: "18px",
          textAlign: "center"
        }}>
          Chat with Yohan AI for instant help and answers
        </p>

        {/* Chat Window */}
        <div
          className="card"
          style={{
            height: "600px",
            padding: "24px",
            overflowY: "auto",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {messages.length === 0 && (
            <div style={{
              textAlign: "center",
              margin: "auto",
              color: "#808080"
            }}>
              <div style={{ fontSize: "64px", marginBottom: "20px", opacity: 0.5 }}>💬</div>
              <p style={{ fontSize: "18px" }}>Start a conversation with Yohan AI</p>
              <p style={{ fontSize: "14px", marginTop: "8px", color: "#606060" }}>
                Ask questions, get explanations, or discuss any topic
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "20px",
                animation: "fadeIn 0.3s ease-in"
              }}
            >
              <div
                style={{
                  background:
                    msg.sender === "user" 
                      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                      : "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  padding: "14px 20px",
                  maxWidth: "75%",
                  borderRadius: "16px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  boxShadow: msg.sender === "user" 
                    ? "0 4px 15px rgba(59, 130, 246, 0.3)"
                    : "0 4px 15px rgba(0, 0, 0, 0.2)",
                  border: msg.sender === "user" 
                    ? "none"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  wordWrap: "break-word"
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "20px"
              }}
            >
              <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "#b0b0b0",
                padding: "14px 20px",
                borderRadius: "16px",
                fontSize: "15px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)"
              }}>
                <span style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
                  Yohan is thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Section */}
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <input
            type="text"
            value={input}
            placeholder="Ask Yohan anything..."
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{
              flex: 1,
              fontSize: "16px"
            }}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: "14px 32px",
              fontSize: "16px"
            }}
          >
            {loading ? "⏳" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
