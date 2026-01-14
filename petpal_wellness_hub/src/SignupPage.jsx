import React, { useState } from "react";
import "./SignupPage.css";
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

export default function SignupPage() {
  const navigate = useNavigate();

  // State
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  // Validation
  function validate(current = form) {
    const errors = {};
    if (!current.username || current.username.trim() === "")
      errors.username = "Username is required.";
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(current.username))
      errors.username = "Alphanumeric, 3-20 chars.";

    if (!current.email)
      errors.email = "Email is required.";
    else if (!/^[\w\-.]+@[\w\-]+\.[a-zA-Z]{2,}$/.test(current.email.trim()))
      errors.email = "Must be a valid email.";

    if (!current.password)
      errors.password = "Password required.";
    else if (current.password.length < 6)
      errors.password = "Min 6 characters.";

    if (!current.confirm)
      errors.confirm = "Confirm your password.";
    else if (current.password !== current.confirm)
      errors.confirm = "Passwords do not match.";

    if (!current.agree)
      errors.agree = "Consent required.";
    return errors;
  }

  // Real-time validation effect
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm((f) => ({
      ...f,
      [name]: val
    }));
    setTouched((t) => ({ ...t, [name]: true }));
    setError((prev) => ({ ...prev, ...validate({ ...form, [name]: val }) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setError(errs);
    setTouched({
      username: true, email: true, password: true, confirm: true, agree: true
    });
    if (Object.keys(errs).length === 0) {
      // Registration logic goes here
      navigate("/");
    }
  }

  return (
    <div className="signup-root">
      <div className="signup-card">
        <section className="signup-illustration" aria-hidden="true">
          {/* Pet-friendly illustration (reclining pet & ball SVG) */}
          <svg width="170" height="125" viewBox="0 0 170 125" fill="none" className="pet-svg" aria-hidden="true">
            {/* Tail */}
            <ellipse cx="22" cy="110" rx="15" ry="6" fill="#e87a41" />
            {/* Body */}
            <ellipse cx="85" cy="95" rx="60" ry="26" fill="#f7c873" />
            {/* Back paw */}
            <ellipse cx="131" cy="114" rx="11" ry="7" fill="#f26b6b" />
            {/* Head */}
            <ellipse cx="65" cy="73" rx="19" ry="17" fill="#fff" stroke="#e87a41" strokeWidth="3"/>
            {/* Ears */}
            <ellipse cx="56" cy="62" rx="6" ry="9" fill="#4e8d7c" />
            <ellipse cx="73" cy="60" rx="7" ry="8" fill="#4e8d7c" />
            {/* Eyes */}
            <ellipse cx="58" cy="76" rx="2.4" ry="3.2" fill="#4e8d7c"/>
            <ellipse cx="73" cy="78" rx="2.4" ry="3.2" fill="#4e8d7c"/>
            {/* Nose */}
            <ellipse cx="66" cy="84" rx="1.3" ry="1" fill="#e87a41"/>
            {/* Smile */}
            <path d="M63 87 Q66 89 69 87" stroke="#e87a41" strokeWidth="2" fill="none"/>
            {/* Tennis ball */}
            <ellipse cx="148" cy="113" rx="8" ry="8" fill="#fff" stroke="#4e8d7c" strokeWidth="1.8"/>
            <path d="M143 113a5 5 0 0 0 10 0" stroke="#f7c873" strokeWidth="1" fill="none"/>
          </svg>
        </section>
        <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-brand">FurEverCare Portal</p>
          <div className="form-group">
            <label htmlFor="signup-username" className="required">Username</label>
            <div className="form-input-with-icon">
              <input
                type="text"
                id="signup-username"
                name="username"
                autoComplete="username"
                placeholder="Choose a username"
                value={form.username}
                aria-invalid={!!(touched.username && error.username)}
                aria-describedby={touched.username && error.username ? "signup-username-err" : undefined}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                required
              />
              <span className="input-icon" aria-hidden="true">
                {/* user icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5" stroke="#4E8D7C" strokeWidth="2"/><path d="M4 20c0-4 3-6.7 8-6.7 5 0 8 2.7 8 6.7" stroke="#F26B6B" strokeWidth="1.9"/></svg>
              </span>
            </div>
            {touched.username && error.username && (
              <div className="form-error" id="signup-username-err">{error.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="signup-email" className="required">Email</label>
            <div className="form-input-with-icon">
              <input
                type="email"
                id="signup-email"
                name="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={form.email}
                aria-invalid={!!(touched.email && error.email)}
                aria-describedby={touched.email && error.email ? "signup-email-err" : undefined}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                required
              />
              <span className="input-icon" aria-hidden="true">
                {/* envelope */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke="#4e8d7c" strokeWidth="2"/><path d="M4 7l8 6 8-6" stroke="#F26B6B" strokeWidth="2"/></svg>
              </span>
            </div>
            {touched.email && error.email && (
              <div className="form-error" id="signup-email-err">{error.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="signup-password" className="required">Password</label>
            <div className="form-input-with-icon">
              <input
                type={showPwd ? "text" : "password"}
                id="signup-password"
                name="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                aria-invalid={!!(touched.password && error.password)}
                aria-describedby={touched.password && error.password ? "signup-pwd-err" : undefined}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                required
              />
              <button
                type="button"
                className="eye-btn"
                aria-label={showPwd ? "Hide password" : "Show password"}
                onClick={() => setShowPwd((s) => !s)}
                tabIndex={0}
              ><EyeIcon visible={showPwd} /></button>
              <span className="input-icon" aria-hidden="true" style={{ right: 40, left: "unset" }}>
                {/* lock icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 22 22"><rect x="4" y="8" width="14" height="10" rx="2" stroke="#4e8d7c" strokeWidth="2"/><path d="M8 8V6a3 3 0 116 0v2" stroke="#F26B6B" strokeWidth="2"/></svg>
              </span>
            </div>
            {touched.password && error.password && (
              <div className="form-error" id="signup-pwd-err">{error.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="signup-confirm" className="required">Confirm Password</label>
            <div className="form-input-with-icon">
              <input
                type={showConfPwd ? "text" : "password"}
                id="signup-confirm"
                name="confirm"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirm}
                aria-invalid={!!(touched.confirm && error.confirm)}
                aria-describedby={touched.confirm && error.confirm ? "signup-confirm-err" : undefined}
                onChange={handleChange}
                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                required
              />
              <button
                type="button"
                className="eye-btn"
                aria-label={showConfPwd ? "Hide password" : "Show password"}
                onClick={() => setShowConfPwd((s) => !s)}
                tabIndex={0}
              ><EyeIcon visible={showConfPwd} /></button>
              <span className="input-icon" aria-hidden="true" style={{ right: 40, left: "unset" }}>
                {/* lock icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 22 22"><rect x="4" y="8" width="14" height="10" rx="2" stroke="#4e8d7c" strokeWidth="2"/><path d="M8 8V6a3 3 0 116 0v2" stroke="#F26B6B" strokeWidth="2"/></svg>
              </span>
            </div>
            {touched.confirm && error.confirm && (
              <div className="form-error" id="signup-confirm-err">{error.confirm}</div>
            )}
          </div>
          <div className="signup-row">
            <label className="consent-label">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                aria-invalid={!!(touched.agree && error.agree)}
                aria-describedby={touched.agree && error.agree ? "signup-agree-err" : undefined}
                required
              />
              <span>
                I agree to the
                <a href="#" target="_blank" rel="noopener noreferrer" className="terms-link"> Terms of Service </a>
                and
                <a href="#" target="_blank" rel="noopener noreferrer" className="terms-link"> Privacy Policy</a>.
              </span>
              <span className="consent-info-icon"><InfoIcon /></span>
            </label>
          </div>
          {touched.agree && error.agree && (
            <div className="form-error" id="signup-agree-err">{error.agree}</div>
          )}
          <button
            type="submit"
            className="signup-btn gradient-animated"
            aria-label="Create Account"
          >
            <span className="signup-btn-label">Sign Up</span>
          </button>
          <div className="login-redirect">
            <span>Already a member?</span>
            <Link to="/login" className="login-link">Log In</Link>
          </div>
          <div className="social-signup-row" aria-hidden="true">
            <span className="social-placeholder-label">Or sign up with</span>
            <div className="social-icons">
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
