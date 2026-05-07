import { useState, useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";
import { motion, AnimatePresence } from "framer-motion";

import banxaImg from "../assets/images/banxa.png";
import coachupImg from "../assets/images/coachup.png";
import neoremitImg from "../assets/images/neoremit.png";
import paymentsolImg from "../assets/images/paymentsol.png";
import paymovaImg from "../assets/images/paymova.png";
import tezaImg from "../assets/images/teza.png";
import turboalanrefinerImg from "../assets/images/turboalanrefiner.png";

const categories = ["All", "Full Stack", "AI & Data Science"];

const projects = [
  {
    title: "NEOREMIT",
    category: "Full Stack",
    desc: "A secure cross-border remittance architecture focusing on low-latency global transfers and rigorous financial compliance.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS"],
    img: neoremitImg,
    link: "https://neoremit.io",
    color: "#0f172a"
  },
  {
    title: "TURBO ALAN",
    category: "AI & Data Science",
    desc: "AI-driven text refinement platform optimized for advanced linguistics, automated proofreading, and data-driven content quality.",
    stack: ["React", "Python", "OpenAI", "FastAPI"],
    img: turboalanrefinerImg,
    link: "https://turboalanrefiner.vercel.app",
    color: "#111827"
  },
  {
    title: "PAYMOVA",
    category: "Full Stack",
    desc: "Full-stack payment solution facilitating rapid digital transactions and advanced financial management at scale.",
    stack: ["Next.js", "Express", "MongoDB", "Stripe"],
    img: paymovaImg,
    link: "https://paymova.kryptomind.net",
    color: "#0c4a6e"
  },
  {
    title: "TEZA",
    category: "Full Stack",
    desc: "Advanced frontend architecture and headless commerce integration focusing on fluid UX and performance optimization.",
    stack: ["Next.js", "Tailwind CSS", "Redux", "Vercel"],
    img: tezaImg,
    link: "https://teza-frontend.vercel.app/",
    color: "#2e1065"
  },
  {
    title: "PAYMENT SOLUTION",
    category: "Full Stack",
    desc: "Robust payment orchestration platform designed for enterprise-level transaction security and cloud-native scaling.",
    stack: ["Angular", ".NET Core", "SQL Server", "Azure"],
    img: paymentsolImg,
    link: "https://paymentsolution.io",
    color: "#1e1b4b"
  },
  {
    title: "COACH UP",
    category: "Full Stack",
    desc: "Modern digital coaching interface and mobile application backend engineered for high user engagement and streamlined workflows.",
    stack: ["React Native", "Firebase", "Express", "GCP"],
    img: coachupImg,
    link: "https://coach-up-fitness.vercel.app",
    color: "#1e1b4b"
  }
];

const testimonials = [
  {
    id: 1,
    client: "Enterprise Client",
    position: "Director of Technology",
    quote: "Asad ur Rehman delivered an exceptional platform that exceeded every expectation. Their technical depth and commitment to quality made them a true strategic partner in my digital transformation."
  },
  {
    id: 2,
    client: "Fintech Partner",
    position: "Chief Product Officer",
    quote: "I's ability to navigate complex regulatory requirements while building a flawless UX was remarkable. Delivery was on-time and the code quality was production-grade from day one."
  },
  {
    id: 3,
    client: "Startup Founder",
    position: "Co-Founder & CEO",
    quote: "Working with Asad ur Rehman felt like having a world-class engineering team embedded directly in my company. They didn't just build features — they solved the right problems."
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useSEO({
    title: "Portfolio",
    description: "View my recent enterprise projects, featuring FinTech platforms, Web3 integrations, and AI enterprise solutions."
  });

  const filteredProjects = projects.filter(p =>
    activeCategory === "All" ? true : p.category === activeCategory
  );

  return (
    <div className="w-full bg-[var(--bg-color)] text-[var(--text-color)] pt-32 pb-32">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            My Work<span className="text-brand-primary">.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[var(--text-color)]/70 font-light leading-relaxed">
            Explore my portfolio of production deployments serving clients across FinTech, Web3, AI, and EdTech globally.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-nowrap overflow-x-auto gap-2 md:gap-3 border-b border-[var(--text-color)]/10 pb-6 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap shrink-0 relative px-5 py-2.5 text-xs tracking-wide font-bold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                activeCategory === cat
                  ? "text-[#000000]"
                  : "text-[var(--text-color)]/60 hover:text-[var(--text-color)]"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-brand-primary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-40 min-h-[50vh]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={project.title}
                className="group rounded-3xl bg-[var(--text-color)]/5 border border-[var(--text-color)]/5 hover:border-brand-primary/40 overflow-hidden flex flex-col"
              >
                {/* Real project preview image */}
                <div className="w-full h-52 relative overflow-hidden">
                  <img
                    src={project.img}
                    alt={`${project.title} project`}
                    className="w-full h-full object-contain object-center grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-white/80 font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold tracking-tighter mb-3 text-[var(--text-color)]">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-color)]/60 text-sm leading-relaxed mb-6 flex-1">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-[var(--text-color)]/10 rounded-md text-[10px] font-bold tracking-widest text-[var(--text-color)]/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--text-color)] group-hover:text-brand-primary transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                  >
                    View Live Project <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Client Testimonials */}
      <section className="bg-[var(--text-color)]/5 py-32 mb-40 border-y border-[var(--text-color)]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Client Testimonials</h2>
            <p className="text-[var(--text-color)]/60 text-lg font-light">
              What my clients say about partnering with Asad ur Rehman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: test.id * 0.1 }}
                className="p-10 rounded-[2rem] bg-[var(--bg-color)] border border-[var(--text-color)]/10 shadow-xl relative"
              >
                <div className="text-6xl text-brand-primary/20 absolute top-6 left-6 font-serif leading-none">"</div>
                <p className="text-[var(--text-color)]/80 text-sm leading-relaxed italic mb-8 relative z-10 pt-6">
                  {test.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-primary/10 flex items-center justify-center font-bold text-brand-primary text-lg">
                    {test.client.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide text-[var(--text-color)]">{test.client}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-color)]/40 mt-1">{test.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg text-[var(--text-color)]/60 mb-12">
          Let's discuss how I can bring your vision to life with engineering precision.
        </p>
        <a
          href="/quote"
          className="inline-flex items-center justify-center px-10 py-5 bg-brand-primary text-[#000000] text-xs font-black tracking-[0.3em] uppercase rounded-full hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(240,194,123,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/50"
        >
          Get in Touch
        </a>
      </section>

    </div>
  );
};

export default Portfolio;
