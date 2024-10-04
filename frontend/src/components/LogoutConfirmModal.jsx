import React, { useEffect } from "react";
import "../styles/LogoutConfirmModal.css";

function LogoutConfirmModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [isOpen]);

  // Handle logout confirmation
  const handleLogout = () => {
    window.location.href = "/logout/";
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="logout-modal-overlay">
          <div onClick={onClose} className="delete-overlay"></div>
          <div className="logout-modal-content">
            <h2>Are you sure you want to logout?</h2>
            <div className="logout-form-buttons">
              <button
                type="button"
                className="close-logout-modal-button"
                onClick={onClose}
              >
                Cancel ❌
              </button>
              <button
                type="button"
                className="confirm-logout-button"
                onClick={handleLogout}
              >
                Yes, logout! ✅
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutConfirmModal;
