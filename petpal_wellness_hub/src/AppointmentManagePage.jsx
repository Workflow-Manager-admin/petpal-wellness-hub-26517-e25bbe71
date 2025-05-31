import React, { useState } from "react";
import "./AppointmentManagePage.css";

// Sample placeholder data for demonstration
const sampleAppointments = [
  {
    id: 1,
    date: "2024-06-18",
    time: "10:30 AM",
    type: "Checkup",
    vet: "Dr. Smith",
    pet: "Milo",
    status: "Upcoming",
  },
  {
    id: 2,
    date: "2024-06-15",
    time: "1:00 PM",
    type: "Vaccination",
    vet: "Dr. Patel",
    pet: "Bella",
    status: "Completed",
  },
  {
    id: 3,
    date: "2024-06-20",
    time: "9:00 AM",
    type: "Dental",
    vet: "Dr. Lee",
    pet: "Luna",
    status: "Upcoming",
  },
];

// Hard-coded mini-calendar dots for demonstration
const calendarData = {
  "2024-06-15": [{ type: "Vaccine", color: "var(--pastel-yellow)" }],
  "2024-06-18": [{ type: "Checkup", color: "var(--pastel-blue)" }],
  "2024-06-20": [{ type: "Dental", color: "var(--pastel-green)" }],
};

// Sample uploaded documents
const sampleDocs = [
  { name: "Xray-Bella.pdf", date: "2023-11-02", url: "#" },
  { name: "Vaccine-Card.pdf", date: "2024-01-21", url: "#" },
];

// Helper for pastel icon JSX
function PastelIcon({ type, ariaLabel }) {
  // Pick icon and color
  let fa = "fa-calendar-days";
  let colorVar = "--pastel-blue";
  switch (type) {
    case "Checkup":
      fa = "fa-stethoscope";
      colorVar = "--pastel-blue";
      break;
    case "Vaccine":
      fa = "fa-syringe";
      colorVar = "--pastel-yellow";
      break;
    case "Dental":
      fa = "fa-tooth";
      colorVar = "--pastel-green";
      break;
    case "Missed":
      fa = "fa-exclamation-circle";
      colorVar = "--pastel-red";
      break;
    case "Completed":
      fa = "fa-check-circle";
      colorVar = "--pastel-purple";
      break;
    default:
      break;
  }
  return (
    <span
      className="amp-pastel-icon"
      style={{ background: `var(${colorVar})` }}
      aria-label={ariaLabel}
      role="img"
    >
      <i className={`fa-solid ${fa}`} aria-hidden="true"></i>
    </span>
  );
}

