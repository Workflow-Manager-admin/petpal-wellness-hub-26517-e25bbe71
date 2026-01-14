import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

function EyeIcon({ visible }) {
  // Inline SVG for show/hide password
  return visible ? (
    <svg aria-hidden="true" width="22" height="22" fill="none" viewBox="0 0 22 22"><path stroke="#6c7a89" strokeWidth="2" d="M1.8 11C3.2 6.2 7.6 3 11 3c3.4 0 7.8 3.2 9.2 8-.2.7-.5 1.4-.9 2C17.8 16.8 13.4 20 11 20c-2.4 0-6.8-3.2-9.2-7-.4-.6-.7-1.3-.9-2z"/><circle cx="11" cy="11.5" r="4" stroke="#6c7a89" strokeWidth="2"/></svg>
  ) : (
    <svg aria-hidden="true" width="22" height="22" fill="none" viewBox="0 0 22 22"><path stroke="#6c7a89" strokeWidth="2" d="M1 1l20 20"/><path stroke="#6c7a89" strokeWidth="2" d="M3 11c3-6 11-7 17 0-3 6-11 7-17 0z"/><path stroke="#6c7a89" strokeWidth="2" d="M7.5 7.5A4 4 0 0015 15"/></svg>
  );
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f7c873"/><rect x="11" y="10" width="2" height="6" rx="1" fill="#fff"/><rect x="11" y="7" width="2" height="2" rx="1" fill="#fff"/></svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({ login: "", password: "", remember: false });
  const [showPwd, setShowPwd] = useState(false);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);

  // Validation logic
  const validate = (f = form) => {
    const errors = {};
    if (!f.login || f.login.trim() === "")
      errors.login = "This field is required.";
    if (!f.password)
      errors.password = "Password is required.";
    else if (f.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    return errors;
  };

  // Handler
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setError(errs);
    setTouched({ login: true, password: true });
    if (Object.keys(errs).length === 0) {
      // Authentication logic would go here
      navigate("/");
    }
  }

  // Accessibility: handle keyboard for tooltip (Remember Me)
  function keyTooltip(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") setShowTooltip((st) => !st);
  }

  // For demo, update on input
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
    setTouched((t) => ({ ...t, [name]: true }));
    setError((er) => ({ ...er, ...validate({ ...form, [name]: type === "checkbox" ? checked : value }) }));
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <section className="login-illustration" aria-hidden="true">
          {/* Pet-friendly illustration (colorful SVG) */}
          <svg width="160" height="130" viewBox="0 0 160 130" fill="none" className="pet-svg" aria-hidden="true">
            {/* Paw */}
            <ellipse cx="80" cy="90" rx="38" ry="20" fill="#f7c873" />
            <ellipse cx="62" cy="80" rx="8" ry="11" fill="#f7c873" />
            <ellipse cx="98" cy="78" rx="8" ry="11" fill="#f7c873" />
            <ellipse cx="69" cy="110" rx="7" ry="8" fill="#f26b6b" />
            <ellipse cx="91" cy="110" rx="7" ry="8" fill="#f26b6b" />
            {/* Face */}
            <ellipse cx="80" cy="62" rx="34" ry="32" fill="#fff" stroke="#e87a41" strokeWidth="3"/>
            {/* Eyes */}
            <ellipse cx="68" cy="62" rx="5" ry="7" fill="#4e8d7c"/>
            <ellipse cx="92" cy="62" rx="5" ry="7" fill="#4e8d7c"/>
            {/* Nose */}
            <ellipse cx="80" cy="71" rx="3" ry="2" fill="#e87a41"/>
            {/* Smile */}
            <path d="M77 74 Q80 77 83 74" stroke="#e87a41" strokeWidth="2" fill="none"/>
          </svg>
        </section>
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <h1 className="login-title">Welcome Back!</h1>
          <p className="login-brand">FurEverCare Portal</p>

          <div className="form-group">
            <label htmlFor="login-email" className="required">
              Username or Email
            </label>
            <div className="form-input-with-icon">
              <input
                type="text"
                id="login-email"
                name="login"
                autoFocus
                autoComplete="username"
                placeholder="Enter your username or email"
                value={form.login}
                aria-invalid={!!(touched.login && error.login)}
                aria-describedby={touched.login && error.login ? "login-email-error" : undefined}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, login: true }))}
                tabIndex={0}
                required
              />
              <span className="input-icon" aria-hidden="true">
                {/** envelope icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke="#4e8d7c" strokeWidth="2"/><path d="M4 7l8 6 8-6" stroke="#F26B6B" strokeWidth="2"/></svg>
              </span>
            </div>
            {touched.login && error.login && (
              <div className="form-error" id="login-email-error">
                {error.login}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="required">
              Password
            </label>
            <div className="form-input-with-icon">
              <input
                type={showPwd ? "text" : "password"}
                id="login-password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                aria-invalid={!!(touched.password && error.password)}
                aria-describedby={touched.password && error.password ? "login-password-error" : undefined}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                tabIndex={0}
                required
              />
              <button
                type="button"
                className="eye-btn"
                aria-label={showPwd ? "Hide password" : "Show password"}
                onClick={() => setShowPwd((v) => !v)}
                tabIndex={0}
              ><EyeIcon visible={showPwd} /></button>
              <span className="input-icon" aria-hidden="true" style={{ right: 40, left: 'unset' }}>
                {/* lock icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 22 22"><rect x="4" y="8" width="14" height="10" rx="2" stroke="#4e8d7c" strokeWidth="2"/><path d="M8 8V6a3 3 0 116 0v2" stroke="#F26B6B" strokeWidth="2"/></svg>
              </span>
            </div>
            {touched.password && error.password && (
              <div className="form-error" id="login-password-error">
                {error.password}
              </div>
            )}
          </div>

          <div className="login-form-row">
            <div className="remember-me-wrap">
              <input
                type="checkbox"
                id="remember-me"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                tabIndex={0}
                aria-describedby="remember-tooltip"
              />
              <label htmlFor="remember-me" className="remember-label">
                Remember Me
              </label>
              <button
                type="button"
                className="remember-tooltip-btn"
                tabIndex={0}
                aria-label="More info"
                aria-describedby="remember-tooltip"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                onKeyDown={keyTooltip}
              >
                <InfoIcon />
              </button>
              {showTooltip && (
                <div className="remember-tooltip" id="remember-tooltip" role="tooltip">
                  <span>Keep me logged in on this device.</span>
                </div>
              )}
            </div>
            <Link className="forgot-link" to="#" tabIndex={0}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="login-btn gradient-pill"
            aria-label="Login"
          >
            Log In
          </button>
          <div className="signup-redirect">
            <span>Don't have an account?</span>
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </div>
          <div className="social-login-row" aria-hidden="true">
            <span className="social-placeholder-label">Or sign in with</span>
            <div className="social-icons">
              {/* Placeholder social icons: no logic, button for a11y */}
              <button type="button" aria-label="Sign in with Google" className="social-btn" disabled tabIndex={-1}>
                <svg width="18" height="18" viewBox="0 0 512 512"><circle cx="256" cy="256" fill="#fff" r="256"/><path fill="#EA4335" d="M496,262.7c0-14.7-1.3-29.4-4-43.3H256v83.2h133.7C379.4,355.6,323.5,393,256,393c-75,0-137.1-61-137.1-137.1S181,118.7,256,118.7c39,0,74.1,13.9,100.9,41.1l60.7-59.4C382.8,56.8,324.5,32,256,32,132.3,32,32,132.3,32,256s100.3,224,224,224c114.1,0,210-83,233.2-192H256v-79h240z"/></svg>
              </button>
              <button type="button" aria-label="Sign in with Facebook" className="social-btn" disabled tabIndex={-1}>
                <svg width="18" height="18" viewBox="0 0 50 50"><circle cx="25" cy="25" fill="#fff" r="25"/><path fill="#3B5998" d="M32.3,27.2l1-6.5h-6.2v-4.2c0-1.8,0.9-3.7,3.8-3.7h3v-5c0,0-2.7-0.5-5.3-0.5c-5.4,0-8.8,3.3-8.8,9.1v4.3h-5V27.2h5V42h6.1V27.2H32.3z"/></svg>
              </button>
              <button type="button" aria-label="Sign in with Apple" className="social-btn" disabled tabIndex={-1}>
                <svg width="18" height="18" viewBox="0 0 50 50"><circle cx="25" cy="25" fill="#fff" r="25"/><path fill="#000" d="M37.8,35.9c-1.1,2.1-3.2,4.5-6.4,4.5c-2.5,0-3.2-1.6-6-1.6c-2.8,0-3.6,1.6-6,1.6c-3.2,0-5.4-2.5-6.4-4.5c-1.9-3.5-2.2-6.5-2.2-6.7c0-0.1,0-0.2,0.1-0.2c0.1,0,1.7-0.2,3.3-1.9c0.9-0.8,1.7-2,2.1-3.7c0.1-0.5,0.4-2,0.3-2.1c-0.1-0.1-1.4-1-1.4-3c0-2.1,1.6-3.1,3.3-3.1c1.3,0,1.9,0.6,3.2,0.6c1.3,0,1.7-0.6,3.1-0.6c1.7,0,3.3,1,3.3,3.1c0,1.9-1.2,2.8-1.4,3c-0.1,0.1,0.2,1.6,0.3,2.1c0.4,1.7,1.2,2.9,2.1,3.7c1.7,1.7,3.3,1.9,3.3,1.9c0.1,0,0.2,0.1,0.1,0.2C40,29.4,39.7,32.4,37.8,35.9z"/></svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
