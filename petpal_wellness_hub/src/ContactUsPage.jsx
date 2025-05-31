import React, { useState } from "react";
import "./ContactUsPage.css";

// SVG ICONS (lightweight, no external dependency)
// You may substitute with full-featured icon libraries if available.
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="#5a7ba7">
    <circle cx="12" cy="12" r="12" fill="#b8e0f5"/>
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.61a1 1 0 01-.91.99C13.14 22.93 3.07 12.86 2.04 4.31A1 1 0 013.03 3.5H6.65a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.24 1.01L6.62 10.79z" fill="#5a7ba7"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="#ad8df1">
    <circle cx="12" cy="12" r="12" fill="#e2d9fb"/>
    <path d="M4 8l8 5 8-5m-16 0v8a2 2 0 002 2h12a2 2 0 002-2V8m-16 0l8 5 8-5" stroke="#ad8df1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const MarkerIcon = () => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="#70d4a5">
    <circle cx="12" cy="12" r="12" fill="#cdf4e2"/>
    <path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10zm0-8.5A2.5 2.5 0 1012 7a2.5 2.5 0 000 5.5z" fill="#70d4a5"/>
  </svg>
);

// Main component
// PUBLIC_INTERFACE
function ContactUsPage() {
  // Controlled form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Validation and touched state
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});

  // Simple validators
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // PUBLIC_INTERFACE
  function validate() {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    else if (!emailRegex.test(form.email)) errors.email = "Enter a valid email.";
    if (!form.subject.trim()) errors.subject = "Subject is required.";
    if (!form.message.trim()) errors.message = "Message is required.";
    return errors;
  }

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: undefined });
  }

  // PUBLIC_INTERFACE
  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
    setError({ ...error, ...validate() });
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setTouched({ name: true, email: true, subject: true, message: true });
    setError(errors);
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      // Pretend to send data to server (simulate)
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setSubmitted(false);
      }, 1200);
    }
  }

  // For floating label 'is-filled'
  const isFilled = (field) => form[field] || (submitted && !error[field]);

  return (
    <div className="contactus-container">
      <section className="contactus-card">
        <div className="contactus-info-card">
          <h2 className="info-title">Contact Support</h2>
          <p className="info-desc">We're here to help with your pet wellness journey! Reach out anytime.</p>
          <ul className="info-list">
            <li>
              <span className="icon-bg pastel-blue">
                <PhoneIcon />
              </span>
              <div>
                <span className="info-label">Call us</span>
                <a href="tel:+1234567890" className="info-link">+1 234-567-890</a>
              </div>
            </li>
            <li>
              <span className="icon-bg pastel-purple">
                <MailIcon />
              </span>
              <div>
                <span className="info-label">Email</span>
                <a href="mailto:support@petpal.com" className="info-link">support@petpal.com</a>
              </div>
            </li>
            <li>
              <span className="icon-bg pastel-green">
                <MarkerIcon />
              </span>
              <div>
                <span className="info-label">Visit</span>
                <span className="info-link">44 Pet Wellness Ave, Paws City</span>
              </div>
            </li>
          </ul>
          {/* Optional map embed */}
          <div className="map-responsive">
            <iframe
              title="PetPal Wellness Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.405%2C51.515%2C7.415%2C51.525&amp;layer=mapnik"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="contactus-form-panel">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2 className="form-title">Send Us a Message</h2>
            <div className="form-fields">
              <div className={`floating-group ${isFilled("name") ? "is-filled" : ""} ${error.name && touched.name ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  id="contact-name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="contact-name">Name</label>
                {error.name && touched.name &&
                  <span className="error-msg">{error.name}</span>
                }
              </div>
              <div className={`floating-group ${isFilled("email") ? "is-filled" : ""} ${error.email && touched.email ? "has-error" : ""}`}>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  id="contact-email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="contact-email">Email</label>
                {error.email && touched.email &&
                  <span className="error-msg">{error.email}</span>
                }
              </div>
              <div className={`floating-group ${isFilled("subject") ? "is-filled" : ""} ${error.subject && touched.subject ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="subject"
                  autoComplete="off"
                  id="contact-subject"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="contact-subject">Subject</label>
                {error.subject && touched.subject &&
                  <span className="error-msg">{error.subject}</span>
                }
              </div>
              <div className={`floating-group ${isFilled("message") ? "is-filled" : ""} ${error.message && touched.message ? "has-error" : ""}`}>
                <textarea
                  name="message"
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="contact-message">Message</label>
                {error.message && touched.message &&
                  <span className="error-msg">{error.message}</span>
                }
              </div>
            </div>
            <button
              className="gradient-btn"
              type="submit"
              disabled={submitted && Object.keys(error).length === 0}
            >
              {submitted && Object.keys(error).length === 0 ? "Sending..." : "Send Message"}
            </button>
            {submitted && Object.keys(error).length === 0 &&
              <div className="success-msg" role="alert">
                Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            }
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactUsPage;
