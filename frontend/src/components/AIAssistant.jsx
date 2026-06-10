import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { askAI } from "../api/api";

function AIAssistant() {
  // ================================
  // State Management
  // ================================

  // Stores the user's current question
  const [question, setQuestion] = useState("");

  // Stores full chat history
  const [messages, setMessages] = useState([]);

  // Loading state while waiting for AI response
  const [loading, setLoading] = useState(false);

  // ================================
  // Format Timestamp
  // ================================
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ================================
  // Handle AI Request
  // ================================
  const handleAskAI = async (e) => {
    e.preventDefault();

    // Remove extra spaces
    const trimmedQuestion = question.trim();

    // Prevent empty request
    if (!trimmedQuestion) {
      return;
    }

    // Create user message
    const userMessage = {
      sender: "user",
      text: trimmedQuestion,
      time: getCurrentTime(),
    };

    // Add user message to bottom of chat
    setMessages((prev) => [...prev, userMessage]);

    // Clear input immediately after sending
    setQuestion("");

    try {
      // Start loading
      setLoading(true);

      // Send request to backend
      const data = await askAI(trimmedQuestion);

      // Create AI response message
      const aiMessage = {
        sender: "ai",
        text: data?.answer || "No AI response received.",
        time: getCurrentTime(),
      };

      // Add AI response to bottom of chat
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);

      // Add error message to chat
      const errorMessage = {
        sender: "ai",
        text: "⚠️ Failed to connect to AI service.",
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="ai-assistant">
      {/* Header */}
      <h2>🤖 AI Assistant</h2>

      <p className="ai-description">
        Ask questions about your saved notes, projects, programming, or learning topics.
      </p>

      {/* Chat Messages */}
      <div className="chat-container">
        {messages.length === 0 && (
          <div className="empty-chat">
            <p>No messages yet. Ask your first question.</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "chat-message user-message"
                : "chat-message ai-message"
            }
          >
            <div className="message-header">
              <strong>{msg.sender === "user" ? "You" : "AI"}</strong>
              <span>{msg.time}</span>
            </div>

            <div className="message-body">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai-message typing-indicator">
            <div className="message-header">
              <strong>AI</strong>
              <span>{getCurrentTime()}</span>
            </div>

            <p>AI is typing...</p>
          </div>
        )}
      </div>

      {/* AI Form */}
      <form onSubmit={handleAskAI} className="ai-form">
        <input
          type="text"
          placeholder="Ask something about your notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>
    </div>
  );
}

export default AIAssistant;