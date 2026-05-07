import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutImg from "../../assets/images/team/developer-setup.jpg";

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(contentRef.current.children, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-700 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div ref={imageRef} className="flex-1 relative group">
          <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[var(--text-color)]/10">
            <img
              src={aboutImg}
              alt="Asad ur Rehman Setup"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
            />
          </div>
        </div>

        <div ref={contentRef} className="flex-1 space-y-8">
          <span className="text-brand-primary text-xs tracking-[0.5em] uppercase block">
            The Developer
          </span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic leading-none">
            MY <br /> JOURNEY.
          </h2>
          <p className="text-xl font-lux text-[var(--text-color)] opacity-80 leading-relaxed italic">
            "I transform complex data challenges into high-performance digital products by bridging the gap between Full-Stack Engineering and AI Data Science."
          </p>
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6 text-brand-primary">
                  EXPERIENCE
                </h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-lg">
                      Full-Stack Engineering
                    </h4>
                    <p className="text-sm opacity-50 mb-2">
                      Building dynamic, high-performance web applications
                    </p>
                    <ul className="text-sm opacity-70 space-y-2 list-disc pl-4 mb-4 font-lux">
                      <li>Designing resilient frontend architectures.</li>
                      <li>Optimizing backend databases for scale.</li>
                      <li>Ensuring seamless user experiences (UX/UI).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Data & AI Integration
                    </h4>
                    <p className="text-sm opacity-50 mb-2">
                      Connecting applications with intelligence
                    </p>
                    <ul className="text-sm opacity-70 space-y-2 list-disc pl-4 font-lux">
                      <li>Implementing LLM pipelines (OpenAI, Claude).</li>
                      <li>Automating workflows through code.</li>
                      <li>Deploying deep learning logic at scale.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 text-brand-primary">
                  TECH STACK
                </h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-lg">
                      Frontend Excellence
                    </h4>
                    <p className="text-sm opacity-50">
                      React, Next.js, Vue.js, Vite, Framer Motion, GSAP
                    </p>
                    <div className="mt-2 text-xs opacity-60 font-lux tracking-widest">
                      PERFORMANCE • ACCESSIBILITY • MOTION
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Backend & Architecture
                    </h4>
                    <p className="text-sm opacity-50">
                      Django, Flask, Python, Node.js, PostgreSQL, AWS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--text-color)]/5">
              <p className="text-lg md:text-xl leading-relaxed opacity-80 italic">
                "Driven by an obsession with clean code and cutting-edge design, I construct the foundation for your next big idea."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
