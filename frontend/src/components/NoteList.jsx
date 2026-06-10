// ================================
// Note List Component
// ================================
// Receives notes from Home.jsx
// Displays each note
// Allows deleting a note
function NoteList({ notes, onDeleteNote }) {
  return (
    <div className="notes-list">

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-card">

            {/* Note Title */}
            <h3>{note.title}</h3>

            {/* Note Content */}
            <p>{note.content}</p>

            {/* Delete Button */}
            <button
              className="delete-btn"
              onClick={() => onDeleteNote(note.id)}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default NoteList;