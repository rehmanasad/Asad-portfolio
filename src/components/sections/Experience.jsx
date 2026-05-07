import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experienceData = [
  {
    role: "Founder & Software Engineer",
    company: "AlgoVerse",
    duration: "Mar 2026 – Present",
    description: "Founded AlgoVerse to deliver custom software, AI-driven products, and data engineering solutions for international clients. Lead end-to-end engineering across Python/Django backends, modern React/Next.js frontends, and cloud-native deployments on AWS.",
    tech: ["Django", "Python", "Next.js", "AWS", "OpenAI"]
  },
  {
    role: "Software Engineer (AI Evaluation)",
    company: "Datacurve (Shipd) — Freelance",
    duration: "Mar 2026 – Present",
    description: "Shipping 12+ evaluation benchmarks (6–8 Docker containers each) used to test AI coding agents before enterprise deployment, simulating multi-service production incidents with mock Stripe/Datadog/PagerDuty APIs and seeded PostgreSQL data. Built Python scoring pipelines achieving 100% reproducibility, adopted as the platform-wide quality standard.",
    tech: ["Python", "Docker", "PostgreSQL", "AWS", "AI Evaluation"]
  },
  {
    role: "Software Engineer (Backend)",
    company: "The Dev Flakes — Client: Hivebuy GmbH",
    duration: "Aug 2025 – Apr 2026",
    description: "Integrated 10 supplier systems (PunchOut/OCI/CXML) and built external procurement APIs, replacing per-vendor manual order coordination with automated catalog-to-purchase workflows. Shipped CSV/XLSX ETL across 11 business entities and fixed 50+ production defects including N+1 queries across 14 endpoints — wrote 5,300+ lines of test code covering ordering, invoicing, and Elasticsearch catalogue search.",
    tech: ["Django", "Python", "PostgreSQL", "Elasticsearch", "REST APIs"]
  },
  {
    role: "Algorithmic Problem Designer",
    company: "AfterQuery Experts",
    duration: "Apr 2024 – Jul 2025",
    description: "Authored 100+ algorithmic problems with deterministic test suites for an AI evaluation platform, improving automated grading accuracy by 18%.",
    tech: ["Python", "Algorithms", "AI Evaluation"]
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line drawing down
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Animate each item cascading in
      itemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 px-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-700 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-xs tracking-[0.4em] text-brand-primary uppercase mb-4 font-bold">
            CAREER PATH
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold italic tracking-tighter leading-none">
            EXPERIENCE.
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto md:mx-0 pl-4 md:pl-8">
          {/* Background Track Line */}
          <div className="absolute top-0 left-[15px] md:left-[31px] w-[2px] h-full bg-[var(--text-color)]/5"></div>

          {/* Animated Glow Line */}
          <div
            ref={lineRef}
            className="absolute top-0 left-[15px] md:left-[31px] w-[2px] bg-gradient-to-b from-brand-primary via-blue-500 to-transparent origin-top shadow-[0_0_15px_rgba(0,210,255,0.8)]"
          ></div>

          <div className="space-y-16">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="relative pl-10 md:pl-16 group"
              >
                {/* Timeline Node Bulb */}
                <div className="absolute top-1 left-[-2px] md:left-[14px] w-[10px] h-[10px] rounded-full bg-[var(--bg-color)] border-2 border-brand-primary group-hover:bg-brand-primary group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(0,210,255,1)] transition-all duration-300 z-10"></div>

                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-color)]">
                    {exp.role}
                  </h4>
                  <span className="text-xs uppercase tracking-[0.2em] font-lux text-[var(--text-color)]/50 font-semibold whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                <div className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-6">
                  {exp.company}
                </div>

                <p className="text-[var(--text-color)]/70 leading-relaxed font-lux max-w-2xl text-base md:text-sm mb-6">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 bg-[var(--text-color)]/5 rounded-full text-[10px] uppercase font-bold tracking-widest text-[var(--text-color)]/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Experience;
