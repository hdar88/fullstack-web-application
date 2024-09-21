import React, { useState, useEffect } from "react";
import "../styles/EditModal.css";

function EditNoteModal({ isOpen, note, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Populate modal with note data when the modal is opened
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedNote = {
      title,
      content,
    };
    onUpdate(note.id, updatedNote);
    onClose();
  };

  // Modal toggle logic (added/removed 'active-modal' class to body for styling)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="edit-modal-overlay">
          <div onClick={onClose} className="overlay"></div>
          <div className="edit-modal-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="title" className="form-labels">
                Title:
              </label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <label htmlFor="content" className="form-labels">
                Content:
              </label>
              <br />
              <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <br />
              <div className="form-buttons">
                <button
                  type="button"
                  className="close-edit-modal-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditNoteModal;
