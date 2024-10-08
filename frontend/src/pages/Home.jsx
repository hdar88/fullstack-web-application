import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import CreateNoteModal from "../components/CreateModal";
import EditNoteModal from "../components/EditModal";
import DeleteNoteModal from "../components/DeleteModal";
import LogoutConfirmModal from "../components/LogoutConfirmModal";

function Home() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLabelSearchOpen, setIsLabelSearchOpen] = useState(false);
  const [labelSearch, setLabelSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme === "true";
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
          getNotes();
          closeEditModal();
        } else {
          alert("Oops, failed to edit this note.");
        }
      })
      .catch((error) => {
        alert("Oops! An error occurred.");
        console.log(error);
      });
  };

  const openDeleteModal = (note) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // handle filter menu visibility
  const handleFilterMenuVisibility = () => {
    setIsFilterMenuOpen((prev) => !prev);
  };

  // Use filteredNotes based on the showFavorites state
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isFavorite = showFavorites ? note.is_favorited : true;
    const matchesLabel = labelSearch
      ? note.label &&
        note.label.toLowerCase().includes(labelSearch.toLowerCase())
      : true;

    return matchesSearch && isFavorite && matchesLabel;
  });

  // helper to update favorite status of note immediately
  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...note, is_favorited: updatedNote.is_favorited }
          : note
      )
    );
  };

  // handle filter button
  const filterByFavorite = () => {
    setShowFavorites((prev) => !prev);
  };

  // handle filter button
  const handleLabelSearchVisibility = () => {
    setIsLabelSearchOpen((prev) => !prev);
  };

  // Function to filter notes by label
  const filterByLabel = (label) => {
    setLabelSearch(label);
  };

  // Handle label search submit
  const handleLabelSearchSubmit = (e) => {
    e.preventDefault();
    filterByLabel(labelSearch);
  };

  // function to clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setLabelSearch("");
    setShowFavorites(false);
    setIsFilterMenuOpen(false);
  };

  // updating theme mode from local storage
  useEffect(() => {
    const body = document.body;
    const darkModeIcon = document.getElementById("darkmode-icon");

    if (isDarkMode) {
      body.classList.add("dark-mode");
      darkModeIcon.textContent = "🌙";
    } else {
      body.classList.remove("dark-mode");
      darkModeIcon.textContent = "🌒";
    }

    localStorage.setItem("darkMode", isDarkMode);
    console.log(localStorage.getItem("darkMode"));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="home-container">
      <div className="dashboard-header-container">
        <div className="dashboard-header">
          <h1 className="dashboard-header-span">Welcome, {username} 👋</h1>
        </div>
        <div className="dashboard-options-header">
          <div className="dashboard-filter-button-container">
            <button className="dashboard-filter-button">
              <span
                className="dashboard-filter-button-span"
                onClick={handleFilterMenuVisibility}
              >
                📚
              </span>
            </button>
            {isFilterMenuOpen && (
              <div className="filter-menu-container">
                <div className="filter-by-favorite">
                  <span
                    className="filter-by-favorite-span"
                    onClick={filterByFavorite}
                  >
                    ⭐️
                  </span>
                </div>
                <div className="filter-by-label">
                  <span
                    className="filter-by-label-span"
                    onClick={handleLabelSearchVisibility}
                  >
                    🏷️
                  </span>
                  {isLabelSearchOpen && (
                    <div className="dashboard-label-search-container">
                      <form onSubmit={handleLabelSearchSubmit}>
                        <input
                          className="dashboard-label-search"
                          placeholder="Search for label..."
                          value={labelSearch}
                          onChange={(e) => setLabelSearch(e.target.value)}
                        />
                      </form>
                    </div>
                  )}
                  <button
                    className="clear-filters-dashboard-button"
                    onClick={clearAllFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="dashboard-search-container">
            <input
              type="text"
              className="dashboard-search-input-field"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="search-icon">🔎</span>
          </div>
          <button
            className="create-note-button"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <span className="create-note-button-span">+</span>
          </button>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-sidebar-container">
            <aside className="dashboard-sidebar">
              <nav>
                <ul>
                  <li>
                    <button className="sidebar-home-button">
                      <span className="sidebar-home-button-span">🏠</span>
                    </button>
                  </li>
                  <li>
                    <button className="sidebar-pinned-button">
                      <span className="sidebar-pinned-button-span">📌</span>
                    </button>
                  </li>
                  <li>
                    <button className="sidebar-archive-button">
                      <span className="sidebar-archive-button-span">🗂️</span>
                    </button>
                  </li>
                </ul>
              </nav>
              <br />
              <br />
              <hr />
              <nav>
                <ul>
                  <li>
                    <button className="sidebar-help-button">
                      <span className="sidebar-help-button-span">❓</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="sidebar-darkmode-button"
                      onClick={toggleDarkMode}
                    >
                      <span
                        id="darkmode-icon"
                        className="sidebar-darkmode-button-span"
                      >
                        🌒
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="sidebar-settings-button">
                      <span className="sidebar-settings-button-span">⚙️</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="sidebar-logout-button"
                      onClick={openLogoutModal}
                    >
                      <span className="sidebar-logout-button-span">🚪</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>

          <div className="notes-list-container">
            <ul className="notes-list">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <li key={note.id}>
                    <Note
                      note={note}
                      onDelete={() => openDeleteModal(note)}
                      onEdit={() => openEditModal(note)}
                      onUpdateNote={updateNote}
                    />
                  </li>
                ))
              ) : (
                <div className="no-notes-found-div">
                  <span className="no-notes-found-span">
                    Oops!
                    <br /> No notes found 🫠
                  </span>
                </div>
              )}
            </ul>

            <CreateNoteModal
              isOpen={isCreateModalOpen}
              toggleModal={setIsCreateModalOpen}
              getNotes={getNotes}
            />

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
      {isLogoutModalOpen && (
        <LogoutConfirmModal
          isOpen={isLogoutModalOpen}
          onClose={closeLogoutModal}
        />
      )}
    </div>
  );
}

export default Home;
