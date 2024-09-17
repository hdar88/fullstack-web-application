import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import CreateNoteModal from "../components/CreateModal";

function Home() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");

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

  // delete specific note
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Yayy! Deleted Note successfully!");
        else alert("Oops, failed to delete this note.");
        getNotes();
      })
      .catch((error) => alert(error));
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
              <Note note={note} onDelete={deleteNote} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
