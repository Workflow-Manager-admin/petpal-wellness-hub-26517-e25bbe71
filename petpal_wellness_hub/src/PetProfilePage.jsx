import React, { useState, useRef } from "react";
import "./PetProfilePage.css";

// FontAwesome CDN for icons if not already on index.html/head - robust for independent import
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

/**
 * Demo data. In production, this would be fetched.
 */
const demoPet = {
  name: "Luna",
  species: "Dog",
  breed: "Golden Retriever",
  age: "4 years",
  gender: "Female",
  image:
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&q=80",
  owner: {
    name: "Sophie Carter",
    phone: "555-2396",
    email: "sophie.carter@email.com",
    address: "1234 Oak Lane, Springfield, CA",
  },
  medical: {
    allergies: ["Pollen", "Beef"],
    chronic: ["Hip Dysplasia"],
    recentVisit: "2024-04-10",
    healthStatus: "Stable",
  },
  vaccinations: [
    { label: "Rabies", date: "2023-08-20", status: "complete" },
    { label: "DHPP", date: "2024-03-10", status: "due-soon" },
    { label: "Bordetella", date: null, status: "overdue" },
  ],
  notes: [
    {
      time: "2024-06-10",
      text: "Luna had a mild skin rash after our park walk. Monitoring, resolved in three days.",
    },
    {
      time: "2024-05-20",
      text: "Vet checkup: all healthy. Weight: 28kg. Advised hip-formula supplements.",
    },
  ],
  files: [
    {
      fileName: "luna-rabies-certificate.pdf",
      type: "pdf",
      url: "#",
      uploaded: "2023-08-20",
    },
    {
      fileName: "luna-vax-record.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&q=80",
      uploaded: "2024-03-11",
    },
  ],
};

function getStatusColor(status) {
  switch (status) {
    case "complete":
      return "status-complete";
    case "due-soon":
      return "status-due-soon";
    case "overdue":
      return "status-overdue";
    default:
      return "";
  }
}

/**
 * Main Pet Profile Page component.
 */
