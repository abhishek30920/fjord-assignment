import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaUsers, FaCog, FaFileAlt, FaBars, FaTimes } from "react-icons/fa";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, isMobile, currentPage }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`${isMobile ? 'fixed left-0 top-0 h-full z-20' : ''} w-16 bg-blue-900 text-white flex flex-col items-center py-4 space-y-6`}
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (sidebarOpen ? "open" : "closed") : "open"}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
        >
          <FaChartBar className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
        >
          <FaUsers className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg hover:bg-blue-800 cursor-pointer ${currentPage === 'documents' ? 'bg-blue-700' : ''}`}
        >
          <FaFileAlt className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
        >
          <FaCog className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer mt-auto"
          onClick={toggleSidebar}
        >
          {sidebarOpen && isMobile ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Sidebar;