import React from 'react';

export default function Playlist({ playlist, onRemove }) {
  if (playlist.length === 0) {
    return <p>🎧 Belum ada lagu di playlist</p>;
  }

  return (
    <div className="playlist">
      <h2>My Playlist</h2>
      {playlist.map(track => (
        <div key={track.trackId} className="playlist-item">
          <img src={track.artworkUrl100} alt={track.trackName} />
          <div>
            <p><b>{track.trackName}</b> - {track.artistName}</p>
            <audio controls src={track.previewUrl}></audio>
          </div>
          <button onClick={() => onRemove(track.trackId)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}
