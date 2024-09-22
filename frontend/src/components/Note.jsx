import "../styles/Note.css";

function Note({ note, onDelete, onEdit }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("de-DE");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <div className="note-actions">
        <button className="edit-button" onClick={onEdit}>
          <span className="edit-button-span">✏️</span>
        </button>
        <button className="delete-button" onClick={onDelete}>
          <span className="delete-button-span">🗑️</span>
        </button>
        <button className="copy-button">
          <span className="copy-button-span">📑</span>
        </button>
      </div>
    </div>
  );
}

export default Note;
