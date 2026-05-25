// ================================
// Import React hooks
// ================================
import { useEffect, useState } from "react";

// ================================
// Import Authentication Components
// ================================
import Register from "../components/Register";
import Login from "../components/Login";

// ================================
// Import API Functions
// ================================
import {
  getNotes,
  createNote,
  searchNotes,
  semanticSearchNotes
} from "../api/api";
// ================================
// Import UI Components
// ================================
import NoteList from "../components/NoteList";
import AIAssistant from "../components/AIAssistant";

function Home() {
  // ================================
  // Notes State
  // ================================
  const [notes, setNotes] = useState([]);

  // ================================
  // Search State
  // ================================
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // ================================
  // Add Note State
  // ================================
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ================================
  // Dark Mode State
  // ================================
  const [darkMode, setDarkMode] = useState(false);

  // ================================
  // Authentication State
  // ================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Stores AI semantic search results
  const [semanticResults, setSemanticResults] = useState([]);

  // ================================
  // Load Data When Page Opens
  // ================================
  useEffect(() => {
    loadNotes();

    // Check if JWT token exists in browser storage
    const token = localStorage.getItem("token");

    // If token exists, user is considered logged in
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // ================================
  // Load Notes From Backend
  // ================================
  async function loadNotes() {
    try {
      const data = await getNotes();

      // Reverse notes so newest notes show first
      setNotes(Array.isArray(data) ? [...data].reverse() : []);
    } catch (error) {
      console.error("Error loading notes:", error);
      setNotes([]);
    }
  }

  // ================================
  // Handle Search
  // ================================
  async function handleSearch(event) {
    event.preventDefault();

    try {
      setHasSearched(true);

      // Prevent empty search
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      const data = await searchNotes(searchQuery);

      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  }

  // ================================
  // AI Semantic Search
  // ================================
   const handleSemanticSearch = async (query) => {

     // Prevent empty searches
     if (!query.trim()) {
        setSemanticResults([]);
        return;
     }

    try {

    // Call backend semantic search API
    const results = await semanticSearchNotes(query);

    // Save results
    setSemanticResults(results);

    } catch (error) {

     console.error("Semantic search error:", error);
    }
  };

  // ================================
  // Handle Add Note
  // ================================
  async function handleAddNote(event) {
    event.preventDefault();

    try {
      // Require both title and content
      if (!title.trim() || !content.trim()) {
        alert("Please enter both title and content.");
        return;
      }

      const newNote = {
        title: title,
        content: content,
      };

      // Send note to backend
      await createNote(newNote);

      // Clear form fields
      setTitle("");
      setContent("");

      // Reload notes after adding
      await loadNotes();

      // Clear search results after adding a note
      setSearchResults([]);
      setHasSearched(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // ================================
  // Handle Logout
  // ================================
  const handleLogout = () => {
    // Remove JWT token
    localStorage.removeItem("token");

    // Update frontend login state
    setIsLoggedIn(false);
  };

  // ================================
  // Page UI
  // ================================
  return (
    <div className={darkMode ? "app-layout dark" : "app-layout"}>

      {/* ================================ */}
      {/* Sidebar Navigation */}
      {/* ================================ */}
      <div className="sidebar">
        <h2>🧠 AI Hub</h2>

        <ul>
          <li><a href="#home">🏠 Home</a></li>
          <li><a href="#notes">📝 Notes</a></li>
          <li><a href="#ai-chat">🤖 AI Chat</a></li>
          <li><a href="#search">🔍 Search</a></li>
          <li><a href="#settings">⚙️ Settings</a></li>

          {!isLoggedIn && (
            <>
              <li><a href="#auth">👤 Register</a></li>
              <li><a href="#auth">🔐 Login</a></li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* ================================ */}
      {/* Main Content */}
      {/* ================================ */}
      <div id="home" className="main-content">

        {/* ================================ */}
        {/* Header Section */}
        {/* ================================ */}
        <section className="card section">
          <h1>AI Knowledge Hub</h1>

          <p>
             Organize your notes, search information instantly, and use AI to help answer questions, explain concepts, and support your learning and projects.
          </p>

        </section>

        {/* ================================ */}
        {/* Search Section */}
        {/* ================================ */}
        <section id="search" className="card section">
          <h2>Search</h2>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          <h3>Search Results</h3>

          {hasSearched && searchResults.length === 0 && (
            <p>No results found.</p>
          )}

          {searchResults.map((note, index) => (
            <div key={index} className="note-card">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          ))}
        </section>

        {/* ================================= */}
        {/* AI Semantic Search */}
        {/* ================================= */}

        <div className="semantic-search">

          <h3>AI Semantic Search</h3>

          <input
           type="text"
           placeholder="Ask AI to find related notes..."
           onChange={(e) => handleSemanticSearch(e.target.value)}
          />

        </div>

        {/* ================================= */}
        {/* Semantic Search Results */}
        {/* ================================= */}

        {semanticResults.length > 0 && (
        <div className="semantic-results">

        <h3>AI Related Notes</h3>

        {semanticResults.map((note) => (
        <div key={note.id} className="semantic-note">

        <h4>{note.title}</h4>

        <p>{note.content}</p>

        <small>
          Similarity Score: {note.similarity.toFixed(2)}
        </small>

       </div>
      ))}

      </div>
     )}

        {/* ================================ */}
        {/* Add Note Section */}
        {/* ================================ */}
        <section id="add-note" className="card section">
          <h2>Add Note</h2>

          <form onSubmit={handleAddNote}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />

            <button type="submit">Add</button>
          </form>
        </section>

        {/* ================================ */}
        {/* Notes Section */}
        {/* ================================ */}
        <section id="notes" className="card section">
          <h2>Notes</h2>
          <NoteList notes={notes} />
        </section>

        {/* ================================ */}
        {/* AI Assistant Section */}
        {/* ================================ */}
        <section id="ai-chat">
          <AIAssistant />
        </section>

        {/* ================================ */}
        {/* Authentication Section */}
        {/* ================================ */}
        <section id="auth" className="auth-section">
          {isLoggedIn ? (
            <div>
              <h2>✅ User Logged In</h2>

              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Register />
              <Login />
            </div>
          )}
        </section>

        {/* ================================ */}
        {/* Settings Section */}
        {/* ================================ */}
        <section id="settings" className="card section">
           <h2>⚙️ Settings</h2>

           <p>
             Manage your app preferences and authentication status.
           </p>

           <button
             className="dark-mode-btn"
             onClick={() => setDarkMode(!darkMode)}
           >
            {darkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
           </button>

           <p>
             Status: {isLoggedIn ? "✅ Logged In" : "❌ Not Logged In"}
           </p>

           {isLoggedIn && (
            <button onClick={handleLogout}>
              🚪 Logout
          </button>
         )}
      </section>

      </div>
    </div>
  );
}

// ================================
// Export Home Component
// ================================
export default Home;