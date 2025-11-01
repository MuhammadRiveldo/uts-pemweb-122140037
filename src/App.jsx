import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import DetailCard from "./components/DetailCard";
import Playlist from "./components/Playlist";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [playlist, setPlaylist] = useState(() => {
    return JSON.parse(localStorage.getItem("playlist")) || [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const searchMusic = async (keyword, mediaType, sortBy) => {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${keyword}&media=${mediaType}&limit=20`
    );
    const data = await res.json();

    let sorted = data.results.sort((a, b) => {
      if (sortBy === "releaseDate") {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      } else if (sortBy === "trackPrice") {
        return (b.trackPrice || 0) - (a.trackPrice || 0);
      }
      return 0;
    });

    setResults(sorted);
  };

  const addToPlaylist = (track) => {
    if (!playlist.find((item) => item.trackId === track.trackId)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeFromPlaylist = (id) => {
    setPlaylist(playlist.filter((item) => item.trackId !== id));
  };

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const togglePlaylist = () => setShowPlaylist(!showPlaylist);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        togglePlaylist={togglePlaylist}
      />
      <SearchForm onSearch={searchMusic} />

      {/* Transisi munculnya playlist */}
      <div className={`playlist-container ${showPlaylist ? "show" : "hide"}`}>
        <Playlist playlist={playlist} onRemove={removeFromPlaylist} />
      </div>

      {results.length > 0 && (
        <>
          <DataTable results={results} onSelect={setSelected} onAdd={addToPlaylist} />
          {selected && <DetailCard track={selected} />}
        </>
      )}
    </div>
  );
}

export default App;
