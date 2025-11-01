import React from "react";
import "./DataTable.css";

export default function DataTable({ results = [], onSelect, onAdd }) {
  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <p>🔍 Tidak ada hasil ditemukan. Coba kata kunci lain!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="result-table">
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Track Name</th>
            <th>Artist</th>
            <th>Price</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((track) => (
            <tr key={track.trackId}>
              <td>
                <img
                  src={track.artworkUrl100}
                  alt={track.trackName}
                  className="artwork"
                />
              </td>
              <td>{track.trackName || "-"}</td>
              <td>{track.artistName || "-"}</td>
              <td>{track.trackPrice ? `$${track.trackPrice}` : "-"}</td>
              <td>
                {track.previewUrl ? (
                  <audio controls src={track.previewUrl}></audio>
                ) : (
                  <span>-</span>
                )}
              </td>
              <td>
                <button className="btn-detail" onClick={() => onSelect?.(track)}>
                  Detail
                </button>
                <button className="btn-add" onClick={() => onAdd?.(track)}>
                  + Playlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
