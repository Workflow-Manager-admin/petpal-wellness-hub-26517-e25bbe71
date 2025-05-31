import React, { useState, useRef } from "react";
import "./HealthTrackerPage.css";

/**
 * Demo data for a pet's health tracker page.
 * In a real app, this would be dynamic or fetched from an API.
 */
const demoPet = {
  name: "Luna",
  species: "Dog",
  idTag: "ID#1057",
  image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=320&q=80",
  health: {
    summary: {
      weight: "28 kg",
      status: "Stable",
      lastVisit: "2024-04-10",
      bodyTemp: "101.8°F",
      hr: 92,
      age: "4 years",
    },
    allergies: ["Pollen", "Beef"],
    chronic: ["Hip Dysplasia"],
    tags: ["Active", "Neutered", "Microchipped"],
    conditions: ["Mild dermatitis (seasonal)"],
    medicalHistory: [
      {
        date: "2024-04-10",
        title: "Regular Vet Checkup",
        desc: "Weight checked, hips examined, prescription for mobility.",
        icon: "fa-stethoscope",
        type: "checkup",
      },
      {
        date: "2024-03-12",
        title: "Medication Adjusted",
        desc: "Joint supplements dose increased as per vet.",
        icon: "fa-capsules",
        type: "medication",
      },
      {
        date: "2023-12-21",
        title: "Vaccination: DHPP",
        desc: "Booster shot administered.",
        icon: "fa-syringe",
        type: "vaccine",
      },
      {
        date: "2023-09-28",
        title: "Skin Allergy Flare-up",
        desc: "Mild rash, prescribed topical ointment.",
        icon: "fa-paw",
        type: "condition",
      },
    ],
    medications: [
      {
        name: "Glucosamine (Joint Care)",
        dosage: "500mg, 1x daily",
        status: "active",
        lastRefill: "2024-06-03",
        notes: "Sprinkle in food, supports hips",
      },
      {
        name: "Antihistamine",
        dosage: "10mg, as needed",
        status: "as-needed",
        notes: "During pollen season",
      },
      {
        name: "Derma-Cream",
        dosage: "Topical, 2x week",
        status: "ended",
        notes: "Used until healed",
      },
    ],
    vaccinations: [
      { label: "Rabies", date: "2023-08-20", status: "complete" },
      { label: "DHPP", date: "2024-03-10", status: "due-soon" },
      { label: "Bordetella", date: null, status: "overdue" },
    ],
    vet: {
      name: "Dr. Marisol Vega",
      clinic: "Happy Paws Veterinary",
      phone: "555-8023",
      email: "dr.vega@happypawsvet.com",
      address: "101 Pet Lane, Greenfield",
    },
    files: [
      {
        fileName: "rabies-certificate.pdf",
        type: "pdf",
        url: "#",
        uploaded: "2023-08-20",
      },
      {
        fileName: "skin-condition.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=180&q=80",
        uploaded: "2024-03-11",
      },
    ],
  },
};

// Helper: status class for vax/meds
function getStatusColor(status) {
  switch (status) {
    case "complete":
      return "status-complete";
    case "due-soon":
      return "status-due-soon";
    case "overdue":
      return "status-overdue";
    case "active":
      return "med-active";
    case "as-needed":
      return "med-as-needed";
    case "ended":
      return "med-ended";
    default:
      return "";
  }
}

