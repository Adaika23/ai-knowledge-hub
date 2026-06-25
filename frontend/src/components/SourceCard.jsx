import { formatSimilarity } from "./utils";

import {
  DOCUMENT,
  DOCUMENT_ICON,
  NOTE_ICON,
  DOCUMENT_LABEL,
  NOTE_LABEL,
  JUMP_TO_SOURCE_BUTTON_LABEL,
  VIEW_FULL_SOURCE_BUTTON_LABEL,
} from "./constants";

import {
  primaryButton,
  warningButton,
} from "./styles";

// ================================
// 📚 Source Card Component
// ================================
function SourceCard({
  source,
  sourceRefs,
  jumpToSource,
  setSelectedSource,
}) {
  const sourceTypeLabel =
    source.type === DOCUMENT ? DOCUMENT_LABEL : NOTE_LABEL;

  const sourceIcon =
    source.type === DOCUMENT ? DOCUMENT_ICON : NOTE_ICON;

  return (
    <div
      ref={(element) => {
        sourceRefs.current[source.title] = element;
      }}
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "14px",
        marginTop: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
        <div>
          <strong style={{ fontSize: "15px", color: "#111827" }}>
            {sourceIcon} {source.title}
          </strong>

          <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
            {sourceIcon} {sourceTypeLabel}
          </div>
        </div>

        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            background: "#eef2ff",
            color: "#1d4ed8",
            padding: "5px 8px",
            borderRadius: "999px",
            height: "fit-content",
            whiteSpace: "nowrap",
          }}
        >
          {formatSimilarity(source.similarity)}
        </span>
      </div>

      {/* Preview */}
      {source.preview && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#374151",
            lineHeight: "1.5",
          }}
        >
          <strong>Preview:</strong>
          <p style={{ margin: "6px 0 0" }}>{source.preview}</p>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button
          type="button"
          onClick={() => jumpToSource(source.title)}
          style={warningButton}
        >
          {JUMP_TO_SOURCE_BUTTON_LABEL}
        </button>

        <button
          type="button"
          onClick={() => setSelectedSource(source)}
          style={primaryButton}
        >
          {VIEW_FULL_SOURCE_BUTTON_LABEL}
        </button>
      </div>
    </div>
  );
}

export default SourceCard;