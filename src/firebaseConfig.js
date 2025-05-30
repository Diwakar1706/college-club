import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// IMPORTANT: Replace with your actual Firebase config values from your Firebase project settings.
// For production, consider using environment variables (e.g., import.meta.env.VITE_API_KEY if using Vite,
// or process.env.REACT_APP_API_KEY if using Create React App).
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // e.g., "AIzaSyB-xxxxxxxxxxxxxxxxxxxxxxxxx"
    authDomain: "YOUR_AUTH_DOMAIN", // e.g., "your-project-id.firebaseapp.com"
    projectId: "YOUR_PROJECT_ID", // e.g., "your-project-id"
    storageBucket: "YOUR_STORAGE_BUCKET", // e.g., "your-project-id.appspot.com"
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // e.g., "123456789012"
    appId: "YOUR_APP_ID" // e.g., "1:123456789012:web:abcdef1234567890abcdef"
};

// This appIdentifier is used for structuring Firestore paths, distinct from Firebase's appId.
// If this is also meant to be injected globally, you'd check `window.__app_id` similarly.
// For now, defaulting to a static string.
export const appIdentifier = 'college-club-samanvaya-vite'; // Replace with your actual desired app identifier if different

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };