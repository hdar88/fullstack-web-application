import React, { useState } from "react";
import "../styles/CreateModal.css";
import api from "../api";

function CreateNoteModal({ getNotes }) {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
    setTitle("");
    setContent("");
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // create note and set author to currently logged in user
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Yayy! Created Note successfully!");
          setTitle("");
          setContent("");
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
      <button onClick={toggleModal} className="create-button">
        <span className="create-button-span">&#43;</span>
      </button>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={createNote}>
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
                  className="close-create-modal-button"
                  onClick={closeModal}
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

export default CreateNoteModal;
