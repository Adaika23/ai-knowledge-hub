import { useState } from "react";

function SearchBar({ onSearch }) {
  // 🧠 Store search input
  const [query, setQuery] = useState("");

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Search</h3>

      {/* 🔍 Input field */}
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* 🔘 Button */}
      <button onClick={() => onSearch(query)}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;