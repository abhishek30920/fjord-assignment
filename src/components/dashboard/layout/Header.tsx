import React from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';

interface HeaderProps {
  title: string;
  username: string;
  toggleSidebar?: () => void;
  isMobile?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, toggleSidebar, isMobile, onLogout }) => {
  return (
    <div className="bg-white px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        {isMobile && toggleSidebar && (
          <button onClick={toggleSidebar} className="mr-3">
            <FaBars className="text-gray-600" />
          </button>
        )}
        <h1 className="text-lg font-medium text-gray-700">{title}</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="text-gray-600 text-xs flex items-center gap-1 bg-sky-100 p-1 rounded-2xl">
          <div>Date: 08.04.2025</div>
          <span className='text-blue-300'>|</span>
          <div>Time: 09:28:31</div>
        </div>


        <div className="flex items-center space-x-2">
          <div className="w-8 h-8  bg-sky-600 text-white rounded-full flex items-center justify-center">
            B
          </div>
          <span className="text-gray-700">{username}</span>
        </div>

        {onLogout && (
          <button
            className="text-blue-600"
            onClick={onLogout}
          >
            <IoMdExit />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;