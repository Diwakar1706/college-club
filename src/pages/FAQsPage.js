// --- File: src/pages/FAQsPage.js ---
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { HelpCircle, ChevronRight } from 'lucide-react';

const FAQsPage = () => {
    const { faqs, loadingData } = useData();
    const [openFAQ, setOpenFAQ] = useState(null);

    if (loadingData && !faqs.length) return <div className="py-20"><LoadingSpinner message="Loading FAQs..." /></div>;

    const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };
    
    const defaultFaqs = [
        {id: 'q1', question: "How do I join a specific student club?", answer: "To join a club, visit the 'Clubs' page, find the club you're interested in, and click 'Learn More'. The club's detail page will often have information on recruitment, contact details for coordinators, or links to their social media where joining processes are announced. Keep an eye on the 'Events' page for general recruitment drives too!"},
        {id: 'q2', question: "Who should I contact for more details about a particular club or its activities?", answer: "Each club's dedicated page on this platform lists its student coordinators along with their contact information (if provided). They are the best point of contact for specific inquiries."},
        {id: 'q3', question: "Are there any membership fees associated with joining clubs?", answer: "Membership fee policies vary from club to club. Some clubs might have a nominal annual fee to cover operational costs or event resources, while many others are free to join. This information is usually available on the club's detail page or can be clarified by their coordinators."},
        {id: 'q4', question: "How can our club announce a new event or achievement on the Samanvaya website?", answer: "Designated club coordinators who have login credentials can access the 'Coordinator Dashboard'. From there, they can add, update, and manage events, achievements, and other club-specific information that will be reflected on the main website."},
        {id: 'q5', question: "What types of clubs are available at LNCT Samanvaya?", answer: "We host a diverse range of clubs, broadly categorized into Technical, Cultural, Sports, and Literary domains. You can explore all categories and specific clubs on the 'Clubs' page."},
    ];

    const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-indigo-700 mb-4">Your Questions, Answered</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Find quick answers to common queries about LNCT Samanvaya, our clubs, and events.
                </p>
            </div>

            {displayFaqs.length > 0 ? (
                <div className="space-y-6">
                    {displayFaqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl shadow-lg hover:shadow-indigo-100 transition-shadow overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:bg-indigo-50 transition-colors"
                                aria-expanded={openFAQ === faq.id}
                                aria-controls={`faq-answer-${faq.id}`}
                            >
                                <h2 className="text-lg md:text-xl font-semibold text-slate-800">{faq.question || "FAQ Question"}</h2>
                                <ChevronRight size={28} className={`text-indigo-600 transition-transform duration-300 ${openFAQ === faq.id ? 'transform rotate-90' : ''}`} />
                            </button>
                            {openFAQ === faq.id && (
                                <div id={`faq-answer-${faq.id}`} className="px-6 pb-8 pt-0 text-slate-700 leading-relaxed text-base md:text-lg prose prose-indigo">
                                    <p>{faq.answer || "Answer to this FAQ will be provided here."}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24">
                    <HelpCircle size={72} className="mx-auto text-slate-300 mb-8" />
                    <h2 className="text-3xl font-semibold text-slate-700 mb-3">No FAQs Yet</h2>
                    <p className="text-slate-500 text-lg">We're currently compiling helpful information. Please check back soon!</p>
                </div>
            )}
        </div>
    );
};
export default FAQsPage;
// --- End File: src/pages/FAQsPage.js ---