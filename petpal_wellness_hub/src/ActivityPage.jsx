import React, { useState } from "react";
import "./ActivityPage.css";

// DEMO DATA
const demoDailyLog = [
  {
    date: "2024-06-01",
    activities: [
      { type: "Walk", duration: 40, icon: "🐾" },
      { type: "Fetch", duration: 20, icon: "🎾" },
    ],
  },
  {
    date: "2024-06-02",
    activities: [
      { type: "Walk", duration: 30, icon: "🐾" },
      { type: "Training", duration: 15, icon: "🏅" },
    ],
  },
  {
    date: "2024-06-03",
    activities: [
      { type: "Run", duration: 20, icon: "🏃‍♂️" },
    ],
  },
  {
    date: "2024-06-04",
    activities: [
      { type: "Swim", duration: 10, icon: "🏊" },
      { type: "Play", duration: 25, icon: "🧸" },
    ],
  },
  {
    date: "2024-06-05",
    activities: [
      { type: "Walk", duration: 50, icon: "🐾" },
      { type: "Play", duration: 20, icon: "🧸" },
    ],
  },
  {
    date: "2024-06-06",
    activities: [
      { type: "Fetch", duration: 15, icon: "🎾" },
      { type: "Training", duration: 10, icon: "🏅" },
    ],
  },
  {
    date: "2024-06-07",
    activities: [
      { type: "Run", duration: 30, icon: "🏃‍♂️" },
      { type: "Walk", duration: 20, icon: "🐾" },
    ],
  },
];

// Simulated weekly totals (for chart)
const demoWeeklyData = [
  { label: "Mon", total: 60 },
  { label: "Tue", total: 45 },
  { label: "Wed", total: 20 },
  { label: "Thu", total: 35 },
  { label: "Fri", total: 70 },
  { label: "Sat", total: 25 },
  { label: "Sun", total: 50 },
];

// Activity goals
const demoGoals = [
  { type: "Walk", target: 60, actual: 50 }, // in mins
  { type: "Play", target: 30, actual: 25 },
  { type: "Training", target: 20, actual: 15 },
];

// Milestones and badges
const demoMilestones = [
  { title: "First Walk!", icon: "🥇", achieved: true },
  { title: "100km Walked", icon: "🏅", achieved: false },
  { title: "Active Streak 7d", icon: "🔥", achieved: true },
  { title: "Fetch Master", icon: "🎾", achieved: true },
];

