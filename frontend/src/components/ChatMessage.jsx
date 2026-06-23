// ================================
// 💬 Chat Message Component
// ================================
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

function ChatMessage({
  msg,
  sourceRefs,
  jumpToSource,
  setSelectedSource,
}) {
  return (
    <div
      className={
        msg.sender === "user"
          ? "chat-message user-message"
          : "chat-message ai-message"
      }
    >
      {/* ================================ */}
      {/* 👤 Message Header */}
      {/* ================================ */}

      <div className="message-header">
        <strong> {msg.sender === USER ? USER_LABEL : AI_LABEL}</strong>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>{msg.time || msg.created_at}</span>

          {msg.sender === AI && !msg.isLoading && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(msg.message || msg.text)}
              style={smallButton}
            >
              {COPY_BUTTON_LABEL}
            </button>
          )}
        </div>
      </div>

      {/* ================================ */}
      {/* 🤖 AI Response */}
      {/* ================================ */}

      <div className="message-body">
        <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {msg.message || msg.text}
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