// PUBLIC_INTERFACE
function PetProfilePage() {
  // Editable state for inline sections
  const [editBasic, setEditBasic] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    name: demoPet.name,
    species: demoPet.species,
    breed: demoPet.breed,
    age: demoPet.age,
    gender: demoPet.gender,
  });

  const [activeTab, setActiveTab] = useState("owner");
  const [collapseOwner, setCollapseOwner] = useState(false);

  const [notes, setNotes] = useState(demoPet.notes);
  const [newNote, setNewNote] = useState("");
  const noteRef = useRef();

  const [attachments, setAttachments] = useState(demoPet.files);

  // Handle photo edit (simulated)
  function handlePhotoChange(e) {
    // Normally you would upload the image.
    alert("Photo upload not implemented in demo.");
  }

  function handleBasicEdit() {
    setEditBasic((x) => !x);
  }

  function handleNoteAdd(e) {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([{ time: new Date().toISOString().slice(0, 10), text: newNote }, ...notes]);
      setNewNote("");
      noteRef.current && noteRef.current.blur();
    }
  }

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

  return (
    <div className="pet-profile-page">
      {/* HEADER */}
      <header className="pet-header">
        <div className="pet-photo-section">
          <div className="pet-photo-container">
            <img
              src={demoPet.image}
              alt={`${basicInfo.name} profile`}
              className="pet-photo"
            />
            <label className="pet-photo-edit-btn" title="Edit Photo">
              <i className="fa fa-camera"></i>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </label>
          </div>
        </div>
        <div className="pet-title-section">
          <h1 className="pet-name">
            {editBasic ? (
              <input
                className="editable-input"
                value={basicInfo.name}
                onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                autoFocus
              />
            ) : (
              basicInfo.name
            )}
            <button
              className="info-edit-btn"
              title={editBasic ? "Save" : "Edit Basic Info"}
              onClick={handleBasicEdit}
            >
              <i className={`fa fa-${editBasic ? "check" : "edit"}`}></i>
            </button>
          </h1>
          <div className="pet-species">
            <span>
              <i className="fa fa-paw"></i> {basicInfo.species}
            </span>
            <span>
              <i className="fa fa-dna"></i> {basicInfo.breed}
            </span>
          </div>
        </div>
      </header>
      {/* MAIN CARDS: Info sections */}
      <div className="profile-main-wrapper">
        {/* BASIC INFO CARD */}
        <section className="pet-info-card">
          <div className="info-card-row">
            <div className="info-icon-col">
              <i className="fa fa-calendar-alt"></i>
              <span>
                {editBasic ? (
                  <input
                    className="editable-input"
                    value={basicInfo.age}
                    onChange={(e) => setBasicInfo({ ...basicInfo, age: e.target.value })}
                  />
                ) : (
                  basicInfo.age
                )}
              </span>
            </div>
            <div className="info-icon-col">
              <i className={`fa fa-${basicInfo.gender === "Female" ? "venus" : "mars"}`}></i>
              <span>
                {editBasic ? (
                  <input
                    className="editable-input"
                    value={basicInfo.gender}
                    onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
                  />
                ) : (
                  basicInfo.gender
                )}
              </span>
            </div>
          </div>
          <div className="info-card-row">
            <div className="info-icon-col">
              <i className="fa fa-dog"></i>
              <span>
                {editBasic ? (
                  <input
                    className="editable-input"
                    value={basicInfo.breed}
                    onChange={(e) => setBasicInfo({ ...basicInfo, breed: e.target.value })}
                  />
                ) : (
                  basicInfo.breed
                )}
              </span>
            </div>
            <div className="info-icon-col">
              <i className="fa fa-shield-heart"></i>
              <span>
                {editBasic ? (
                  <input
                    className="editable-input"
                    value={basicInfo.species}
                    onChange={(e) => setBasicInfo({ ...basicInfo, species: e.target.value })}
                  />
                ) : (
                  basicInfo.species
                )}
              </span>
            </div>
          </div>
        </section>
        {/* OWNER INFO: collapsible on mobile, tabbed on desktop */}
        <section className="pet-owner-section">
          <div className="owner-header-row">
            <button
              className={"owner-tab-btn" + (activeTab === "owner" ? " active" : "")}
              onClick={() => {
                setActiveTab("owner");
                setCollapseOwner(false);
              }}
            >
              <i className="fa fa-user"></i> Owner Info
            </button>
            <button
              className={"owner-tab-btn" + (activeTab === "contact" ? " active" : "")}
              onClick={() => {
                setActiveTab("contact");
                setCollapseOwner(false);
              }}
            >
              <i className="fa fa-id-badge"></i> Contact
            </button>
            <button
              className="owner-collapse-btn"
              aria-label={collapseOwner ? "Expand Owner Info" : "Collapse Owner Info"}
              onClick={() => setCollapseOwner((v) => !v)}
            >
              <i className={`fa fa-chevron-${collapseOwner ? "down" : "up"}`}></i>
            </button>
          </div>
          <div
            className={
              "owner-details-panel" +
              (collapseOwner ? " collapsed" : " expanded") +
              " tab-" +
              activeTab
            }
            style={{
              maxHeight: collapseOwner ? 0 : undefined,
              overflow: "hidden",
              transition: "max-height 0.55s cubic-bezier(.21,.7,.59,1.06)",
            }}
          >
            {activeTab === "owner" ? (
              <div className="owner-info-fields">
                <span>
                  <i className="fa fa-user"></i> <strong>Name:</strong> {demoPet.owner.name}
                </span>
                <span>
                  <i className="fa fa-map-marker-alt"></i> {demoPet.owner.address}
                </span>
              </div>
            ) : (
              <div className="owner-info-fields">
                <span>
                  <i className="fa fa-phone"></i> {demoPet.owner.phone}
                </span>
                <span>
                  <i className="fa fa-envelope"></i> {demoPet.owner.email}
                </span>
              </div>
            )}
          </div>
        </section>
        {/* MEDICAL OVERVIEW */}
        <section className="pet-medical-box">
          <div className="pet-medical-header">
            <i className="fa fa-medkit"></i>
            Medical Overview
            <a className="btn-health-history" href="#" title="View Detailed Health History">
              <i className="fa fa-notes-medical"></i>
              <span>Health Records</span>
            </a>
          </div>
          <div className="pet-medical-row">
            <div>
              <span className="pet-tag allergy">
                <i className="fa fa-allergies"></i> Allergies:{" "}
                {demoPet.medical.allergies.join(", ") || "-"}
              </span>
            </div>
            <div>
              <span className="pet-tag chronic" title="Chronic Conditions">
                <i className="fa fa-stethoscope"></i>{" "}
                {demoPet.medical.chronic.length > 0
                  ? demoPet.medical.chronic.join(", ")
                  : "No chronic conditions"}
              </span>
            </div>
            <div>
              <span className="pet-tag status">
                <i className="fa fa-heart-pulse"></i> Status: {demoPet.medical.healthStatus}
              </span>
            </div>
            <div>
              <span className="pet-tag recent-visit">
                <i className="fa fa-calendar-check"></i> Last Visit: {demoPet.medical.recentVisit}
              </span>
            </div>
          </div>
        </section>
        {/* VACCINATIONS PANEL */}
        <section className="pet-vax-panel">
          <div className="pet-vax-header">
            <i className="fa fa-syringe"></i> Vaccination Status
            <button className="btn-add-vax" title="Add new vaccine">
              <i className="fa fa-plus"></i>
            </button>
          </div>
          <div className="pet-vax-timeline">
            {demoPet.vaccinations.map((v, i) => (
              <div key={v.label} className={"vax-item " + getStatusColor(v.status)}>
                <div className="vax-label">
                  <span className="vax-dot"></span>
                  {v.label}
                </div>
                <div className="vax-date">{v.date ? v.date : <span className="vax-missing">No record</span>}</div>
                <div className="vax-status-text">
                  {v.status === "complete" ? (
                    <span>
                      <i className="fa fa-check-circle"></i> Complete
                    </span>
                  ) : v.status === "due-soon" ? (
                    <span>
                      <i className="fa fa-exclamation-circle"></i> Due soon
                    </span>
                  ) : (
                    <span>
                      <i className="fa fa-times-circle"></i> Overdue
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* NOTES (Editable diary) */}
        <section className="pet-notes-section">
          <div className="notes-header">
            <i className="fa fa-book-open"></i> Health & Behavior Diary
          </div>
          <form className="notes-form" onSubmit={handleNoteAdd}>
            <input
              className="notes-input"
              value={newNote}
              ref={noteRef}
              placeholder="Add a new note..."
              maxLength={280}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button className="btn-add-note" type="submit" title="Add note">
              <i className="fa fa-plus"></i>
            </button>
          </form>
          <ul className="notes-list">
            {notes.map((n, idx) => (
              <li key={idx} className="note-item">
                <span className="note-time">{n.time}</span>
                <span className="note-text">{n.text}</span>
              </li>
            ))}
          </ul>
        </section>
        {/* FILE ATTACHMENTS */}
        <section className="pet-files-section">
          <div className="files-header">
            <i className="fa fa-paperclip"></i> Attachments
            <label className="files-upload-btn" title="Upload file">
              <i className="fa fa-upload"></i>
              <input type="file" onChange={handleAttach} />
            </label>
          </div>
          <div className="files-list">
            {attachments.map((f, idx) =>
              f.type === "image" ? (
                <div className="file-preview image-file" key={idx}>
                  <img src={f.url} alt={f.fileName} loading="lazy" />
                  <div className="file-meta">
                    <span>
                      <i className="fa fa-image"></i> {f.fileName}
                    </span>
                    <span className="file-date">{f.uploaded}</span>
                  </div>
                </div>
              ) : (
                <div className="file-preview doc-file" key={idx}>
                  <i className="fa fa-file-alt"></i>
                  <div className="file-meta">
                    <span>{f.fileName}</span>
                    <span className="file-date">{f.uploaded}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PetProfilePage;
