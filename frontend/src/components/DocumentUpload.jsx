import { useState } from "react";
import { uploadDocument } from "../api/api";

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const result = await uploadDocument(file);
      if (result.error) {
        setMessage(result.error);
        return;
      }
      setMessage(result.message || "Document uploaded successfully.");
      setFile(null);
    } catch (error) {
      setMessage("Upload failed.");
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>📄 Upload Document</h2>

      <p>
        Upload PDF or DOCX files to include them in your AI knowledge base.
      </p>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload
      </button>

      {message && (
        <p style={{ marginTop: "1rem" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default DocumentUpload;