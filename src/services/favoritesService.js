// src/services/favoritesService.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const FAVORITES_COLLECTION = 'favorites';

/**
 * Get user's favorites from Firestore
 */
export async function getFavorites(userId) {
  try {
    const docRef = doc(db, FAVORITES_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
}

/**
 * Save favorites to Firestore
 */
export async function saveFavorites(userId, items) {
  try {
    const docRef = doc(db, FAVORITES_COLLECTION, userId);
    await setDoc(docRef, { items });
    return true;
  } catch (error) {
    console.error('Error saving favorites:', error);
    throw error;
  }
}

/**
 * Get favorites from localStorage (for guests)
 */
export function getLocalFavorites() {
  try {
    const items = localStorage.getItem('favorites');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error getting local favorites:', error);
    return [];
  }
}

/**
 * Save favorites to localStorage (for guests)
 */
export function saveLocalFavorites(items) {
  try {
    localStorage.setItem('favorites', JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Error saving local favorites:', error);
    return false;
  }
}

/**
 * Clear local favorites
 */
export function clearLocalFavorites() {
  try {
    localStorage.removeItem('favorites');
    return true;
  } catch (error) {
    console.error('Error clearing local favorites:', error);
    return false;
  }
}