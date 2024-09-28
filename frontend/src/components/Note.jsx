import { useState } from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onEdit }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("de-DE");
  const [isFavorited, setIsFavorited] = useState(false);

  // handle favourite tag of note
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="note-container">
      <div className="note-header">
        <p className="note-title">{note.title}</p>
        <button
          className={`note-fav-button ${isFavorited ? "favorited" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorited ? "⭐" : "☆"}
        </button>{" "}
      </div>
      <p className="note-label">label tbd</p>
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
