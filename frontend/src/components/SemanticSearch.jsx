import { useState } from "react";
import { semanticSearchNotes } from "../api/api";

function SemanticSearch() {
  // Stores the user's search input
  const [query, setQuery] = useState("");

  // Stores semantic search results from backend
  const [results, setResults] = useState([]);

  // Loading state while request is running
  const [loading, setLoading] = useState(false);

  // Error message state
  const [error, setError] = useState("");

  // Runs semantic search
  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a search topic or question.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResults([]);

      const data = await semanticSearchNotes(trimmedQuery);

      setResults(data.results || []);
    } catch (err) {
      setError("Semantic search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="semantic-search-section">
      <h2>Semantic Search</h2>

      <p>
        Search your knowledge by meaning, not just keywords. Ask a question or
        type a topic, and the system will find related notes.
      </p>

      <form onSubmit={handleSearch} className="semantic-search-form">
        <input
          type="text"
          placeholder="Example: notes about FastAPI authentication"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="semantic-results">
        {results.length > 0 && <h3>Search Results</h3>}

        {results.map((note) => (
          <div key={note.id} className="semantic-result-card">
            <h4>{note.title}</h4>

            <p>{note.content}</p>

            {note.similarity !== undefined && (
              <span className="similarity-score">
                Similarity: {(note.similarity * 100).toFixed(1)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SemanticSearch;