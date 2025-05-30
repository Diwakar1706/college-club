import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ManageClubs from './CoordinatorDashboard/ManageClubs';
import ManageAchievements from './CoordinatorDashboard/ManageAchievements';
import LoadingSpinner from '../components/LoadingSpinner';
import { UsersRound, Award, CalendarDays, HelpCircle } from 'lucide-react';

const CoordinatorDashboard = ({ setCurrentPage }) => {
    const { currentUser, isCoordinator, loadingAuth } = useAuth();
    const [activeTab, setActiveTab] = useState('clubs');

    const tabs = [
        { id: 'clubs', label: 'Clubs', icon: <UsersRound size={20}/>, component: <ManageClubs /> },
        { id: 'achievements', label: 'Site Achievements', icon: <Award size={20}/>, component: <ManageAchievements /> },
        // { id: 'events', label: 'Site Events', icon: <CalendarDays size={20}/>, component: <ManageSiteEvents /> }, // Placeholder
        // { id: 'faqs', label: 'Site FAQs', icon: <HelpCircle size={20}/>, component: <ManageSiteFAQs /> }, // Placeholder
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || <div className="p-6 text-slate-600">Select a section.</div>;

    // useEffect must be called unconditionally at the top level
    useEffect(() => {
        // If authentication is still loading, do nothing here.
        // The check for loadingAuth and rendering LoadingSpinner handles this.
        if (!loadingAuth) {
            // Now, we can use conditional logic *inside* the effect.
            if (!currentUser || !isCoordinator) {
                console.log("Access denied. Redirecting to login.");
                setCurrentPage('login');
            }
        }
    }, [currentUser, isCoordinator, loadingAuth, setCurrentPage]); // Add all dependencies

    if (loadingAuth) {
        return <div className="h-screen flex items-center justify-center"><LoadingSpinner message="Authenticating..." /></div>;
    }

    if (!currentUser || !isCoordinator) {
        // This return prevents rendering the dashboard content if not authorized,
        // while the useEffect handles the redirection.
        return <div className="h-screen flex items-center justify-center"><LoadingSpinner message="Access Denied. Redirecting to Login..." /></div>;
    }

    return (
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-10 bg-slate-100 min-h-screen">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-slate-800">Coordinator Dashboard</h1>
                <p className="text-lg text-slate-600">Manage and update content for the Samanvaya platform.</p>
            </header>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4 xl:w-1/5 flex-shrink-0">
                    <div className="bg-white p-5 rounded-xl shadow-xl sticky top-28">
                        <h2 className="text-xl font-semibold text-slate-700 mb-6 border-b pb-3">Management Sections</h2>
                        <nav className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ease-in-out flex items-center space-x-3 transform hover:scale-[1.02] hover:shadow-md
                                        ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-slate-700 hover:bg-indigo-100 hover:text-indigo-700'}`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>
                <main className="lg:w-3/4 xl:w-4/5">
                    {ActiveComponent}
                </main>
            </div>
        </div>
    );
};
export default CoordinatorDashboard;