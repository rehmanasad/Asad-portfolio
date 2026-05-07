import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { EMAILJS_SERVICE_ID as SVC, EMAILJS_TEMPLATE_ID as TPL, EMAILJS_CONFIRM_TEMPLATE_ID as CTPL, EMAILJS_PUBLIC_KEY as KEY } from "../../lib/emailjs.js";
import { validateContact as validate } from "../../lib/validation.js";
import { saveSubmission } from "../../lib/saveSubmission.js";

const MAX_LENGTHS = { fullname: 80, email: 120, message: 1500 };

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ fullname: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // Spam trap — hidden from real users
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);

    // Normalise keys to match both email templates
    const payload = {
      from_name: formData.fullname,
      from_email: formData.email,
      details: formData.message,
      project_type: "General Enquiry",
      company: "Not provided",
      phone: "Not provided",
      submitted_at: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
    };

    try {
      await saveSubmission("contact_messages", payload);
      await emailjs.send(SVC, TPL, payload, KEY);
      emailjs.send(SVC, CTPL, payload, KEY).catch((e) =>
        console.warn("[confirmation email failed — non-fatal]", e)
      );
      setStatus("success");
      setFormData({ fullname: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full bg-transparent border-b border-[var(--text-color)]/10 py-3 md:py-4 px-2 outline-none transition-all placeholder:text-[var(--text-color)]/20 font-lux text-sm focus:border-brand-primary";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          {/* Left Info */}
          <div className="flex-1">
            <span className="text-brand-primary text-xs tracking-[0.5em] uppercase block mb-4">
              Engagement
            </span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic mb-8 md:mb-12">
              INITIATE <br /> PARTNERSHIP.
            </h2>

            <div className="space-y-8 md:space-y-10">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[var(--text-color)]/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 text-[var(--text-color)] group-hover:border-brand-primary">
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-[8px] md:text-[10px] uppercase tracking-widest text-[var(--text-color)] opacity-40">Email Me</h4>
                  <a href="mailto:rehmaanasad25@gmail.com" className="text-lg md:text-xl font-medium hover:text-brand-primary transition-colors">
                    rehmaanasad25@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[var(--text-color)]/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 text-[var(--text-color)] group-hover:border-brand-primary">
                  <Phone size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-[8px] md:text-[10px] uppercase tracking-widest text-[var(--text-color)] opacity-40">Call Me</h4>
                  <a href="tel:+923405768355" className="text-lg md:text-xl font-medium hover:text-brand-primary transition-colors">
                    +92 340 5768355
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[var(--text-color)]/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 text-[var(--text-color)] group-hover:border-brand-primary">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-[8px] md:text-[10px] uppercase tracking-widest text-[var(--text-color)] opacity-40">Location</h4>
                  <p className="text-lg md:text-xl font-medium">Faisal Town, Lahore, Punjab, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} noValidate className="bg-[var(--text-color)]/5 backdrop-blur-xl p-6 md:p-10 rounded-2xl md:rounded-3xl border border-[var(--text-color)]/10 space-y-6 md:space-y-8">

              {/* Honeypot — hidden from real users via CSS, filled by bots */}
              <div aria-hidden="true" style={{ display: "none" }}>
                <label htmlFor="company_website">Website</label>
                <input
                  id="company_website"
                  type="text"
                  name="company_website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="fullname" className="text-[10px] uppercase tracking-widest opacity-40 ps-2">
                    Primary Contact Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    maxLength={MAX_LENGTHS.fullname}
                    placeholder="e.g. John Smith"
                    className={`${inputBase} ${errors.fullname ? "border-red-500/70" : ""}`}
                  />
                  {errors.fullname && <p className="text-xs text-red-400 ps-2 mt-1">{errors.fullname}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest opacity-40 ps-2">
                    Corporate Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={MAX_LENGTHS.email}
                    placeholder="you@enterprise.com"
                    className={`${inputBase} ${errors.email ? "border-red-500/70" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-red-400 ps-2 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest opacity-40 ps-2">
                  Project Blueprint &amp; Vision
                  <span className="ml-2 text-[var(--text-color)]/30 normal-case tracking-normal">
                    ({formData.message.length}/{MAX_LENGTHS.message})
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={MAX_LENGTHS.message}
                  rows="4"
                  placeholder="Detail your engineering requirements and strategic horizon..."
                  className={`${inputBase} resize-none ${errors.message ? "border-red-500/70" : ""}`}
                ></textarea>
                {errors.message && <p className="text-xs text-red-400 ps-2 mt-1">{errors.message}</p>}
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle size={18} />
                  <span className="text-sm">Message sent successfully! We'll be in touch within 24 hours.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  <AlertCircle size={18} />
                  <span className="text-sm">Failed to send. Please try again or email me directly.</span>
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full h-14 md:h-16 bg-brand-primary text-black font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-4 hover:bg-white transition-all duration-500 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                    Initializing...
                  </>
                ) : (
                  <>SECURE ENGAGEMENT <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
