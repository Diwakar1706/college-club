// --- File: src/contexts/DataContext.js ---
import React, { useState, useEffect, createContext, useContext } from 'react';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, appIdentifier } from '../firebaseConfig'; // Use appIdentifier
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [achievements, setAchievements] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const { userId: authUserId, currentUser } = useAuth();

    useEffect(() => {
        if (!db || !authUserId) { // Wait for db and user to be available
            setLoadingData(false);
            return;
        }
        
        setLoadingData(true);
        const collectionsToFetch = [
            { name: 'achievements', setter: setAchievements },
            { name: 'faculties', setter: setFaculties },
            { name: 'clubs', setter: setClubs },
            { name: 'events', setter: setEvents },
            { name: 'faqs', setter: setFaqs },
        ];

        const unsubscribes = collectionsToFetch.map(c => {
            const collectionPath = `artifacts/${appIdentifier}/public/data/${c.name}`;
            const q = query(collection(db, collectionPath));
            return onSnapshot(q, (snapshot) => {
                let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Manual sort as Firestore orderBy requires indexes which might not be set up
                if (c.name === 'achievements' || c.name === 'events') {
                    items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
                } else if (c.name === 'faculties' || c.name === 'clubs' || c.name === 'faqs') {
                    items.sort((a, b) => (a.name || a.question || '').localeCompare(b.name || b.question || ''));
                }
                c.setter(items);
            }, (error) => {
                console.error(`Error fetching ${c.name}:`, error);
                c.setter([]); // Set to empty on error
            });
        });
        
        // Simplified loading state management
        const timer = setTimeout(() => setLoadingData(false), 3000); // Assume data loaded or timeout

        return () => {
            unsubscribes.forEach(unsub => unsub());
            clearTimeout(timer);
        };
    }, [db, authUserId]); // authUserId ensures re-fetch if user changes

    const addDataItem = async (collectionName, data) => {
        if (!db || !currentUser || !currentUser.email) throw new Error("Only authenticated coordinators can add data.");
        const collectionPath = `artifacts/${appIdentifier}/public/data/${collectionName}`;
        return addDoc(collection(db, collectionPath), { ...data, createdAt: serverTimestamp(), createdBy: currentUser.uid, updatedBy: currentUser.uid, updatedAt: serverTimestamp() });
    };

    const updateDataItem = async (collectionName, docId, data) => {
        if (!db || !currentUser || !currentUser.email) throw new Error("Only authenticated coordinators can update data.");
        const docPath = `artifacts/${appIdentifier}/public/data/${collectionName}/${docId}`;
        return updateDoc(doc(db, docPath), { ...data, updatedBy: currentUser.uid, updatedAt: serverTimestamp() });
    };

    const deleteDataItem = async (collectionName, docId) => {
        if (!db || !currentUser || !currentUser.email) throw new Error("Only authenticated coordinators can delete data.");
        const docPath = `artifacts/${appIdentifier}/public/data/${collectionName}/${docId}`;
        return deleteDoc(doc(db, docPath));
    };
    
    const uploadImage = async (file, path) => { 
        if (!storage || !currentUser || !currentUser.email) throw new Error("Only authenticated coordinators can upload images.");
        const uniqueFileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `artifacts/${appIdentifier}/public/images/${path}/${uniqueFileName}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    return (
        <DataContext.Provider value={{ achievements, faculties, clubs, events, faqs, loadingData, addDataItem, updateDataItem, deleteDataItem, uploadImage }}>
            {children}
        </DataContext.Provider>
    );
};
export const useData = () => useContext(DataContext);
// --- End File: src/contexts/DataContext.js ---