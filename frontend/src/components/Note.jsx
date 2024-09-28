import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Note.css";

function Note({ note, onDelete, onEdit, onUpdateNote }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("de-DE");
  const [isFavorited, setIsFavorited] = useState(note.is_favorited);

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    try {
      const response = await api.put(`/api/notes/favorite/${note.id}/`);
      console.log(response.data);
      setIsFavorited(response.data.is_favorited);
      onUpdateNote(response.data);
    } catch (error) {
      console.error("Error updating favorite status:", error.response.data);
    }
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
      <p className="note-content">{note.content}</p>
      <div className="note-labels-container">
        <p className="note-date">{formattedDate}</p>
        <p className="note-label">label tbd</p>
      </div>
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
