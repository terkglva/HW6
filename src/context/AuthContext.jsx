// src/context/AuthContext.jsx (UPDATED)
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; 
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Monitor auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};