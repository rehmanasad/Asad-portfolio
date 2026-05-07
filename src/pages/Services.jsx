import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";
import { Globe, Smartphone, Cloud, Brain } from "lucide-react";

const expertiseData = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Delivering robust, scalable web applications using cutting-edge technologies and frameworks.",
    highlights: [
      "Frontend: React, Next.js, Vue.js, Vite, TypeScript",
      "Backend: Django, Flask, Python, Node.js, FastAPI",
      "Databases: PostgreSQL, MongoDB, Firebase, Elasticsearch",
      "Performance Optimization, CI/CD & SEO"
    ]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Building native and cross-platform mobile applications that deliver exceptional user experiences.",
    highlights: [
      "Native iOS (Swift) & Android (Kotlin)",
      "Cross-platform: React Native, Flutter",
      "Mobile UX/UI Design & Testing",
      "App Store Optimization & Distribution"
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Architecting and implementing cloud-based solutions for scalability, reliability, and cost efficiency.",
    highlights: [
      "AWS (EC2, S3) & Cloud Deployments",
      "Docker, Docker Compose & Container Orchestration",
      "GitHub Actions, CI/CD Pipelines",
      "Nginx, Linux & Production Hardening"
    ]
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Harnessing the power of artificial intelligence to solve complex business problems.",
    highlights: [
      "TensorFlow, PyTorch & scikit-learn",
      "NLP: Whisper, BERTopic, RoBERTa, SBERT",
      "LLM Integration & Retrieval-Augmented Generation",
      "AI Evaluation Pipelines & Predictive Analytics"
    ]
  }
];

const processData = [
  { step: "01", title: "Discovery & Planning", desc: "I begin with understanding your business goals and user needs to define the project requirements and scope." },
  { step: "02", title: "Design & Prototyping", desc: "My UX/UI team creates wireframes and prototypes to visualize the solution before development begins." },
  { step: "03", title: "Development", desc: "My engineers build the solution using the right technologies, following best practices and coding standards." },
  { step: "04", title: "Testing & QA", desc: "Rigorous testing ensures the solution is bug-free, secure, and performs optimally across all platforms." },
  { step: "05", title: "Deployment", desc: "I carefully launch your solution to production, ensuring a smooth transition and minimal disruption." },
  { step: "06", title: "Support & Maintenance", desc: "My relationship continues with ongoing support, updates, and enhancements to keep your solution running smoothly." }
];

const Services = () => {
  useSEO({
    title: "Services",
    description: "Explore my premium engineering services ranging from Enterprise Cloud Architecture to Web3 development."
  });

  return (
    <div className="w-full bg-[var(--bg-color)] text-[var(--text-color)] pt-32 pb-32">

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            My Expertise<span className="text-brand-primary">.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[var(--text-color)]/70 font-light leading-relaxed">
            I combine technical prowess with industry knowledge to deliver solutions that drive business growth and innovation.
          </p>
        </motion.div>
      </section>

      {/* Expertise Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {expertiseData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group p-10 rounded-[2rem] bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/25 transition-all duration-700"></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <Icon size={22} className="text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter text-[var(--text-color)] group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-[var(--text-color)]/70 leading-relaxed mb-8 font-light">
                  {item.description}
                </p>

                <ul className="space-y-3">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3 text-sm font-medium opacity-80">
                      <span className="text-brand-primary mt-1 shrink-0">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* My Development Process */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">My Development Process</h2>
          <p className="text-[var(--text-color)]/70 font-light text-lg">
            A structured, transparent approach for quality, efficiency, and client satisfaction.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 bg-[var(--text-color)]/10 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {processData.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex gap-8 items-start relative z-10 ${
                  idx % 2 !== 0 ? "md:flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Visual Node — centered on line */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-[var(--bg-color)] border-2 border-brand-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-brand-primary shadow-[0_0_15px_rgba(240,194,123,0.3)]">
                  {step.step}
                </div>

                {/* Content Panel — fixed padding, no conflict */}
                <div className="pl-20 md:pl-0 w-full md:w-1/2">
                  <div className={`p-8 rounded-3xl border border-[var(--text-color)]/10 hover:bg-[var(--text-color)]/5 transition-colors ${
                    idx % 2 !== 0 ? "md:mr-14" : "md:ml-14"
                  }`}>
                    <h4 className="text-2xl font-bold tracking-tighter mb-4 text-[var(--text-color)]">{step.title}</h4>
                    <p className="text-[var(--text-color)]/70 font-light leading-relaxed">{step.desc}</p>
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
          Ready to Leverage My Expertise?
        </h2>
        <p className="text-lg text-[var(--text-color)]/60 mb-12">
          Let's discuss how my technical expertise can solve your business challenges and drive growth.
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center justify-center px-10 py-5 bg-brand-primary text-[#000000] text-xs font-black tracking-[0.3em] uppercase rounded-full hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(240,194,123,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/50"
        >
          Get in Touch
        </Link>
      </section>

    </div>
  );
};

export default Services;
