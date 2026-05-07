import React from 'react';
import { motion } from 'framer-motion';

const ShadowLoader = () => {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-transparent">
      <motion.div
        animate={{ 
          opacity: [0.1, 0.6, 0.1],
          scale: [0.95, 1.05, 0.95],
          filter: ["blur(10px)", "blur(20px)", "blur(10px)"]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-32 h-1 bg-brand-primary rounded-full shadow-[0_0_30px_rgba(240,194,123,0.8)]"
      />
    </div>
  );
};

export default ShadowLoader;
