import React, { useRef, useState, useEffect } from "react";
import "./FurEverCareLanding.css";

// PUBLIC_INTERFACE
function FurEverCareLanding() {
  // Testimonials Carousel State
  const testimonials = [
    {
      quote:
        "FurEverCare makes managing my dog's health so simple. The reminders are a lifesaver, and my vet loves how organized I am!",
      author: "Amanda P.",
      avatar: (
        <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">
          <circle cx="19" cy="19" r="19" fill="#FFEEDB" />
          <ellipse cx="19" cy="17" rx="10" ry="12" fill="#FFD1B7" />
          <ellipse cx="19" cy="24" rx="7" ry="4" fill="#FFF6ED" />
          <circle cx="15" cy="17" r="1.7" fill="#644C3E" />
          <circle cx="23" cy="17" r="1.7" fill="#644C3E" />
        </svg>
      ),
    },
    {
      quote:
        "I love the clean design and the feature set. Tracking my cat’s activity and meals has never felt this fun!",
      author: "James R.",
      avatar: (
        <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">
          <circle cx="19" cy="19" r="19" fill="#D3F2EE" />
          <ellipse cx="19" cy="17" rx="10" ry="12" fill="#C1ECE6" />
          <ellipse cx="19" cy="24" rx="7" ry="4" fill="#E0F6F0" />
          <circle cx="15" cy="17" r="1.7" fill="#2B6877" />
          <circle cx="23" cy="17" r="1.7" fill="#2B6877" />
        </svg>
      ),
    },
    {
      quote:
        "Finally, a pet wellness app that looks as good as it works. The insights and charts help me care for all my pets.",
      author: "Moira T.",
      avatar: (
        <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">
          <circle cx="19" cy="19" r="19" fill="#EEE4FC" />
          <ellipse cx="19" cy="17" rx="10" ry="12" fill="#E2D5FB" />
          <ellipse cx="19" cy="24" rx="7" ry="4" fill="#FAF8FF" />
          <circle cx="15" cy="17" r="1.7" fill="#5B3C79" />
          <circle cx="23" cy="17" r="1.7" fill="#5B3C79" />
        </svg>
      ),
    },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Newsletter signup state
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  // Handler for newsletter form
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    setNewsletterStatus(
      email.match(/^[\w.%+-]+@[\w.-]+\.\w{2,}$/)
        ? "Thank you for subscribing!"
        : "Please enter a valid email address."
    );
  }

  return (
    <div className="fec-landing">
      {/* HERO SECTION */}
      <section className="fec-hero" aria-label="Welcome and Introduction">
        <div className="fec-hero-content">
          <div className="fec-hero-headlines">
            <h1 className="fec-hero-title">
              Modern Pet Wellness & Care—Made Simple.
            </h1>
            <p className="fec-hero-subtitle">
              Empowering pet owners with tools to track health, schedule appointments,
              and nurture happiness—one paw at a time.
            </p>
            <div className="fec-hero-actions">
              <a href="#features" className="fec-btn fec-btn-gradient">
                Explore Features
              </a>
              <a href="#signup" className="fec-btn fec-btn-outline">
                Get Started
              </a>
            </div>
          </div>
          <div className="fec-hero-illustration" aria-hidden="true">
            <svg width="285" height="210" viewBox="0 0 285 210" className="fec-hero-svg">
              <defs>
                <radialGradient id="pawBg" cx="50%" cy="50%" r="90%">
                  <stop offset="0%" stopColor="#DCF5E6"/>
                  <stop offset="89%" stopColor="#B4DAFE"/>
                </radialGradient>
              </defs>
              {/* Large pet pawprint illustration placeholder */}
              <ellipse cx="142" cy="160" rx="80" ry="34" fill="url(#pawBg)" opacity="0.45"/>
              <ellipse cx="105" cy="110" rx="30" ry="35" fill="#F7C873" />
              <ellipse cx="180" cy="108" rx="30" ry="35" fill="#F26B6B" />
              <ellipse cx="86" cy="62" rx="16" ry="18" fill="#81CECB" />
              <ellipse cx="142" cy="48" rx="18" ry="20" fill="#A7D7C5" />
              <ellipse cx="196" cy="65" rx="16" ry="18" fill="#9FA8DA" />
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="fec-features" id="features" aria-label="Key Features">
        <h2 className="fec-section-title">Why FurEverCare?</h2>
        <div className="fec-features-list">
          {[
            {
              icon: (
                <svg viewBox="0 0 48 48" fill="none" width="38" height="38" aria-hidden="true">
                  <circle cx="24" cy="24" r="24" fill="#F7C873" />
                  <path d="M24 13c-5.5 0-10 2.8-10 6.5v6a5 5 0 003.2 4.6c.6.3.8.5.8 1.2v.7a5 5 0 005 5 5 5 0 005-5v-.7c0-.7.2-.9.8-1.2A5 5 0 0034 25.5v-6C34 15.8 29.5 13 24 13z" fill="#FFF" />
                  <circle cx="20" cy="29" r="1.2" fill="#F7C873"/>
                  <circle cx="28" cy="29" r="1.2" fill="#F7C873"/>
                </svg>
              ),
              title: "Vet Appointment Tracking",
              desc: "Easily schedule, track, and get reminders for all veterinary appointments and vaccines.",
              cta: "View Schedule",
              href: "#"
            },
            {
              icon: (
                <svg viewBox="0 0 48 48" width="38" height="38" aria-hidden="true">
                  <circle cx="24" cy="24" r="24" fill="#B3E0DC"/>
                  <rect x="15" y="17" width="18" height="10" rx="4" fill="#FFF"/>
                  <rect x="20.5" y="20" width="7" height="4" rx="2" fill="#4E8D7C"/>
                  <ellipse cx="24" cy="34" rx="9" ry="3" fill="#E1F8F7"/>
                </svg>
              ),
              title: "Dietary Plan Management",
              desc: "Personalized dietary plans with nutrition logs to keep your pet healthy and energized.",
              cta: "Manage Diet",
              href: "#"
            },
            {
              icon: (
                <svg viewBox="0 0 48 48" width="38" height="38" aria-hidden="true">
                  <circle cx="24" cy="24" r="24" fill="#9FA8DA"/>
                  <path d="M31 14a2 2 0 012 2v2c0 .8-1 1-1 2s1.7 2 2 4-2.3 4-2 7v1a2 2 0 01-2 2h-4c-.6 0-1 .4-1 1v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4c0-.6-.4-1-1-1H15a2 2 0 01-2-2v-1c.3-3-2-5-2-7s2-3 2-4-1-.7-1-2v-2a2 2 0 012-2h16z" fill="#FFF"/>
                  <path d="M20 29v4m8-4v4" stroke="#9FA8DA" strokeWidth="1.3"/>
                </svg>
              ),
              title: "Activity & Exercise Logging",
              desc: "Log daily activities, walks, and playtime. Track your pet’s energy and progress with fun visuals.",
              cta: "Log Activity",
              href: "#"
            }
          ].map((feat, i) => (
            <div className="fec-feature-card" key={feat.title}>
              <div className="fec-feature-icon">{feat.icon}</div>
              <h3 className="fec-feature-title">{feat.title}</h3>
              <p className="fec-feature-desc">{feat.desc}</p>
              <a href={feat.href} className="fec-btn fec-btn-ghost" tabIndex={0}>
                {feat.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* INFO STRIP: Why Choose Section */}
      <section className="fec-info-strip" aria-label="Why Choose Us">
        <div className="fec-info-container">
          <div className="fec-info-item">
            <span className="fec-info-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#4E8D7C"/><path d="M16 8a8 8 0 110 16 8 8 0 010-16zm0 2.5A5.5 5.5 0 1016 23.5 5.5 5.5 0 0016 10.5z" fill="#fff"/></svg>
            </span>
            Secure Data
          </div>
          <div className="fec-info-item">
            <span className="fec-info-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#F7C873"/><path d="M24 14v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8m16 0l-8-7-8 7" stroke="#fff" strokeWidth="2" fill="none"/></svg>
            </span>
            Cloud Sync
          </div>
          <div className="fec-info-item">
            <span className="fec-info-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#81CECB"/><path d="M14.7 23.3l-5-5a1 1 0 011.4-1.4l3.3 3.3 7.3-7.3a1 1 0 011.4 1.4l-8 8a1 1 0 01-1.4 0z" fill="#fff"/></svg>
            </span>
            Vetted & Trusted
          </div>
          <div className="fec-info-item">
            <span className="fec-info-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#9FA8DA"/><path d="M19.7 9l-2.8 6.3-2-2A1 1 0 0013 15v7a1 1 0 002 0v-4.6l1.8 1.8a1 1 0 001.6-.4l3-7A1 1 0 0019.7 9z" fill="#fff"/></svg>
            </span>
            Mobile Friendly
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="fec-testimonials" aria-label="Testimonials">
        <h2 className="fec-section-title">What Our Users Say</h2>
        <div className="fec-testimonial-card" aria-live="polite">
          <div className="fec-testimonial-avatar">{testimonials[testimonialIndex].avatar}</div>
          <blockquote className="fec-testimonial-quote">
            “{testimonials[testimonialIndex].quote}”
            <footer className="fec-testimonial-author">
              — {testimonials[testimonialIndex].author}
            </footer>
          </blockquote>
          <div className="fec-testimonial-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={
                  "fec-testimonial-dot" +
                  (idx === testimonialIndex ? " active" : "")
                }
                aria-label={`Show testimonial ${idx + 1}`}
                aria-pressed={idx === testimonialIndex}
                tabIndex={0}
                onClick={() => setTestimonialIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="fec-newsletter" id="signup" aria-label="Newsletter Signup">
        <div className="fec-newsletter-content">
          <span className="fec-newsletter-icon" aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 38 38">
              <circle cx="19" cy="19" r="19" fill="#A7D7C5" />
              <rect x="10" y="15" width="18" height="12" rx="5" fill="#FFF"/>
              <path d="M10,17 l9,7 l9,-7" stroke="#4E8D7C" strokeWidth="2" fill="none"/>
            </svg>
          </span>
          <form className="fec-newsletter-form" onSubmit={handleNewsletterSubmit} aria-label="Subscribe to Newsletter">
            <label htmlFor="fec-newsletter-email" className="fec-newsletter-label">
              Get health tips, news, and pet wellness reminders:
            </label>
            <div className="fec-newsletter-input-row">
              <input
                className="fec-newsletter-input"
                id="fec-newsletter-email"
                name="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-label="Email Address"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (newsletterStatus) setNewsletterStatus("");
                }}
              />
              <button className="fec-btn fec-btn-gradient" type="submit">
                Subscribe
              </button>
            </div>
            {newsletterStatus && (
              <div
                className={
                  "fec-newsletter-status" +
                  (newsletterStatus.startsWith("Thank") ? " success" : " error")
                }
                role={newsletterStatus.startsWith("Thank") ? "status" : "alert"}
              >
                {newsletterStatus}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fec-footer" aria-label="Site Footer">
        <div className="fec-footer-grid">
          <div className="fec-footer-brand">
            <span className="fec-footer-logo" aria-label="FurEverCare logo">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="14" fill="#4E8D7C"/>
                <ellipse cx="14" cy="10" rx="6" ry="7" fill="#FFF"/>
                <ellipse cx="8" cy="6.5" rx="2" ry="3" fill="#F7C873"/>
                <ellipse cx="20" cy="6.5" rx="2" ry="3" fill="#F26B6B"/>
              </svg>
            </span>
            <span className="fec-footer-title">FurEverCare</span>
            <div className="fec-footer-tagline">Pet Wellness, Reimagined.</div>
          </div>
          <nav className="fec-footer-nav" aria-label="Footer Navigation">
            <a href="#" className="fec-footer-link">Home</a>
            <a href="#features" className="fec-footer-link">Features</a>
            <a href="#" className="fec-footer-link">Support</a>
            <a href="#" className="fec-footer-link">Terms & Privacy</a>
          </nav>
          <div className="fec-footer-social">
            <a href="#" className="fec-footer-social-link" aria-label="Twitter">
              <svg width="21" height="21" aria-hidden="true" viewBox="0 0 21 21"><circle cx="10.5" cy="10.5" r="10.5" fill="#81CECB"/><path d="M15.017 7.883c.003.06.003.12.003.181 0 1.84-1.401 3.963-3.963 3.963-.786 0-1.518-.23-2.137-.627a2.799 2.799 0 002.072-.58 1.398 1.398 0 01-1.304-.97c.215.032.423.032.633-.024-1.045-.21-1.832-1.128-1.832-2.233v-.029c.308.172.662.276 1.038.287A1.396 1.396 0 016.64 7.048c0-.257.07-.497.191-.704a3.972 3.972 0 002.88 1.459 1.394 1.394 0 012.378-1.271 2.79 2.79 0 00.888-.34 1.397 1.397 0 01-.613.77 2.785 2.785 0 00.797-.219z" fill="#fff"/></svg>
            </a>
            <a href="#" className="fec-footer-social-link" aria-label="Instagram">
              <svg width="21" height="21" aria-hidden="true" viewBox="0 0 21 21"><circle cx="10.5" cy="10.5" r="10.5" fill="#F7C873"/><rect x="5" y="7" width="11" height="8" rx="2" fill="#fff"/><circle cx="10.5" cy="11" r="1.4" fill="#F7C873"/></svg>
            </a>
            <a href="#" className="fec-footer-social-link" aria-label="Facebook">
              <svg width="21" height="21" aria-hidden="true" viewBox="0 0 21 21"><circle cx="10.5" cy="10.5" r="10.5" fill="#9FA8DA"/><path d="M12.11 16v-4.12h1.23l.18-1.4h-1.4v-.89c0-.41.12-.69.71-.69h.76v-1.28A10.14 10.14 0 0012.06 7a2.085 2.085 0 00-1.98 2.18v1.3h-1.33v1.4h1.33V16" fill="#fff"/></svg>
            </a>
          </div>
        </div>
        <div className="fec-footer-bottom">
          © {new Date().getFullYear()} FurEverCare. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default FurEverCareLanding;
