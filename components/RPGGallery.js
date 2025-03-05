import React from 'react';
import { RPGCard } from './RPGCard.js';

export const RPGGallery = ({ rpgs, loading }) => {
  const [viewMode, setViewMode] = React.useState('all');
  const [selectedImage, setSelectedImage] = React.useState(null);
  
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };
  
  // Sort RPGs by timestamp (newest first)
  const sortedRpgs = [...rpgs].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">RPG Gallery</h2>
      
      <div className="tabs">
        <button 
          className={`tab ${viewMode === 'all' ? 'active' : ''}`} 
          onClick={() => setViewMode('all')}>
          All RPGs
        </button>
        <button 
          className={`tab ${viewMode === 'fantasy' ? 'active' : ''}`} 
          onClick={() => setViewMode('fantasy')}>
          Fantasy
        </button>
        <button 
          className={`tab ${viewMode === 'sci-fi' ? 'active' : ''}`} 
          onClick={() => setViewMode('sci-fi')}>
          Sci-Fi
        </button>
        <button 
          className={`tab ${viewMode === 'other' ? 'active' : ''}`} 
          onClick={() => setViewMode('other')}>
          Other Genres
        </button>
      </div>
      
      {loading ? (
        <div className="loading">
          <span className="spinner"></span>
          Loading RPGs...
        </div>
      ) : sortedRpgs.length === 0 ? (
        <p>No RPGs created yet. Be the first to create one!</p>
      ) : (
        <div className="gallery-grid">
          {sortedRpgs
            .filter(rpg => {
              if (viewMode === 'all') return true;
              if (viewMode === 'fantasy') return rpg.genre.toLowerCase().includes('fantasy');
              if (viewMode === 'sci-fi') return rpg.genre.toLowerCase().includes('sci-fi') || rpg.genre.toLowerCase().includes('science fiction');
              if (viewMode === 'other') return !rpg.genre.toLowerCase().includes('fantasy') && 
                                             !rpg.genre.toLowerCase().includes('sci-fi') && 
                                             !rpg.genre.toLowerCase().includes('science fiction');
              return true;
            })
            .map((rpg, index) => (
              <RPGCard key={index} rpg={rpg} onImageClick={handleImageClick} />
            ))}
        </div>
      )}
      
      {selectedImage && (
        <div className="full-image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="RPG Cover Art" className="modal-image" />
            <button className="close-modal" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

