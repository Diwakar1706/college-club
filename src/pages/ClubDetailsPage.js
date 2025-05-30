
// --- File: src/pages/ClubDetailsPage.js ---
import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { AlertTriangle, ChevronLeft, Info, Rocket, UsersRound, CalendarDays, Award, UserPlus, Linkedin as LinkedinIcon, Github } from 'lucide-react';


const ClubDetailsPage = ({ clubId, setCurrentPage }) => {
    const { clubs, loadingData } = useData();
    const [club, setClub] = useState(null);
    const [activeClubTab, setActiveClubTab] = useState('about');

    useEffect(() => {
        if (!loadingData && clubs.length > 0) {
            const foundClub = clubs.find(c => c.id === clubId);
            setClub(foundClub); 
        }
    }, [clubId, clubs, loadingData]);

    if (loadingData && !club) return <div className="py-20"><LoadingSpinner message="Loading Club Details..." /></div>;
    if (!club) return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <AlertTriangle size={64} className="mx-auto text-red-500 mb-6" />
            <h1 className="text-3xl font-semibold text-slate-700 mb-4">Club Not Found</h1>
            <p className="text-slate-500 mb-8">The club you are looking for does not exist or may have been removed.</p>
            <button onClick={() => setCurrentPage('clubs')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <ChevronLeft size={20} className="inline mr-2" /> Back to All Clubs
            </button>
        </div>
    );

    const clubNavLinks = [
        { id: 'about', label: 'About Us', icon: <Info size={18}/> },
        ...(club.category?.toLowerCase() === 'technical' && club.projects && club.projects.length > 0 ? 
            [{ id: 'projects', label: 'Projects', icon: <Rocket size={18}/> }] : []),
        { id: 'team', label: 'Our Team', icon: <UsersRound size={18}/> },
        { id: 'events', label: 'Club Events', icon: <CalendarDays size={18}/> },
        { id: 'achievements', label: 'Club Achievements', icon: <Award size={18}/> },
        { id: 'join', label: 'How to Join', icon: <UserPlus size={18}/> },
    ];

    const renderClubContent = () => {
        switch (activeClubTab) {
            case 'about':
                return (
                    <section className="bg-white p-8 rounded-xl shadow-xl">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-4">About {club.name}</h3>
                        <div className="prose prose-lg prose-indigo max-w-none text-slate-700 leading-relaxed">
                            {club.about ? <p>{club.about}</p> : <p>Detailed information about this club is coming soon.</p>}
                        </div>
                    </section>
                );
            case 'projects':
                return (
                    <section className="bg-white p-8 rounded-xl shadow-xl">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-4">Our Projects</h3>
                        {club.projects && club.projects.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                {club.projects.map((project, index) => (
                                    <div key={project.id || index} className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <img src={project.imageUrl || `/assets/placeholders/project_${index % 2 + 1}.png`} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" onError={(e) => e.target.src = '/assets/placeholders/default_project.png'} />
                                        <h4 className="text-xl font-semibold text-indigo-700 mb-1">{project.title}</h4>
                                        <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                                        {project.techStack && <p className="text-xs text-purple-600 font-medium">Tech: {Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}</p>}
                                        {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-500 hover:underline mt-2 inline-block">View Project &rarr;</a>}
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-slate-600">No projects to display currently for this club.</p>}
                    </section>
                );
            case 'team':
                 return (
                    <section className="bg-white p-8 rounded-xl shadow-xl">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-8 border-b-2 border-indigo-200 pb-4">Meet Our Team</h3>
                        {club.teamMembers && club.teamMembers.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {club.teamMembers.map((member, index) => (
                                    <div key={member.id || index} className="bg-slate-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                        <img src={member.photoUrl || `/assets/placeholders/member_${index % 3 + 1}.png`} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-200" onError={(e) => e.target.src = '/assets/placeholders/default_member.png'} />
                                        <h4 className="text-xl font-semibold text-indigo-700">{member.name}</h4>
                                        <p className="text-sm text-purple-600 font-medium">{member.role}</p>
                                        <p className="text-xs text-slate-500 mt-2 px-2">{member.bio}</p>
                                        <div className="mt-3 flex justify-center space-x-3">
                                            {member.socialLinks?.linkedin && <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600"><LinkedinIcon size={20}/></a>}
                                            {member.socialLinks?.github && <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-800"><Github size={20}/></a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-slate-600">Team member information is currently unavailable.</p>}
                    </section>
                );
            case 'events':
                 return (
                    <section className="bg-white p-8 rounded-xl shadow-xl">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-4">Our Events</h3>
                        {club.clubEvents && club.clubEvents.length > 0 ? (
                            <div className="space-y-6">
                                {club.clubEvents.map((event, index) => (
                                    <div key={event.id || index} className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-4 items-start">
                                        <img src={event.imageUrl || `/assets/placeholders/clubevent_${index % 2 + 1}.png`} alt={event.title} className="w-full md:w-48 h-40 object-cover rounded-md mb-3 md:mb-0" onError={(e) => e.target.src = '/assets/placeholders/default_event.png'}/>
                                        <div className="flex-grow">
                                            <h4 className="text-xl font-semibold text-indigo-700 mb-1">{event.title}</h4>
                                            <p className="text-xs text-purple-600 font-medium mb-2">{event.date ? new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Date TBD"}</p>
                                            <p className="text-sm text-slate-600">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-slate-600">This club has no specific events listed currently.</p>}
                    </section>
                );
            case 'achievements':
                 return (
                    <section className="bg-white p-8 rounded-xl shadow-xl">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-4">Our Achievements</h3>
                        {club.clubAchievements && club.clubAchievements.length > 0 ? (
                             <div className="space-y-6">
                                {club.clubAchievements.map((ach, index) => (
                                    <div key={ach.id || index} className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-4 items-start">
                                        <img src={ach.imageUrl || `/assets/placeholders/clubach_${index % 1 + 1}.png`} alt={ach.title} className="w-full md:w-48 h-40 object-cover rounded-md mb-3 md:mb-0" onError={(e) => e.target.src = '/assets/placeholders/default_achievement.png'}/>
                                        <div className="flex-grow">
                                            <h4 className="text-xl font-semibold text-indigo-700 mb-1">{ach.title}</h4>
                                            <p className="text-xs text-purple-600 font-medium mb-2">{ach.date ? new Date(ach.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : "Date TBD"}</p>
                                            <p className="text-sm text-slate-600">{ach.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-slate-600">This club's achievements will be highlighted here soon!</p>}
                    </section>
                );
            case 'join':
                return (
                    <section className="bg-white p-8 rounded-xl shadow-xl">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-4">How to Join {club.name}</h3>
                        <div className="prose prose-lg prose-indigo max-w-none text-slate-700 leading-relaxed">
                            {club.joinCriteria ? <p>{club.joinCriteria}</p> : <p>Information on how to join this club will be updated soon. Typically, clubs announce recruitment drives or have open memberships. Please check back or contact the club coordinators if listed.</p>}
                        </div>
                    </section>
                );
            default: return null;
        }
    };
    
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white shadow-xl overflow-hidden">
                 <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('/assets/backgrounds/club_header_pattern.png')"}}></div>
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="md:flex md:items-center md:space-x-10 text-center md:text-left">
                        <img
                            src={club.logoUrl || `/assets/placeholders/club_logo_detail.png`}
                            alt={`${club.name || 'Club'} Logo`}
                            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border-4 border-indigo-400 shadow-2xl mb-6 md:mb-0 mx-auto md:mx-0 flex-shrink-0 bg-white p-1"
                            onError={(e) => e.target.src = '/assets/placeholders/default_club_logo_large.png'}
                        />
                        <div className="flex-grow">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight">{club.name || "Club Name"}</h1>
                            <p className="text-xl md:text-2xl text-indigo-200 mb-5">{club.tagline || "Inspiring Innovation and Collaboration"}</p>
                            <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-2 rounded-full shadow-md">{club.category || "Category"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky top-20 z-30 bg-white shadow-md mb-10">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex flex-wrap -mb-px space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide py-3">
                        {clubNavLinks.map(link => (
                            <button
                                key={link.id}
                                onClick={() => setActiveClubTab(link.id)}
                                className={`whitespace-nowrap px-3 py-3 border-b-4 text-sm sm:text-base font-medium flex items-center space-x-2 transition-colors duration-200 focus:outline-none
                                    ${activeClubTab === link.id 
                                        ? 'border-purple-600 text-purple-700' 
                                        : 'border-transparent text-slate-500 hover:text-purple-600 hover:border-purple-300'}`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderClubContent()}
                <button
                    onClick={() => setCurrentPage('clubs')}
                    className="mt-16 flex items-center text-indigo-600 hover:text-indigo-800 font-semibold py-3 px-6 rounded-lg transition-colors bg-indigo-100 hover:bg-indigo-200 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                    <ChevronLeft size={22} className="mr-2" />
                    Back to All Clubs
                </button>
            </div>
        </div>
    );
};
export default ClubDetailsPage;
// --- End File: src/pages/ClubDetailsPage.js ---