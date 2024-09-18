import React, { useState, useEffect } from "react";

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
    // Prepare updated note data
    const updatedNote = {
      title,
      content,
    };
    onUpdate(note.id, updatedNote); // Call onUpdate (editNote) with the updated data
  };

  // Modal toggle logic (added/removed 'active-modal' class to body for styling)
  if (isOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div onClick={onClose} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <label htmlFor="content">Content:</label>
              <br />
              <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <br />
              <input type="submit" value="Submit" />
            </form>
            <button className="close-modal-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditNoteModal;
