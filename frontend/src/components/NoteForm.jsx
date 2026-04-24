import { useState } from "react";

function NoteForm({ onAddNote }) {
  // 🧠 Store form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 🚀 When form is submitted
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    // Send data to parent (Home.jsx)
    onAddNote({ title, content });

    // 🧹 Clear inputs after submit
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Add Note</h3>

      {/* 📝 Title input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      {/* 📝 Content input */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      {/* ➕ Submit button */}
      <button type="submit">Add</button>
    </form>
  );
}

export default NoteForm;