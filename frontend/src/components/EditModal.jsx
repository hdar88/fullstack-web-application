import React, { useState, useEffect } from "react";
import "../styles/EditModal.css";

function EditNoteModal({ isOpen, note, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [label, setLabel] = useState("");

  // Populate modal with note data when the modal is opened
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setLabel(note.label);
    }
  }, [note]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedNote = {
      title,
      content,
      label,
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
              <label htmlFor="title" className="edit-form-labels">
                <span className="edit-form-labels-span"> 🪧 </span>
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
              <label htmlFor="content" className="edit-form-labels">
                <span className="edit-form-labels-span"> 📝 </span>
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
              <label htmlFor="label" className="create-form-labels">
                <span className="create-form-labels-span"> 🏷️ </span>
              </label>
              <br />
              <input
                type="text"
                id="label"
                name="label"
                onChange={(e) => setLabel(e.target.value)}
                value={label}
              />
              <br />
              <div className="edit-form-buttons">
                <button
                  type="button"
                  className="close-edit-modal-button"
                  onClick={onClose}
                >
                  ❌
                </button>
                <input type="submit" value="✅" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditNoteModal;
