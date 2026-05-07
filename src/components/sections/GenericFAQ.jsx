import { motion } from "framer-motion";
import { Accordion } from "../ui/Accordion.jsx";

const GenericFAQ = ({ title = "Frequently Asked Questions", subtitle = "I have got the answers to your questions.", faqs = [] }) => {
  return (
    <section className="py-24 px-6 bg-[var(--bg-color)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-[var(--text-color)]/70 font-light">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqs} />
        </motion.div>
      </div>
    </section>
  );
};

export default GenericFAQ;
