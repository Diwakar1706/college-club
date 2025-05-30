
// --- File: src/pages/EventsPage.js ---
import React from 'react';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { CalendarDays, MapPin } from 'lucide-react';

const EventsPage = () => {
    const { events, loadingData } = useData();

    if (loadingData && !events.length) return <div className="py-20"><LoadingSpinner message="Loading Events..." /></div>;

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-indigo-700 mb-4">Upcoming & Recent Events</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Discover workshops, seminars, competitions, and cultural fests. Don't miss out!
                </p>
            </div>

            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {events.map((event, index) => (
                        <div key={event.id} className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col transform hover:shadow-purple-300 hover:-translate-y-1.5 transition-all duration-300 group">
                            <div className="relative h-60">
                                <img 
                                    src={event.imageUrl || `/assets/placeholders/event_${index % 3 + 1}.png`} 
                                    alt={event.title || "Event"} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => e.target.src = '/assets/placeholders/default_event.png'}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white p-2">
                                    <h2 className="text-2xl font-bold leading-tight drop-shadow-md">{event.title || "Event Title"}</h2>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-sm text-indigo-600 mb-2 font-medium">
                                    <CalendarDays size={18} className="mr-2" />
                                    <span>{event.date ? new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Date TBD"}</span>
                                </div>
                                <div className="flex items-center text-sm text-slate-500 mb-3">
                                    <MapPin size={18} className="mr-2 text-slate-400" />
                                    <span>{event.location || "Location TBD"} {event.time && `at ${event.time}`}</span>
                                </div>
                                <p className="text-slate-700 text-base mb-5 flex-grow leading-relaxed">{event.description ? (event.description.length > 150 ? event.description.substring(0,147) + '...' : event.description) : "More details about this exciting event coming soon!"}</p>
                                {event.organizingClub && <p className="text-xs text-purple-700 mb-3 font-semibold">Organized by: {event.organizingClub}</p>}
                                {event.registrationLink && (
                                    <a
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto block bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                    >
                                        Register / Learn More
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-24">
                    <CalendarDays size={72} className="mx-auto text-slate-300 mb-8" />
                    <h2 className="text-3xl font-semibold text-slate-700 mb-3">No Events Scheduled</h2>
                    <p className="text-slate-500 text-lg">Please check back soon for exciting new event announcements!</p>
                </div>
            )}
        </div>
    );
};
export default EventsPage;
// --- End File: src/pages/EventsPage.js ---