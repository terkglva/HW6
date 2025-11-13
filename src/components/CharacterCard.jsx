// components/CharacterCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
    // Получаем класс для стилизации статуса из index.css
    const statusClass = `status-${character.status.replace(/\s/g, '')}`;

    return (
        <Link to={`/characters/${character.id}`} className="character-card">
            <img src={character.image} alt={character.name} />
            <div className="card-info">
                <h3>{character.name}</h3>
                
                {/* Динамический статус с классом */}
                <span className={`card-status ${statusClass}`}>
                    {character.status}
                </span>

                <p>Species: {character.species}</p>
                <p>Origin: {character.origin.name}</p>
            </div>
        </Link>
    );
};

export default CharacterCard;