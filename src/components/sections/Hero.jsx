import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/team/asad.jpeg";
import { ArrowRight, Sparkles, Code2, Globe } from "lucide-react";

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const infoBoxesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state setup before animation
    gsap.set(titleRef.current, { y: 100, opacity: 0 });
    gsap.set(imageRef.current, { scale: 0.8, opacity: 0, filter: "blur(20px)" });
    gsap.set(infoBoxesRef.current, { y: 20, opacity: 0 });

    tl.to(titleRef.current, {
      y: 0,
      opacity: 0.05,
      duration: 1.5,
    })
    .to(
      imageRef.current,
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
      "-=1.0"
    )
    .to(
      infoBoxesRef.current,
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
      "-=0.5"
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[var(--bg-color)] overflow-hidden flex items-center justify-center pt-20 pb-10"
    >
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <h1 
          ref={titleRef}
          className="text-[15vw] font-black italic whitespace-nowrap text-[var(--text-color)] select-none opacity-5 tracking-tighter"
        >
          SOFTWARE ENGINEER
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col items-center justify-center">
        
        {/* Main Composition Container */}
        <div className="relative flex justify-center items-center w-full max-w-4xl mx-auto h-[60vh] md:h-[70vh]">
          
          {/* Center Image */}
          <div ref={imageRef} className="relative z-20 w-3/4 sm:w-2/3 md:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden border border-[var(--text-color)]/10 shadow-[0_0_80px_rgba(0,210,255,0.15)] group">
            <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
            <img 
              src={profileImg} 
              alt="Asad ur Rehman"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Micro-Data Box 1: Availability */}
          <div 
            ref={el => infoBoxesRef.current[0] = el}
            className="absolute top-10 md:top-20 left-0 md:-left-10 z-30 bg-[var(--bg-color)]/80 backdrop-blur-xl border border-[var(--text-color)]/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-color)]/50 font-bold mb-0.5">Status</p>
              <p className="text-sm font-bold text-[var(--text-color)]">Available for projects</p>
            </div>
          </div>

          {/* Micro-Data Box 2: Core Stack */}
          <div 
            ref={el => infoBoxesRef.current[1] = el}
            className="absolute bottom-20 right-0 md:-right-10 z-30 bg-[var(--bg-color)]/80 backdrop-blur-xl border border-[var(--text-color)]/10 p-5 rounded-2xl shadow-xl hidden sm:block"
          >
            <div className="flex items-center gap-2 mb-3 text-brand-primary text-[10px] uppercase tracking-widest font-bold">
              <Code2 size={14} /> Core Competencies
            </div>
            <div className="flex flex-wrap gap-2 max-w-[240px]">
              <span className="px-2.5 py-1 bg-[var(--text-color)]/5 rounded-md text-[10px] font-bold">Django</span>
              <span className="px-2.5 py-1 bg-[var(--text-color)]/5 rounded-md text-[10px] font-bold">Python</span>
              <span className="px-2.5 py-1 bg-[var(--text-color)]/5 rounded-md text-[10px] font-bold">Next.js</span>
              <span className="px-2.5 py-1 bg-[var(--text-color)]/5 rounded-md text-[10px] font-bold">React</span>
              <span className="px-2.5 py-1 bg-[var(--text-color)]/5 rounded-md text-[10px] font-bold">AWS</span>
              <span className="px-2.5 py-1 bg-[var(--text-color)]/5 rounded-md text-[10px] font-bold">AI / LLMs</span>
            </div>
          </div>

          {/* Micro-Data Box 3: Location */}
          <div 
            ref={el => infoBoxesRef.current[2] = el}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-16 z-30 bg-[var(--bg-color)]/80 backdrop-blur-xl border border-[var(--text-color)]/10 p-3 rounded-xl shadow-xl flex flex-col items-center gap-2"
          >
            <Globe size={18} className="text-brand-primary opacity-80" />
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest">Global</p>
            </div>
          </div>

        </div>

        {/* Bottom Call To Action */}
        <div 
          ref={el => infoBoxesRef.current[3] = el}
          className="mt-12 flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter italic mb-4">
            Asad ur Rehman.
          </h2>
          <p className="text-[var(--text-color)]/60 text-sm md:text-base font-lux leading-relaxed mb-8">
            Specializing in Full-Stack Engineering and AI Data Science. I bridge the gap between complex infrastructure and intelligent application logic.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/quote"
              className="px-8 py-3 bg-brand-primary text-black text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
            >
              Start Collaboration
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
