import React from "react";
import "./HeroSection.css";

function HeroSection({ scrollToSearch }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>🎧 Music Explorer</h1>
        <p>
          Temukan musik, album, dan artis favoritmu dari seluruh dunia!  
          Jelajahi preview lagu dan buat playlist pribadi dengan mudah.
        </p>
        <button className="btn-explore" onClick={scrollToSearch}>
          Mulai Eksplorasi Musik
        </button>
      </div>
      <div className="hero-graphic"></div>
    </section>
  );
}

export default HeroSection;
