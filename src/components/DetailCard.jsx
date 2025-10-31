import React from 'react';

export default function DetailCard({ track }) {
  return (
    <div className="detail-card">
      <img src={track.artworkUrl100} alt={track.trackName} />
      <h2>{track.trackName}</h2>
      <p>Artist: {track.artistName}</p>
      <p>Genre: {track.primaryGenreName}</p>
      <p>Release Date: {new Date(track.releaseDate).toLocaleDateString()}</p>
      <audio controls src={track.previewUrl}></audio>
    </div>
  );
}
