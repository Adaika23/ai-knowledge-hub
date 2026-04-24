// 🔹 Import React hooks for state and lifecycle
import { useEffect, useState } from "react";

// 🔹 Import API functions (connect frontend → backend)
import { getNotes, createNote, searchNotes } from "../api/api";

// 🔹 Import UI components
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import AIAssistant from "../components/AIAssistant"; // ✅ ADD THIS

function Home() {

  // 🧠 State to store ALL notes from backend
  const [notes, setNotes] = useState([]);

  // 🔍 State to store SEARCH results
  const [searchResults, setSearchResults] = useState([]);

  // 🔥 Runs once when page loads
  // (like "on start" of the app)
  useEffect(() => {
    loadNotes(); // call function to get notes
  }, []);

  // 📥 Fetch all notes from backend API
  async function loadNotes() {
    try {
      const data = await getNotes(); // call API
      setNotes(data || []); // update state
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  // ➕ Add a new note
  async function handleAddNote(note) {
    try {
      await createNote(note); // send note to backend
      await loadNotes(); // reload notes after adding
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // 🔍 Search notes from backend
  async function handleSearch(query) {
    try {
      const data = await searchNotes(query); // call search API

      // Save results (array of notes)
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]); // reset if error
    }
  }

  // 🎨 UI rendering starts here
  return (
    <div className="container">

      {/* 🧾 App Title */}
      <h1>AI Knowledge Hub</h1>

      {/* 🔍 Search input component */}
      <SearchBar onSearch={handleSearch} />

      {/* 🔎 Search Results Section */}
      <h3 className="section">Search Results</h3>

      {/* ⚠️ If no results → show message */}
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        // 🔁 Loop through results and display each note
        searchResults.map((note, index) => (
          <div key={index} className="card">
            <h4>{note.title}</h4>
            <p>{note.content}</p>
          </div>
        ))
      )}

      {/* ➕ Add Note Form */}
      <NoteForm onAddNote={handleAddNote} />

      {/* 📚 All Notes Section */}
      <h3 className="section">Notes</h3>

      {/* 📄 Display all notes */}
      <NoteList notes={notes} />
       
       <AIAssistant />
    </div>
  );
}

// 🔹 Export component so App.jsx can use it
export default Home;