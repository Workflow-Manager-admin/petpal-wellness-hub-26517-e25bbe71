import React, { useState } from 'react';
import './FurEverCareNavbar.css';
import { Link } from 'react-router-dom';

// Inline SVGs for minimal, flat, pastel-friendly icons
const PawIcon = () => (
  <span className="navbar__icon" aria-hidden="true">
    {/* Flat paw print SVG */}
    <svg viewBox="0 0 20 20" width="19" height="19" fill="currentColor" style={{ display: 'inline' }}>
      <circle cx="5.2" cy="7" r="2.4"/>
      <circle cx="14.8" cy="7" r="2.4"/>
      <ellipse cx="10" cy="16" rx="4.1" ry="2.3"/>
      <ellipse cx="3.8" cy="13.2" rx="1" ry="1.5"/>
      <ellipse cx="16.2" cy="13.2" rx="1" ry="1.5"/>
    </svg>
  </span>
);

const CalendarIcon = () => (
  <span className="navbar__icon" aria-hidden="true">
    <svg viewBox="0 0 22 22" width="18" height="18" fill="currentColor" style={{ display: 'inline' }}>
      <rect x="3.5" y="5.5" width="15" height="12" rx="2" stroke="none"/>
      <rect x="3.5" y="7.8" width="15" height="10.2" rx="1.1" fill="#e1ecfa"/>
      <rect x="6.5" y="11.2" width="2" height="2" rx="1" fill="#afd2ea"/>
      <rect x="10" y="11.2" width="2" height="2" rx="1" fill="#afd2ea"/>
      <rect x="14" y="11.2" width="2" height="2" rx="1" fill="#afd2ea"/>
      <rect x="6.5" y="15" width="2" height="2" rx="1" fill="#afd2ea"/>
    </svg>
  </span>
);

const GearIcon = () => (
  <span className="navbar__icon" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" style={{ display: 'inline' }}>
      <circle cx="10" cy="10" r="2.7" fill="#cdf1ea"/>
      <path d="M17.6 11.4c.04-.28.06-.56.06-.84s-.02-.56-.06-.84l1.6-1.26a.42.42 0 0 0 .1-.54l-1.5-2.6a.42.42 0 0 0-.5-.2l-1.9.76a7.2 7.2 0 0 0-1.47-.86l-.3-2a.42.42 0 0 0-.42-.34H7.9a.42.42 0 0 0-.42.34l-.3 2a7.2 7.2 0 0 0-1.47.86l-1.9-.76a.42.42 0 0 0-.5.2l-1.5 2.6a.42.42 0 0 0 .1.54l1.6 1.26c-.04.28-.06.56-.06.84s.02.56.06.84l-1.6 1.26a.42.42 0 0 0-.1.54l1.5 2.6a.42.42 0 0 0 .5.2l1.9-.76c.46.36.96.66 1.47.86l.3 2a.42.42 0 0 0 .42.34h3a.42.42 0 0 0 .42-.34l.3-2c.51-.2 1-.5 1.47-.86l1.9.76a.42.42 0 0 0 .5-.2l1.5-2.6a.42.42 0 0 0-.1-.54l-1.6-1.26zm-7.6 1.6a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#84bcea"/>
    </svg>
  </span>
);

