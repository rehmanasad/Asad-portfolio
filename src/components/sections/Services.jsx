import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    description: "Architecting high-performance web systems from the ground up. I build scalable frontend architectures and secure, highly-available backend infrastructures.",
    features: ["React, Next.js, Vue.js & Vite", "Django, Flask, Python & Node Backends", "AWS Cloud Infrastructure (EC2/S3)", "Performance Optimization & CI/CD"],
  },
  {
    number: "02",
    title: "AI & Data Science",
    description: "Integrating industrial-grade intelligence into digital products. I specialize in LLM pipelines, RAG systems, and custom data engineering for businesses.",
    features: ["LLM Integration (OpenAI/Claude/Whisper)", "scikit-learn / TensorFlow / PyTorch", "NLP Pipelines (BERTopic, RoBERTa, SBERT)", "Data Engineering & AI Evaluation"],
  }
];

const Services = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 px-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-xs tracking-[0.4em] text-brand-primary uppercase mb-4">
              CAPABILITIES
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold italic tracking-tighter leading-none">
              EXPERTISE.
            </h3>
          </div>
          <p className="max-w-md text-[var(--text-color)] opacity-60 font-lux text-sm md:text-base italic">
            "Engineered to scale. Built to captivate. I deliver code that transforms massive challenges into elegant solutions."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative border-t border-[var(--text-color)]/10 pt-8"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500 text-6xl font-black italic text-brand-primary pointer-events-none -translate-y-4">
                {service.number}
              </div>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-brand-primary font-bold text-sm tracking-widest">{service.number}</span>
                <h4 className="text-2xl md:text-3xl font-bold tracking-tighter italic">{service.title}</h4>
              </div>
              
              <p className="text-[var(--text-color)] opacity-70 mb-8 leading-relaxed font-lux text-sm md:text-base">
                {service.description}
              </p>
              
              <div className="flex flex-col gap-3">
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-brand-primary" />
                    <span className="text-sm font-semibold opacity-80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
