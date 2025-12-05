// src/services/authService.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

/**
 * Sign up a new user
 */
export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

/**
 * Sign in existing user
 */
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
}

/**
 * Get current user
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password complexity
 * - At least 8 characters
 * - At least one number
 * - At least one special character
 */
export function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }
  
  return { valid: true };
}