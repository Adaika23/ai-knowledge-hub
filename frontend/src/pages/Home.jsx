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
// Import UI Components
// ================================
import NoteList from "../components/NoteList";
import AIAssistant from "../components/AIAssistant";
import SemanticSearch from "../components/SemanticSearch";
import DocumentUpload from "../components/DocumentUpload";
import DocumentList from "../components/DocumentList";

// ================================
// Import API Functions
// ================================
import {
  getNotes,
  createNote,
  searchNotes,
  deleteNote,
} from "../api/api";

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
  const [showRegister, setShowRegister] = useState(false);

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

  // ================================
  // Check Login Status When Page Opens
  // ================================
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      loadNotes();
    }
  }, []);

  // ================================
  // Load Notes From Backend
  // ================================
  async function loadNotes() {
    try {
      const data = await getNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading notes:", error);
      setNotes([]);
    }
  }

  // ================================
  // Handle Login Success
  // ================================
  function handleLoginSuccess() {
    setIsLoggedIn(true);
    loadNotes();
  }

  // ================================
  // Handle Logout
  // ================================
  function handleLogout() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setNotes([]);
    setSearchResults([]);
    setHasSearched(false);
    setTitle("");
    setContent("");
  }

  // ================================
  // Handle Regular Search
  // ================================
  async function handleSearch(event) {
    event.preventDefault();

    try {
      setHasSearched(true);

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
  // Handle Add Note
  // ================================
  async function handleAddNote(event) {
    event.preventDefault();

    try {
      if (!title.trim() || !content.trim()) {
        alert("Please enter both title and content.");
        return;
      }

      await createNote({
        title,
        content,
      });

      setTitle("");
      setContent("");

      await loadNotes();

      setSearchResults([]);
      setHasSearched(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // ================================
  // Handle Delete Note
  // ================================
  async function handleDeleteNote(noteId) {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this note?"
      );

      if (!confirmDelete) {
        return;
      }

      await deleteNote(noteId);
      await loadNotes();

      setSearchResults([]);
      setHasSearched(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // ================================
  // Login/Register Entry Page
  // ================================
  if (!isLoggedIn) {
   return (
     <div className={darkMode ? "auth-page dark" : "auth-page"}>

       <section className="card section auth-card">

         <div className="auth-layout">

           {/* Left Side Welcome Panel */}
           <div className="auth-left">
             <h1>🧠 AI Knowledge Hub</h1>

             <p>
               Save notes, search your knowledge,
               ask AI questions, and discover information
               using semantic search.
             </p>

             <p>
               Securely store your knowledge and
               access it anywhere.
             </p>
           </div>

           {/* Right Side Login/Register */}
           <div className="auth-right">
             {showRegister ? (
               <Register onBackToLogin={() => setShowRegister(false)} />
             ) : (
               <Login
                 onLoginSuccess={handleLoginSuccess}
                 onCreateAccount={() => setShowRegister(true)}
               />
             )}
           </div>

         </div>

       </section>

     </div>
    );
  }

  // ================================
  // Main Dashboard After Login
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
          <li><a href="#add-note">➕ Add Note</a></li>
          <li><a href="#notes">📝 Notes</a></li>
          <li><a href="#search">🔍 Search</a></li>
          <li><a href="#semantic-search">🧠 Semantic Search</a></li>
          <li><a href="#upload-document">📄 Upload Document</a></li>   {/* NEW */}
          <li><a href="#ai-chat">🤖 AI Chat</a></li>
          <li><a href="#settings">⚙️ Settings</a></li>
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
            Organize your notes, search information instantly, and use AI to
            answer questions, explain concepts, and support your learning and
            projects.
          </p>
        </section>

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

          <NoteList
            notes={notes}
            onDeleteNote={handleDeleteNote}
          />
        </section>

        {/* ================================ */}
        {/* Regular Search Section */}
        {/* ================================ */}
        <section id="search" className="card section">
          <h2>Search</h2>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search notes by keyword..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          <h3>Search Results</h3>

          {hasSearched && searchResults.length === 0 && (
            <p>No results found.</p>
          )}

          {searchResults.map((note) => (
            <div key={note.id} className="note-card">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          ))}
        </section>

        {/* ================================ */}
        {/* Semantic Search Section */}
        {/* ================================ */}
        <section id="semantic-search" className="card section">
          <SemanticSearch />
        </section>
        {/*DocumentUpload Section */}
        <div id="upload-document">
          <DocumentUpload />
          <DocumentList />
        </div>
        
        {/* ================================ */}
        {/* AI Assistant Section */}
        {/* ================================ */}
        <section id="ai-chat" className="card section">
          <AIAssistant />
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

          <p>Status: ✅ Logged In</p>

          <button onClick={handleLogout}>
            🚪 Logout
          </button>
        </section>
      </div>
    </div>
  );
}

// ================================
// Export Home Component
// ================================
export default Home;