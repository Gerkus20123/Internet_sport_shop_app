"use client";

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, 
         createUserWithEmailAndPassword, 
         onAuthStateChanged, 
         setPersistence, 
         browserLocalPersistence,
         browserSessionPersistence 
} from 'firebase/auth';
import Image from 'next/image';
import { auth } from '../firebase/config';

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastLoggedInEmail') || '';
    }
    return '';
  });
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_Password] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  useEffect(() => {
    // Animate the opening of the modal
    setIsOpen(true)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is signed in:", currentUser.uid);
      } else {
        console.log("User is signed out.");
      }
    });

    return () => unsubscribe();
  }, []);

   const handleClose = () => {
     setIsClosing(true);
     setTimeout(() => {
       onClose();
        setIsClosing(false);
     }, 300); // Czas trwania animacji, musi być taki sam jak transition-duration
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence)

      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      console.log('User signed in successfully!');

      // Zapisz email do `localStorage` po udanym logowaniu
      localStorage.setItem('lastLoggedInEmail', email);

      handleClose();
    } catch (e) {
      setError(e.message);
      console.error('Login error:', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
     e.preventDefault();
    setLoading(true);
    setError(null);
     try {
       await createUserWithEmailAndPassword(auth, email, password, confirm_password);
       onLogin();
       console.log('User registered successfully!');
       handleClose(); // Zamknij modal po udanej rejestracji
     } catch (e) {
       setError(e.message);
       console.error('Registration error:', e.message);
     } finally {
       setLoading(false);
     }
   };

   const toggleForm = () => {
     setIsRegistering(prev => !prev);
     setError(null); // Wyczyść błędy przy przełączaniu
   };


  return (
    <div className={`fixed inset-0 z-101 flex items-center justify-center bg-transparent transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'} ${isClosing ? 'opacity-0' : 'opacity-100'} backdrop-blur-xs`}>
      <div className={`relative flex flex-col md:flex-row h-5/6 w-full max-w-7xl bg-white shadow-xl overflow-hidden m-4 md:m-8 transition-all duration-300 transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* Przycisk zamykania (krzyżyk) w prawym górnym rogu */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Lewa kolumna z obrazem (widoczna na desktopie) */}
        <div className="hidden md:flex flex-1 relative bg-gray-200">
          {/* Warstwa nakładki z tekstem */}
          <div className="absolute z-11 inset-0 flex flex-col items-center justify-end text-white p-8">

            <h2 className="text-4xl font-bold mb-2" style={{
                backgroundImage: 'linear-gradient(to right, #15bb57ff, #ffffffff, #15bb57ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
                }}> Hello, we are glad you are here !
            </h2>

            <p className="text-2xl text-center" style={{
                backgroundImage: 'linear-gradient(to right, #15bb57ff, #ffffffff, #15bb57ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
            }}> 
              Login or register to continue your purchases. 
            </p>

          </div>
          <div className="absolute inset-0">
            <Image
                src='/login.png'
                alt="Login screen"
                className=" object-cover w-full h-full z-10"
                onError={(e) => e.target.style.display = 'none'}
                fill
            />
          </div>
        </div>

        {/* Prawa kolumna z formularzem logowania */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 h-auto">
          <div className="w-full">

          {/* Pasek przełączania (nowy element) */}
          <div className="flex justify-center mb-6 border-b border-gray-200 w-full relative">
            <button
              onClick={() => setIsRegistering(false)}
              className={`py-2 px-4 font-semibold relative transition-all duration-300
                ${!isRegistering ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Login
              <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300
                ${!isRegistering ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className={`py-2 px-4 font-semibold relative transition-all duration-300
                ${isRegistering ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Register
              <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300
                ${isRegistering ? 'w-full' : 'w-0'}`}></span>
            </button>
          </div>

            <h1 className="text-1xl font-bold text-center text-gray-800 mb-3">{isRegistering ? 'Not registered yet?' : 'Not logged in yet?'}</h1>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-3">{isRegistering ? 'Register' : 'Login'}</h1>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 mb-4 text-sm text-center rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex flex-col space-y-4">
              <div className="w-full relative py-2">
                <label
                  htmlFor="email"
                  className={`text-xs absolute left-0 transition-all duration-200 transform origin-top-left 
                    ${isEmailFocused ? '-translate-y-2 scale-120 text-green-600' : 'text-gray-700'
                  }`}
                >
                  E-mail adress
                </label>
                <input
                  type="email"
                  id="email"
                  className="pt-5 text-sm w-full px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-green-600 transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                />
              </div>

              <div className="w-full relative py-2">
                <label
                  htmlFor="password"
                  className={`text-xs absolute left-0 transition-all duration-200 transform origin-top-left 
                    ${isPasswordFocused ? '-translate-y-2 scale-120 text-green-600' : 'text-gray-700'
                  }`}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="pt-5 text-sm w-full px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-green-600 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                />
              </div>
            
              <div className={`w-full relative py-2 transition-all duration-300 ${isRegistering ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                <label
                  htmlFor="confirm-password"
                  className={`text-xs absolute left-0 transition-all duration-200 transform origin-top-left 
                    ${isConfirmPasswordFocused ? '-translate-y-2 scale-120 text-green-600' : 'text-gray-700'
                  }`}>
                  Confirm password
                </label>
                
                 <input
                  type="password"
                  id="confirm-password"
                  className="pt-5 text-sm w-full px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-green-600 transition-all duration-200"
                  value={confirm_password}
                  onChange={(e) => setConfirm_Password(e.target.value)}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                  required={isRegistering} // Ustawiamy 'required' tylko gdy pole jest widoczne
                 />
              </div>
              
              {/* Sekcja "Remember Me" */}
              <div className={`mt-2 flex justify-center ${isRegistering ? 'hidden' : 'block'}`}>
                <label htmlFor="remember-me" className="flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="hidden" // Ukrywamy domyślny checkbox
                  />
                  <div
                    className={`w-4 h-4 flex items-center justify-center border-2 rounded-sm mr-2 transition-all duration-300 ${rememberMe ? 'bg-green-600 border-green-600' : 'bg-white border-gray-400'}`}
                  >
                    {rememberMe && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">
                    Zapamiętaj mnie
                  </span>
                </label>
              </div>

              {/* Sekcja "Accept Terms & Conditions" */}
              <div className={`mt-2 flex justify-center ${isRegistering ? 'block' : 'hidden'}`}>
                <label htmlFor="terms" className="flex items-center cursor-pointer select-none">
                  <input
                     type="checkbox"
                     id="terms"
                     checked={termsAccepted}
                     onChange={(e) => setTermsAccepted(e.target.checked)}
                     required={isRegistering}
                     className="hidden" // Ukrywamy domyślny checkbox
                  />
                   <div
                     className={`w-4 h-4 flex items-center justify-center border-2 rounded-sm mr-2 transition-all duration-300
                      ${termsAccepted ? 'bg-green-600 border-green-600' : 'bg-white border-gray-400'}`}
                   >
                     {termsAccepted && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>)}
                   </div>
                   <span className="text-sm text-gray-700">
                    I accept the <a href="#" className="font-semibold text-green-600 hover:underline">Terms & Conditions</a>
                   </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex uppercase justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (isRegistering ? 'Registration...' : 'Logging in...') : (isRegistering ? 'Register' : 'Login')}
              </button>

            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                {isRegistering ? 'Already registered?' : 'Do not have an account?'}{' '}
                <span
                  className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
                  onClick={toggleForm}
                >
                 {isRegistering ? 'Login' : 'Register'}
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
