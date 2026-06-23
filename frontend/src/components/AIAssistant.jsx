import { useEffect, useRef, useState } from "react";

import SourceModal from "./SourceModal";
import ChatMessage from "./ChatMessage";

import { getCurrentTime } from "./utils";


import {
  USER,
  AI,
  THINKING_TEXT,
  NO_AI_RESPONSE_TEXT,
  AI_CONNECTION_ERROR_TEXT,
  NO_CHAT_DOWNLOAD_TEXT,
  DOWNLOAD_CHAT_BUTTON_LABEL,
  CLEAR_CHAT_BUTTON_LABEL,
} from "./constants";

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

  // 📄 Source Viewer
  const [selectedSource, setSelectedSource] = useState(null);

  // Clearing 
  const [clearing, setClearing] = useState(false);

  // Automatically scroll to newest message
  const chatEndRef = useRef(null);

  // ================================
  // 📚 Source References
  // ================================
  const sourceRefs = useRef({});

  const isUserAtBottom = useRef(true);

  useEffect(() => {
    const container = chatEndRef.current?.parentElement;

    const handleScroll = () => {
      if (!container) return;

      const threshold = 80; // px from bottom
      const position =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      isUserAtBottom.current = position < threshold;
    };

    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isUserAtBottom.current) {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
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
  // Download Chat
  // ================================
  function downloadChat() {

    if (messages.length === 0) {
      alert(NO_CHAT_DOWNLOAD_TEXT);
      return;
    }

    const chatContent = messages
      .map((msg) => {
        const sender =
          msg.sender === USER ? "You" : "AI";
        return `${sender}:\n${msg.message || msg.text}\n`;
      })
      .join("\n----------------------------------------\n\n");

    const blob = new Blob([chatContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-chat-history.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ================================
  // 📚 Jump to Source
  // ================================
  function jumpToSource(title) {

    const element = sourceRefs.current[title];

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Temporary highlight
    element.style.background = "#fff7cc";
    element.style.border = "2px solid #facc15";

    setTimeout(() => {
      element.style.background = "white";
      element.style.border = "1px solid #e5e5e5";
    }, 2000);
  }
  // ================================
  // Handle AI Request - Streaming
  // ================================
  const handleAskAI = async (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const aiMessageId = Date.now();

    const userMessage = {
      sender: USER,
      text: trimmedQuestion,
      time: getCurrentTime(),
    };

    const aiMessage = {
      id: aiMessageId,
      sender: AI,
      text: "",
      time: getCurrentTime(),
      sources: [],
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      if (!response.body) {
        throw new Error("No streaming response found");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let aiText = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.trim()) continue;

          let cleanLine = line;

          if (cleanLine.startsWith("data: ")) {
            cleanLine = cleanLine.replace("data: ", "");
          }

          try {
            const parsed = JSON.parse(cleanLine);

            if (parsed.token) {
              aiText += parsed.token;

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId
                    ? {
                        ...msg,
                        text: aiText,
                      }
                    : msg
                )
              );
            }
          } catch (error) {
            console.error("Stream parse error:", error);
          }
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                isStreaming: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("AI Error:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                text: AI_CONNECTION_ERROR_TEXT,
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };
  // ================================
  // UI
  // ================================
  return (
    <div className="ai-assistant">
      {/* ================================ */}
      {/* 🤖 AI Assistant Header */}
      {/* ================================ */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>🤖 AI Assistant</h2>

        <button
          onClick={downloadChat}
          style={{
            padding: "8px 14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
         {DOWNLOAD_CHAT_BUTTON_LABEL}
        </button>
      </div>

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
        
       {/* ================================ */}
       {/* 💬 Chat Message Component */}
       {/* ================================ */}
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            msg={msg}
            sourceRefs={sourceRefs}
            jumpToSource={jumpToSource}
            setSelectedSource={setSelectedSource}
          />
        ))}

        <div ref={chatEndRef}></div>

        {loading && (
          <div className="chat-message ai-message typing-indicator">
            <div className="message-header">
              <strong>AI</strong>
              <span>{getCurrentTime()}</span>
            </div>

            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
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
         {CLEAR_CHAT_BUTTON_LABEL}
        </button>
        </div>
      </form>
      {/* ============================== */}
      {/* 📄 Full Source Modal */}
      {/* ============================== */}
      <SourceModal
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
    </div>
  );
}

export default AIAssistant;