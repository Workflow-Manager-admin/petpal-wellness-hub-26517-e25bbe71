import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FurEverCareNavbar.css";

// PUBLIC_INTERFACE
// FurEverCare Navbar for PetPal Wellness Hub
function FurEverCareNavbar() {
  const [settingsDrop, setSettingsDrop] = useState(false);

  // Dropdown toggle for settings
  const handleSettingsMouseEnter = () => setSettingsDrop(true);
  const handleSettingsMouseLeave = () => setSettingsDrop(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo-section">
        <Link to="/" className="navbar-logo">
          <span role="img" aria-label="paw" style={{ fontSize: "2rem" }}>🐾</span>
          <span className="brand-text">FurEverCare</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/appointments/manage" className="navbar-link">Appointments</Link>
        <Link to="/pet/1/health" className="navbar-link">Health Tracker</Link>
        <Link to="/pet/1/diet" className="navbar-link">Diet & Nutrition</Link>
        <Link to="/pet/1/activity" className="navbar-link">Activity</Link>
        <Link to="/pet/1" className="navbar-link">Profile</Link>
      </div>
      <div
        className="navbar-settings"
        onMouseEnter={handleSettingsMouseEnter}
        onMouseLeave={handleSettingsMouseLeave}
        tabIndex={0}
      >
        <button className="navbar-settings-btn">
          <span style={{ marginRight: "0.5em" }}>⚙️</span> Settings
        </button>
        {settingsDrop && (
          <div className="dropdown-content">
            <Link to="/settings/support/help" className="dropdown-link">Help</Link>
            <Link to="/settings/support/contact" className="dropdown-link">Contact Us</Link>
            {/* PUBLIC_INTERFACE: About & Privacy link using react-router-dom Link with icon */}
            <Link
              to="/settings/about-privacy"
              className="dropdown-link"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ fontSize: "1rem", marginRight: "0.5em", display: "flex", alignItems: "center" }}>
                {/* Simple info/privacy icon SVG */}
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ marginRight: "0.25em" }}>
                  <circle cx="10" cy="10" r="9" stroke="#888" strokeWidth="2" fill="none"/>
                  <rect x="9" y="9" width="2" height="6" rx="1" fill="#888"/>
                  <rect x="9" y="5" width="2" height="2" rx="1" fill="#888"/>
                </svg>
              </span>
              About & Privacy
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default FurEverCareNavbar;
