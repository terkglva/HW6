// src/hooks/useImageUpload.js
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { storage, db } from '../firebase';

export function useImageUpload(userId) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Load existing profile picture
  const loadProfilePicture = async () => {
    if (!userId) return;
    
    try {
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfilePicture(data.photoURL || null);
      }
    } catch (err) {
      console.error('Error loading profile picture:', err);
    }
  };

  // Compress image using Web Worker
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('/imageCompressionWorker.js');
      
      worker.postMessage({
        file,
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8
      });

      worker.onmessage = (e) => {
        if (e.data.success) {
          resolve(e.data.blob);
        } else {
          reject(new Error(e.data.error));
        }
        worker.terminate();
      };

      worker.onerror = (err) => {
        reject(err);
        worker.terminate();
      };
    });
  };

  // Upload profile picture
  const uploadProfilePicture = async (file) => {
    if (!userId) {
      setError('User not authenticated');
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      // Compress image using Web Worker
      const compressedBlob = await compressImage(file);

      // Upload to Firebase Storage
      const storageRef = ref(storage, `profile-pictures/${userId}`);
      await uploadBytes(storageRef, compressedBlob);

      // Get download URL
      const photoURL = await getDownloadURL(storageRef);

      // Save URL to Firestore
      const docRef = doc(db, 'profiles', userId);
      await setDoc(docRef, { photoURL }, { merge: true });

      setProfilePicture(photoURL);
      setUploading(false);
      return photoURL;
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
      setUploading(false);
      return null;
    }
  };

  return {
    profilePicture,
    uploading,
    error,
    uploadProfilePicture,
    loadProfilePicture
  };
}