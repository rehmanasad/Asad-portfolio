import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const GenericFeatureGrid = ({ sectionTitle, sectionDescription, features, badge = "" }) => {
  return (
    <section className="py-24 px-6 bg-[var(--text-color)]/[0.02]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)] tracking-tight">
            {sectionTitle}
          </h2>
          {sectionDescription && (
             <p className="text-lg text-[var(--text-color)]/70 max-w-3xl mx-auto font-light leading-relaxed">
               {sectionDescription}
             </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl border border-[var(--text-color)]/10 bg-[var(--bg-color)] hover:border-brand-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {feature.icon && (
                 <div className="mb-6 inline-flex p-4 rounded-2xl bg-brand-primary/10 text-brand-primary">
                    {feature.icon}
                 </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-color)] group-hover:text-brand-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-[var(--text-color)]/70 font-light leading-relaxed flex-1">
                {feature.description}
              </p>

              {feature.subList && feature.subList.length > 0 && (
                <div className="pt-6 mt-6 border-t border-[var(--text-color)]/10">
                  <h4 className="text-xs tracking-widest uppercase text-[var(--text-color)]/50 font-semibold mb-4 text-left">
                    Capabilities:
                  </h4>
                  <ul className="space-y-3">
                    {feature.subList.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 flex-shrink-0" />
                        <span className="text-[var(--text-color)]/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GenericFeatureGrid;
