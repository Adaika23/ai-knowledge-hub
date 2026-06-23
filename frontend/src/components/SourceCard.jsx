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
  sourceCardStyle,
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
  return (
    <div
      ref={(element) => {
        sourceRefs.current[source.title] = element;
      }}
      //Source card style dirrected to style.js
      style={sourceCardStyle}
    >
      <strong>
        {source.type === DOCUMENT ? DOCUMENT_ICON : NOTE_ICON} {source.title}
      </strong>

      <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
        {source.type === DOCUMENT
          ? `${DOCUMENT_ICON} ${DOCUMENT_LABEL}`
          : `${NOTE_ICON} ${NOTE_LABEL}`}
      </div>

      <div style={{ fontSize: "13px", color: "#666" }}>
        Match Score: {formatSimilarity(source.similarity)}
      </div>

      {source.preview && (
        <div
        //padding part directed style js
          style={warningButton}
        >
          <strong>Preview:</strong>

          <p style={{ marginTop: "5px" }}>{source.preview}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          onClick={() => jumpToSource(source.title)}
          //Directed to style js
          style={warningButton}
        >
          {JUMP_TO_SOURCE_BUTTON_LABEL}
        </button>

        <button
          onClick={() => setSelectedSource(source)}
          //directed to style js
          style={primaryButton}
        >
          {VIEW_FULL_SOURCE_BUTTON_LABEL}
        </button>
      </div>
    </div>
  );
}

export default SourceCard;