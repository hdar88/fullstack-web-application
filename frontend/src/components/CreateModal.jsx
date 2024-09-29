import React, { useState } from "react";
import "../styles/CreateModal.css";
import api from "../api";

function CreateNoteModal({ getNotes, toggleModal, isOpen }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");

  const closeModal = () => {
    toggleModal(false);
    setTitle("");
    setContent("");
  };

  if (isOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // create note and set author to currently logged in user
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title, label })
      .then((res) => {
        if (res.status === 201) {
          alert("Yayy! Created Note successfully!");
          setTitle("");
          setContent("");
          setLabel("");
          closeModal();
          getNotes();
        } else {
          alert("Oops, failed to create note.");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      {isOpen && (
        <div className="create-modal-overlay">
          <div className="create-modal-content">
            <form onSubmit={createNote}>
              <label htmlFor="title" className="create-form-labels">
                <span className="create-form-labels-span"> 🪧 </span>
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
              <label htmlFor="content" className="create-form-labels">
                <span className="create-form-labels-span"> 📝 </span>
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
                <span className="create-form-labels-span"> add label </span>
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
              <div className="create-form-buttons">
                <button
                  type="button"
                  className="close-create-modal-button"
                  onClick={closeModal}
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

export default CreateNoteModal;
