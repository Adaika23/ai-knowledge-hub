// ================================
// 📄 Source Modal Component
// ================================

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { formatSimilarity } from "./utils";

import {
  DOCUMENT,
  DOCUMENT_ICON,
  NOTE_ICON,
} from "./constants";

import {
  modalContentStyle,
  modalCloseButton,
} from "./styles";

function SourceModal({ selectedSource, setSelectedSource }) {
  // ================================
  // Close Modal with ESC Key
  // ================================
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === "Escape") {
        setSelectedSource(null);
      }
    }

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedSource]);

  // ================================
  // Do Not Show Modal If No Source
  // ================================
  if (!selectedSource) {
    return null;
  }

  // ================================
  // UI
  // ================================
  return (
    <div
      // Click outside modal to close
      onClick={() => setSelectedSource(null)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        // Prevent inside click from closing modal
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "900px",
          maxHeight: "80%",
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedSource(null)}
          style={modalCloseButton}
        >
          ×
        </button>

        {/* Source Title */}
        <h2 style={{ paddingRight: "45px" }}>
          {selectedSource.type === DOCUMENT
            ? DOCUMENT_ICON
            : NOTE_ICON}{" "}
          {selectedSource.title}
        </h2>

        {/* Match Score */}
        <p>
          Match Score: {formatSimilarity(selectedSource.similarity)}
        </p>

        {/* Full Source Content */}
        <div style={modalContentStyle}>
          <ReactMarkdown>
            {selectedSource.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default SourceModal;