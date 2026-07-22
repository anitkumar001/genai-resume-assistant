import api from "../../services/api";
import styles from "./Chat.module.css";

import { useState, useRef, useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import ReactMarkdown from "react-markdown";

function Chat() {
    const { resumeText } = useResume();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm your AI Resume Assistant. Ask me anything about your resume."
    }
  ]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  const handleSend = async () => {

  if (!resumeText) {
    alert("Please analyze a resume first.");
    return;
}

if (!question.trim()) return;

  const userMessage = {
    sender: "user",
    text: question,
  };

  setMessages((prev) => [
  ...prev,
  userMessage,
  {
    sender: "ai",
    text: "🤖 Thinking...",
    loading: true,
  },
]);

  setLoading(true);

  try {

    const response = await api.post("/chat", {
    resume_text: resumeText,
    question: question,
});

    setMessages((prev) =>
  prev.map((msg) =>
    msg.loading
      ? {
          sender: "ai",
          text: response.data.answer,
        }
      : msg
  )
);

  } catch (error) {

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "❌ Unable to contact AI.",
      },
    ]);

    console.error(error);

  } finally {
    setLoading(false);
    setQuestion("");
  }
};

  return (
    <div className={styles.container}>

      <div className={styles.chatBox}>

        <div className={styles.header}>

  <h1>🤖 AI Resume Assistant</h1>

  <button
    className={styles.clearBtn}
    onClick={() =>
      setMessages([
        {
          sender: "ai",
          text: "👋 Hello! I'm your AI Resume Assistant. Ask me anything about your resume.",
        },
      ])
    }
  >
    Clear Chat
  </button>

</div>

        <div className={styles.messages}>

  {messages.map((msg, index) => (
    <div
      key={index}
      className={
        msg.sender === "user"
          ? styles.userMessage
          : styles.aiMessage
      }
    >
      <ReactMarkdown>
  {msg.text}
</ReactMarkdown>
    </div>
  ))}

  {/* Auto-scroll target */}
  <div ref={messagesEndRef}></div>

</div>

        <div className={styles.inputArea}>

        <input
            type="text"
            placeholder="Ask something about your resume..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                handleSend();
                }
            }}
        />

          <button
  onClick={handleSend}
  disabled={loading}
>
  {loading ? "Thinking..." : "Send"}
</button>

        </div>

      </div>

    </div>
  );
}

export default Chat;