import React from "react";
import "./AboutPrivacyPage.css";

// Illustrative SVG icons (inline for simplicity)
function MissionIcon() {
  return (
    <svg
      className="about-icon"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="22" fill="#E9F7F6" />
      <path
        d="M16 21C16 16.5817 19.5817 13 24 13C28.4183 13 32 16.5817 32 21C32 27 24 33 24 33C24 33 16 27 16 21Z"
        fill="#4E8D7C"
      />
      <circle cx="24" cy="21" r="2.5" fill="#fff" />
    </svg>
  );
}
function OfferIcon() {
  return (
    <svg
      className="about-icon"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="22" fill="#F7F6EA" />
      <rect
        x="14"
        y="20"
        width="16"
        height="12"
        rx="4"
        fill="#F7C873"
        stroke="#B29B61"
        strokeWidth="2"
      />
      <circle cx="22" cy="17" r="3.5" fill="#fff" stroke="#F26B6B" strokeWidth="2"/>
    </svg>
  );
}
function WhyIcon() {
  return (
    <svg
      className="about-icon"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="22" fill="#FDF2F1" />
      <path
        d="M22 29V27C22 25.3431 23.3431 24 25 24C26.6569 24 28 25.3431 28 27V29"
        stroke="#F26B6B"
        strokeWidth="2"
      />
      <ellipse cx="25" cy="19" rx="3" ry="2" fill="#F26B6B" />
      <circle cx="25" cy="22" r="1" fill="#fff" />
    </svg>
  );
}
function PromiseIcon() {
  return (
    <svg
      className="about-icon"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="22" fill="#F0F6FD" />
      <path
        d="M15 25l6 6 8-10"
        stroke="#4E8D7C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27" cy="19" r="2" fill="#4E8D7C"/>
    </svg>
  );
}

// Privacy section icons
function DataIcon() {
  return (
    <svg className="privacy-icon" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#F0F6FD"/>
      <rect x="11" y="13" width="14" height="10" rx="3" fill="#4E8D7C" />
      <rect x="15" y="12" width="6" height="2" rx="1" fill="#fff"/>
      <circle cx="18" cy="18" r="2" fill="#fff" />
    </svg>
  );
}
function UsageIcon() {
  return (
    <svg className="privacy-icon" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#F7F6EA"/>
      <path d="M16 22 L20 18 L22 22" stroke="#B29B61" strokeWidth="2" fill="none"/>
      <rect x="14" y="13" width="8" height="12" rx="4" fill="#F7C873"/>
    </svg>
  );
}
function ProtectionIcon() {
  return (
    <svg className="privacy-icon" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#E9F7F6"/>
      <rect x="13" y="15" width="10" height="6" rx="3" fill="#4E8D7C"/>
      <circle cx="18" cy="18" r="2" fill="#fff" />
    </svg>
  );
}
function ControlIcon() {
  return (
    <svg className="privacy-icon" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#FDF2F1"/>
      <rect x="14" y="17" width="8" height="5" rx="2.5" fill="#F26B6B"/>
      <rect x="19" y="15" width="4" height="2" rx="1" fill="#fff"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
function AboutPrivacyPage() {
  return (
    <div className="about-privacy-root">
      <div className="about-privacy-container">
        {/* About Section */}
        <section className="about-section" aria-label="About FurEverCare">
          <h1 className="about-title">About FurEverCare</h1>
          <div className="about-cards-wrapper">
            <div className="about-card mission">
              <MissionIcon />
              <div>
                <h2 className="about-card-heading">Our Mission</h2>
                <p className="about-card-text">
                  To empower pet parents in nurturing happier, healthier lives for their animals
                  through insight, connection, and care—every paw, every day.
                </p>
              </div>
            </div>
            <div className="about-card offer">
              <OfferIcon />
              <div>
                <h2 className="about-card-heading">What We Offer</h2>
                <p className="about-card-text">
                  Track appointments, nutrition, activity, and more—FurEverCare brings you all essential wellness tools in one friendly platform, designed for peace of mind.
                </p>
              </div>
            </div>
            <div className="about-card why">
              <WhyIcon />
              <div>
                <h2 className="about-card-heading">Why FurEverCare?</h2>
                <p className="about-card-text">
                  Because pets are family. We exist to simplify daily care and help you notice patterns, celebrate milestones, and support every stage of life together.
                </p>
              </div>
            </div>
            <div className="about-card promise">
              <PromiseIcon />
              <div>
                <h2 className="about-card-heading">Our Promise</h2>
                <p className="about-card-text">
                  Soft, approachable, and always secure—your data is yours, and your pet’s wellbeing is at the heart of every feature.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Privacy Section */}
        <section className="privacy-section" aria-label="Privacy and Data Protection">
          <h1 className="privacy-title">Privacy & Data Protection</h1>
          <div className="privacy-cards-wrapper">
            <div className="privacy-card data">
              <DataIcon />
              <div>
                <h2 className="privacy-card-heading">What We Collect</h2>
                <p className="privacy-card-text">
                  Only the info you provide: pet profiles, wellness data, appointment details, and your secure login.
                </p>
              </div>
            </div>
            <div className="privacy-card usage">
              <UsageIcon />
              <div>
                <h2 className="privacy-card-heading">How We Use Data</h2>
                <p className="privacy-card-text">
                  Strictly to help you stay organized and informed—never for ads or unsolicited sharing.
                </p>
              </div>
            </div>
            <div className="privacy-card protection">
              <ProtectionIcon />
              <div>
                <h2 className="privacy-card-heading">How It's Protected</h2>
                <p className="privacy-card-text">
                  Your info is encrypted and access is limited to you. We use modern security best practices throughout.
                </p>
              </div>
            </div>
            <div className="privacy-card control">
              <ControlIcon />
              <div>
                <h2 className="privacy-card-heading">Your Control</h2>
                <p className="privacy-card-text">
                  Download or delete your data anytime. Your privacy settings are clear and in your hands.
                </p>
              </div>
            </div>
          </div>
          {/* Privacy Policy Download Button */}
          <div className="privacy-download-btn-wrapper">
            <a
              href="/assets/furevercare-privacy-policy.pdf"
              className="privacy-download-btn"
              download
              aria-label="Download Privacy Policy PDF"
            >
              Download Privacy Policy (PDF)
            </a>
          </div>
        </section>
      </div>
      {/* Paws/fur themed faded background */}
      <div className="about-privacy-bg-deco" aria-hidden="true"></div>
    </div>
  );
}

export default AboutPrivacyPage;
