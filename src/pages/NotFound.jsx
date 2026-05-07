import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-[10rem] md:text-[14rem] font-black tracking-tighter leading-none text-brand-primary/20 select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter -mt-8 mb-6">
          Page Not Found<span className="text-brand-primary">.</span>
        </h2>
        <p className="text-[var(--text-color)]/60 text-lg font-light mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-10 py-4 bg-brand-primary text-[#000000] text-xs font-black tracking-[0.3em] uppercase rounded-full hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-brand-primary/20"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
