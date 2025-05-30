// --- File: src/components/Footer.js ---
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = ({setCurrentPage}) => (
    <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                         <img src="/assets/logos/lnct_logo_white_bg.png" alt="College Logo" className="h-10 w-auto rounded-md p-1 bg-white" onError={(e) => e.target.src = 'https://placehold.co/120x50/FFFFFF/indigo600?text=LNCT&font=roboto'} />
                        <span className="text-2xl font-semibold text-white">LNCT Samanvaya</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Empowering students through collaboration, innovation, and a vibrant campus life. Discover your potential with us.
                    </p>
                </div>

                <div>
                    <h5 className="text-lg font-semibold text-white mb-5">Quick Links</h5>
                    <ul className="space-y-3">
                        <li><button onClick={() => setCurrentPage('home')} className="hover:text-indigo-400 transition-colors duration-200">Home</button></li>
                        <li><button onClick={() => setCurrentPage('clubs')} className="hover:text-indigo-400 transition-colors duration-200">Clubs</button></li>
                        <li><button onClick={() => setCurrentPage('events')} className="hover:text-indigo-400 transition-colors duration-200">Events</button></li>
                        <li><button onClick={() => setCurrentPage('faqs')} className="hover:text-indigo-400 transition-colors duration-200">FAQs</button></li>
                    </ul>
                </div>

                <div className="space-y-5">
                    <h5 className="text-lg font-semibold text-white mb-5">Contact Us</h5>
                    <address className="not-italic space-y-3 text-sm">
                        <p className="flex items-start"><MapPin size={18} className="mr-3 mt-0.5 text-indigo-400 flex-shrink-0" />LNCT Campus, Raisen Road, Bhopal, Madhya Pradesh, India - 462022</p>
                        <p className="flex items-center"><Phone size={18} className="mr-3 text-indigo-400 flex-shrink-0" /><a href="tel:+9107556185300" className="hover:text-indigo-400 transition-colors">+91-0755-6185300</a></p>
                        <p className="flex items-center"><Mail size={18} className="mr-3 text-indigo-400 flex-shrink-0" /><a href="mailto:samanvaya.support@lnct.ac.in" className="hover:text-indigo-400 transition-colors">samanvaya.support@lnct.ac.in</a></p>
                    </address>
                </div>
                
                <div>
                    <h5 className="text-lg font-semibold text-white mb-5">Connect With Us</h5>
                    <div className="flex space-x-5">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors"><Instagram size={28} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors"><Facebook size={28} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors"><Linkedin size={28} /></a>
                    </div>
                     <img src="/assets/backgrounds/footer_art.png" alt="Decorative Art" className="mt-6 opacity-20 rounded-lg" onError={(e) => e.target.style.display='none'} />
                </div>
            </div>
            <div className="mt-12 border-t border-slate-700 pt-10 text-center text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} LNCT Samanvaya. All Rights Reserved.
                <p className="mt-1">A Student Initiative for a Connected Campus.</p>
            </div>
        </div>
    </footer>
);
export default Footer;
// --- End File: src/components/Footer.js ---