// PUBLIC_INTERFACE
function HealthTrackerPage() {
  // Local state for uploads (demo, not persistent)
  const [attachments, setAttachments] = useState(demoPet.health.files);
  const uploadRef = useRef();

  // Medication tracker state: for demo add only
  const [medications, setMedications] = useState(demoPet.health.medications);
  const [showMedForm, setShowMedForm] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    status: "active",
    notes: "",
  });

  // File upload handler (demo only)
  function handleAttach(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAttachments((prev) => [
      ...prev,
      {
        fileName: file.name,
        type: file.type.startsWith("image/") ? "image" : "doc",
        url: URL.createObjectURL(file),
        uploaded: new Date().toISOString().slice(0, 10),
      },
    ]);
  }

  function handleMedAdd(e) {
    e.preventDefault();
    if (!newMed.name || !newMed.dosage) return;
    setMedications([
      ...medications,
      { ...newMed, lastRefill: new Date().toISOString().slice(0, 10) },
    ]);
    setNewMed({ name: "", dosage: "", status: "active", notes: "" });
    setShowMedForm(false);
  }

  // Timeline icon color by type
  function timelineIconClass(type) {
    switch (type) {
      case "checkup":
        return "fa-stethoscope timeline-icon-checkup";
      case "medication":
        return "fa-capsules timeline-icon-med";
      case "vaccine":
        return "fa-syringe timeline-icon-vax";
      case "condition":
        return "fa-paw timeline-icon-cond";
      default:
        return "fa-paw";
    }
  }

  return (
    <div className="health-tracker-page" role="main" aria-label="Health Tracker Page">
      {/* HEADER */}
      <header className="ht-header" aria-label={`Health Tracker for ${demoPet.name}`}>
        <div className="ht-photo-container">
          <img
            src={demoPet.image}
            className="ht-photo"
            alt={`${demoPet.name} profile`}
            loading="lazy"
          />
        </div>
        <div className="ht-title-meta">
          <div className="ht-name-row">
            <h1>{demoPet.name}</h1>
            <span className="ht-id">{demoPet.species} | {demoPet.idTag}</span>
          </div>
          <div className="ht-tags-list">
            {demoPet.health.tags.map((tag, idx) => (
              <span className="ht-pet-tag" key={tag + idx}>
                <i className="fa fa-tag" aria-hidden="true"></i> {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN GRID (2 columns desktop, stacked mobile) */}
      <div className="ht-main-grid">
        {/* LEFT COLUMN */}
        <section className="ht-summary-timeline-column">
          {/* Health Summary Card */}
          <div className="ht-section-card ht-sum-card" aria-label="Health Summary Overview">
            <div className="ht-section-title">
              <i className="fa fa-heartbeat"></i> Health Summary
            </div>
            <div className="ht-summary-fields">
              <div>
                <span className="ht-sum-field-label">Weight:</span>
                <span>{demoPet.health.summary.weight}</span>
              </div>
              <div>
                <span className="ht-sum-field-label">Status:</span>
                <span>{demoPet.health.summary.status}</span>
              </div>
              <div>
                <span className="ht-sum-field-label">Body Temp:</span>
                <span>{demoPet.health.summary.bodyTemp}</span>
              </div>
              <div>
                <span className="ht-sum-field-label">Last Visit:</span>
                <span>{demoPet.health.summary.lastVisit}</span>
              </div>
              <div>
                <span className="ht-sum-field-label">Age:</span>
                <span>{demoPet.health.summary.age}</span>
              </div>
              <div>
                <span className="ht-sum-field-label">Heart Rate:</span>
                <span>{demoPet.health.summary.hr} bpm</span>
              </div>
            </div>
            <div className="ht-section-subtags-row">
              <span className="ht-pet-tag allergy">
                <i className="fa fa-allergies"></i> Allergies:
                {demoPet.health.allergies.length
                  ? demoPet.health.allergies.join(", ")
                  : " None"}
              </span>
              <span className="ht-pet-tag chronic" title="Chronic Conditions">
                <i className="fa fa-stethoscope"></i>{" "}
                {demoPet.health.chronic.length > 0
                  ? demoPet.health.chronic.join(", ")
                  : "No chronic conditions"}
              </span>
              {demoPet.health.conditions.map((cond, idx) => (
                <span className="ht-pet-tag cond" key={idx}>
                  <i className="fa fa-exclamation-triangle"></i> {cond}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline - Medical History */}
          <div className="ht-section-card ht-timeline-card" aria-label="Medical History Timeline">
            <div className="ht-section-title">
              <i className="fa fa-clock-rotate-left"></i> Medical History Timeline
            </div>
            <ol className="ht-timeline-list">
              {demoPet.health.medicalHistory.map((ev, idx) => (
                <li key={idx} className="ht-timeline-item">
                  <span
                    className={`ht-timeline-icon-bg ${ev.type}-color`}
                    aria-label={ev.type}
                  >
                    <i className={`fa ${timelineIconClass(ev.type)}`} aria-hidden="true"></i>
                  </span>
                  <div className="ht-timeline-details">
                    <div className="ht-timeline-title-row">
                      <span className="ht-timeline-title">{ev.title}</span>
                      <span className="ht-timeline-date">{ev.date}</span>
                    </div>
                    <span className="ht-timeline-desc">{ev.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <section className="ht-sideinfo-column">
          {/* Medication Tracker Card */}
          <div className="ht-section-card ht-meds-card" aria-label="Medications Tracker">
            <div className="ht-section-title-row">
              <div className="ht-section-title">
                <i className="fa fa-capsules"></i> Medications
              </div>
              <button
                className="ht-add-btn"
                title="Add Medication"
                aria-label="Add Medication"
                onClick={() => setShowMedForm((v) => !v)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
            {/* Add medication form */}
            {showMedForm && (
              <form
                className="ht-med-form"
                onSubmit={handleMedAdd}
                aria-label="Add Medication"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={newMed.name}
                  required
                  aria-label="Medication Name"
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={newMed.dosage}
                  required
                  aria-label="Dosage"
                  onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                />
                <select
                  value={newMed.status}
                  onChange={(e) => setNewMed({ ...newMed, status: e.target.value })}
                  aria-label="Medication Status"
                >
                  <option value="active">Active</option>
                  <option value="as-needed">As Needed</option>
                  <option value="ended">Ended</option>
                </select>
                <input
                  type="text"
                  placeholder="Notes"
                  value={newMed.notes}
                  aria-label="Notes"
                  onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
                />
                <button className="ht-save-btn" type="submit">
                  <i className="fa fa-check"></i> Save
                </button>
              </form>
            )}
            <ul className="ht-meds-list">
              {medications.map((med, idx) => (
                <li
                  key={med.name + idx}
                  className={"ht-meds-item " + getStatusColor(med.status)}
                  tabIndex={0}
                  aria-label={`Medication: ${med.name}, Status: ${med.status}`}
                >
                  <div className="ht-meds-title-row">
                    <span className="ht-meds-title">{med.name}</span>
                    <span className="ht-meds-status">{med.status}</span>
                  </div>
                  <div className="ht-meds-dosage">{med.dosage}</div>
                  <div className="ht-meds-notes">{med.notes}</div>
                  {med.lastRefill && (
                    <div className="ht-meds-lastrefill">
                      <i className="fa fa-pills"></i>{" "}
                      <span title="Last refill">{med.lastRefill}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Vaccinations Panel */}
          <div className="ht-section-card ht-vax-card" aria-label="Vaccinations">
            <div className="ht-section-title-row">
              <div className="ht-section-title">
                <i className="fa fa-syringe"></i> Vaccinations
              </div>
            </div>
            <ul className="ht-vax-list">
              {demoPet.health.vaccinations.map((v, i) => (
                <li
                  key={v.label}
                  className={"ht-vax-item " + getStatusColor(v.status)}
                  tabIndex={0}
                  aria-label={`${v.label}, status: ${v.status}`}
                >
                  <span className="ht-vax-dot"></span>
                  <span className="ht-vax-label">{v.label}</span>
                  <span className="ht-vax-date">
                    {v.date ? v.date : <span className="ht-vax-missing">No record</span>}
                  </span>
                  <span className="ht-vax-status">
                    {v.status === "complete" ? (
                      <>
                        <i className="fa fa-check-circle"></i> Complete
                      </>
                    ) : v.status === "due-soon" ? (
                      <>
                        <i className="fa fa-exclamation-circle"></i> Due soon
                      </>
                    ) : (
                      <>
                        <i className="fa fa-times-circle"></i> Overdue
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vet Information Card */}
          <div className="ht-section-card ht-vet-card" aria-label="Veterinarian Information">
            <div className="ht-section-title">
              <i className="fa fa-user-md"></i> Vet Info
            </div>
            <div className="ht-vet-fields">
              <div>
                <strong>Name:</strong> {demoPet.health.vet.name}
              </div>
              <div>
                <strong>Clinic:</strong> {demoPet.health.vet.clinic}
              </div>
              <div>
                <i className="fa fa-phone"></i> <a href={`tel:${demoPet.health.vet.phone}`}>{demoPet.health.vet.phone}</a>
              </div>
              <div>
                <i className="fa fa-envelope"></i> <a href={`mailto:${demoPet.health.vet.email}`}>{demoPet.health.vet.email}</a>
              </div>
              <div>
                <i className="fa fa-map-marker-alt"></i> {demoPet.health.vet.address}
              </div>
            </div>
          </div>

          {/* Health Documents Uploads */}
          <div className="ht-section-card ht-files-card" aria-label="Health Documents">
            <div className="ht-section-title-row">
              <div className="ht-section-title">
                <i className="fa fa-paperclip"></i> Health Documents
              </div>
              <label className="ht-upload-btn" tabIndex={0} aria-label="Upload file">
                <i className="fa fa-upload"></i>
                <input
                  type="file"
                  ref={uploadRef}
                  onChange={handleAttach}
                  style={{ display: "none" }}
                  aria-label="Upload File"
                />
              </label>
            </div>
            <div className="ht-files-list">
              {attachments.map((f, idx) =>
                f.type === "image" ? (
                  <div className="ht-file-preview ht-file-img" key={idx}>
                    <img src={f.url} alt={f.fileName} loading="lazy" />
                    <div className="ht-file-meta">
                      <span>
                        <i className="fa fa-image"></i> {f.fileName}
                      </span>
                      <span className="ht-file-date">{f.uploaded}</span>
                    </div>
                  </div>
                ) : (
                  <div className="ht-file-preview ht-file-doc" key={idx}>
                    <i className="fa fa-file-alt"></i>
                    <div className="ht-file-meta">
                      <span>{f.fileName}</span>
                      <span className="ht-file-date">{f.uploaded}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HealthTrackerPage;
