import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock.js";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useScrollLock(isOpen);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Focus trap logic
    const focusableElements = menuRef.current?.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    open: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i + 0.2, duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Quote", href: "/quote" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] px-4 md:px-6 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-[var(--bg-color)]/80 backdrop-blur-xl border-b border-[var(--text-color)]/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <Link to="/" className="z-[110]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img src="/logo.svg" alt="AUR Logo" className="w-10 h-10 object-contain rounded-md" />
            <div className="text-[var(--text-color)] font-bold text-lg md:text-xl tracking-tighter">
              Asad ur Rehman<span className="text-brand-primary">.</span>
            </div>
          </motion.div>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-[var(--text-color)] opacity-80"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`hover:text-brand-primary transition-colors ${
                  location.pathname === link.href ? "text-brand-primary opacity-100" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center gap-2 md:gap-4 z-[110]">
            <Link
              to="/quote"
              className="hidden lg:flex px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold bg-brand-primary text-[#000000] rounded-full hover:bg-brand-primary/90 transition-all hover:scale-105"
            >
              Start Project
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2.5 md:p-3 bg-[var(--text-color)] text-[var(--bg-color)] rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[var(--text-color)] md:hidden hover:text-brand-primary transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 min-h-screen bg-[var(--bg-color)]/95 backdrop-blur-2xl z-[105] flex flex-col items-center justify-center p-6 md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--text-color)] md:hidden hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full z-[110]"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center gap-12 overflow-y-auto max-h-[80vh] pb-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} custom={i} variants={linkVariants}>
                  <Link
                    to={link.href}
                    className={`text-4xl font-bold tracking-tighter italic hover:text-brand-primary transition-colors ${
                      location.pathname === link.href ? "text-brand-primary" : "text-[var(--text-color)]"
                    }`}
                  >
                    {link.name.toUpperCase()}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8 }}
                className="pt-12 border-t border-[var(--text-color)]/10 text-[10px] uppercase tracking-[0.5em] text-[var(--text-color)]"
              >
                Let's Build The Future
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
