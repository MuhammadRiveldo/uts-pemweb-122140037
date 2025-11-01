import React from "react";

function Playlist({ playlist = [], setPlaylist }) {
  // Jika playlist belum ada atau kosong
  if (!playlist || playlist.length === 0) {
    return (
      <div className="playlist-empty">
        <h3>🎶 My Playlist</h3>
        <p>Belum ada lagu di playlist kamu.</p>
      </div>
    );
  }

  const handleRemove = (trackId) => {
    const updated = playlist.filter((item) => item.trackId !== trackId);
    setPlaylist(updated);
  };

  return (
    <div className="playlist">
      <h3>🎶 My Playlist</h3>
      {playlist.map((item) => (
        <div key={item.trackId} className="playlist-item">
          <img src={item.artworkUrl100} alt={item.trackName} />
          <div className="playlist-info">
            <strong>{item.trackName}</strong> - {item.artistName}
            <audio controls src={item.previewUrl}></audio>
          </div>
          <button onClick={() => handleRemove(item.trackId)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}

export default Playlist;