// PUBLIC_INTERFACE
function FurEverCareNavbar() {
  const [dropdown, setDropdown] = useState(null);

  const handleMouseEnter = (menu) => setDropdown(menu);
  const handleMouseLeave = () => setDropdown(null);

  return (
    <nav className="navbar" role="navigation" aria-label="FurEverCare navbar">
      <Link to="/" className="navbar__brand">
        FurEverCare
      </Link>
      <div className="navbar__menu">

        {/* My Pets */}
        <div
          className="navbar__item navbar__item--dropdown"
          onMouseEnter={() => handleMouseEnter('pets')}
          onMouseLeave={handleMouseLeave}
          tabIndex={0}
          onFocus={() => handleMouseEnter('pets')}
          onBlur={handleMouseLeave}
          aria-haspopup="true"
          aria-expanded={dropdown === 'pets'}
        >
          <PawIcon />
          <span>My Pets</span>
          <div
            className="navbar__dropdown"
            style={{ display: dropdown === 'pets' ? 'block' : 'none' }}
            role="menu"
            aria-label="My Pets submenu"
          >
            <Link to="/pet/1" className="navbar__dropdown-link" tabIndex={dropdown === 'pets' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="17" height="17" fill="currentColor"><ellipse cx="10" cy="12" rx="3.1" ry="2" /><circle cx="7.2" cy="8.4" r="1.1" /><circle cx="12.8" cy="8.4" r="1.1" /></svg>
              </span>
              Pet Profile
            </Link>
            <Link to="/pet/1/health" className="navbar__dropdown-link" tabIndex={dropdown === 'pets' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="17" height="17" fill="currentColor"><rect x="9" y="5" width="2" height="10" rx="1"/><rect x="5" y="9" width="10" height="2" rx="1"/></svg>
              </span>
              Health Tracker
            </Link>
            <Link to="/pet/1/diet" className="navbar__dropdown-link" tabIndex={dropdown === 'pets' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="17" height="17" fill="currentColor"><ellipse cx="10" cy="15" rx="4" ry="1.6"/><rect x="6" y="4" width="8" height="6" rx="2" fill="#e8fff6"/><rect x="8.25" y="8" width="3.5" height="1" rx="0.5" fill="#adf0ec"/></svg>
              </span>
              Diet &amp; Nutrition
            </Link>
            <Link to="/pet/1/activity" className="navbar__dropdown-link" tabIndex={dropdown === 'pets' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor"><circle cx="7" cy="14" r="2" /><ellipse cx="14" cy="8" rx="2" ry="3.3"/><rect x="7" y="9" width="7" height="2" rx="1.1"/></svg>
              </span>
              Activity Log
            </Link>
          </div>
        </div>

        {/* Appointments */}
        <div className="navbar__item" aria-label="Appointments" tabIndex={0}>
          <Link to="/appointments/manage" className="navbar__item" style={{ padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            <CalendarIcon />
            <span>Appointments</span>
          </Link>
        </div>

        {/* Settings */}
        <div
          className="navbar__item navbar__item--dropdown"
          onMouseEnter={() => handleMouseEnter('settings')}
          onMouseLeave={handleMouseLeave}
          tabIndex={0}
          onFocus={() => handleMouseEnter('settings')}
          onBlur={handleMouseLeave}
          aria-haspopup="true"
          aria-expanded={dropdown === 'settings'}
        >
          <GearIcon />
          <span>Settings</span>
          <div
            className="navbar__dropdown"
            style={{ display: dropdown === 'settings' ? 'block' : 'none' }}
            role="menu"
            aria-label="Settings submenu"
          >
            <Link to="/settings/about-privacy" className="navbar__dropdown-link" tabIndex={dropdown === 'settings' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor"><rect x="3" y="14" width="14" height="2" rx="1"/><rect x="7" y="4" width="6" height="8" rx="2"/><rect x="7.5" y="5.5" width="5" height="1" rx="0.5" fill="#dedde6"/></svg>
              </span>
              About &amp; Privacy
            </Link>
            <Link to="/settings/support/help" className="navbar__dropdown-link" tabIndex={dropdown === 'settings' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <circle cx="10" cy="10" r="8" fill="#e5fafa"/>
                  <ellipse cx="10" cy="14.3" rx="1.1" ry="1.1" />
                  <path d="M10 7.5a2.1 2.1 0 0 0-2.1 2.1h1.3A.8.8 0 0 1 10 8.9c.37 0 .66.26.66.55 0 .3-.19.51-.52.73-.49.31-.93.82-.93 1.32V13h1.3v-.47c0-.16.14-.36.43-.55.85-.53 1.44-1.14 1.44-1.98A2.1 2.1 0 0 0 10 7.5z"/>
                </svg>
              </span>
              Help
            </Link>
            <Link to="/settings/support/contact" className="navbar__dropdown-link" tabIndex={dropdown === 'settings' ? 0 : -1}>
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <ellipse cx="10" cy="10.5" rx="7.8" ry="6.5" fill="#e8f5fa"/>
                  <rect x="3.5" y="8" width="13" height="5" rx="2" fill="#cdf1ea"/>
                  <ellipse cx="10" cy="11.7" rx="2.9" ry="1.2" fill="#abdae1"/>
                </svg>
              </span>
              Contact Us
            </Link>
            {/* Account nested dropdown */}
            <div
              className="navbar__dropdown-link navbar__dropdown-link--account"
              tabIndex={dropdown === 'settings' ? 0 : -1}
              aria-haspopup="true"
            >
              <span className="navbar__dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <ellipse cx="10" cy="8" rx="4" ry="4" />
                  <rect x="5.5" y="12" width="9" height="5" rx="2.5" fill="#e8f5fa"/>
                </svg>
              </span>
              Account
              <div className="navbar__nested-dropdown">
                <Link to="/login" className="navbar__nested-dropdown-link" tabIndex={dropdown === 'settings' ? 0 : -1}>
                  Login
                </Link>
                <Link to="/signup" className="navbar__nested-dropdown-link" tabIndex={dropdown === 'settings' ? 0 : -1}>
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default FurEverCareNavbar;
