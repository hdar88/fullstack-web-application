import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import CreateNoteModal from "../components/CreateModal";
import EditNoteModal from "../components/EditModal";

function Home() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // get user name of currently logged in user
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/api/current-user/");
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching current user:", error);
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
      .catch((err) => alert(err));
  };

  // delete note with id
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Yayy! Deleted Note successfully!");
        else alert("Oops, failed to delete this note.");
        getNotes();
      })
      .catch((error) => alert("Oops!An error occured."));
  };

  // Open the edit modal for a specific note
  const openEditModal = (note) => {
    setCurrentNote(note); // Set the note to be edited
    setIsEditModalOpen(true); // Open the modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentNote(null); // Reset the current note after closing
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
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:5173/logout";
  };

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <div>
        <h2>Dashboard</h2>
        <CreateNoteModal getNotes={getNotes}></CreateNoteModal>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Note
                note={note}
                onDelete={deleteNote}
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
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <span>&#8592;</span>
      </button>
    </div>
  );
}

export default Home;
