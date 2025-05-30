// --- File: src/pages/ClubsPage.js ---
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Users, Search } from 'lucide-react';

const ClubsPage = ({ setCurrentPage }) => {
    const { clubs, loadingData } = useData();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Literary', 'Social'];

    if (loadingData && !clubs.length) return <div className="py-20"><LoadingSpinner message="Loading Clubs..." /></div>;

    const filteredClubs = clubs
        .filter(club => selectedCategory === 'All' || club.category?.toLowerCase() === selectedCategory.toLowerCase())
        .filter(club => club.name?.toLowerCase().includes(searchTerm.toLowerCase()) || club.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-indigo-700 mb-4">Explore Our Clubs</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Dive into a world of opportunities. Find your niche, connect with peers, and make your mark.
                </p>
            </div>

            <div className="mb-12 p-6 bg-white rounded-xl shadow-xl sticky top-24 z-30 backdrop-blur-md bg-opacity-80">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-grow">
                        <label htmlFor="clubCategory" className="block text-sm font-semibold text-slate-700 mb-2">Filter by Category:</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                        ${selectedCategory === category ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-800 hover:bg-indigo-100 hover:text-indigo-700'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-grow md:max-w-md">
                        <label htmlFor="searchClub" className="block text-sm font-semibold text-slate-700 mb-2">Search Clubs:</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="searchClub"
                                placeholder="Search by name or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search size={20} className="text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {filteredClubs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredClubs.map((club, index) => (
                        <div key={club.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-indigo-300 transition-all duration-300 flex flex-col group">
                            <div className="relative h-56">
                                <img 
                                    src={club.logoUrl || `/assets/placeholders/club_logo_${index % 3 + 1}.png`} 
                                    alt={`${club.name || 'Club'} Logo`} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => e.target.src = '/assets/placeholders/default_club_logo.png'}    
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{club.category || "General"}</span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-semibold text-indigo-700 mb-2 group-hover:text-purple-700 transition-colors">{club.name || "Club Name"}</h3>
                                <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">{club.shortDescription ? (club.shortDescription.length > 120 ? club.shortDescription.substring(0,117) + "..." : club.shortDescription) : "A brief description of the club and its vibrant activities."}</p>
                                <button
                                    onClick={() => setCurrentPage(`club/${club.id}`)}
                                    className="mt-auto w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                >
                                    Learn More &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Users size={64} className="mx-auto text-slate-400 mb-6" />
                    <h2 className="text-3xl font-semibold text-slate-700 mb-3">No Clubs Found</h2>
                    <p className="text-slate-500 text-lg">Try adjusting your search or filter, or check back later for new clubs!</p>
                </div>
            )}
        </div>
    );
};
export default ClubsPage;
// --- End File: src/pages/ClubsPage.js ---