import React from "react";
import "./DetailCard.css";

export default function DetailCard({ track, onClose }) {
  if (!track) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="detail-header">
          <img src={track.artworkUrl100} alt={track.trackName} />
          <div className="detail-info">
            <h2>{track.trackName}</h2>
            <p className="artist">{track.artistName}</p>
            <p className="album">Album: {track.collectionName || "Unknown"}</p>
            <p className="genre">Genre: {track.primaryGenreName || "—"}</p>
            <p className="release">
              Rilis:{" "}
              {track.releaseDate
                ? new Date(track.releaseDate).toLocaleDateString("id-ID")
                : "—"}
            </p>
            <p className="price">
              Harga: {track.trackPrice ? `$${track.trackPrice}` : "Gratis"}
            </p>
          </div>
        </div>

        {track.previewUrl && (
          <div className="detail-audio">
            <p>🎧 Preview Lagu:</p>
            <audio controls src={track.previewUrl}></audio>
          </div>
        )}
      </div>
    </div>
  );
}
