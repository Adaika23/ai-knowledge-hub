import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { askAI } from "../api/api";


function AIAssistant() {
  // ================================
  // 🧠 State Management
  // ================================

  // Stores user question
  const [question, setQuestion] = useState("");

  // Stores AI response
  const [answer, setAnswer] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Stores full chat history
   const [messages, setMessages] = useState([]);

  // ================================
  // 🤖 Handle AI Request
  // ================================
  const handleAskAI = async (e) => {
    e.preventDefault();

    // Remove extra spaces
    const trimmedQuestion = question.trim();

    // Prevent empty requests
    if (!trimmedQuestion) {
      setAnswer("Please type a question first.");
      return;
    }

    try {
      // Start loading
      setLoading(true);

      // Clear old answer
      setAnswer("");

      // Add user message to chat
      setMessages((prev) => [
         {
           sender: "user",
           text: trimmedQuestion,
         },
         ...prev, 
      ]);

      // Send request to backend
      const data = await askAI(trimmedQuestion);

      // Handle valid response
      if (data?.answer) {
        setAnswer(data.answer);

        // Add AI response to chat
        setMessages((prev) => [
          {
           sender: "ai",
           text: data.answer,
          },
          ...prev,
        ]);

      } else {
        setAnswer("No AI response received.");
     }

    } catch (error) {
      console.error("AI Error:", error);

      // Friendly error message
      setAnswer("⚠️ Failed to connect to AI service.");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // ================================
  // 🎨 UI
  // ================================
  return (
    <div className="card section ai-assistant">

      {/* Header */}
      <h2>🤖 AI Assistant</h2>

      <p className="ai-description">
        Ask questions about programming, notes, projects, or learning topics.
      </p>

      {/* ================================
          📝 AI Form
      ================================= */}
      <form onSubmit={handleAskAI} className="ai-form">

        {/* AI Input */}
        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}

          // Send message when Enter is pressed
          onKeyDown={(e) => {
             if (e.key === "Enter") {
                handleAskAI(e);
             }
          }}
        />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? (
             <span className="typing-dots">
                Thinking<span>.</span><span>.</span><span>.</span>
             </span>
          ) : (
           "Ask AI"
          )}
        </button>

      </form>

      {/* ================================
          💬 AI Response
      ================================= */}
      {/* Chat Messages */}
<div className="chat-container">

  {loading && (
    <div className="chat-message ai-message typing-indicator">
      <strong>AI</strong>
      <p>AI is typing...</p>
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

      <strong>
        {msg.sender === "user" ? "You" : "AI"}
      </strong>

      <ReactMarkdown>{msg.text}</ReactMarkdown>

    </div>
  ))}

</div>

    </div>
  );
}

export default AIAssistant;