import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ icon, title, description, color }) => {
  return (
    <div className="category-card" style={{ background: color }}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CategoryCard;
