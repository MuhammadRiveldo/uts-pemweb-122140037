import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import DetailCard from "./components/DetailCard";
import Playlist from "./components/Playlist";
import HeroSection from "./components/HeroSection";
import CategoryCard from "./components/CategoryCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  

  const searchRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const togglePlaylist = () => setShowPlaylist(!showPlaylist);
  const scrollToSearch = () => searchRef.current?.scrollIntoView({ behavior: "smooth" });

  // Load playlist dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlist"));
    if (saved) setPlaylist(saved);
  }, []);

  // Simpan playlist ke localStorage
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = (track) => {
    if (!playlist.find((item) => item.trackId === track.trackId)) {
      setPlaylist([...playlist, track]);
    }
  };
  
  const handleSearch = async (keyword, media, sort) => {
    if (!keyword.trim()) return;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(keyword)}&media=${media}&limit=20`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      let sortedResults = [...data.results];
      if (sort === "releaseDate") {
        sortedResults.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      } else if (sort === "trackPrice") {
        sortedResults.sort((a, b) => (b.trackPrice || 0) - (a.trackPrice || 0));
      }

      setResults(sortedResults);
    } catch (error) {
      console.error("❌ Gagal mengambil data dari API iTunes:", error);
    }
  };

  const handleCloseDetail = () => setSelectedTrack(null);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      {/* 🔝 Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        togglePlaylist={togglePlaylist}
      />

      {/* 🌅 Hero Section */}
      <HeroSection scrollToSearch={scrollToSearch} />

      {/* 🧩 Kategori */}
      <div className="category-container">
        <CategoryCard icon="🎵" title="Music" description="Temukan lagu favoritmu" color="#7986cb" />
        <CategoryCard icon="💿" title="Album" description="Jelajahi album keren" color="#9575cd" />
        <CategoryCard icon="🎙️" title="Podcast" description="Dengarkan podcast inspiratif" color="#ba68c8" />
      </div>

      {/* 🔍 Pencarian */}
      <div ref={searchRef} className="search-area">
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* 🎧 Hasil pencarian */}
      {results.length > 0 && (
        <div className="results-section">
          <h3>🎶 Hasil Pencarian ({results.length} lagu)</h3>
          <DataTable results={results} onSelect={setSelectedTrack} onAdd={addToPlaylist} />
        </div>
      )}
      
      {/* 🎵 Overlay Playlist */}
      <div className={`playlist-overlay ${showPlaylist ? "show" : ""}`}>
        <div className="playlist-popup">
          <button className="close-btn" onClick={togglePlaylist}>✖</button>
          <h2>🎧 My Playlist</h2>
          {playlist.length > 0 ? (
            <Playlist playlist={playlist} setPlaylist={setPlaylist} />
          ) : (
            <p style={{ textAlign: "center", padding: "1rem" }}>Belum ada lagu di playlistmu 😔</p>
          )}
        </div>
      </div>

      {/* Detail Lagu */}
      {selectedTrack && <DetailCard track={selectedTrack} onClose={handleCloseDetail} />}

      <footer className="footer">© 2025 Music Explorer by Riveldo 🎧</footer>
      <ToastContainer />
    </div>
  );
}

export default App;
