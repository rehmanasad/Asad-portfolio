import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import banxaImg from "../../assets/images/banxa.png";
import coachupImg from "../../assets/images/coachup.png";
import neoremitImg from "../../assets/images/neoremit.png";
import paymentsolImg from "../../assets/images/paymentsol.png";
import paymovaImg from "../../assets/images/paymova.png";
import tezaImg from "../../assets/images/teza.png";
import turboalanrefinerImg from "../../assets/images/turboalanrefiner.png";

const projects = [
  {
    title: "NEOREMIT",
    category: "FinTech / Remittance",
    color: "#0f172a",
    img: neoremitImg,
    link: "https://neoremit.io",
    desc: "A secure cross-border remittance platform focusing on low-latency transactions and financial compliance.",
  },
  {
    title: "TURBO ALAN",
    category: "AI / Product",
    color: "#111827",
    img: turboalanrefinerImg,
    link: "https://turboalanrefiner.vercel.app",
    desc: "AI-driven text refinement platform optimized for linguistics and content quality.",
  },
  {
    title: "PAYMOVA",
    category: "FinTech / Payments",
    color: "#0c4a6e",
    img: paymovaImg,
    link: "https://paymova.kryptomind.net",
    desc: "Comprehensive payment solution facilitating digital transactions and advanced financial management.",
  },
  {
    title: "PAYMENT SOLUTION",
    category: "Enterprise/ Fintech",
    color: "#1e1b4b",
    img: paymentsolImg,
    link: "https://paymentsolution.io",
    desc: "Robust payment orchestration platform designed for enterprise-level transaction security.",
  },
  {
    title: "GAMEVERSE",
    category: "Web3 / Gaming",
    color: "#2e1065",
    img: tezaImg,
    link: "https://gameverse.kryptomind.net",
    desc: "Web3 wallet integration and frontend architecture for a decentralized blockchain gaming ecosystem.",
  },
  {
    title: "BANXA INTEGRATION",
    category: "Web3 / Fiat-to-Crypto",
    color: "#0f172a",
    img: banxaImg,
    link: "https://banxa.kryptomind.net",
    desc: "Global fiat-to-crypto on-ramping infrastructure with automated KYC/AML compliance.",
  },
  {
    title: "COACH UP",
    category: "EdTech / Platform",
    color: "#1e1b4b",
    img: coachupImg,
    link: "https://coach-up-ghatagang.vercel.app",
    desc: "Modern digital coaching interface designed for high user engagement and streamlined scheduling.",
  },
  {
    title: "TEZA",
    category: "Next.js / E-Commerce",
    color: "#2e1065",
    img: tezaImg,
    link: "https://teza-frontend.vercel.app/",
    desc: "Advanced frontend architecture focusing on fluid UX and rapid decentralized connectivity.",
  },

];

const Work = () => {
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Dedicated trigger for background color shift
    const bgTransition = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () =>
        gsap.to(triggerRef.current, {
          backgroundColor: projects[0].color,
          duration: 0.8,
        }),
      onEnterBack: () =>
        gsap.to(triggerRef.current, {
          backgroundColor: projects[projects.length - 1].color,
          duration: 0.8,
        }),
      onLeave: () =>
        gsap.to(triggerRef.current, {
          backgroundColor: "var(--bg-color)",
          duration: 0.8,
        }),
      onLeaveBack: () =>
        gsap.to(triggerRef.current, {
          backgroundColor: "var(--bg-color)",
          duration: 0.8,
        }),
    });

    const pin = gsap.fromTo(
      scrollRef.current,
      { translateX: 0 },
      {
        translateX: `-${(projects.length - 1) * 100}vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `${projects.length * 1000} top`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * projects.length),
              projects.length - 1,
            );
            gsap.to(triggerRef.current, {
              backgroundColor: projects[index].color,
              duration: 0.3,
              overwrite: "auto",
            });
          },
        },
      },
    );

    return () => {
      pin.kill();
      bgTransition.kill();
    };
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-[var(--bg-color)]">
      <div ref={triggerRef} className="transition-colors duration-700">
        <div
          ref={scrollRef}
          className="relative flex h-screen flex-row items-center"
          style={{ width: `${projects.length * 100}vw` }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-screen h-screen flex items-center justify-center p-10 md:p-20"
            >
              <div className="group relative w-full h-[70vh] flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 overflow-hidden rounded-2xl relative h-full">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-contain object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                <div className="flex-1 text-white">
                  <span className="text-brand-primary text-xs tracking-[0.5em] uppercase mb-4 block">
                    0{index + 1} / {project.category}
                  </span>
                  <h3 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic">
                    {project.title}
                  </h3>
                  <p className="text-white/60 max-w-md mb-8 leading-relaxed font-lux">
                    {project.desc}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase group/btn w-fit"
                  >
                    View Case Study
                    <div className="w-12 h-[1px] bg-white group-hover/btn:w-20 transition-all duration-500"></div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
