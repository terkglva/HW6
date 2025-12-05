// src/services/profileService.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const PROFILES_COLLECTION = 'profiles';

/**
 * Get user profile from Firestore
 */
export async function getProfile(userId) {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
}

/**
 * Update user profile in Firestore
 */
export async function updateProfile(userId, data) {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, userId);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Upload profile picture to Firebase Storage
 */
export async function uploadProfilePicture(userId, blob) {
  try {
    const storageRef = ref(storage, `profile-pictures/${userId}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
}

/**
 * Save profile picture URL to Firestore
 */
export async function saveProfilePictureURL(userId, photoURL) {
  try {
    return await updateProfile(userId, { photoURL });
  } catch (error) {
    console.error('Error saving profile picture URL:', error);
    throw error;
  }
}