import React, { useEffect } from "react";
import "../styles/DeleteModal.css";

function DeleteNoteModal({ isOpen, note, onClose, onDelete }) {
  // Modal toggle logic (added/removed 'active-modal' class to body for styling)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [isOpen]);

  // Handle delete confirmation
  const handleDelete = () => {
    onDelete(note.id);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="delete-modal-overlay">
          <div onClick={onClose} className="delete-overlay"></div>
          <div className="delete-modal-content">
            <h2>Are you sure you want to delete this note?</h2>
            <div className="delete-form-buttons">
              <button
                type="button"
                className="close-delete-modal-button"
                onClick={onClose}
              >
                Cancel ❌
              </button>
              <button
                type="button"
                className="confirm-delete-button"
                onClick={handleDelete}
              >
                Yes, Delete! ✅
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteNoteModal;
