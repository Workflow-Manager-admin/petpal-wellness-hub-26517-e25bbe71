import React, { useState, useRef, useEffect } from "react";
import "./HelpPage.css";

// FAQ DATA
const FAQS = [
  {
    question: "How do I add a new pet profile?",
    answer:
      "Navigate to the Pet Profiles section and click on 'Add New Pet.' Enter your pet's details and save to create the profile.",
  },
  {
    question: "How can I schedule a veterinary appointment?",
    answer:
      "Head to 'Appointments' then choose 'Schedule Appointment.' Fill in the appointment details and confirm to save.",
  },
  {
    question: "What if I forget to log an activity?",
    answer:
      "You can enter missed activities retroactively by selecting the corresponding date in the Activity log and submitting your entry.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, your data is encrypted and stored securely. We prioritize your privacy and safety at all times.",
  },
  {
    question: "Can I track multiple pets with one account?",
    answer:
      "Absolutely! PetPal Wellness Hub allows you to add and manage multiple pet profiles under one account.",
  },
];

const QUICK_LINKS = [
  {
    label: "Add Pet",
    description: "Create a new profile for your beloved companion.",
    icon: (
      <span className="quick-icon" aria-label="Add Pet">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#F7C873" />
          <rect x="11" y="6" width="2" height="12" rx="1" fill="#4E8D7C" />
          <rect x="6" y="11" width="12" height="2" rx="1" fill="#4E8D7C" />
        </svg>
      </span>
    ),
  },
  {
    label: "Health Tracker",
    description: "Log and view your pet's health history in detail.",
    icon: (
      <span className="quick-icon" aria-label="Health Tracker">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="20" height="12" rx="6" fill="#F26B6B" />
          <path d="M5 12h2l1 3 3-8 2 5h2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    ),
  },
  {
    label: "Diet & Nutrition",
    description: "Manage custom meal plans and nutrition logs.",
    icon: (
      <span className="quick-icon" aria-label="Diet and Nutrition">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="7" fill="#4E8D7C" />
          <ellipse cx="12" cy="12" rx="6" ry="3" fill="#F7C873" />
        </svg>
      </span>
    ),
  },
  {
    label: "Contact Support",
    description: "Need assistance? Reach out to our team.",
    icon: (
      <span className="quick-icon" aria-label="Contact Support">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#F26B6B" />
          <path d="M8 10a4 4 0 018 0c0 2-2 3-4 3s-4-1-4-3z" fill="#fff" />
          <circle cx="12" cy="16" r="1" fill="#4E8D7C" />
        </svg>
      </span>
    ),
  },
];

// Example video and screenshot URLs—these can be adapted as per real assets
const EXAMPLE_VIDEO_URL =
  "https://www.youtube.com/embed/5qap5aO4i9A"; // Use a placeholder; swap for real demo later
const EXAMPLE_SCREENSHOT =
  "https://placekitten.com/400/200"; // Placeholder, swap with real UI screenshot

// PUBLIC_INTERFACE
export default function HelpPage() {
  // For Autocomplete search
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState(FAQS);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setFilteredFaqs(FAQS);
      setShowSuggestions(false);
    } else {
      const lower = searchTerm.toLowerCase();
      const filtered = FAQS.filter(
        (item) =>
          item.question.toLowerCase().includes(lower) ||
          item.answer.toLowerCase().includes(lower)
      );
      setFilteredFaqs(filtered);
      setShowSuggestions(filtered.length > 0 && searchTerm.length > 0);
    }
  }, [searchTerm]);

  // PUBLIC_INTERFACE
  // Handles accordion expand/collapse with animation and accessibility
  const handleAccordionClick = (idx) => {
    setActiveIndex((prevIndex) => (prevIndex === idx ? null : idx));
  };

  // Keyboard a11y for search suggestions
  const handleSearchKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
      e.preventDefault();
    }
  };

  // List of autocomplete question matches
  const suggestionList =
    searchTerm.length > 0
      ? FAQS.filter((item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // Search suggestion click handler
  const handleSuggestionClick = (q) => {
    setSearchTerm(q);
    setShowSuggestions(false);
    searchRef.current.blur();
  };

  return (
    <div className="help-page">
      <section className="help-header">
        <h1 className="help-title">Help & FAQ</h1>
        <p className="help-desc">
          Find answers to common questions or explore guides to get the most out of PetPal Wellness Hub.
        </p>
        <div className="help-search-bar-wrapper">
          <div className="help-search-bar" role="search">
            <span className="search-icon" aria-hidden="true">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="8" stroke="#999" strokeWidth="2" />
                <line
                  x1="15"
                  y1="15"
                  x2="20"
                  y2="20"
                  stroke="#999"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="text"
              ref={searchRef}
              className="help-search-input"
              placeholder="Search for help topics…"
              value={searchTerm}
              aria-label="Search for help topics"
              autoComplete="off"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKey}
              onFocus={() => setShowSuggestions(suggestionList.length > 0)}
              style={{ fontFamily: "'Poppins', 'Lato', 'Nunito', 'Inter', sans-serif" }}
            />
            {showSuggestions && suggestionList.length > 0 && (
              <ul className="help-autocomplete-list" aria-label="Suggestions">
                {suggestionList.map((item, idx) => (
                  <li
                    key={item.question}
                    className="help-autocomplete-suggestion"
                    tabIndex={0}
                    role="option"
                    aria-selected={searchTerm === item.question}
                    onClick={() => handleSuggestionClick(item.question)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSuggestionClick(item.question);
                      }
                    }}
                  >
                    {item.question}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <div className="help-content-grid">
        <section className="faq-accordion" aria-label="Frequently Asked Questions">
          <h2 className="section-title">FAQs</h2>
          <ul className="accordion-list">
            {filteredFaqs.length === 0 ? (
              <li className="faq-empty">No results found for "{searchTerm}".</li>
            ) : (
              filteredFaqs.map((item, idx) => (
                <li
                  key={item.question}
                  className="accordion-item"
                >
                  <button
                    className={`accordion-btn ${activeIndex === idx ? "active" : ""}`}
                    aria-expanded={activeIndex === idx}
                    aria-controls={`faq-panel-${idx}`}
                    id={`faq-header-${idx}`}
                    onClick={() => handleAccordionClick(idx)}
                  >
                    <span className="accordion-question">{item.question}</span>
                    <span className={`accordion-icon ${activeIndex === idx ? "rotate" : ""}`} aria-hidden="true">
                      {/* Chevron icon */}
                      <svg width="20" height="20" viewBox="0 0 20 20">
                        <polyline
                          points="5 8 10 13 15 8"
                          fill="none"
                          stroke="#4E8D7C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${idx}`}
                    className={`accordion-panel ${activeIndex === idx ? "open" : ""}`}
                    role="region"
                    aria-labelledby={`faq-header-${idx}`}
                    aria-hidden={activeIndex !== idx}
                    style={
                      activeIndex === idx
                        ? { maxHeight: "200px", transition: "max-height 0.4s cubic-bezier(.6,0,.4,1)" }
                        : { maxHeight: 0, transition: "max-height 0.35s cubic-bezier(.6,0,.4,1)" }
                    }
                  >
                    <p className="accordion-answer">{item.answer}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <aside className="help-quick-links" aria-label="Quick Links">
          <h2 className="section-title">Quick Links</h2>
          <div className="quick-links-grid">
            {QUICK_LINKS.map((q, idx) => (
              <div className="quick-link-card" tabIndex={0} role="link" key={q.label} aria-label={q.label}>
                {q.icon}
                <div className="quick-link-label">{q.label}</div>
                <div className="quick-link-desc">{q.description}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="help-media-section" aria-label="Guides and Tutorials">
        <h2 className="section-title">Watch & Learn</h2>
        <div className="media-content">
          <div className="media-video">
            <div className="video-responsive">
              {/* Use iframe for YouTube or video tag for local video */}
              <iframe
                src={EXAMPLE_VIDEO_URL}
                title="How to use PetPal Wellness Hub"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                aria-label="Help video"
              ></iframe>
            </div>
          </div>
          <div className="media-screenshot">
            <img
              src={EXAMPLE_SCREENSHOT}
              alt="Screenshot of PetPal UI"
              className="screenshot-img"
              style={{ borderRadius: "18px", boxShadow: "0 3px 16px 1px #ececec" }}
            />
          </div>
        </div>
      </section>

      <section className="help-cta">
        <div className="cta-content">
          <span className="cta-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="#4E8D7C" />
              <path
                d="M12 22l6 6 10-14"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <span className="cta-title">Still need help?</span>
            <p>Our team is here to assist you. Reach out to us if you can't find what you're looking for.</p>
          </div>
          <a href="/contact" tabIndex={0} className="cta-btn" aria-label="Contact Us">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
