import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
// FontAwesome CDN assumed in public/index.html or otherwise, fallback to Unicode if unavailable

// Font import via CSS handled in FurEverCareNavbar.css

// Helper for icon: Returns <i> with appropriate class
function Icon({ name, ...props }) {
  return <i className={`fa fa-${name}`} aria-hidden="true" {...props} />;
}

// PUBLIC_INTERFACE
function FurEverCareNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const location = useLocation();

  // Close dropdown/hamburger on route change or click outside
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // NAV STRUCTURE
  // Each menu: { label, icon, to?, dropdown?: [ ... ] }
  const navItems = [
    {
      label: 'My Pets',
      icon: 'paw',
      dropdown: [
        { label: 'Pet Profiles', icon: 'user-circle', to: '/' },
        { label: 'Health Tracker', icon: 'heartbeat', to: '/pet/:id/health' },
        { label: 'Diet & Nutrition', icon: 'utensils', to: '/pet/:id/diet' },
        { label: 'Activity Logs', icon: 'running', to: '/pet/:id/activity' },
      ],
    },
    {
      label: 'Appointments',
      icon: 'calendar-alt',
      dropdown: [
        { label: 'Manage', icon: 'calendar-check', to: '/appointments/manage' },
      ],
    },
    {
      label: 'Settings',
      icon: 'cog',
      dropdown: [
        {
          label: 'Account',
          icon: 'user',
          dropdown: [
            { label: 'Login', icon: 'sign-in-alt', to: '#' },
            { label: 'Sign Up', icon: 'user-plus', to: '#' },
          ],
        },
        {
          label: 'Support',
          icon: 'hands-helping',
          dropdown: [
            { label: 'Contact', icon: 'envelope', to: '/settings/support/contact' },
            { label: 'Help', icon: 'question-circle', to: '/settings/support/help' },
          ],
        },
        { label: 'About & Privacy', icon: 'info-circle', to: '/settings/about-privacy' },
      ],
    },
  ];

  // Recursive menu rendering (Dropdowns)
  function renderDropdown(items, depth = 0) {
    return (
      <ul className={`fec-navbar__dropdown fec-navbar__dropdown--depth${depth}`} role="menu">
        {items.map((item, idx) => {
          if (item.dropdown) {
            // Nested Dropdown
            return (
              <li key={item.label} className="fec-navbar__dropdown-item has-submenu" role="none">
                <button
                  className="fec-navbar__dropdown-link"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.label}
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(openDropdown === item.label ? null : item.label);
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                    }
                  }}
                >
                  {item.icon && <Icon name={item.icon} className="fec-navbar__icon" />}
                  <span>{item.label}</span>
                  <Icon name="chevron-right" className="fec-navbar__dropdown-caret" />
                </button>
                {openDropdown === item.label && renderDropdown(item.dropdown, depth + 1)}
              </li>
            );
          }
          const resolvedTo = item.to?.replace(':id', '1'); // Replace with valid param for demo
          return (
            <li key={item.label} className="fec-navbar__dropdown-item" role="none">
              <Link
                className={`fec-navbar__dropdown-link${location.pathname === resolvedTo ? ' active' : ''}`}
                to={resolvedTo}
                tabIndex={0}
                role="menuitem"
              >
                {item.icon && <Icon name={item.icon} className="fec-navbar__icon" />}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  // Desktop nav items, including dropdowns
  function renderNavLinks() {
    return navItems.map((item, i) => {
      if (item.dropdown) {
        return (
          <li
            key={item.label}
            className={`fec-navbar__item has-dropdown${openDropdown === item.label ? ' open' : ''}`}
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
            role="none"
          >
            <button
              className="fec-navbar__link"
              type="button"
              aria-haspopup="menu"
              aria-expanded={openDropdown === item.label}
              tabIndex={0}
              onClick={e => {
                e.stopPropagation();
                setOpenDropdown(openDropdown === item.label ? null : item.label);
              }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenDropdown(openDropdown === item.label ? null : item.label);
                }
              }}
            >
              <Icon name={item.icon} className="fec-navbar__icon" />
              <span>{item.label}</span>
              <Icon name="chevron-down" className="fec-navbar__caret" />
            </button>
            {openDropdown === item.label && renderDropdown(item.dropdown)}
          </li>
        );
      }
      return (
        <li key={item.label} className="fec-navbar__item" role="none">
          <Link className="fec-navbar__link" to={item.to} tabIndex={0}>
            <Icon name={item.icon} className="fec-navbar__icon" />
            <span>{item.label}</span>
          </Link>
        </li>
      );
    });
  }

  // Hamburger mobile menu
  function renderMobileMenu() {
    return (
      <div className="fec-navbar__mobile-menu" role="dialog" aria-modal="true">
        <ul className="fec-navbar__mobile-list" role="menu">
          {navItems.map((item) => (
            <li key={item.label} className="fec-navbar__mobile-item" role="none">
              {item.dropdown ? (
                <>
                  <button
                    className="fec-navbar__mobile-link"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === item.label}
                    tabIndex={0}
                    onClick={e => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                    }}
                  >
                    <Icon name={item.icon} className="fec-navbar__icon" />
                    <span>{item.label}</span>
                    <Icon name="chevron-down" className="fec-navbar__caret" />
                  </button>
                  {openDropdown === item.label && renderDropdown(item.dropdown)}
                </>
              ) : (
                <Link
                  className="fec-navbar__mobile-link"
                  to={item.to}
                  tabIndex={0}
                >
                  <Icon name={item.icon} className="fec-navbar__icon" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <nav className="fec-navbar" ref={navRef} style={{ zIndex: 110 }}>
      <div className="fec-navbar__container">
        <Link to="/" className="fec-navbar__brand">
          <span className="fec-navbar__brand-icon">
            <Icon name="paw" />
          </span>
          <span className="fec-navbar__brand-text">
            FurEverCare
          </span>
        </Link>
        {/* Desktop */}
        <ul className="fec-navbar__list">{renderNavLinks()}</ul>
        {/* Hamburger Button */}
        <button
          className={`fec-navbar__hamburger${mobileMenuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => {
            setMobileMenuOpen(m => !m);
            setOpenDropdown(null);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && renderMobileMenu()}
    </nav>
  );
}

export default FurEverCareNavbar;
