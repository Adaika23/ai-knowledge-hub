// ================================
// 💬 Chat Message Component
// ================================
import ReactMarkdown from "react-markdown";
import SourceCard from "./SourceCard";

import {
  smallButton,
  sourcesBoxStyle,
} from "./styles";

import {
  USER,
  AI,
  USER_LABEL,
  AI_LABEL,
  COPY_BUTTON_LABEL,
} from "./constants";

// ================================
// 🕒 Format Message Time
// ================================
function formatMessageTime(dateValue) {
  if (!dateValue) return "";

  return new Date(dateValue).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ================================
// 💬 Chat Message Component
// ================================
function ChatMessage({
  msg,
  sourceRefs,
  jumpToSource,
  setSelectedSource,
}) {
  const messageText = msg.message || msg.content || msg.text || "";
  const displayTime = msg.time || formatMessageTime(msg.created_at);

  return (
    <div
      className={
        msg.sender === USER
          ? "chat-message user-message"
          : "chat-message ai-message"
      }
    >
      {/* ================================ */}
      {/* 👤 Message Header */}
      {/* ================================ */}

      <div className="message-header">
        <strong>{msg.sender === USER ? USER_LABEL : AI_LABEL}</strong>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>{displayTime}</span>

          {msg.sender === AI && !msg.isLoading && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(messageText)}
              style={smallButton}
            >
              {COPY_BUTTON_LABEL}
            </button>
          )}
        </div>
      </div>

      {/* ================================ */}
      {/* 💬 Message Body */}
      {/* ================================ */}

      <div className="message-body">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 style={{ fontSize: "26px", margin: "16px 0 12px" }}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: "22px", margin: "14px 0 10px" }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontSize: "18px", margin: "12px 0 8px" }}>
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p style={{ lineHeight: "1.7", margin: "8px 0" }}>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul style={{ paddingLeft: "24px", margin: "8px 0" }}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol style={{ paddingLeft: "24px", margin: "8px 0" }}>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: "6px", lineHeight: "1.6" }}>
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong style={{ fontWeight: "700" }}>{children}</strong>
            ),
          }}
        >
          {messageText}
        </ReactMarkdown>

        {/* ================================ */}
        {/* 📚 Sources Used */}
        {/* ================================ */}

        {msg.sources && msg.sources.length > 0 && (
          <div style={sourcesBoxStyle}>
            <h4>📚 Sources Used</h4>

            {msg.sources.map((source, index) => (
              <SourceCard
                key={index}
                source={source}
                sourceRefs={sourceRefs}
                jumpToSource={jumpToSource}
                setSelectedSource={setSelectedSource}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;