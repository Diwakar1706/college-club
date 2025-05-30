// --- File: src/main.jsx (or src/index.js for CRA) ---
// This is your application's entry point.
// For Vite, this would typically be src/main.jsx
// For Create React App, this would be src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your main App component
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
// import './index.css'; // Your global stylesheet, where Tailwind is imported

// This is a conceptual representation. Actual ReactDOM.render or createRoot will be in your project's entry file.
const RootComponent = () => (
    <React.StrictMode>
        <AuthProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </AuthProvider>
    </React.StrictMode>
);

// Example of how it might be rendered in a Vite project's main.jsx:
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<RootComponent />);

export default RootComponent; // Exporting this for the immersive environment to pick up.
// In a real project, you'd have ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
// --- End File: src/main.jsx ---
