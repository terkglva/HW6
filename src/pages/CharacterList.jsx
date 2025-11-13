// src/pages/CharacterList.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import { getAll } from '../services/itemsService'; // Импортируем из нового сервиса

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Получаем значение поиска из URL (?name=...)
    const currentQuery = searchParams.get('q') || '';

    useEffect(() => {
        setLoading(true);
        setError(null);

        getAll(currentQuery)
            .then(data => {
                setCharacters(data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load characters. " + err.message);
                setLoading(false);
            });
    }, [currentQuery]); // Перезагружаем при изменении запроса

    const handleSearchChange = (event) => {
        // Устанавливаем параметр 'q' в URL
        const newQuery = event.target.value;
        if (newQuery) {
            setSearchParams({ q: newQuery });
        } else {
            setSearchParams({}); // Очищаем параметр, если поле пустое
        }
    };

    // --- Отображение состояний ---
    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorBox message={error} />;
    }
    
    // --- Основной рендер ---
    return (
        <div className="character-list-page">
            <div className="list-header">
                <h2>Dimensional Character Roster</h2>
                
                {/* Инпут поиска, привязанный к URL */}
                <input 
                    type="text" 
                    placeholder="Search by name (e.g., Rick Sanchez)"
                    value={currentQuery}
                    onChange={handleSearchChange}
                    className="search-input" // Добавим стиль для этого инпута в index.css
                />

                <p style={{color: 'var(--color-text-dim)', marginTop: '15px'}}>
                    {characters.length === 0 && currentQuery 
                        ? `No results found for "${currentQuery}".`
                        : `${characters.length} entities found across all known dimensions.`
                    }
                </p>
            </div>

            <div className="character-grid">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </div>
    );
};

export default CharacterList;