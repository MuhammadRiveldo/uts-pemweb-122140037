import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import Playlist from "./components/Playlist";
import HeroSection from "./components/HeroSection";
import CategoryCard from "./components/CategoryCard";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [results, setResults] = useState([]); // 🎯 Hasil pencarian dari API
  const searchRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const togglePlaylist = () => setShowPlaylist(!showPlaylist);
  const scrollToSearch = () =>
    searchRef.current.scrollIntoView({ behavior: "smooth" });

  // 💾 Load playlist dari localStorage saat pertama kali render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlist"));
    if (saved) setPlaylist(saved);
  }, []);

  // 💾 Simpan playlist ke localStorage setiap kali playlist berubah
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  // 🎧 Fungsi menambahkan ke playlist
  const addToPlaylist = (track) => {
    if (!playlist.find((item) => item.trackId === track.trackId)) {
      setPlaylist([...playlist, track]);
    }
  };

  // 🔍 Fungsi pencarian ke API iTunes
  const handleSearch = async (keyword, media, sort) => {
    if (!keyword.trim()) return;

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      keyword
    )}&media=${media}&limit=20`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Sorting hasil sesuai pilihan user
      let sortedResults = [...data.results];
      if (sort === "releaseDate") {
        sortedResults.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
      } else if (sort === "trackPrice") {
        sortedResults.sort((a, b) => (b.trackPrice || 0) - (a.trackPrice || 0));
      }

      setResults(sortedResults);
      console.log("🎵 Hasil pencarian:", sortedResults);
    } catch (error) {
      console.error("❌ Gagal mengambil data dari API iTunes:", error);
    }
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        togglePlaylist={togglePlaylist}
      />

      <HeroSection scrollToSearch={scrollToSearch} />

      <div className="category-container">
        <CategoryCard
          icon="🎵"
          title="Music"
          description="Temukan lagu favoritmu"
          color="#7986cb"
        />
        <CategoryCard
          icon="💿"
          title="Album"
          description="Jelajahi album keren"
          color="#9575cd"
        />
        <CategoryCard
          icon="🎙️"
          title="Podcast"
          description="Dengarkan podcast inspiratif"
          color="#ba68c8"
        />
        <CategoryCard
          icon="🎬"
          title="Movie"
          description="Soundtrack film populer"
          color="#64b5f6"
        />
      </div>

      <div ref={searchRef} className="search-area">
        {/* ✅ Kirim fungsi handleSearch */}
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* 🎶 Playlist */}
      <div className={`playlist-container ${showPlaylist ? "show" : "hide"}`}>
        <Playlist playlist={playlist} setPlaylist={setPlaylist} />
      </div>

      {/* 🎧 Hasil pencarian */}
      {results.length > 0 && (
        <div className="results-section">
          <h3>🎶 Hasil Pencarian ({results.length} lagu)</h3>
          <DataTable results={results} onAdd={addToPlaylist} />
        </div>
      )}

      <footer className="footer">© 2025 Music Explorer by Riveldo 🎧</footer>
    </div>
  );
}

export default App;
