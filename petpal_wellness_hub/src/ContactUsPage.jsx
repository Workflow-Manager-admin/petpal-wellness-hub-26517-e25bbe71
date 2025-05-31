import React, { useState, useRef } from "react";
import "./ContactUsPage.css";

// Icons are SVGs since no icon lib is assumed available.
// In real projects, prefer an icon library for accessibility and scalability.
const EmailIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#4E8D7C" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="3"/><path d="M3 6l9 7 9-7"/></svg>
);
const PhoneIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#4E8D7C" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.12.81.37 2.4-.47 3.24a16 16 0 0 0 5.03 5.03c.84-.85 2.43-.6 3.24-.47A2 2 0 0 1 21 13.91V18a1.994 1.994 0 0 1-2 2"/></svg>
);
const ClockIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#4E8D7C" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const LocationIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#4E8D7C" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21c-4.418 0-8-4.03-8-9.012C4 7.33 7.134 4 12 4s8 3.33 8 7.988C20 16.971 16.418 21 12 21z"/><circle cx="12" cy="11" r="3"/></svg>
);

function ContactUsPage() {
  // State for form inputs and UI feedback
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    attachment: null
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef();

  // Basic validation (all fields required except phone and attachment)
  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errors.email = "Valid email required";
    if (!form.message.trim()) errors.message = "Message is required";
    return errors;
  };
  const errors = validate();

  // Animated feedback via form status
  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "attachment" ? files[0] : value
    }));
  }
  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      message: true
    });
    if (Object.keys(validate()).length > 0) {
      setErrorMsg("Please fix the errors before submitting.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    // Simulated network request
    setTimeout(() => {
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        attachment: null
      });
      if (fileRef.current) fileRef.current.value = "";
      setTimeout(() => setStatus("idle"), 2800);
    }, 1800);
  }

  return (
    <div className="contactus-wrapper">
      <section className="contactus-cta">
        <h1>Contact Us</h1>
        <p className="cta-lead">
          We're here to help! Reach out with your questions &mdash; the PetPal Wellness team will respond soon.
        </p>
      </section>
      <div className="contactus-main">
        {/* Left column: Contact info + map */}
        <aside className="contactus-panel">
          <div className="contactus-card gradient-card">
            <div className="info-line"><EmailIcon /> <span>support@petpalwellness.com</span></div>
            <div className="info-line"><PhoneIcon /> <span>+1 (555) 321-9876</span></div>
            <div className="info-line"><ClockIcon /> <span>Mon-Fri: 8am-7pm</span></div>
            <div className="info-line"><LocationIcon /> <span>123 Furry Lane, Petcity, USA</span></div>
          </div>
          {/* Optional Map embed */}
          <div className="contactus-map" aria-label="map location">
            <iframe
              title="Location map"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0088,40.7114,-74.0022,40.7164&amp;layer=mapnik&amp;marker=40.7139,-74.0055"
              style={{ border: 0, width: "100%", height: "170px", borderRadius: "12px" }}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </aside>
        {/* Right column: Contact form */}
        <section className="contactus-form-section">
          <form className={`contactus-form${status === "success" ? " success" : ""}`} onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className={`form-group${touched.name && errors.name ? " error" : ""}`}>
                {/* PUBLIC_INTERFACE */}
                <label className={form.name ? "filled floating" : "floating"} htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.name && errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className={`form-group${touched.email && errors.email ? " error" : ""}`}>
                {/* PUBLIC_INTERFACE */}
                <label className={form.email ? "filled floating" : "floating"} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.email && errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                {/* PUBLIC_INTERFACE */}
                <label className={form.phone ? "filled floating" : "floating"} htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={30}
                />
              </div>
              <div className="form-group">
                {/* PUBLIC_INTERFACE */}
                <label htmlFor="attachment" className={form.attachment ? "file-label selected" : "file-label"}>
                  Attachment (optional)
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                {form.attachment && (
                  <div className="file-info">
                    <span>{form.attachment.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className={`form-group${touched.message && errors.message ? " error" : ""}`}>
              {/* PUBLIC_INTERFACE */}
              <label className={form.message ? "filled floating" : "floating"} htmlFor="message">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                style={{ resize: "vertical" }}
              />
              {touched.message && errors.message && (
                <span className="error-msg">{errors.message}</span>
              )}
            </div>
            {errorMsg && <div className="form-error">{errorMsg}</div>}
            <button
              type="submit"
              className={`btn contact-btn${status === "submitting" ? " disabled" : ""}`}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <span className="btn-spinner" aria-label="Sending..."></span>
              ) : status === "success" ? (
                <span>&#10003; Message Sent!</span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ContactUsPage;
