import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { useSEO } from "../hooks/useSEO.js";
import { EMAILJS_SERVICE_ID as SVC, EMAILJS_TEMPLATE_ID as TPL, EMAILJS_CONFIRM_TEMPLATE_ID as CTPL, EMAILJS_PUBLIC_KEY as KEY } from "../lib/emailjs.js";
import { validateQuote as validate } from "../lib/validation.js";
import { saveSubmission } from "../lib/saveSubmission.js";

/* ─── Field helpers ──────────────────────────────────────────────────────── */
const inputClass = (err) =>
  `w-full bg-[var(--bg-color)] border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-[var(--text-color)]/30 ${
    err
      ? "border-red-500/60 focus:border-red-500"
      : "border-[var(--text-color)]/10 focus:border-brand-primary/50"
  }`;

const FieldError = ({ msg }) =>
  msg ? <p className="text-xs text-red-400 mt-1 ps-1">{msg}</p> : null;

/* ─── Success Screen ─────────────────────────────────────────────────────── */
const SuccessScreen = ({ name, onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center text-center py-16 px-8"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
      className="w-20 h-20 bg-brand-primary/10 border border-brand-primary/30 rounded-full flex items-center justify-center mb-8"
    >
      <CheckCircle className="text-brand-primary" size={36} />
    </motion.div>
    <h3 className="text-3xl font-bold tracking-tighter mb-4 text-[var(--text-color)]">
      Quote Submitted!
    </h3>
    <p className="text-[var(--text-color)]/70 leading-relaxed mb-2 max-w-sm">
      Thank you, <strong>{name}</strong>. Your quote request has been received.
    </p>
    <p className="text-[var(--text-color)]/50 text-sm mb-10">
      We'll review your project details and get back to you within <span className="text-brand-primary font-bold">24 hours</span>.
    </p>
    <button
      onClick={onReset}
      className="px-8 py-3 border border-[var(--text-color)]/20 rounded-full text-xs font-bold uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all"
    >
      Submit Another Request
    </button>
  </motion.div>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Quote = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", project_type: "", details: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [status, setStatus]     = useState(null); // "success" | "error"

  useSEO({
    title: "Request a Quote",
    description: "Get a custom quote for your software engineering, Web3, or custom enterprise architecture project."
  });

  const change = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
  };

  const reset = () => {
    setForm({ name:"",email:"",phone:"",company:"",project_type:"",details:"" });
    setErrors({});
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // bot trap

    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setStatus(null);

    const payload = {
      from_name:    form.name,
      from_email:   form.email,
      phone:        form.phone    || "Not provided",
      company:      form.company  || "Not provided",
      project_type: form.project_type,
      details:      form.details,
      submitted_at: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
    };

    try {
      await saveSubmission("quote_requests", payload);
      await emailjs.send(SVC, TPL, payload, KEY);
      await emailjs.send(SVC, CTPL, payload, KEY);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[var(--bg-color)] text-[var(--text-color)] pt-32 pb-32">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Request a Quote<span className="text-brand-primary">.</span>
          </h1>
          <p className="text-lg text-[var(--text-color)]/70 font-light leading-relaxed">
            Tell me about your project and we'll craft a tailored proposal within 24 hours.
          </p>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-[2rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessScreen key="success" name={form.name} onReset={reset} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative z-10 p-8 md:p-12 space-y-6"
                >
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ display: "none" }}>
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter mb-2">Project Details</h2>
                    <p className="text-[var(--text-color)]/50 text-sm">
                      All fields marked with <span className="text-brand-primary">*</span> are required.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="q-name" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">
                        Full Name <span>*</span>
                      </label>
                      <input
                        id="q-name" type="text" name="name"
                        value={form.name} onChange={change}
                        maxLength={80} placeholder="John Smith"
                        className={inputClass(errors.name)}
                      />
                      <FieldError msg={errors.name} />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="q-email" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">
                        Email <span>*</span>
                      </label>
                      <input
                        id="q-email" type="email" name="email"
                        value={form.email} onChange={change}
                        maxLength={120} placeholder="you@company.com"
                        className={inputClass(errors.email)}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="q-phone" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-color)]/50">
                        Phone (optional)
                      </label>
                      <input
                        id="q-phone" type="tel" name="phone"
                        value={form.phone} onChange={change}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass(false)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="q-company" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-color)]/50">
                        Company (optional)
                      </label>
                      <input
                        id="q-company" type="text" name="company"
                        value={form.company} onChange={change}
                        placeholder="Your Company"
                        className={inputClass(false)}
                      />
                    </div>
                  </div>

                  {/* Project Type — full width now that budget is removed */}
                  <div className="space-y-1">
                    <label htmlFor="q-type" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">
                      Project Type <span>*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="q-type" name="project_type"
                        value={form.project_type} onChange={change}
                        className={`${inputClass(errors.project_type)} appearance-none pr-10`}
                      >
                        <option value="" disabled>Select a project type</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Application">Mobile Application</option>
                        <option value="AI / Machine Learning">AI / Machine Learning</option>
                        <option value="Web3 / Blockchain">Web3 / Blockchain</option>
                        <option value="Cloud Architecture">Cloud Architecture</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-color)]/40" />
                    </div>
                    <FieldError msg={errors.project_type} />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1">
                    <label htmlFor="q-details" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary flex justify-between">
                      <span>Project Details <span>*</span></span>
                      <span className="text-[var(--text-color)]/30 normal-case tracking-normal font-normal">
                        {form.details.length}/1500
                      </span>
                    </label>
                    <textarea
                      id="q-details" name="details"
                      value={form.details} onChange={change}
                      maxLength={1500} rows={5}
                      placeholder="Describe your project goals, current challenges, key features needed, and any relevant technical details..."
                      className={`${inputClass(errors.details)} resize-none`}
                    />
                    <FieldError msg={errors.details} />
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={18} className="shrink-0" />
                      Failed to send. Please email me directly at{" "}
                      <a href="mailto:rehmaanasad25@gmail.com" className="underline hover:text-red-300">
                        rehmaanasad25@gmail.com
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 mt-2 bg-brand-primary text-[#000000] text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/50"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <> Submit Quote Request <Send size={16} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-12">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 italic">Why Choose Me</h3>
              <p className="text-[var(--text-color)]/60 font-light leading-relaxed">
                When you work with me, you're partnering directly with a senior software engineer who has architected and shipped high-performance systems across FinTech, Web3, and AI verticals.
              </p>
            </div>

            <div className="space-y-10 border-l px-6 border-[var(--text-color)]/10">
              {[
                {
                  dot: "bg-brand-primary",
                  title: "Direct Communication",
                  desc: "Every quote request is reviewed by me personally. You get direct access to the engineer building your product, with responses guaranteed within 24 hours."
                },
                {
                  dot: "bg-[var(--text-color)]/30",
                  title: "Clear Scope & Pricing",
                  desc: "I define constraints clearly upfront. No hidden costs, no scope creep. You receive milestone-based delivery with absolute transparency."
                },
                {
                  dot: "bg-[var(--text-color)]/30",
                  title: "Senior-Level Execution",
                  desc: "No work is delegated to junior associates. I personally architect, write, and deploy the code, ensuring elite craftsmanship from day one."
                },
                {
                  dot: "bg-[var(--text-color)]/30",
                  title: "Post-Launch Warranty",
                  desc: "I don't abandon my code after deployment. Every project includes a rigorous bug-fix warranty period and optional retainer packages."
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <div className={`absolute -left-[29px] top-1 w-2 h-2 rounded-full ${item.dot}`} />
                  <h4 className="text-xl font-bold text-[var(--text-color)] mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-[var(--text-color)]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Direct contact fallback */}
            <div className="mt-16 p-6 rounded-2xl bg-[var(--text-color)]/5 border border-[var(--text-color)]/10">
              <p className="text-xs uppercase tracking-widest text-[var(--text-color)]/40 font-bold mb-3">Prefer to reach me directly?</p>
              <a
                href="mailto:rehmaanasad25@gmail.com"
                className="text-[var(--text-color)] font-semibold hover:text-brand-primary transition-colors"
              >
                rehmaanasad25@gmail.com
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Quote;
