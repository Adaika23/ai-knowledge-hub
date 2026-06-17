import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  askAI,
  getChatHistory,
  clearChatHistory,
} from "../api/api";

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

  // Clearing 
  const [clearing, setClearing] = useState(false);

  // Automatically scroll to newest message
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
   }, [messages, loading]);

   // ================================
   // 💬 Load Chat History
   // ================================
   useEffect(() => {
     const loadHistory = async () => {
       try {
         const history = await getChatHistory();

         if (Array.isArray(history)) {
           setMessages(
             history.map((chat) => ({
               sender: chat.sender,
               message: chat.message,
               created_at: chat.created_at,
             }))
           );
         }
       } catch (error) {
         console.error("Failed to load chat history:", error);
       }
     };

     loadHistory();
   }, []);

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
  // 🗑️ Clear Chat
  // ================================
  const handleClearChat = async () => {
   const confirmed = window.confirm(
     "Are you sure you want to delete all chat history?"
   );

   if (!confirmed) {
     return;
   }

   try {
     // Start clearing state
     setClearing(true);

     // Delete chat history from backend
     await clearChatHistory();

     // Clear React state
     setMessages([]);
     setQuestion("");
   } catch (error) {
     console.error("Failed to clear chat:", error);
   } finally {
     // Reset clearing state
     setClearing(false);
   }
};

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

    // Create temporary AI loading message
    const thinkingMessage = {
      sender: "ai",
      text: "Thinking...",
      time: getCurrentTime(),
      isLoading: true,
    };

    // Add user message and thinking message immediately
    setMessages((prev) => [...prev, userMessage, thinkingMessage]);

    // Clear input immediately after sending
    setQuestion("");

    try {
      // Start loading
      setLoading(true);

      // Send request to backend
      const data = await askAI(trimmedQuestion);

      // Replace Thinking... with AI response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                sender: "ai",
                text: data?.answer || "No AI response received.",
                time: getCurrentTime(),
              }
            : msg
        )
      );
    } catch (error) {
      console.error("AI Error:", error);

      // Replace Thinking... with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                sender: "ai",
                text: "⚠️ Failed to connect to AI service.",
                time: getCurrentTime(),
              }
            : msg
        )
      );
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

        <div ref={chatEndRef}></div>

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
         onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
                handleAskAI(e);
              }
          }}
       />

       <div className="ai-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <button
          type="button"
          className="clear-chat-btn"
          onClick={handleClearChat}
          disabled={loading || clearing || messages.length === 0}
        >
          {clearing ? "Clearing..." : "🗑️ Clear Chat"}
        </button>
        </div>
      </form>
    </div>
  );
}

export default AIAssistant;