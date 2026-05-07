/**
 * Shared EmailJS configuration — single source of truth.
 * All forms (Contact, Quote) import from here.
 */
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
export const EMAILJS_CONFIRM_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_CONFIRM_TEMPLATE_ID ?? EMAILJS_TEMPLATE_ID;
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
