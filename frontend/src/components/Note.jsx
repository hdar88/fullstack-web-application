import React, { useState } from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onEdit }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const formattedDate = new Date(note.created_at).toLocaleDateString("de-DE");

  const handleDeleteClick = (noteId) => {
    setNoteToDelete(noteId);
    setShowConfirmModal(true); // Show confirmation modal
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      onDelete(noteToDelete); // Call the deleteNote function passed as prop
      setShowConfirmModal(false); // Close modal
    }
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setNoteToDelete(null); // Reset note to delete
  };

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <div className="note-actions">
        <button className="edit-button" onClick={onEdit}>
          &#9998;
        </button>
        <button className="delete-button" onClick={onDelete}>
          &#128465;
        </button>
      </div>
    </div>
  );
}

export default Note;
