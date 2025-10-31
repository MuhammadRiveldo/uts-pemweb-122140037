import React from "react";
import "./Dashboard.css";

export default function Dashboard({ onStart }) {
  return (
    <section className="dashboard">
      <div className="dashboard-content">
        <h1>🎧 Music Explorer</h1>
        <p>
          Temukan musik, album, dan artis favoritmu dari seluruh dunia!  
          Jelajahi preview lagu dan buat playlist pribadi dengan mudah.
        </p>
        <button onClick={onStart}>Mulai Eksplorasi Musik</button>
      </div>

      <div className="dashboard-image">
        <img
          src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
          alt="Music Illustration"
        />
      </div>
    </section>
  );
}
