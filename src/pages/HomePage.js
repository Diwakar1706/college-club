// --- File: src/pages/HomePage.js ---
import React, { useRef } from 'react';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Award, UsersRound, ChevronLeft, ChevronRight } from 'lucide-react';


const HeroSection = ({setCurrentPage}) => (
    <div
        className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 flex flex-col items-center justify-center text-white relative overflow-hidden"
    >
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('/assets/backgrounds/hero_pattern.png')"}}></div>
        <div className="absolute top-10 -left-1/4 w-1/2 h-1/2 bg-pink-500/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 -right-1/4 w-1/2 h-1/2 bg-indigo-500/30 rounded-full filter blur-3xl animate-pulse-slower"></div>

        <div className="relative z-10 text-center p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-10">
                <img 
                    src="/assets/logos/college_logo.png" 
                    alt="College Logo" 
                    className="h-28 w-28 sm:h-36 sm:w-36 rounded-full shadow-2xl bg-white p-2 border-4 border-indigo-300" 
                    onError={(e) => e.target.src = 'https://placehold.co/180x180/FFFFFF/4F46E5?text=LNCT&font=montserrat'}
                />
                <img 
                    src="/assets/logos/samanvaya_logo.png" 
                    alt="LNCT Samanvaya Logo" 
                    className="h-20 sm:h-24 w-auto rounded-xl shadow-2xl bg-white p-3 border-4 border-purple-300" 
                    onError={(e) => e.target.src = 'https://placehold.co/240x100/FFFFFF/8B5CF6?text=Samanvaya&font=montserrat'}
                />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
                LNCT Samanvaya
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100 leading-relaxed">
                The heart of student life at LNCT. Explore clubs, join events, and celebrate achievements together.
            </p>
            <button
                onClick={() => document.getElementById('achievements-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-10 px-10 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-xl transition-all duration-300 ease-in-out text-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
                Discover More
            </button>
        </div>
         <style jsx global>{`
            @keyframes pulse-slow { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.05); } }
            .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
            @keyframes pulse-slower { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.03); } }
            .animate-pulse-slower { animation: pulse-slower 10s infinite ease-in-out; }
        `}</style>
    </div>
);

const AchievementsSection = () => {
    const { achievements, loadingData } = useData();
    const scrollContainerRef = useRef(null);

    if (loadingData && !achievements.length) return <div className="py-20"><LoadingSpinner message="Loading Achievements..." /></div>;
    if (!achievements.length) return (
        <section id="achievements-section" className="py-20 bg-slate-100 text-center">
            <Award size={48} className="mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-700">No Achievements Yet</h2>
            <p className="text-slate-500">Our students are always achieving great things. Check back soon!</p>
        </section>
    );
    
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector('div > div')?.offsetWidth || 300;
            const scrollAmount = cardWidth * direction;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    return (
        <section id="achievements-section" className="py-20 bg-slate-100">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">Celebrating Success</h2>
                <p className="text-center text-lg text-slate-600 mb-16 max-w-2xl mx-auto">Highlights of our students' outstanding accomplishments and contributions.</p>
                <div className="relative group">
                    <button
                        onClick={() => scroll(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:bg-indigo-100 transition-all duration-200 md:-ml-6 text-indigo-600 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Previous Achievement"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-8 pb-8 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
                        {achievements.map((ach, index) => (
                            <div key={ach.id || index} className="flex-shrink-0 w-full sm:w-[45%] md:w-[30%] lg:w-[23%] snap-center">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-indigo-200 transition-all duration-300 h-full flex flex-col">
                                    <img 
                                        src={ach.imageUrl || `/assets/placeholders/achievement_${index % 4 + 1}.png`} 
                                        alt={ach.title || "Achievement Image"} 
                                        className="w-full h-56 object-cover"
                                        onError={(e) => e.target.src = '/assets/placeholders/default_achievement.png'}
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-semibold text-indigo-700 mb-2 leading-tight">{ach.title || "Achievement Title"}</h3>
                                        <p className="text-slate-600 text-sm mb-3 flex-grow">{ach.description ? (ach.description.length > 100 ? ach.description.substring(0, 97) + "..." : ach.description) : "Detailed description of this notable achievement."}</p>
                                        <div className="mt-auto pt-3 border-t border-slate-200">
                                            {ach.date && <p className="text-xs text-slate-500">Date: {ach.date instanceof Date ? ach.date.toLocaleDateString() : new Date(ach.date).toLocaleDateString()}</p>}
                                            {ach.clubName && <p className="text-xs text-indigo-500 mt-1 font-medium">Club: {ach.clubName}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => scroll(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:bg-indigo-100 transition-all duration-200 md:-mr-6 text-indigo-600 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Next Achievement"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
                 <p className="text-center text-sm text-slate-500 mt-10">
                    Swipe or use arrow buttons to explore more achievements.
                </p>
            </div>
        </section>
    );
};

const FacultySection = () => {
    const { faculties, loadingData } = useData();
    
    if (loadingData && !faculties.length) return <div className="py-20"><LoadingSpinner message="Loading Faculty Information..." /></div>;
    if (!faculties.length) return (
        <section className="py-20 bg-white text-center">
            <UsersRound size={48} className="mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-700">Faculty Information Unavailable</h2>
            <p className="text-slate-500">Details about our esteemed faculty will be updated soon.</p>
        </section>
    );

    return (
        <section className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">Guiding Lights</h2>
                <p className="text-center text-lg text-slate-600 mb-16 max-w-2xl mx-auto">Meet the dedicated faculty members who mentor and support our student clubs.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {faculties.map((faculty, index) => (
                        <div key={faculty.id || index} className="bg-slate-50 rounded-xl shadow-lg p-6 text-center transform hover:shadow-purple-200 hover:scale-105 transition-all duration-300 group">
                            <img
                                src={faculty.photoUrl || `/assets/placeholders/faculty_${index % 3 + 1}.png`}
                                alt={faculty.name || "Faculty member"}
                                className="w-36 h-36 rounded-full mx-auto mb-5 object-cover border-4 border-indigo-200 group-hover:border-purple-400 transition-all duration-300"
                                onError={(e) => e.target.src = '/assets/placeholders/default_faculty.png'}
                            />
                            <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-purple-700 transition-colors">{faculty.name || "Faculty Name"}</h3>
                            <p className="text-slate-600 text-sm">{faculty.designation || "Designation"}</p>
                            <p className="text-sm text-purple-600 mt-2 font-medium">{faculty.clubAssociated || "Associated Club"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutSamanvayaSection = () => (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-purple-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Discover Samanvaya</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">The unified platform for student engagement, creativity, and growth at LNCT.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg prose-indigo max-w-none text-slate-700 space-y-6 leading-relaxed">
                    <p>
                        <strong>LNCT Samanvaya</strong> is more than just a system; it's a vibrant ecosystem designed to nurture student talent at Lakshmi Narain College of Technology, Bhopal. We serve as the central nervous system for all student-led clubs and activities, fostering a spirit of unity and collaboration.
                    </p>
                    <p>
                        Our core mission is to create an inclusive and dynamic environment where every student can explore their passions, hone their skills, and make meaningful contributions to our campus community. From tech wizards and artistic souls to sports enthusiasts and literary minds, Samanvaya is the launchpad for your aspirations.
                    </p>
                </div>
                 <div className="prose prose-lg prose-indigo max-w-none text-slate-700 space-y-6 leading-relaxed">
                    <p>
                        Through this platform, we streamline the organization and promotion of diverse events – workshops that spark curiosity, competitions that challenge limits, and cultural festivals that celebrate our rich heritage. We champion student empowerment, offering abundant opportunities for leadership development, teamwork, and personal evolution.
                    </p>
                    <p>
                        Samanvaya is your go-to resource for staying informed about campus happenings, celebrating collective achievements, and easily connecting with various clubs and their coordinators. Join us in weaving a richer, more engaging, and unforgettable tapestry of campus life at LNCT!
                    </p>
                     <img src="/assets/backgrounds/about_illustration.png" alt="Students collaborating" className="rounded-lg shadow-xl mt-6" onError={(e) => e.target.style.display='none'}/>
                </div>
            </div>
        </div>
    </section>
);

const HomePage = ({ setCurrentPage }) => (
    <div className="flex flex-col min-h-screen bg-slate-50">
        <main className="flex-grow">
            <HeroSection setCurrentPage={setCurrentPage} />
            <AchievementsSection />
            <FacultySection />
            <AboutSamanvayaSection />
        </main>
    </div>
);
export default HomePage;
// --- End File: src/pages/HomePage.js ---