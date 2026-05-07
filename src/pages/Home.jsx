import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import Experience from "../components/sections/Experience.jsx";
import Skills from "../components/sections/Skills.jsx";
import Services from "../components/sections/Services.jsx";
import Work from "../components/sections/Work.jsx";
import Contact from "../components/sections/Contact.jsx";
import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";

const Home = () => {
  useSEO({
    title: "Home",
    description: "Asad ur Rehman is an elite software engineer specialising in FinTech, Web3, AI, and enterprise cloud architecture."
  });

  return (
    <div className="w-full">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Work />
      <Contact />
    </div>
  );
};

export default Home;
