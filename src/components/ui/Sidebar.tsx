import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  FaFileAlt} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaQuestionCircle } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
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
        className={`${isMobile ? 'fixed left-0 top-0 h-full z-20' : ''} w-16 bg-sky-800 text-white flex flex-col items-center py-4 space-y-6`}
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (sidebarOpen ? "open" : "closed") : "open"}
      >
        <div className="mb-6 ml-3 mb-20" >
          <img src="/download.png" alt="Logo" className="w-10 h-10" />
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg cursor-pointer ml-2 hover:bg-white hover:text-black text-white"
        >
          <FaUser className="text-xl" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg cursor-pointer ml-2
    ${currentPage === 'documents' ? 'bg-white text-black' : 'hover:bg-white hover:text-black text-white'}
  `}
        >
          <SiGoogleanalytics className="text-xl" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg cursor-pointer ml-2 hover:bg-white hover:text-black text-white"
        >
          <FaFileAlt className="text-xl" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg cursor-pointer ml-2 hover:bg-white hover:text-black text-white"
        >
          <IoBookSharp className="text-xl" />
        </motion.div>

      
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg cursor-pointer ml-2 hover:bg-white hover:text-black text-white"
        >
          <FaQuestionCircle className="text-xl" />
        </motion.div>

        {/* <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer mt-auto ml-2"
          onClick={toggleSidebar}
        >
          {sidebarOpen && isMobile ? <FaTimes className="text-xl " /> : <FaBars className="text-xl" />}
        </motion.div> */}
      </motion.aside>
    </>
  );
};

export default Sidebar;