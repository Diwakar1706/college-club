// --- File: src/components/Modal.js ---
import React from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const CustomModal = ({ isOpen, onClose, title, children, type = 'info', onConfirm, confirmText = 'Confirm', showConfirm = false }) => {
    if (!isOpen) return null;

    let headerBgColor = 'bg-indigo-600';
    let IconComponent = ShieldCheck;

    if (type === 'error') {
        headerBgColor = 'bg-red-600'; IconComponent = AlertTriangle;
    } else if (type === 'success') {
        headerBgColor = 'bg-green-600'; IconComponent = CheckCircle;
    } else if (type === 'warning' || showConfirm) {
        headerBgColor = 'bg-yellow-500'; IconComponent = AlertTriangle;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-0 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 animate-modal-pop">
                <div className={`flex items-center justify-between pb-4 pt-5 px-6 ${headerBgColor} rounded-t-xl`}>
                    <h3 className="text-xl font-semibold text-white flex items-center">
                        <IconComponent size={24} className="mr-3" />
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X size={28} />
                    </button>
                </div>
                <div className="p-6 text-gray-700 text-base max-h-[60vh] overflow-y-auto">
                    {children}
                </div>
                <div className="px-6 py-4 bg-gray-100 rounded-b-xl flex justify-end space-x-3 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-150 font-medium text-sm"
                    >
                        Close
                    </button>
                    {showConfirm && onConfirm && (
                         <button
                            onClick={onConfirm}
                            className={`px-5 py-2.5 text-white rounded-lg transition-colors duration-150 font-medium text-sm shadow-md hover:shadow-lg
                                ${ type === 'error' ? 'bg-red-500 hover:bg-red-600' : 
                                   type === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900' :
                                   'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
            {/* It's better to put animations in a global CSS file imported in main.jsx/index.jsx */}
            {/* <style jsx global>{`
                @keyframes modal-pop {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-modal-pop { animation: modal-pop 0.3s ease-out forwards; }
            `}</style> */}
        </div>
    );
};
export default CustomModal;
// --- End File: src/components/Modal.js ---