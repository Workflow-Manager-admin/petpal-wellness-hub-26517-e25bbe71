import React, { useRef } from "react";
import "./FurEverCareNavbar.css";

/**
 * Helper: Accessible nested dropdown with keyboard navigation, focus management, and a11y structure.
 */
function useDropdownMenu() {
  // Not full stateful: menu display is controlled by focus/hover in CSS.
  // Optionally here, could enhance with JS-driven open state if JS-only open needed.
  // Left for minimal implementation due to pure CSS focus/hover in requirements.
  return null;
}

// PUBLIC_INTERFACE
function FurEverCareNavbar() {
  /**
   * FurEverCare Navbar with nested/accessible dropdown for Account (Login/Signup).
   */
  // refs for focus-trap or further a11y enhancement (optional)
  const accountBtnRef = useRef(null);

  return (
    <nav className="furt-navbar" role="navigation" aria-label="Main Navigation">
      <div className="furt-navbar-container">
        <div className="furt-logo" tabIndex={0}>
          <span role="img" aria-label="paw print" className="furt-logo-symbol">
            🐾
          </span>
          FurEverCare
        </div>
        <ul className="furt-nav-menu">
          <li className="furt-nav-menuitem">
            <button
              className="furt-nav-link furt-dropdown-toggle"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              type="button"
            >
              My Pets
            </button>
            <ul className="furt-dropdown" role="menu" aria-label="My Pets Submenu">
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  Pet Profiles
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  Health Tracker
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  Diet &amp; Nutrition
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
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
              Appointments
            </button>
            <ul className="furt-dropdown" role="menu" aria-label="Appointments Submenu">
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
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
                      Login
                    </a>
                  </li>
                  <li role="none">
                    <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                      Signup
                    </a>
                  </li>
                </ul>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  Support
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  Contact
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
                  Help
                </a>
              </li>
              <li role="none">
                <a className="furt-dropdown-link" href="#" role="menuitem" tabIndex={-1}>
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
