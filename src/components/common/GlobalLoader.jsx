import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const GlobalLoader = ({ onComplete }) => {
  const [name, setName] = useState("ASAD.");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center text-white font-lux"
    >
      <div className="relative overflow-hidden mb-8">
        <motion.h1
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter"
        >
          {name}
        </motion.h1>
      </div>

      <div className="w-64 h-[1px] bg-white/10 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${counter}%` }}
          className="absolute h-full bg-brand-primary"
        />
      </div>

      <div className="mt-4 tabular-nums text-sm tracking-widest text-white/50">
        {counter}%
      </div>
    </motion.div>
  );
};

export default GlobalLoader;
