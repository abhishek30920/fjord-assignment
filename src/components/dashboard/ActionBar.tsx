import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaPrint } from 'react-icons/fa';

interface ActionBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="bg-gray-50 px-4 py-2 flex flex-wrap gap-2 justify-between items-center border-b">
      {/* Tabs */}
      <div className="flex flex-wrap">
        {tabs.map((tab, idx) => (
          <motion.button
            key={idx}
            className={`px-3 py-2 ${
              tab === activeTab
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            custom={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </motion.button>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2">
        <motion.button
          className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload size={14} /> 
          <span className="hidden sm:inline">Eksport</span>
        </motion.button>
        <motion.button
          className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPrint size={14} /> 
          <span className="hidden sm:inline">Skriv ut</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ActionBar;