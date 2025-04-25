import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/fjord.jpg';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if current route is active
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <motion.header
      className={`sticky top-0 z-10 border-b border-gray-200 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 sm:h-9" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" isActive={isActiveRoute('/')}>
            Home
          </NavLink>
          <NavLink to="/dashboard" isActive={isActiveRoute('/dashboard')}>
            Dashboard
          </NavLink>
          <NavLink to="/login" isActive={isActiveRoute('/login')}>
            Login
          </NavLink>
          <motion.div>
            <p className="text-sm text-gray-500">Version 1.0</p>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden block"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-0.5 bg-gray-700 relative">
            <motion.div
              className="absolute w-6 h-0.5 bg-gray-700"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 0 : -6
              }}
            />
            <motion.div
              className="absolute w-6 h-0.5 bg-gray-700"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1
              }}
            />
            <motion.div
              className="absolute w-6 h-0.5 bg-gray-700"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? 0 : 6
              }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col gap-2">
          <MobileNavLink 
            to="/" 
            isActive={isActiveRoute('/')} 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </MobileNavLink>
          <MobileNavLink 
            to="/dashboard" 
            isActive={isActiveRoute('/dashboard')} 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </MobileNavLink>
          <MobileNavLink 
            to="/login" 
            isActive={isActiveRoute('/login')} 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </MobileNavLink>
          <div className="mt-2">
            <p className="text-sm text-gray-500 text-center">Version 1.0</p>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

// Desktop NavLink component
const NavLink: React.FC<{
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ to, isActive, children }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className={`px-3 py-2 rounded text-sm transition-colors duration-200 ${
        isActive 
          ? 'bg-gray-600 text-white' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  </motion.div>
);

// Mobile NavLink component
const MobileNavLink: React.FC<{
  to: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ to, isActive, onClick, children }) => (
  <Link
    to={to}
    className={`block py-2 px-4 rounded text-center text-sm transition-colors duration-200 ${
      isActive 
        ? 'bg-gray-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;