// PUBLIC_INTERFACE
function AppointmentManagePage() {
  // --- State for multi-step booking modal ---
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    pet: "",
    type: "",
    vet: "",
    date: "",
    time: "",
    notes: "",
  });
  const [formMsg, setFormMsg] = useState("");
  // --- State for calendar view ---
  const [calendarView, setCalendarView] = useState("month");
  const [calendarMonth, setCalendarMonth] = useState(5); // June is 5 (0-based)
  const calendarYear = 2024;
  // --- State for reminders ---
  const [reminders, setReminders] = useState({ sms: true, email: true });
  // --- State for document upload ---
  const [uploadedFiles, setUploadedFiles] = useState(sampleDocs);
  // --- State for history filter ---
  const [historyFilter, setHistoryFilter] = useState("All");

  // --- Handler methods ---
  const handleBookingNext = () => {
    // Simple validation
    if (bookingStep === 1 && !bookingForm.pet) {
      setFormMsg("Please select a pet.");
      return;
    }
    if (bookingStep === 2 && (!bookingForm.type || !bookingForm.date || !bookingForm.time)) {
      setFormMsg("Please select type, date, and time.");
      return;
    }
    setBookingStep(bookingStep + 1);
    setFormMsg("");
  };
  const handleBookingBack = () => {
    setBookingStep(Math.max(1, bookingStep - 1));
    setFormMsg("");
  };
  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowBooking(false);
    setBookingStep(1);
    setFormMsg("");
    // Here, add booking to state/server
    alert("Appointment booked! (Simulated)");
  };
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.map((file) => ({
      name: file.name,
      date: new Date().toISOString().slice(0, 10),
      url: "#",
    }));
    setUploadedFiles([...uploadedFiles, ...newDocs]);
  };
  const handleReminderToggle = (type) => {
    setReminders((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const handleCalendarViewChange = (v) => setCalendarView(v);

  // --- Helper for calendar grid ---
  function renderCalendarGrid() {
    // Assume June 2024: 30 days, Sat 1st
    // Simplified, for demo purposes
    const daysInMonth = 30;
    const startDay = 6; // Sat
    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="amp-calendar-cell empty"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `2024-06-${d.toString().padStart(2, "0")}`;
      const dots = (calendarData[dateStr] || []).map((c, idx) => (
        <span
          className="amp-calendar-dot"
          style={{ background: c.color }}
          title={c.type}
          key={idx}
        ></span>
      ));
      days.push(
        <div className="amp-calendar-cell" tabIndex={0} aria-label={`Day ${d}`}>
          <span className="amp-calendar-daynum">{d}</span>
          <span className="amp-calendar-dotrow">{dots}</span>
        </div>
      );
    }
    return days;
  }

  // --- Appointment history filtering ---
  function filterHistory(list) {
    if (historyFilter === "All") return list;
    return list.filter((a) => a.status === historyFilter);
  }

  return (
    <div className="amp-root">
      <section className="amp-section-header">
        <h1 className="amp-title">
          <PastelIcon type="Checkup" ariaLabel="Appointments" />
          Appointment Management
        </h1>
        <p className="amp-description">
          Track, schedule, and manage all your pets' appointments in one place.
        </p>
        <button className="amp-btn amp-btn-gradient" onClick={() => setShowBooking(true)}>
          <i className="fa-solid fa-calendar-plus" aria-hidden="true"></i> Book New Appointment
        </button>
      </section>

      {/* Upcoming Appointments */}
      <section className="amp-section">
        <h2 className="amp-section-title">
          Upcoming Appointments
          <span className="amp-section-addon">({sampleAppointments.filter(a => a.status === "Upcoming").length})</span>
        </h2>
        <div className="amp-cards-row">
          {sampleAppointments
            .filter((a) => a.status === "Upcoming")
            .map((a) => (
              <div className="amp-soft-card amp-appointment-card" key={a.id}>
                <PastelIcon type={a.type} ariaLabel={a.type} />
                <div>
                  <div className="amp-apt-row-main">
                    <span className="amp-apt-pet">{a.pet}</span>
                    <span className="amp-apt-type">{a.type}</span>
                  </div>
                  <div className="amp-apt-info">
                    <span>
                      <i className="fa-regular fa-clock"></i>
                      {a.date}, {a.time}
                    </span>
                    <span>
                      <i className="fa-solid fa-user-md"></i>
                      {a.vet}
                    </span>
                  </div>
                  <span className={`amp-status-badge amp-status-${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                  <div className="amp-card-actions">
                    <button className="amp-btn-link" title="View Details" aria-label="View Appointment Details">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button className="amp-btn-link" title="Reschedule" aria-label="Reschedule Appointment">
                      <i className="fa-solid fa-calendar-edit"></i>
                    </button>
                    <button className="amp-btn-link" title="Cancel" aria-label="Cancel Appointment">
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Calendar View */}
      <section className="amp-section amp-section-calendar">
        <div className="amp-calendar-controls">
          <h2 className="amp-section-title">
            <PastelIcon type="Vaccine" ariaLabel="Calendar" /> Calendar
          </h2>
          <div className="amp-calendar-toggles">
            <button
              className={`amp-calendar-toggle${calendarView === "month" ? " active" : ""}`}
              onClick={() => handleCalendarViewChange("month")}
              aria-pressed={calendarView === "month"}
            >
              Month
            </button>
            <button
              className={`amp-calendar-toggle${calendarView === "week" ? " active" : ""}`}
              onClick={() => handleCalendarViewChange("week")}
              aria-pressed={calendarView === "week"}
            >
              Week
            </button>
          </div>
          {/* Demo filter */}
          <div className="amp-calendar-filters">
            <label>
              <input type="checkbox" defaultChecked /> Show Checkups
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Show Vaccines
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Show Dental
            </label>
          </div>
        </div>
        <div className="amp-calendar-grid" role="grid" aria-label="Appointments Calendar">
          {renderCalendarGrid()}
        </div>
        <div className="amp-calendar-legend">
          <span><span className="amp-legend-dot" style={{ background: "var(--pastel-blue)" }}></span>Checkup</span>
          <span><span className="amp-legend-dot" style={{ background: "var(--pastel-yellow)" }}></span>Vaccine</span>
          <span><span className="amp-legend-dot" style={{ background: "var(--pastel-green)" }}></span>Dental</span>
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <div className="amp-modal-bg" onClick={() => setShowBooking(false)} role="dialog" aria-modal="true">
          <div className="amp-modal" onClick={(e) => e.stopPropagation()}>
            <form className="amp-booking-form" onSubmit={handleBookingSubmit}>
              <h2>Book Appointment</h2>
              {bookingStep === 1 && (
                <>
                  <label htmlFor="amp-booking-pet">Select Pet</label>
                  <select
                    id="amp-booking-pet"
                    name="pet"
                    value={bookingForm.pet}
                    onChange={handleBookingChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="Milo">Milo</option>
                    <option value="Bella">Bella</option>
                    <option value="Luna">Luna</option>
                  </select>
                  <button
                    className="amp-btn amp-btn-gradient"
                    type="button"
                    onClick={handleBookingNext}
                  >
                    Next
                  </button>
                </>
              )}
              {bookingStep === 2 && (
                <>
                  <label htmlFor="amp-booking-type">Type</label>
                  <select
                    id="amp-booking-type"
                    name="type"
                    value={bookingForm.type}
                    onChange={handleBookingChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="Checkup">Checkup</option>
                    <option value="Vaccine">Vaccine</option>
                    <option value="Dental">Dental</option>
                  </select>
                  <label htmlFor="amp-booking-date">Date</label>
                  <input
                    id="amp-booking-date"
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                    min="2024-06-01"
                    max="2024-12-31"
                    required
                  />
                  <label htmlFor="amp-booking-time">Time</label>
                  <input
                    id="amp-booking-time"
                    type="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={handleBookingChange}
                    required
                  />
                  <div className="amp-booking-nav">
                    <button type="button" className="amp-btn" onClick={handleBookingBack}>Back</button>
                    <button className="amp-btn amp-btn-gradient" type="button" onClick={handleBookingNext}>Next</button>
                  </div>
                </>
              )}
              {bookingStep === 3 && (
                <>
                  <label htmlFor="amp-booking-notes">Notes (optional)</label>
                  <textarea
                    id="amp-booking-notes"
                    name="notes"
                    value={bookingForm.notes}
                    onChange={handleBookingChange}
                    rows={2}
                    placeholder="Add notes or instructions for the vet (optional)"
                  />
                  <div className="amp-booking-nav">
                    <button type="button" className="amp-btn" onClick={handleBookingBack}>Back</button>
                    <button className="amp-btn amp-btn-gradient" type="submit">Confirm Booking</button>
                  </div>
                </>
              )}
              {formMsg && <div className="amp-form-msg">{formMsg}</div>}
              <button className="amp-btn-link amp-modal-close" onClick={() => setShowBooking(false)} type="button" aria-label="Close">&times;</button>
            </form>
          </div>
        </div>
      )}

      {/* Appointment History */}
      <section className="amp-section">
        <h2 className="amp-section-title">Appointment History</h2>
        <div className="amp-history-controls">
          <label>
            Filter:
            <select
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
              aria-label="Filter appointment history"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>
          </label>
        </div>
        <div className="amp-history-list">
          {filterHistory(sampleAppointments)
            .filter((a) => a.status !== "Upcoming")
            .map((a) => (
              <div className="amp-soft-card amp-history-card" key={a.id}>
                <PastelIcon type={a.type} ariaLabel={a.type} />
                <div>
                  <span className="amp-history-date">{a.date} {a.time}</span>
                  <span className="amp-history-pet">{a.pet}</span>
                  <span className="amp-history-type">{a.type}</span>
                  <span className={`amp-status-badge amp-status-${a.status.toLowerCase()}`}>{a.status}</span>
                </div>
                <span className="amp-history-details">
                  <i className="fa-solid fa-user-md"></i> {a.vet}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* Reminders & Uploads */}
      <section className="amp-section amp-section-right">
        <h2 className="amp-section-title">Reminders & Uploads</h2>
        <div className="amp-card-group amp-reminders-blocks">
          <div className="amp-soft-card amp-reminder-card">
            <strong>Reminders</strong>
            <div className="amp-reminder-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={reminders.sms}
                  onChange={() => handleReminderToggle("sms")}
                />
                SMS
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={reminders.email}
                  onChange={() => handleReminderToggle("email")}
                />
                Email
              </label>
            </div>
            <span className="amp-text-small amp-reminder-note">
              You'll be notified ahead of each appointment.
            </span>
          </div>
          <div className="amp-soft-card amp-upload-card">
            <strong>Uploads</strong>
            <input
              type="file"
              multiple
              className="amp-upload-input"
              onChange={handleFileUpload}
              aria-label="Upload veterinary documents"
            />
            <ul className="amp-upload-list">
              {uploadedFiles.map((doc, idx) => (
                <li key={idx} className="amp-upload-item">
                  <i className="fa-regular fa-file-pdf" aria-hidden="true"></i>
                  <span className="amp-upload-name">{doc.name}</span>
                  <span className="amp-upload-date">{doc.date}</span>
                  <a href={doc.url} className="amp-btn-link" target="_blank" rel="noopener noreferrer" aria-label={`Preview ${doc.name}`}>
                    <i className="fa-regular fa-eye"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Accessibility: visually hidden heading for main content landmark */}
      <h2 className="sr-only">End of Appointment Management Page</h2>
    </div>
  );
}

export default AppointmentManagePage;
