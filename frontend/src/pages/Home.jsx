import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import CreateNoteModal from "../components/CreateModal";
import EditNoteModal from "../components/EditModal";
import DeleteNoteModal from "../components/DeleteModal";

function Home() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // get user name of currently logged in user
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/api/current-user/");
      setUsername(response.data.username);
    } catch (error) {
      alert("Oops! An error occurred");
      console.log("Error fetching current user:", error);
    }
  };

  // get notes of currently logged in user
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => {
        alert("Oops! An error occurred");
        console.log(err);
      });
  };

  // delete note with id
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Yayy! Deleted Note successfully!");
        else alert("Oops, failed to delete this note.");
        getNotes();
        closeDeleteModal();
      })
      .catch((error) => alert("Oops!An error occured."));
  };

  // Open the edit modal for a specific note
  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentNote(null);
  };

  // edit note with id
  const editNote = (id, updatedData) => {
    api
      .put(`/api/notes/edit/${id}/`, updatedData)
      .then((res) => {
        if (res.status === 200) {
          alert("Yayy! Edited Note successfully!");
          getNotes(); // Refresh the notes after update
          closeEditModal(); // Close the modal after editing
        } else {
          alert("Oops, failed to edit this note.");
        }
      })
      .catch((error) => alert("Oops! An error occurred."));
    console.log(error);
  };

  const openDeleteModal = (note) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:5173/logout";
  };

  return (
    <div className="home-container">
      <h1>Welcome, {username}</h1>
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="dashboard-content">
          <div className="dashboard-sidebar-container">
            <aside className="dashboard-sidebar">
              <nav>
                <ul>
                  <li>
                    <button className="sidebar-home-button">
                      <span className="sidebar-home-button-span">
                        &#127968;
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="sidebar-pinned-button">
                      <span className="sidebar-pinned-button-span">
                        &#128206;
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="sidebar-archive-button">
                      <span className="sidebar-archive-button-span">
                        &#128230;
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
              <hr />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <nav>
                <ul>
                  <li>
                    <button className="sidebar-settings-button">
                      <span className="sidebar-settings-button-span">
                        &#9881;
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="sidebar-help-button">
                      <span className="sidebar-help-button-span">&#63;</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="sidebar-logout-button"
                      onClick={handleLogout}
                    >
                      <span className="sidebar-logout-button-span">
                        &#8592;
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>

          <div className="notes-list-container">
            <CreateNoteModal getNotes={getNotes}>
              <button className="create-button">+</button>
            </CreateNoteModal>
            <ul className="notes-list">
              {notes.map((note) => (
                <li key={note.id}>
                  <Note
                    note={note}
                    onDelete={() => openDeleteModal(note)}
                    onEdit={() => openEditModal(note)}
                  />
                </li>
              ))}
            </ul>

            {isEditModalOpen && (
              <EditNoteModal
                isOpen={isEditModalOpen}
                note={currentNote}
                onClose={closeEditModal}
                onUpdate={editNote}
              />
            )}

            {isDeleteModalOpen && (
              <DeleteNoteModal
                isOpen={isDeleteModalOpen}
                note={noteToDelete}
                onClose={closeDeleteModal}
                onDelete={() => deleteNote(noteToDelete.id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
