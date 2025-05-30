// // --- File: src/components/Navbar.js ---
// import React, { useState } from 'react';
// import { Home, Users, CalendarDays, HelpCircle, LogIn, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// const Navbar = ({ setCurrentPage }) => {
//     const { currentUser, isCoordinator, logout } = useAuth();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const navLinks = [
//         { name: 'Home', page: 'home', icon: <Home size={20} /> },
//         { name: 'Clubs', page: 'clubs', icon: <Users size={20} /> },
//         { name: 'Events', page: 'events', icon: <CalendarDays size={20} /> },
//         { name: 'FAQs', page: 'faqs', icon: <HelpCircle size={20} /> },
//     ];

//     return (
//         <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-lg sticky top-0 z-40">
//             <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-20">
//                     <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2 focus:outline-none">
//                         <img src="/assets/logos/lnct_logo_white_bg.png" alt="College Logo" className="h-10 w-auto rounded-md p-1 bg-white" onError={(e) => e.target.src = 'https://placehold.co/120x50/FFFFFF/indigo600?text=LNCT&font=roboto'}/>
//                         <span className="font-bold text-2xl tracking-tight">Samanvaya</span>
//                     </button>
//                     <div className="hidden md:flex items-center space-x-1">
//                         {navLinks.map(link => (
//                             <button
//                                 key={link.name}
//                                 onClick={() => { setCurrentPage(link.page); setIsMobileMenuOpen(false); }}
//                                 className="hover:bg-white hover:bg-opacity-20 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105"
//                             >
//                                 {link.icon}
//                                 <span>{link.name}</span>
//                             </button>
//                         ))}
//                         {isCoordinator && currentUser ? (
//                             <>
//                                 <button
//                                     onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }}
//                                     className="hover:bg-white hover:bg-opacity-20 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105"
//                                 >
//                                     <ShieldCheck size={20}/> <span>Dashboard</span>
//                                 </button>
//                                 <button
//                                     onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
//                                     className="bg-pink-500 hover:bg-pink-600 ml-2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
//                                 >
//                                     <LogOut size={20} />
//                                     <span>Logout</span>
//                                 </button>
//                             </>
//                         ) : ( currentUser && currentUser.displayName === "Student User" ? ( 
//                                 <button
//                                     onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
//                                     className="bg-purple-500 hover:bg-purple-600 ml-2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
//                                 >
//                                     <LogOut size={20} />
//                                     <span>Student Logout</span>
//                                 </button>
//                             ) : ( 
//                                 <button
//                                     onClick={() => { setCurrentPage('login'); setIsMobileMenuOpen(false); }}
//                                     className="bg-green-500 hover:bg-green-600 ml-2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
//                                 >
//                                     <LogIn size={20} />
//                                     <span>Login</span>
//                                 </button>
//                             )
//                         )}
//                     </div>
//                     <div className="md:hidden">
//                         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-indigo-200 focus:outline-none p-2 rounded-md hover:bg-white hover:bg-opacity-20">
//                             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {isMobileMenuOpen && (
//                 <div className="md:hidden bg-indigo-700 bg-opacity-95 backdrop-blur-sm absolute w-full shadow-xl rounded-b-lg">
//                     <div className="px-3 pt-2 pb-4 space-y-2 sm:px-4">
//                         {navLinks.map(link => (
//                             <button
//                                 key={link.name}
//                                 onClick={() => { setCurrentPage(link.page); setIsMobileMenuOpen(false); }}
//                                 className="hover:bg-white hover:bg-opacity-20 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3"
//                             >
//                                 {link.icon}
//                                 <span>{link.name}</span>
//                             </button>
//                         ))}
//                         {isCoordinator && currentUser ? (
//                              <>
//                                 <button
//                                     onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }}
//                                     className="hover:bg-white hover:bg-opacity-20 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3"
//                                 >
//                                      <ShieldCheck size={20}/> <span>Dashboard</span>
//                                 </button>
//                                 <button
//                                     onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
//                                     className="bg-pink-500 hover:bg-pink-600 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3 mt-2"
//                                 >
//                                     <LogOut size={20} />
//                                     <span>Logout</span>
//                                 </button>
//                             </>
//                         ) : ( currentUser && currentUser.displayName === "Student User" ? (
//                                 <button
//                                     onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
//                                     className="bg-purple-500 hover:bg-purple-600 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3 mt-2"
//                                 >
//                                     <LogOut size={20} />
//                                     <span>Student Logout</span>
//                                 </button>
//                             ) : (
//                                 <button
//                                     onClick={() => { setCurrentPage('login'); setIsMobileMenuOpen(false); }}
//                                     className="bg-green-500 hover:bg-green-600 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3 mt-2"
//                                 >
//                                     <LogIn size={20} />
//                                     <span>Login</span>
//                                 </button>
//                             )
//                         )}
//                     </div>
//                 </div>
//             )}
//             {(currentUser && (isCoordinator || currentUser.displayName === "Student User")) && (
//                  <div className={`text-center text-xs py-1.5 ${isCoordinator ? 'bg-indigo-800 text-indigo-100' : 'bg-purple-800 text-purple-100'}`}>
//                     {isCoordinator ? `Coordinator: ${currentUser.email}` : `Logged in as: ${currentUser.displayName}`}
//                 </div>
//             )}
//              {!currentUser && useAuth().userId && (
//                 <div className="bg-gray-700 text-center text-xs py-1.5 text-gray-300">
//                     Anonymous Session (ID: {useAuth().userId.substring(0,8)}...)
//                 </div>
//             )}
//         </nav>
//     );
// };
// export default Navbar;
// // --- End File: src/components/Navbar.js ---


