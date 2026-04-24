function NoteList({ notes }) {
  if (notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <div>
      {notes.map((note, index) => (
        <div key={index} className="card">
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;