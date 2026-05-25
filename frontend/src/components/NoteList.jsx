/*
========================================
NOTE LIST COMPONENT
Displays notes only
========================================
*/

function NoteList({ notes }) {

  // Show message if there are no notes
  if (!notes || notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <div>

      {/* Loop through all notes */}
      {notes.map((note, index) => (
        <div key={index} className="note-card">

          {/* Note title */}
          <h4>{note.title}</h4>

          {/* Note content */}
          <p>{note.content}</p>

        </div>
      ))}

    </div>
  );
}

export default NoteList;