// Demo gallery
const demoGallery = [
  { url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400", caption: "After walkies!" },
  { url: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=facearea&w=400&h=400", caption: "Fetch champion" },
];

// Emoji-based mood/energy tracker
const ENERGY_OPTIONS = [
  { emoji: "😴", label: "Tired" },
  { emoji: "😊", label: "Normal" },
  { emoji: "🤩", label: "Energetic" },
];
const MOOD_OPTIONS = [
  { emoji: "🙂", label: "Happy" },
  { emoji: "😕", label: "Moody" },
  { emoji: "😍", label: "Playful" },
];

const ActivityPage = () => {
  // State for tracker toggles
  const [energy, setEnergy] = useState(1); // default "Normal"
  const [mood, setMood] = useState(0); // default "Happy"

  // Gallery upload
  const [gallery, setGallery] = useState(demoGallery);
  const [reminder, setReminder] = useState({ enabled: false, time: "08:00" });

  // PUBLIC_INTERFACE
  // Handles file upload (demo only, won't upload in real)
  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      // For demo, just display a placeholder
      setGallery([
        ...gallery,
        { url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=facearea&w=400&h=400", caption: file.name }
      ]);
    }
  }

  // PUBLIC_INTERFACE
  // Handles reminder toggle
  function handleReminderToggle(e) {
    setReminder({ ...reminder, enabled: e.target.checked });
  }

  // PUBLIC_INTERFACE
  // Handles time set
  function handleReminderTime(e) {
    setReminder({ ...reminder, time: e.target.value });
  }

  return (
    <div className="activity-page container">
      <h1 className="activity-title">🐕 Activity Tracker</h1>
      <div className="activity-content">
        {/* Daily log cards */}
        <section className="daily-log">
          <h2>Daily Activity Log</h2>
          <div className="daily-log-cards">
            {demoDailyLog.map((entry) => (
              <div className="activity-card" key={entry.date}>
                <div className="card-date">{new Date(entry.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</div>
                <div className="card-pill-row">
                  {entry.activities.map((a, i) => (
                    <span className={`activity-pill activity-pill-${a.type.toLowerCase()}`} key={i} title={a.type}>
                      <span className="pill-emoji">{a.icon}</span>
                      <span className="pill-label">{a.type}</span>
                      <span className="pill-duration">{a.duration}m</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly summary chart */}
        <section className="weekly-summary">
          <h2>Weekly Summary</h2>
          <div className="activity-bar-chart">
            {demoWeeklyData.map((d, idx) => (
              <div className="bar-item" key={d.label}>
                <div
                  className="bar"
                  style={{ height: `${d.total}px`, background: "var(--kavia-orange)" }}
                  title={`Total: ${d.total} mins`}
                ></div>
                <div className="bar-label">{d.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Goals and progress */}
        <section className="activity-goals">
          <h2>Activity Goals</h2>
          <div className="goal-bars">
            {demoGoals.map((g) => (
              <div className="goal-bar-row" key={g.type}>
                <span className="goal-label">{g.type}</span>
                <div className="goal-bar-bg">
                  <div
                    className="goal-bar-fg"
                    style={{
                      width: `${Math.min(100, (g.actual / g.target) * 100)}%`,
                      background: `linear-gradient(90deg, var(--kavia-orange), var(--kavia-dark))`
                    }}
                  ></div>
                </div>
                <span className="goal-val">{g.actual} / {g.target}m</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mood/Energy emoji toggles */}
        <section className="energy-mood-tracker">
          <h2>Today's Energy & Mood</h2>
          <div className="tracker-row">
            <span className="tracker-label">Energy:</span>
            {ENERGY_OPTIONS.map((opt, i) => (
              <button
                className={`emoji-btn${energy === i ? " active" : ""}`}
                key={opt.label}
                onClick={() => setEnergy(i)}
                aria-label={opt.label}
              >
                {opt.emoji}
              </button>
            ))}
            <span className="tracker-result">{ENERGY_OPTIONS[energy].label}</span>
          </div>
          <div className="tracker-row">
            <span className="tracker-label">Mood:</span>
            {MOOD_OPTIONS.map((opt, i) => (
              <button
                className={`emoji-btn${mood === i ? " active" : ""}`}
                key={opt.label}
                onClick={() => setMood(i)}
                aria-label={opt.label}
              >
                {opt.emoji}
              </button>
            ))}
            <span className="tracker-result">{MOOD_OPTIONS[mood].label}</span>
          </div>
        </section>

        {/* Milestones/Badges */}
        <section className="milestones-section">
          <h2>Milestones & Badges</h2>
          <div className="milestone-list">
            {demoMilestones.map((m, idx) => (
              <div className={`milestone ${m.achieved ? "achieved" : "locked"}`} key={m.title}>
                <span className="milestone-icon">{m.icon}</span>
                <span className="milestone-title">{m.title}</span>
                <span className="milestone-status">{m.achieved ? "Unlocked" : "Locked"}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery upload */}
        <section className="activity-gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {gallery.map((img, idx) => (
              <div className="gallery-item" key={idx}>
                <img src={img.url} alt={img.caption || "Activity"} />
                <div className="gallery-caption">{img.caption}</div>
              </div>
            ))}
            {/* Upload add button */}
            <label className="gallery-add">
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
              <div className="gallery-add-btn" title="Upload a photo">+</div>
            </label>
          </div>
        </section>

        {/* Reminders setup */}
        <section className="reminders-section">
          <h2>Set a Reminder</h2>
          <div className="reminder-form">
            <label>
              <input
                type="checkbox"
                checked={reminder.enabled}
                onChange={handleReminderToggle}
              />{" "}
              Enable daily reminder
            </label>
            {reminder.enabled && (
              <span>
                at{" "}
                <input
                  type="time"
                  value={reminder.time}
                  onChange={handleReminderTime}
                  className="reminder-time"
                />
              </span>
            )}
            {reminder.enabled ? (
              <span className="reminder-success">
                <span role="img" aria-label="bell">🔔</span> Reminder set for {reminder.time}
              </span>
            ) : (
              <span className="reminder-note">
                You won't receive reminder notifications.
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ActivityPage;
