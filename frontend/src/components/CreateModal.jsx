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
          // Reset form and close modal after success
          setTitle("");
          setContent("");
          // Reload notes list
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
        Create Note
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={createNote}>
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
            <button className="close-modal-button" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNoteModal;
