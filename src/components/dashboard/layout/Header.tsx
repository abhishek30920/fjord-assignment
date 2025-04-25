import React from 'react';
import { motion } from 'framer-motion';
import { IoMdExit } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';
import { formatDate, formatTime } from '../../../utils/dateFormatter';

interface HeaderProps {
  title: string;
  username: string;
  toggleSidebar?: () => void;
  isMobile?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, toggleSidebar, isMobile, onLogout }) => {
  const currentDate = new Date();

  return (
    <div className="bg-white shadow px-4 py-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center">
          {isMobile && toggleSidebar && (
            <button onClick={toggleSidebar} className="mr-3">
              <FaBars className="text-gray-600" />
            </button>
          )}
          <h1 className="text-lg font-bold text-blue-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <div className="text-gray-500 text-sm mr-3">
            <div>{formatDate(currentDate)}</div>
            <div>{formatTime(currentDate)}</div>
          </div>
          
          <img
            src={`https://ui-avatars.com/api/?name=${username}&background=0062cc&color=fff`}
            alt="Profile"
            className="w-8 h-8 rounded-full shadow-sm"
          />
          
          <span className="text-gray-700 font-medium">{username}</span>
          
          {onLogout && (
            <motion.button 
              className="text-red-500 font-semibold hover:text-red-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
            >
              <IoMdExit />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;