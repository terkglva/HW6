// src/hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mergeMessage, setMergeMessage] = useState(null);

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      
      if (user) {
        // Load from Firestore for logged-in users
        try {
          const docRef = doc(db, 'favorites', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const serverFavorites = docSnap.data().items || [];
            
            // Check for local favorites to merge
            const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            if (localFavorites.length > 0) {
              // Merge: combine and remove duplicates
              const merged = [...new Set([...serverFavorites, ...localFavorites])];
              setFavorites(merged);
              
              // Save merged to Firestore
              await setDoc(docRef, { items: merged });
              
              // Clear local storage
              localStorage.removeItem('favorites');
              
              // Show merge message
              setMergeMessage('Your local favorites were merged with your account.');
              setTimeout(() => setMergeMessage(null), 5000);
            } else {
              setFavorites(serverFavorites);
            }
          } else {
            // No server data, check local
            const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (localFavorites.length > 0) {
              setFavorites(localFavorites);
              await setDoc(docRef, { items: localFavorites });
              localStorage.removeItem('favorites');
            }
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      } else {
        // Load from localStorage for guests
        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(localFavorites);
      }
      
      setLoading(false);
    };

    loadFavorites();
  }, [user]);

  // Add to favorites
  const addFavorite = useCallback(async (itemId) => {
    const newFavorites = [...favorites, itemId];
    setFavorites(newFavorites);

    if (user) {
      // Save to Firestore
      try {
        const docRef = doc(db, 'favorites', user.uid);
        await setDoc(docRef, { items: newFavorites });
      } catch (error) {
        console.error('Error saving favorite:', error);
      }
    } else {
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  }, [favorites, user]);

  // Remove from favorites
  const removeFavorite = useCallback(async (itemId) => {
    const newFavorites = favorites.filter(id => id !== itemId);
    setFavorites(newFavorites);

    if (user) {
      // Save to Firestore
      try {
        const docRef = doc(db, 'favorites', user.uid);
        await setDoc(docRef, { items: newFavorites });
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    } else {
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  }, [favorites, user]);

  // Toggle favorite
  const toggleFavorite = useCallback((itemId) => {
    if (favorites.includes(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Check if item is favorite
  const isFavorite = useCallback((itemId) => {
    return favorites.includes(itemId);
  }, [favorites]);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    mergeMessage
  };
}