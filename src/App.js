// src/App.js (Example - YOU NEED TO VERIFY YOUR ACTUAL App.js)
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClubsPage from './pages/ClubsPage'; // Ensure this import is correct and the file exists
import EventsPage from './pages/EventsPage';
import FAQsPage from './pages/FAQsPage';
import LoginPage from './pages/LoginPage';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner'; // Assuming you have this
import { useAuth } from './contexts/AuthContext'; // To use loadingAuth

const AppContent = ({ currentPage, setCurrentPage }) => {
  const { loadingAuth } = useAuth(); // Use the loadingAuth state from AuthContext

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner message="Loading application..." /></div>;
  }

  let PageComponent;
  switch (currentPage) {
    case 'home':
      PageComponent = HomePage;
      break;
    case 'clubs':
      PageComponent = ClubsPage;
      break;
    case 'events':
      PageComponent = EventsPage;
      break;
    case 'faqs':
      PageComponent = FAQsPage;
      break;
    case 'login':
      PageComponent = LoginPage;
      break;
    case 'dashboard':
      PageComponent = CoordinatorDashboard;
      break;
    default:
      PageComponent = HomePage; // Default to home page
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        <PageComponent setCurrentPage={setCurrentPage} />
      </main>
      {/* Assuming you have a Footer component */}
      {/* <Footer /> */}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Initial page

  return (
    <AuthProvider>
      <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </AuthProvider>
  );
};

export default App;