// src/components/FavoriteButton.jsx
import React from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoriteButton = ({ itemId }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(itemId);

  const buttonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    padding: '5px',
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(itemId);
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;