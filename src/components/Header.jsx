import React from "react";
import "./Header.css";

function Header({ darkMode, toggleDarkMode, togglePlaylist }) {
  return (
    <header className={`header ${darkMode ? "dark" : ""}`}>
      <h1 className="logo">🎵 Music Explorer</h1>
      <div className="header-actions">
        <button className="btn-playlist-toggle" onClick={togglePlaylist}>
          🎧 My Playlist
        </button>
        <button className="btn-darkmode" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;
