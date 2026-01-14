import React from "react";
import "./AboutPrivacyPage.css";

// PUBLIC_INTERFACE
/**
 * AboutPrivacyPage
 * Modern, friendly About & Privacy page with pastel, responsive, accessible UI.
 */
function AboutPrivacyPage() {
  return (
    <div className="about-privacy-root" role="main" aria-label="About and Privacy Information">
      <section className="about-card" aria-labelledby="about-title">
        <div className="about-icon-bg" aria-hidden="true">
          {/* Soft paw icon SVG */}
          <svg width="100" height="100" className="faded-paw" viewBox="0 0 100 100">
            <ellipse cx="50" cy="80" rx="28" ry="18" fill="#f7c873" opacity="0.12"/>
            <ellipse cx="30" cy="50" rx="10" ry="15" fill="#f26b6b" opacity="0.07"/>
            <ellipse cx="70" cy="50" rx="10" ry="15" fill="#4e8d7c" opacity="0.1"/>
            <ellipse cx="50" cy="45" rx="7" ry="7" fill="#b7d7c6" opacity="0.08"/>
            <ellipse cx="61" cy="65" rx="6" ry="7" fill="#f6eec7" opacity="0.07"/>
          </svg>
        </div>
        <div className="about-content">
          <span className="about-icon" role="img" aria-label="Smiling dog face">
            {/* Friendly emoji or SVG icon */}
            <svg width="48" height="48" viewBox="0 0 48 48" className="svg-icon-pet" aria-hidden="true">
              <ellipse cx="24" cy="28" rx="20" ry="16" fill="#f7c873" />
              <ellipse cx="13" cy="17" rx="6" ry="8" fill="#b7d7c6" />
              <ellipse cx="35" cy="17" rx="6" ry="8" fill="#b7d7c6" />
              <ellipse cx="24" cy="34" rx="7" ry="4" fill="#fff6eb" />
              <circle cx="21" cy="23" r="2" fill="#5f4434" />
              <circle cx="27" cy="23" r="2" fill="#5f4434" />
              <path d="M21 27 Q24 32 27 27" stroke="#5f4434" strokeWidth="1.5" fill="none"/>
            </svg>
          </span>
          <h1 id="about-title" className="about-title">About FurEverCare</h1>
          <p className="about-description">
            FurEverCare is your friendly companion for organizing all aspects of your pet’s health, wellness, and daily care routines.
            <br/><br/>
            <b>Features include:</b>
            <ul>
              <li>Vet appointment tracking and reminders</li>
              <li>Dietary logging and nutrition planning</li>
              <li>Activity and exercise logs</li>
              <li>Grooming session records</li>
              <li>Behavior and progress monitoring</li>
            </ul>
            With a modern, pastel-inspired interface, our goal is to create a joyful experience for pet owners and their furry friends!
          </p>
        </div>
      </section>

      <section className="privacy-card" aria-labelledby="privacy-title">
        <div className="privacy-icon-bg" aria-hidden="true">
          {/* Faded fur texture (SVG linear pattern mimic) */}
          <svg className="fur-texture" width="70" height="100" viewBox="0 0 70 100">
            <defs>
              <linearGradient id="furgradient" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#f26b6b" stopOpacity="0.16" />
                <stop offset="1" stopColor="#fff6eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <ellipse cx="35" cy="90" rx="32" ry="15" fill="url(#furgradient)" />
            <ellipse cx="20" cy="60" rx="9" ry="13" fill="#f7c873" opacity="0.08"/>
            <ellipse cx="50" cy="70" rx="11" ry="10" fill="#4e8d7c" opacity="0.07"/>
          </svg>
        </div>
        <div className="privacy-content">
          <span className="privacy-icon" role="img" aria-label="Shield with paw print">
            {/* Shield + paw SVG */}
            <svg width="44" height="44" viewBox="0 0 44 44" className="svg-icon-shield" aria-hidden="true">
              <path d="M22 4 L36 10 V22 C36 33 22 40 22 40 C22 40 8 33 8 22 V10 Z" fill="#4e8d7c" />
              <ellipse cx="22" cy="22" rx="5" ry="4" fill="#fff6eb" />
              <ellipse cx="18" cy="18" rx="1.1" ry="1.7" fill="#f26b6b" />
              <ellipse cx="26" cy="18" rx="1.1" ry="1.7" fill="#f26b6b" />
              <ellipse cx="20" cy="25" rx="1.3" ry="0.9" fill="#f7c873" />
              <ellipse cx="24" cy="25" rx="1.3" ry="0.9" fill="#f7c873" />
            </svg>
          </span>
          <h2 id="privacy-title" className="privacy-title">Privacy & Data Policy</h2>
          <p className="privacy-description">
            We respect your privacy – your data and your pet's information are stored securely and will <b>never</b> be shared without your consent.
            <ul>
              <li>No personal info sold or given to third parties</li>
              <li>Only necessary cookies, for security & preferences</li>
              <li>Access to all your data and quick removal on request</li>
              <li>No intrusive ads or unsolicited messages</li>
            </ul>
            Your trust means the world to us. To read the full policy, click below.
          </p>
          <a
            href="/privacy-policy"
            className="gradient-btn"
            tabIndex={0}
            aria-label="Read full privacy policy"
            role="button"
          >
            View Full Privacy Policy
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutPrivacyPage;
