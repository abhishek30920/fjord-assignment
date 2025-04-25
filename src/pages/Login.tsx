
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import nhoLogo from '../assets/nelfo_logo.jpeg';


import { createContext } from 'react';
// Creating context for username 
export const UserContext = createContext<{ username: string; setUsername: (name: string) => void }>({
  username: '',
  setUsername: () => {}
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  
  
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
   
    if (rememberMe) {
      localStorage.setItem('userEmail', email);
    } else {
      localStorage.removeItem('userEmail');
    }

    // Save username to localStorage so the financial board can access it
    localStorage.setItem('currentUser', email.split('@')[0]);
    

    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt with:', { email, password });
      navigate("/dashboard");
    }, 800);
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100 p-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex flex-col items-center mb-6"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <img src={nhoLogo} alt="NHO Elektro" className="h-24 md:h-32 mb-2" />
      </motion.div>
      
      <motion.div 
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Logg Inn</h2>
        
        {error && (
          <motion.div 
            className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Brukernavn (E-post adresse)
            </label>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Skriv inn Brukernavn" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passord
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                Glemt passord?
              </Link>
            </div>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Skriv inn Passord" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember-me" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Husk meg
            </label>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className={`w-full py-3 px-4 flex justify-center items-center bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isLoading ? 'opacity-90' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Logg Inn"}
          </motion.button>
          
          <div className="text-center text-sm text-gray-600 mt-6">
            <span>Har du ikke en konto? </span>
            <Link to="/register" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors">
              Opprett konto
            </Link>
          </div>
        </form>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-center text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
      >
        © 2025 NHO Elektro.All right reserved.
      </motion.div>
    </motion.div>
  );
};

export default Login;