import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [media, setMedia] = useState("music");
  const [sort, setSort] = useState("releaseDate");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Pastikan fungsi onSearch dikirim
    if (typeof onSearch === "function") {
      onSearch(keyword.trim(), media, sort);
    } else {
      console.warn("⚠️ Fungsi onSearch belum dikirim dari App.jsx");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Masukkan nama lagu atau artis..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />

      <select value={media} onChange={(e) => setMedia(e.target.value)}>
        <option value="music">Music</option>
        <option value="movie">Movie</option>
        <option value="podcast">Podcast</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="releaseDate">Sort by Release Date</option>
        <option value="trackPrice">Sort by Price</option>
      </select>

      <button type="submit">Cari</button>
    </form>
  );
}
