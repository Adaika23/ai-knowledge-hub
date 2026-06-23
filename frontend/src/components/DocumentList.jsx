// ========================================
// 📄 DocumentList Component
// ========================================
// Displays uploaded documents.
// Allows the user to view or delete documents.
// ========================================

import { useEffect, useState } from "react";
import {
  getDocuments,
  getDocument,
  deleteDocument,
} from "../api/api";

function DocumentList() {
  // Stores all uploaded documents
  const [documents, setDocuments] = useState([]);

  // Stores the document selected for viewing
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Shows loading message while documents are loading
  const [loading, setLoading] = useState(true);

  // ========================================
  // Load all uploaded documents
  // ========================================
  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setLoading(false);
    }
  }

  // Load documents when component first opens
  useEffect(() => {
    loadDocuments();
  }, []);

  // ========================================
  // Delete selected document
  // ========================================
  async function handleDelete(documentId) {
    const confirmed = window.confirm("Delete this document?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteDocument(documentId);

      // Clear viewer if deleted document was open
      setSelectedDocument(null);

      // Refresh document list
      loadDocuments();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  }

  // ========================================
  // View selected document content
  // ========================================
  async function handleView(documentId) {
    try {
      const data = await getDocument(documentId);
      setSelectedDocument(data);
    } catch (error) {
      console.error("Failed to load document:", error);
    }
  }

  // Loading UI
  if (loading) {
    return (
      <div>
        <h2>📄 Uploaded Documents</h2>
        <p>Loading documents...</p>
      </div>
    );
  }

  // Main UI
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>📄 Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {documents.map((doc) => (
            <li
              key={doc.id}
              style={{
                padding: "12px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <strong>📄 {doc.filename}</strong>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleView(doc.id)}>
                  👁 View
                </button>

                <button
                  onClick={() => handleDelete(doc.id)}
                  style={{ marginLeft: "10px" }}
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedDocument && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>👁 {selectedDocument.filename}</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {selectedDocument.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export default DocumentList;