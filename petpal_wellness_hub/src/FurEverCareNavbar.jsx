import React, { useRef, useEffect, useState } from "react";
import "./FurEverCareNavbar.css";
import { Link } from "react-router-dom";

/**
 * Helper: Append FontAwesome CDN for icons, only once, on mount.
 */
function useFontAwesomeCDN() {
  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const fa = document.createElement("link");
      fa.id = "fa-cdn";
      fa.rel = "stylesheet";
      fa.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(fa);
    }
  }, []);
}

// PUBLIC_INTERFACE
function FurEverCareNavbar() {
  /**
   * FurEverCare Navbar with nested/accessible dropdown for Account (Login/Signup).
   * - Gradient/glassmorphism background
   * - Brand pop/glow, correct font
   * - Icons for key links using FontAwesome
   * - Hamburger for responsiveness
   * - Keyboard accessibility
   */
  useFontAwesomeCDN();
  const accountBtnRef = useRef(null);
  const navMenuRef = useRef(null);

  // Hamburger logic
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Optional: Close menu on resize up
    const handleResize = () => {
      if (window.innerWidth > 700 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  useEffect(() => {
    // Close nav menu on navigation (simulate)
    const closeMenu = () => setMobileOpen(false);
    if (mobileOpen) {
      document.body.addEventListener("click", closeMenu, { once: true });
    }
    return () => document.body.removeEventListener("click", closeMenu, { once: true });
  }, [mobileOpen]);

  // Helper for nav menu show/hide class
  const navMenuClass =
    window.innerWidth <= 700
      ? (mobileOpen
        ? "furt-nav-menu mobile-shown"
        : "furt-nav-menu mobile-hidden")
      : "furt-nav-menu";

  return (
    <nav className="furt-navbar" role="navigation" aria-label="Main Navigation">
      <div className="furt-navbar-container">
        <Link className="furt-logo" tabIndex={0} to="/" aria-label="FurEverCare home">
          <i className="fa-solid fa-shield-cat furt-logo-fa" aria-hidden="true"></i>
          <span role="img" aria-label="paw print" className="furt-logo-symbol">
            🐾
          </span>
          FurEverCare
        </Link>
        <button
          className={`furt-hamburger${mobileOpen ? " active" : ""}`}
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          aria-controls="furt-main-nav-menu"
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen((v) => !v);
          }}
          type="button"
        >
          <span className="fa fa-bars" aria-hidden="true"></span>
        </button>

        <ul
          ref={navMenuRef}
          id="furt-main-nav-menu"
          className={navMenuClass}
          style={window.innerWidth > 700 ? undefined : { position: "absolute" }}
        >
          <li className="furt-nav-menuitem">
            <button
              className="furt-nav-link furt-dropdown-toggle"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              type="button"
            >
              <span className="furt-icon"><i className="fa-solid fa-paw"></i></span>
              My Pets
            </button>
            <ul className="furt-dropdown" role="menu" aria-label="My Pets Submenu">
              <li role="none">
                {/* FIXME: Routing to the FIRST PET PROFILE for demo purposes.
                  In a real app, would show a list or user's pets */}
                <Link className="furt-dropdown-link" to="/pet/1" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon"><i className="fa-solid fa-id-badge"></i></span>
                  Pet Profile
                </Link>
              </li>
              <li role="none">
                <Link className="furt-dropdown-link" to="/pet/1/health" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon"><i className="fa-solid fa-heartbeat"></i></span>
                  Health Tracker
                </Link>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon">
                    <i className="fa-solid fa-bone"></i>
                  </span>
                  Diet &amp; Nutrition
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon">
                    <i className="fa-regular fa-futbol"></i>
                  </span>
                  Activity
                </a>
              </li>
            </ul>
          </li>
          <li className="furt-nav-menuitem">
            <button
              className="furt-nav-link furt-dropdown-toggle"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              type="button"
            >
              <span className="furt-icon"><i className="fa-solid fa-calendar-check"></i></span>
              Appointments
            </button>
            <ul className="furt-dropdown" role="menu" aria-label="Appointments Submenu">
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <i className="fa-solid fa-clipboard-list furt-icon"></i>
                  Manage
                </a>
              </li>
            </ul>
          </li>
          <li className="furt-nav-menuitem furt-nav-settings-parent">
            <button
              className="furt-nav-link furt-dropdown-toggle"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              type="button"
              aria-controls="settings-dropdown"
            >
              <span className="furt-icon"><i className="fa-solid fa-gear"></i></span>
              Settings
            </button>
            <ul
              className="furt-dropdown"
              id="settings-dropdown"
              role="menu"
              aria-label="Settings Submenu"
            >
              <li role="none" className="furt-dropdown-submenu-parent">
                <button
                  ref={accountBtnRef}
                  className="furt-dropdown-link furt-dropdown-toggle"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="account-dropdown"
                  type="button"
                  tabIndex={-1}
                >
                  <span className="furt-icon"><i className="fa-solid fa-user"></i></span>
                  Account
                  <span className="furt-dropdown-arrow" aria-hidden="true">▼</span>
                </button>
                <ul
                  className="furt-dropdown furt-dropdown-nested"
                  id="account-dropdown"
                  role="menu"
                  aria-label="Account Submenu"
                  aria-labelledby="account-dropdown"
                >
                  <li role="none">
                    <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                      <span className="furt-icon"><i className="fa-solid fa-sign-in-alt"></i></span>
                      Login
                    </a>
                  </li>
                  <li role="none">
                    <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                      <span className="furt-icon"><i className="fa-solid fa-user-plus"></i></span>
                      Signup
                    </a>
                  </li>
                </ul>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon"><i className="fa-solid fa-headset"></i></span>
                  Support
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon"><i className="fa-solid fa-envelope"></i></span>
                  Contact
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon"><i className="fa-solid fa-circle-question"></i></span>
                  Help
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  <span className="furt-icon"><i className="fa-solid fa-info-circle"></i></span>
                  About &amp; Privacy
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FurEverCareNavbar;
