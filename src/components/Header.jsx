import React from "react";
import "./Header.css";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <h2>🎵 Music Explorer</h2>
      <button className="dark-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}
