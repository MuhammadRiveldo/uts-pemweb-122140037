import React from 'react';

export default function DataTable({ results, onSelect, onAdd }) {
  return (
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
        {results.map(track => (
          <tr key={track.trackId}>
            <td><img src={track.artworkUrl100} alt="artwork" /></td>
            <td>{track.trackName}</td>
            <td>{track.artistName}</td>
            <td>{track.trackPrice ? `$${track.trackPrice}` : '-'}</td>
            <td>
              {track.previewUrl && (
                <audio controls src={track.previewUrl}></audio>
              )}
            </td>
            <td>
              <button onClick={() => onSelect(track)}>Detail</button>
              <button onClick={() => onAdd(track)}>+ Playlist</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
