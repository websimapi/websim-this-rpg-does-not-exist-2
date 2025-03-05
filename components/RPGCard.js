import React from 'react';

export const RPGCard = ({ rpg, onImageClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="rpg-card">
      <img 
        src={rpg.imageUrl} 
        alt={`${rpg.title} cover art`} 
        className="rpg-image"
        onClick={() => onImageClick(rpg.imageUrl)}
      />
      <div className="rpg-content">
        <h3 className="rpg-title">{rpg.title}</h3>
        <div className="rpg-genre">{rpg.genre}</div>
        <p className="rpg-description">{rpg.tagline}</p>
        
        <div className="themes">
          {rpg.themes?.map((theme, index) => (
            <span key={index} className="badge">{theme}</span>
          ))}
        </div>
        
        <details className="rpg-details">
          <summary>Game Details</summary>
          <div>
            <strong>Setting:</strong> {rpg.setting}
          </div>
          <div>
            <strong>Characters:</strong> {rpg.characters}
          </div>
          <div>
            <strong>Mechanics:</strong> {rpg.mechanics}
          </div>
          <p>{rpg.description}</p>
        </details>
        
        <p className="created-by">
          Created by {rpg.username || 'Anonymous'} on {formatDate(rpg.timestamp)}
        </p>
      </div>
    </div>
  );
};

