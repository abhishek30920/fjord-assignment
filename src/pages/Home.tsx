import React from 'react';
import { motion } from 'framer-motion';
import mountainImage from '../assets/mountain.jpg'

const Home: React.FC = () => {
  return (
    <div
      className="flex-1 flex flex-col h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${mountainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        className="flex-1 mt-20 flex flex-col p-8 md:p-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Colored lines */}
        <motion.div
          className="flex mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        >
          <div className="h-1 w-16 bg-teal-500 mr-1"></div>
          <div className="h-1 w-16 bg-orange-500"></div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl font-bold text-black mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Assignment
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-2xl text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          React Developer
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default Home;