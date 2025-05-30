// --- File: src/pages/LoginPage.js ---
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CustomModal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ setCurrentPage }) => {
    const { login, studentLoginMock, register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginMode, setLoginMode] = useState('coordinator');
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });

    const handleCoordinatorSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setModalContent({ title: 'Input Error', message: 'Email and Password cannot be empty.', type: 'error' });
            setModalOpen(true); return;
        }
        setLoading(true);
        try {
            if (isRegistering) {
                await register(email, password);
                setModalContent({ title: 'Registration Successful!', message: 'Coordinator account created. Please log in.', type: 'success' });
                setIsRegistering(false); setEmail(''); setPassword('');
            } else {
                await login(email, password); 
                setCurrentPage('dashboard');
            }
        } catch (err) {
            let errorMessage = err.message || "An error occurred.";
            if (err.code) { 
                if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') errorMessage = "Invalid email or password.";
                else if (err.code === 'auth/email-already-in-use') errorMessage = "Email already in use for registration.";
            }
            setModalContent({ title: 'Auth Error', message: errorMessage, type: 'error' });
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleStudentLogin = async () => {
        setLoading(true);
        try {
            await studentLoginMock();
            setModalContent({ title: 'Student Login Successful!', message: 'Welcome! Redirecting to homepage...', type: 'success' });
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
                setCurrentPage('home');
            }, 1500);
        } catch (err) {
            setModalContent({ title: 'Login Error', message: 'Could not log in as student.', type: 'error' });
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalContent.title} type={modalContent.type}>
                <p>{modalContent.message}</p>
            </CustomModal>
            <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
                    <div className="text-center">
                         <img className="mx-auto h-20 w-auto" src="/assets/logos/samanvaya_icon.png" alt="Samanvaya Login Icon" onError={(e) => e.target.src = 'https://placehold.co/100x100/6366F1/FFFFFF?text=S&font=lato'} />
                        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                            {loginMode === 'coordinator' ? (isRegistering ? 'Coordinator Registration' : 'Coordinator Login') : 'Student Access'}
                        </h2>
                    </div>

                    <div className="flex justify-center space-x-2 border-b border-slate-200 pb-6">
                        <button
                            onClick={() => { setLoginMode('student'); setIsRegistering(false); setEmail(''); setPassword(''); }}
                            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${loginMode === 'student' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-purple-100'}`}
                        >
                            I'm a Student
                        </button>
                        <button
                            onClick={() => setLoginMode('coordinator')}
                            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${loginMode === 'coordinator' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-indigo-100'}`}
                        >
                            I'm a Coordinator
                        </button>
                    </div>

                    {loginMode === 'coordinator' && (
                        <form className="mt-8 space-y-6" onSubmit={handleCoordinatorSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">Coordinator Email</label>
                                    <input id="email-address" name="email" type="email" autoComplete="email" required
                                        className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                                        placeholder="coordinator@lnct.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                    <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={isRegistering ? "new-password" : "current-password"} required
                                        className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                                        placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm text-slate-500 hover:text-indigo-600">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button type="submit" disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg">
                                    {loading ? <LoadingSpinner size="h-5 w-5" message="" color="text-white"/> : (isRegistering ? 'Register Account' : 'Sign In as Coordinator')}
                                </button>
                            </div>
                            <p className="mt-6 text-center text-sm text-slate-600">
                                {isRegistering ? 'Already registered? ' : "New Coordinator? "}
                                <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                                    {isRegistering ? 'Sign in' : 'Register here'}
                                </button>
                            </p>
                        </form>
                    )}
                    
                    {loginMode === 'student' && (
                        <div className="mt-8 text-center">
                            <p className="text-slate-600 mb-4">Students can access public information. Advanced features for students might require separate login in future versions.</p>
                            <button onClick={handleStudentLogin} disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg">
                                {loading ? <LoadingSpinner size="h-5 w-5" message="" color="text-white" /> : 'Continue as Student (View Only)'}
                            </button>
                             <p className="mt-4 text-xs text-slate-500">No password needed for student view at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default LoginPage;
// --- End File: src/pages/LoginPage.js ---