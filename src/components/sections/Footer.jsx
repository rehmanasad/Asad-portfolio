import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-color)] text-[var(--text-color)] pt-32 pb-10 border-t border-[var(--text-color)]/10 transition-colors duration-700 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-16 lg:gap-8 mb-20">

        {/* Column 1: Brand & Contact CTA */}
        <div className="w-full md:w-1/3 flex flex-col items-start gap-6">
          <div className="flex flex-col mb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter italic text-[var(--text-color)]">
              ASAD<span className="text-brand-primary">.</span>
            </h2>
          </div>
          <p className="text-[var(--text-color)]/70 text-sm leading-relaxed font-light mb-6 pr-8">
            Innovative technology solutions driving digital transformation across global markets.
          </p>
          <div className="space-y-2 mb-6 text-sm text-[var(--text-color)]/80 font-medium">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-primary mb-3">Contact Me</h4>
            <p><a href="mailto:rehmaanasad25@gmail.com" className="hover:text-brand-primary transition-colors">rehmaanasad25@gmail.com</a></p>
            <p><a href="tel:+923405768355" className="hover:text-brand-primary transition-colors">+92 340 5768355</a></p>
          </div>
          <Link to="/quote" className="inline-flex items-center justify-center px-6 py-3 border border-[var(--text-color)]/20 rounded-full text-xs font-bold uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all duration-300">
            Get a Quote
          </Link>
        </div>

        {/* Column 2: Quick Links */}
        <div className="w-full md:w-1/4 flex flex-col gap-5">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold mb-2">Links</h4>
          <Link to="/services" className="text-sm text-[var(--text-color)]/70 hover:text-brand-primary transition-colors">Services</Link>
          <Link to="/portfolio" className="text-sm text-[var(--text-color)]/70 hover:text-brand-primary transition-colors">Portfolio</Link>
        </div>

        {/* Column 3: Locations */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold">My Locations</h4>

          <div className="flex flex-col gap-2">
            <h5 className="text-sm font-semibold flex items-center gap-2">
              <span className="text-lg">🇵🇰</span> Pakistan
            </h5>
            <p className="text-sm text-[var(--text-color)]/60 leading-relaxed font-light">
              Faisal Town, Lahore,<br />Punjab, Pakistan
            </p>
          </div>
        </div>

      </div>

      {/* Deep Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-[var(--text-color)]/5">
        <p className="text-[10px] md:text-xs text-[var(--text-color)]/40 font-lux tracking-wide">
          © 2026 Asad ur Rehman. All Rights Reserved.
        </p>
        <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[var(--text-color)]/50">
          <a href="https://github.com/rehmanasad" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">GitHub</a>
          <a href="mailto:rehmaanasad25@gmail.com" className="hover:text-brand-primary transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
