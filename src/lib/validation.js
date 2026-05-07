/**
 * Shared form validation utilities.
 */

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the homepage contact form.
 */
export const validateContact = (data) => {
  const errors = {};
  if (!data.fullname.trim()) errors.fullname = "Name is required.";
  else if (data.fullname.trim().length > 80) errors.fullname = "Name is too long.";

  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!emailRx.test(data.email)) errors.email = "Enter a valid email address.";
  else if (data.email.length > 120) errors.email = "Email is too long.";

  if (!data.message.trim()) errors.message = "Message is required.";
  else if (data.message.trim().length < 20)
    errors.message = "Please provide a bit more detail (20+ characters).";
  else if (data.message.length > 1500)
    errors.message = "Message exceeds 1500 characters.";

  return errors;
};

/**
 * Validate the quote request form.
 */
export const validateQuote = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!emailRx.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.project_type) errors.project_type = "Please select a project type.";
  if (!data.details.trim()) errors.details = "Please describe your project.";
  else if (data.details.length < 30)
    errors.details = "Please add a bit more detail (30+ chars).";
  return errors;
};
