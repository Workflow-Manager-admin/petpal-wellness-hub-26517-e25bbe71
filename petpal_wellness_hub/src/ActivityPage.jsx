import React, { useState, useRef } from "react";
import "./ActivityPage.css";
import { useParams } from "react-router-dom";

// Ensure FontAwesome is loaded for icons if navigating directly
(function ensureFA() {
  if (!document.getElementById("fa-cdn")) {
    const fa = document.createElement("link");
    fa.id = "fa-cdn";
    fa.rel = "stylesheet";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(fa);
  }
})();

// DEMO DATA
const demoLog = [
  { time: "7:30 AM", type: "Walk", duration: 40, calories: 122, note: "Very playful", icon: "fa-person-walking", energy: 4, behavior: "Happy" },
  { time: "12:10 PM", type: "Fetch/Play", duration: 23, calories: 95, note: "Great fetch", icon: "fa-baseball-ball", energy: 5, behavior: "Excited" },
  { time: "6:00 PM", type: "Training", duration: 11, calories: 30, note: "Practiced sitting", icon: "fa-dog", energy: 3, behavior: "Focused" },
  { time: "8:00 PM", type: "Cuddle", duration: 20, calories: 10, note: "Chilled on couch", icon: "fa-heart", energy: 1, behavior: "Calm" },
];
const demoGoals = {
  activeMinutes: 60,
  activeTarget: 90,
  steps: 8400,
  stepGoal: 10000,
  calories: 260,
  calGoal: 400,
  streak: 4,
};
const demoWeek = [
  { date: "Mon", walk: 45, play: 20, train: 14, calories: 135 },
  { date: "Tue", walk: 65, play: 25, train: 8, calories: 153 },
  { date: "Wed", walk: 27, play: 23, train: 12, calories: 101 },
  { date: "Thu", walk: 61, play: 28, train: 0, calories: 176 },
  { date: "Fri", walk: 56, play: 19, train: 15, calories: 144 },
  { date: "Sat", walk: 91, play: 35, train: 10, calories: 189 },
  { date: "Sun", walk: 32, play: 17, train: 13, calories: 111 },
];
const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "🥱", label: "Calm" },
  { emoji: "😬", label: "Anxious" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤪", label: "Excited" }
];
const demoMilestones = [
  { label: "100 Walks", icon: "fa-person-walking", achieved: true },
  { label: "7 Day Streak", icon: "fa-fire", achieved: true },
  { label: "First Fetch", icon: "fa-baseball-ball", achieved: true },
  { label: "200 Active Hours", icon: "fa-stopwatch", achieved: false },
  { label: "5K Steps in Day", icon: "fa-shoe-prints", achieved: false },
];
const demoPhotos = [
  { url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=320&q=80", date: "2024-06-10", tag: "Walk" },
  { url: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=facearea&w=320&q=80", date: "2024-06-08", tag: "Training" },
  { url: "https://images.unsplash.com/photo-1518715308788-c1f21b14c97a?auto=format&fit=facearea&w=320&q=80", date: "2024-06-06", tag: "Play" },
];
const demoReminders = [
  { label: "Evening walk", enabled: true, icon: "fa-person-walking" },
  { label: "Energy check-in", enabled: false, icon: "fa-bolt" },
  { label: "Photo upload", enabled: true, icon: "fa-camera" },
];

// Helper for card color
function typeColor(type) {
  switch(type) {
    case "Walk": return "activity-card walk";
    case "Fetch/Play": return "activity-card play";
    case "Training": return "activity-card train";
    case "Cuddle": return "activity-card cuddle";
    default: return "activity-card";
  }
}

// Simple bar chart SVG (demo only, not responsive/real)
function weekBarChart(week) {
  const max =
    Math.max(...week.map((d) => d.walk + d.play + d.train)) || 1;
  // Colors by activity
  const colors = { walk: "#4E8D7C", play: "#9FA8DA", train: "#F7C873" };
  return (
    <svg viewBox="0 0 210 45" width="100%" height="45" className="ap-weekchart-svg" aria-label="Weekly Activity Bar Chart">
      {week.map((w, i) => {
        let y = 40, bars = [], hSum = 0;
        let walkH = ((w.walk || 0)/max) * 35, playH = ((w.play||0)/max) * 35, trainH = ((w.train||0)/max) * 35;
        // Draw stacked bars (bottom-up)
        bars.push(
          <rect
            key={"walk"+i}
            x={10+i*28}
            y={y - walkH}
            width="14"
            height={walkH}
            rx="2"
            fill={colors.walk}
            opacity="0.93"
          />
        );
        hSum += walkH;
        bars.push(
          <rect
            key={"play"+i}
            x={10+i*28}
            y={y - hSum - playH}
            width="14"
            height={playH}
            rx="2"
            fill={colors.play}
            opacity="0.82"
          />
        );
        hSum += playH;
        bars.push(
          <rect
            key={"train"+i}
            x={10+i*28}
            y={y - hSum - trainH}
            width="14"
            height={trainH}
            rx="2"
            fill={colors.train}
            opacity="0.82"
          />
        );
        return (
          <g key={w.date}>
            {bars}
            <text x={16+i*28} y={44} textAnchor="middle" fontSize="7" fill="#999">{w.date}</text>
          </g>
        );
      })}
    </svg>
  );
}

// PUBLIC_INTERFACE
function ActivityPage() {
  const [energy, setEnergy] = useState(demoLog[0].energy);
  const [behavior, setBehavior] = useState(demoLog[0].behavior);
  const [mood, setMood] = useState(moods[0].label);
  const [notes, setNotes] = useState("");
  const [milestones, setMilestones] = useState(demoMilestones);
  const [photos, setPhotos] = useState(demoPhotos);
  const [reminders, setReminders] = useState(demoReminders);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  const fileRef = useRef();

  // Handlers
  function handleToggleReminder(idx) {
    setReminders((r) =>
      r.map((rem, i) => (i === idx ? { ...rem, enabled: !rem.enabled } : rem))
    );
  }
  function handleMilestoneClick(idx) {
    if (!milestones[idx].achieved) {
      setMilestones(ms =>
        ms.map((m, i) => (i === idx ? { ...m, achieved: true } : m))
      );
    }
  }
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotos(prev => [
      ...prev,
      {
        url: URL.createObjectURL(file),
        date: new Date().toISOString().slice(0, 10),
        tag: "Other"
      }
    ]);
  }

  // Photo filtering logic
  const gallery = selectedTag === "All" ? photos : photos.filter(p => p.tag === selectedTag);

  return (
    <div className="ap-page" role="main" aria-label="Activity Tracker">
      {/* HEADER */}
      <header className="ap-header">
        <div className="ap-header-title">
          <i className="fa fa-regular fa-futbol" aria-hidden="true" />
          Activity & Progress Tracker
        </div>
        <div className="ap-header-desc">
          Log your pet's daily adventures, see weekly summaries, track goals, and celebrate new milestones!
        </div>
      </header>

      <div className="ap-main-grid">
        {/* LEFT COLUMN: Daily Log & Weekly Graph */}
        <section className="ap-main-stack">
          {/* DAILY LOG */}
          <div className="ap-card" aria-label="Daily Activity Log">
            <div className="ap-card-title">
              <i className="fa fa-list-check"></i> Today’s Activities
            </div>
            <ul className="ap-daily-list">
              {demoLog.map((a, i) => (
                <li key={a.time+i} className={typeColor(a.type)}>
                  <div className="ap-log-meta">
                    <i className={`fa ${a.icon} ap-log-icon`}></i>
                    <span className="ap-log-type">{a.type}</span>
                    <span className="ap-log-time">{a.time}</span>
                  </div>
                  <div className="ap-log-detail">
                    <span className="ap-log-dur"><i className="fa fa-clock"></i> {a.duration} min</span>
                    <span className="ap-log-cal"><i className="fa fa-fire"></i> {a.calories} kcal</span>
                    <span className="ap-log-note" title={a.note}><i className="fa fa-sticky-note"></i> {a.note}</span>
                  </div>
                  {/* Energy/Behavior pill */}
                  <span className={"ap-energy-pill ap-e" + a.energy}>
                    <i className="fa fa-bolt"></i> {a.energy}
                  </span>
                  <span className="ap-behavior-pill">
                    <i className="fa fa-smile"></i> {a.behavior}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* WEEKLY SUMMARY */}
          <div className="ap-card ap-week-summary" aria-label="Weekly Summary">
            <div className="ap-card-title">
              <i className="fa fa-chart-line"></i> Week Summary
            </div>
            <div className="ap-weekchart-labels">
              <span><i className="fa fa-person-walking" style={{color:"#4E8D7C"}} /> Walk</span>
              <span><i className="fa fa-baseball-ball" style={{color:"#9FA8DA"}} /> Play</span>
              <span><i className="fa fa-graduation-cap" style={{color:"#F7C873"}} /> Training</span>
            </div>
            <div className="ap-weekchart">{weekBarChart(demoWeek)}</div>
            <div className="ap-weekchart-foot">
              <span title="Total calories/active day">
                <i className="fa fa-fire"></i> Max: {Math.max(...demoWeek.map(w=>w.calories))} kcal /day
              </span>
              <span>
                <i className="fa fa-calendar-day"></i>{" "}
                {demoWeek.length} days logged
              </span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Goals/Trackers/Gallery/Milestones/Reminders */}
        <section className="ap-side-stack">
          {/* GOALS & PROGRESS */}
          <div className="ap-card ap-goals-card" aria-label="Activity Goals & Progress">
            <div className="ap-card-title">
              <i className="fa fa-bullseye"></i> Goals &amp; Progress
            </div>
            <div className="ap-goal-row">
              <span>
                <i className="fa fa-shoe-prints"></i> Steps
              </span>
              <div className="ap-progress-bar">
                <div
                  className="ap-progress-inner steps"
                  style={{
                    width: (demoGoals.steps / demoGoals.stepGoal) * 100 + "%",
                  }}
                ></div>
              </div>
              <span>
                {demoGoals.steps} / {demoGoals.stepGoal}
              </span>
            </div>
            <div className="ap-goal-row">
              <span>
                <i className="fa fa-stopwatch"></i> Active Min
              </span>
              <div className="ap-progress-bar">
                <div
                  className="ap-progress-inner mins"
                  style={{
                    width: (demoGoals.activeMinutes / demoGoals.activeTarget) * 100 + "%",
                  }}
                ></div>
              </div>
              <span>
                {demoGoals.activeMinutes} / {demoGoals.activeTarget}
              </span>
            </div>
            <div className="ap-goal-row">
              <span>
                <i className="fa fa-fire"></i> Calories
              </span>
              <div className="ap-progress-bar">
                <div
                  className="ap-progress-inner cals"
                  style={{
                    width: (demoGoals.calories / demoGoals.calGoal) * 100 + "%",
                  }}
                ></div>
              </div>
              <span>
                {demoGoals.calories} / {demoGoals.calGoal}
              </span>
            </div>
            <div className="ap-streak-box">
              <span className="ap-streak-icon">
                <i className="fa fa-fire"></i>
              </span>
              <span>
                {demoGoals.streak} day streak!
              </span>
            </div>
          </div>
          {/* ENERGY/BEHAVIOR TRACKER */}
          <div className="ap-card ap-tracker-card" aria-label="Energy & Behavior Tracker">
            <div className="ap-card-title">
              <i className="fa fa-bolt"></i> Energy &amp; Mood
            </div>
            <div className="ap-tracker-row">
              <label className="ap-tracker-label" htmlFor="ap-energy-level">
                Energy:
              </label>
              <input
                id="ap-energy-level"
                type="range"
                min="1"
                max="5"
                value={energy}
                onChange={e => setEnergy(Number(e.target.value))}
                className="ap-energy-range"
              />
              <span className={"ap-energy-pill ap-e" + energy}>
                <i className="fa fa-bolt"></i> {energy}
              </span>
            </div>
            <div className="ap-tracker-row">
              <label className="ap-tracker-label" htmlFor="ap-behavior">
                Mood:
              </label>
              <div className="ap-mood-emojis" id="ap-behavior" role="radiogroup" aria-label="Mood selection">
                {moods.map(m =>
                  <button
                    key={m.label}
                    type="button"
                    className={"ap-mood-btn" + (mood === m.label ? " active" : "")}
                    aria-pressed={mood === m.label}
                    onClick={() => setMood(m.label)}
                  >
                    <span role="img" aria-label={m.label}>{m.emoji}</span>
                  </button>
                )}
              </div>
            </div>
            <textarea
              className="ap-tracker-notes"
              value={notes}
              placeholder="Add remarks about today's energy, mood, or behavior…"
              onChange={e => setNotes(e.target.value)}
              rows={2}
              aria-label="Behavior notes"
              maxLength={120}
              style={{marginTop:'13px'}}
            />
          </div>
          {/* MILESTONES */}
          <div className="ap-card ap-milestones-card" aria-label="Milestones & Achievements">
            <div className="ap-card-title">
              <i className="fa fa-trophy"></i> Milestones
            </div>
            <div className="ap-milestone-list">
              {milestones.map((m, i) =>
                <button
                  key={m.label}
                  className={"ap-milestone" + (m.achieved ? " achieved" : "")}
                  onClick={() => handleMilestoneClick(i)}
                  disabled={m.achieved}
                  tabIndex={0}
                  aria-pressed={m.achieved}
                  title={m.achieved ? "Achieved" : "Click to mark as achieved"}
                >
                  <span className="ap-milestone-icon">
                    <i className={`fa ${m.icon}`}></i>
                  </span>
                  {m.label}
                  {m.achieved && <span className="ap-milestone-badge"><i className="fa fa-check-circle"></i></span>}
                </button>
              )}
            </div>
          </div>
          {/* PHOTO/VIDEO UPLOADS */}
          <div className="ap-card ap-gallery-card" aria-label="Activity Photos & Videos">
            <div className="ap-card-title-row">
              <span className="ap-card-title"><i className="fa fa-camera-retro"></i> Photos</span>
              <label className="ap-gallery-upload-btn" aria-label="Upload photo">
                <i className="fa fa-upload"></i>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileRef}
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
            <div className="ap-gallery-tags">
              <button className={selectedTag==="All" ? "active" : ""} onClick={()=>setSelectedTag("All")}>All</button>
              {["Walk","Training","Play","Other"].map(tag =>
                <button key={tag} className={selectedTag===tag ? "active" : ""} onClick={()=>setSelectedTag(tag)}>{tag}</button>
              )}
            </div>
            <div className="ap-gallery-list">
              {gallery.map((p, idx) =>
                <div className="ap-gallery-photo" key={idx}>
                  <img src={p.url} alt={p.tag+" "+p.date} loading="lazy" />
                  <div className="ap-gallery-meta">
                    <span className="ap-gallery-tag">{p.tag}</span>
                    <span className="ap-gallery-date">{p.date}</span>
                  </div>
                </div>
              )}
              {gallery.length === 0 && <span className="ap-gallery-empty">No photos for this tag.</span>}
            </div>
          </div>
          {/* REMINDERS & ALERTS */}
          <div className="ap-card ap-reminders-card" aria-label="Reminders & Alerts">
            <div className="ap-card-title">
              <i className="fa fa-bell"></i> Reminders
              <button
                className="ap-reminder-toggle"
                onClick={() => setReminderOpen(o => !o)}
                aria-label={reminderOpen ? "Hide reminders" : "Show reminders"}
              >
                <i className={`fa fa-chevron-${reminderOpen ? "up" : "down"}`}></i>
              </button>
            </div>
            {reminderOpen &&
              <ul className="ap-reminder-list">
                {reminders.map((r, i) =>
                <li key={r.label} className="ap-reminder-row">
                  <span className="ap-reminder-ic"><i className={`fa ${r.icon}`}></i></span>
                  <span>{r.label}</span>
                  <label className="ap-switch">
                    <input
                      type="checkbox"
                      checked={r.enabled}
                      onChange={() => handleToggleReminder(i)}
                    />
                    <span className="ap-slider"></span>
                  </label>
                </li>
                )}
              </ul>}
            {!reminderOpen && (
              <span className="ap-reminder-status">
                {reminders.filter(r=>r.enabled).length} active, {reminders.length-reminders.filter(r=>r.enabled).length} off
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
export default ActivityPage;
