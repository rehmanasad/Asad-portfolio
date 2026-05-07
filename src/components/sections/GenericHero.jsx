import { motion } from "framer-motion";

const GenericHero = ({ badgeText, titleHighlight, titleRest, description }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-20 px-6">
      <div className="absolute inset-0 bg-[var(--bg-color)] z-0"></div>
      
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {badgeText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block px-4 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            {badgeText}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-color)]"
        >
          {titleHighlight && (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-[#ff9cc6]">
                {titleHighlight}
              </span>
              <br className="hidden md:block" />
            </>
          )}
          {titleRest}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-[var(--text-color)]/70 max-w-3xl mx-auto leading-relaxed font-light whitespace-pre-wrap"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="pt-8"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-[var(--bg-color)] bg-brand-primary rounded-full hover:bg-brand-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(240,194,123,0.3)]"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GenericHero;