import React, { useState } from 'react';
import { Home, Users, CalendarDays, HelpCircle, LogIn, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ setCurrentPage }) => {
    // Destructure all needed values from useAuth() at the top level, unconditionally
    const { currentUser, isCoordinator, logout, userId } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', page: 'home', icon: <Home size={20} /> },
        { name: 'Clubs', page: 'clubs', icon: <Users size={20} /> },
        { name: 'Events', page: 'events', icon: <CalendarDays size={20} /> },
        { name: 'FAQs', page: 'faqs', icon: <HelpCircle size={20} /> },
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-lg sticky top-0 z-40">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2 focus:outline-none">
                        <img src="/assets/logos/lnct_logo_white_bg.png" alt="College Logo" className="h-10 w-auto rounded-md p-1 bg-white" onError={(e) => e.target.src = 'https://placehold.co/120x50/FFFFFF/indigo600?text=LNCT&font=roboto'}/>
                        <span className="font-bold text-2xl tracking-tight">Samanvaya</span>
                    </button>
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => { setCurrentPage(link.page); setIsMobileMenuOpen(false); }}
                                className="hover:bg-white hover:bg-opacity-20 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </button>
                        ))}
                        {isCoordinator && currentUser ? (
                            <>
                                <button
                                    onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }}
                                    className="hover:bg-white hover:bg-opacity-20 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                                >
                                    <ShieldCheck size={20}/> <span>Dashboard</span>
                                </button>
                                <button
                                    onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
                                    className="bg-pink-500 hover:bg-pink-600 ml-2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : ( currentUser && currentUser.displayName === "Student User" ? (
                                <button
                                    onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
                                    className="bg-purple-500 hover:bg-purple-600 ml-2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
                                >
                                    <LogOut size={20} />
                                    <span>Student Logout</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => { setCurrentPage('login'); setIsMobileMenuOpen(false); }}
                                    className="bg-green-500 hover:bg-green-600 ml-2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
                                >
                                    <LogIn size={20} />
                                    <span>Login</span>
                                </button>
                            )
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-indigo-200 focus:outline-none p-2 rounded-md hover:bg-white hover:bg-opacity-20">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-indigo-700 bg-opacity-95 backdrop-blur-sm absolute w-full shadow-xl rounded-b-lg">
                    <div className="px-3 pt-2 pb-4 space-y-2 sm:px-4">
                        {navLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => { setCurrentPage(link.page); setIsMobileMenuOpen(false); }}
                                className="hover:bg-white hover:bg-opacity-20 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </button>
                        ))}
                        {isCoordinator && currentUser ? (
                             <>
                                <button
                                    onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }}
                                    className="hover:bg-white hover:bg-opacity-20 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3"
                                >
                                    <ShieldCheck size={20}/> <span>Dashboard</span>
                                </button>
                                <button
                                    onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
                                    className="bg-pink-500 hover:bg-pink-600 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3 mt-2"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : ( currentUser && currentUser.displayName === "Student User" ? (
                                <button
                                    onClick={async () => { await logout(); setCurrentPage('home'); setIsMobileMenuOpen(false); }}
                                    className="bg-purple-500 hover:bg-purple-600 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3 mt-2"
                                >
                                    <LogOut size={20} />
                                    <span>Student Logout</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => { setCurrentPage('login'); setIsMobileMenuOpen(false); }}
                                    className="bg-green-500 hover:bg-green-600 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center space-x-3 mt-2"
                                >
                                    <LogIn size={20} />
                                    <span>Login</span>
                                </button>
                            )
                        )}
                    </div>
                </div>
            )}
            {(currentUser && (isCoordinator || currentUser.displayName === "Student User")) && (
                <div className={`text-center text-xs py-1.5 ${isCoordinator ? 'bg-indigo-800 text-indigo-100' : 'bg-purple-800 text-purple-100'}`}>
                    {isCoordinator ? `Coordinator: ${currentUser.email}` : `Logged in as: ${currentUser.displayName}`}
                </div>
            )}
            {!currentUser && userId && ( // Use the destructured userId here
                <div className="bg-gray-700 text-center text-xs py-1.5 text-gray-300">
                    Anonymous Session (ID: {userId.substring(0,8)}...)
                </div>
            )}
        </nav>
    );
};
export default Navbar;