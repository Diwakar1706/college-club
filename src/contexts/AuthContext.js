import React, { useState, useEffect, createContext, useContext } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInAnonymously,
    signInWithCustomToken
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import auth from your firebaseConfig

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (!auth) {
            setLoadingAuth(false);
            console.error("Firebase Auth is not initialized in AuthContext.");
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserId(user.uid);
                // In a real app, you would fetch custom claims or query Firestore
                // to determine if the user is a coordinator.
                // For now, coordinator status is set during login.
            } else {
                try {
                    // Check for __initial_auth_token which might be provided by the Canvas environment
                    // Access it from the window object if it's a global variable
                    const initialAuthToken = window.__initial_auth_token || null;

                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                } catch (error) {
                    console.error("Error during initial sign-in:", error);
                    setCurrentUser(null);
                    setUserId(crypto.randomUUID()); // Fallback for anonymous ID
                    setIsCoordinator(false);
                }
            }
            setLoadingAuth(false);
        });
        return () => unsubscribe();
    }, []); // Depend on auth only if it can change after initial render, usually it doesn't

    const login = async (email, password) => { // Coordinator login
        if (!auth) throw new Error("Firebase Auth not initialized for login.");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Assuming coordinator status is set here for simplicity;
        // In a real app, you'd verify coordinator role via custom claims or Firestore.
        setIsCoordinator(true);
        setCurrentUser(userCredential.user);
        setUserId(userCredential.user.uid);
        return userCredential;
    };

    const studentLoginMock = () => {
        return new Promise((resolve) => {
            const mockStudentUser = { uid: `student_${crypto.randomUUID()}`, email: null, isAnonymous: false, displayName: "Student User" };
            setCurrentUser(mockStudentUser);
            setUserId(mockStudentUser.uid);
            setIsCoordinator(false);
            setLoadingAuth(false); // Ensure loading state is handled
            resolve(mockStudentUser);
        });
    };

    const register = async (email, password) => { // Coordinator registration
        if (!auth) throw new Error("Firebase Auth not initialized for registration.");
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        if (!auth) throw new Error("Firebase Auth not initialized for logout.");
        await signOut(auth);
        setCurrentUser(null);
        setUserId(crypto.randomUUID()); // Assign a new anonymous ID after logout
        setIsCoordinator(false);
        try {
            await signInAnonymously(auth); // Sign in anonymously after logout
        } catch (error) {
            console.error("Error signing in anonymously after logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, userId, isCoordinator, login, studentLoginMock, register, logout, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);