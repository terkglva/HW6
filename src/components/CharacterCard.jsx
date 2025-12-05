// src/components/CharacterCard.jsx (UPDATED)
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const CharacterCard = ({ character }) => {
    const statusClass = `status-${character.status.replace(/\s/g, '')}`;

    return (
        <div style={{ position: 'relative' }}>
            <Link to={`/items/${character.id}`} className="character-card">
                <img src={character.image} alt={character.name} />
                <div className="card-info">
                    <h3>{character.name}</h3>
                    
                    <span className={`card-status ${statusClass}`}>
                        {character.status}
                    </span>

                    <p>Species: {character.species}</p>
                    <p>Origin: {character.origin.name}</p>
                </div>
            </Link>
            
            {/* Favorite Button */}
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10
            }}>
                <FavoriteButton itemId={character.id} />
            </div>
        </div>
    );
};

export default CharacterCard;