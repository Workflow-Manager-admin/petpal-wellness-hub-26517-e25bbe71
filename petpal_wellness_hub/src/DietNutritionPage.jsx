import React, { useState, useRef } from "react";
import "./DietNutritionPage.css";

// FontAwesome CDN for icons if missing
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

// Demo Data (normally fetched via API or props)
const demoMeals = [
  { type: "Breakfast", time: "8:00 AM", food: "Chicken kibble", kcal: 190 },
  { type: "Lunch", time: "1:00 PM", food: "Pumpkin puree + salmon", kcal: 160 },
  { type: "Dinner", time: "6:30 PM", food: "Lamb & rice formula", kcal: 210 }
];
const demoNutrition = {
  protein: 34, // grams
  fat: 18,
  carbs: 46,
  fiber: 7,
  calories: 560,
  chartGoal: 600,
  ideal: {protein: 30, fat: 17, carbs: 50, fiber: 6}
};
const weekMealsScheduled = [
  { day: "Mon", breakfast: true, lunch: true, dinner: true },
  { day: "Tue", breakfast: true, lunch: false, dinner: true },
  { day: "Wed", breakfast: false, lunch: false, dinner: true },
  { day: "Thu", breakfast: true, lunch: true, dinner: true },
  { day: "Fri", breakfast: true, lunch: true, dinner: true },
  { day: "Sat", breakfast: true, lunch: true, dinner: true },
  { day: "Sun", breakfast: true, lunch: false, dinner: true },
];
const demoFoodsPreferred = [
  { name: "Chicken", icon: "fa-drumstick-bite" },
  { name: "Pumpkin", icon: "fa-carrot" },
  { name: "Green Beans", icon: "fa-leaf" },
  { name: "Brown Rice", icon: "fa-bowl-food" },
];
const demoFoodsRestricted = [
  { name: "Beef", icon: "fa-cow" },
  { name: "Dairy", icon: "fa-cheese" },
  { name: "Soy", icon: "fa-seedling" },
  { name: "Chocolate", icon: "fa-chocolate-bar" },
];
const demoNotes = [
  { date: "2024-06-11", content: "Switched lunch to pumpkin for fiber boost." },
  { date: "2024-05-30", content: "Vet advised to restrict beef treats." },
];
const demoFiles = [
  {
    fileName: "nutrition-analysis.pdf",
    type: "pdf",
    url: "#",
    uploaded: "2024-04-20",
  },
  {
    fileName: "fav-kibble.png",
    type: "image",
    url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=180&q=80",
    uploaded: "2024-03-28",
  },
];

function pieChartSVG({ protein, fat, carbs, fiber, calories, goal }) {
  // Pie chart using 4 categories, simple SVG (not scalable for real-world, demo only)
  const total = protein + fat + carbs + fiber;
  const slice = (v) => (v / total) * 360;
  const getPath = (startAngle, endAngle) => {
    const r = 36, cx = 40, cy = 40;
    const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
    const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
    const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
    const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
  };
  let a = 0,
      paths = [],
      colors = ["#4E8D7C", "#F7C873", "#F26B6B", "#9FA8DA"],
      vals = [protein, fat, carbs, fiber];
  for (let i = 0; i < vals.length; ++i) {
    const ang = slice(vals[i]);
    paths.push(
      <path
        d={getPath(a, a + ang)}
        fill={colors[i]}
        key={i}
        opacity="0.93"
        stroke="#fff"
        strokeWidth="0.6"
      />
    );
    a += ang;
  }
  return (
    <svg width="82" height="82" viewBox="0 0 82 82" className="dnp-piechart" aria-label="Nutrition Pie Chart">
      <circle cx="40" cy="40" r="36" fill="#F5F7FC" />
      {paths}
      <circle cx="40" cy="40" r="22" fill="#fff" />
      <text x="40" y="44" textAnchor="middle" fontSize="13" fill="#4E8D7C" fontWeight="700">
        {Math.round((calories / goal) * 100)}%
      </text>
    </svg>
  );
}

// Helper: get color class for water tracker
function waterDropClass(full) {
  return full ? "dnp-water-drop full" : "dnp-water-drop";
}

// PUBLIC_INTERFACE
function DietNutritionPage() {
  // Interactive state hooks
  const [activeFoodsTab, setActiveFoodsTab] = useState("preferred");
  const [waterIntake, setWaterIntake] = useState(5); // Out of 8
  const [notes, setNotes] = useState(demoNotes);
  const [newNote, setNewNote] = useState("");
  const [attachments, setAttachments] = useState(demoFiles);
  const fileRef = useRef();

  // Handlers
  function handleAddNote(e) {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([{ date: new Date().toISOString().slice(0, 10), content: newNote }, ...notes]);
      setNewNote("");
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

  // Water Drops display (8 per day)
  const drops = [];
  for (let i = 0; i < 8; ++i)
    drops.push(
      <button
        key={i}
        type="button"
        aria-label={i < waterIntake ? "full cup" : "empty cup"}
        className={waterDropClass(i < waterIntake)}
        tabIndex={0}
        onClick={() => setWaterIntake(i + 1)}
      >
        <i className="fa fa-tint"></i>
      </button>
    );

  return (
    <div className="dnp-page" role="main" aria-label="Diet & Nutrition Page">
      {/* HEADER */}
      <header className="dnp-header">
        <div className="dnp-header-title">
          <i className="fa fa-bone" aria-hidden="true" />
          Diet & Nutrition Tracker
        </div>
        <div className="dnp-header-desc">
          Plan meals, track water, log nutrition & manage dietary notes for happy, healthy pets.
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="dnp-main-grid">
        {/* LEFT COLUMN */}
        <section className="dnp-main-stack">
          {/* DAILY MEAL PLANNER */}
          <div className="dnp-card meal-planner" aria-label="Daily Meal Planner">
            <div className="dnp-card-title">
              <i className="fa fa-utensils"></i> Today’s Meals
            </div>
            <table className="dnp-meal-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Meal</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {demoMeals.map((m, idx) => (
                  <tr key={m.type + idx}>
                    <td>{m.time}</td>
                    <td>
                      <span className="dnp-meal-type">
                        <i className={`fa fa-${m.type === "Breakfast" ? "coffee" : m.type === "Lunch" ? "hamburger" : "fish"}`}></i>
                        {m.type}
                      </span>
                      <span className="dnp-meal-food">{m.food}</span>
                    </td>
                    <td>
                      <span className="dnp-meal-kcal">{m.kcal} kcal</span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="dnp-meal-total">Total</td>
                  <td className="dnp-meal-totalval">{demoNutrition.calories} kcal</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* NUTRITION DASHBOARD (CHART) */}
          <div className="dnp-card nutrition-dashboard" aria-label="Nutrition Dashboard">
            <div className="dnp-card-title">
              <i className="fa fa-chart-pie"></i> Nutrition Dashboard
            </div>
            <div className="dnp-nutrition-stats">
              <div className="dnp-nutrition-chart">
                {pieChartSVG({
                  protein: demoNutrition.protein,
                  fat: demoNutrition.fat,
                  carbs: demoNutrition.carbs,
                  fiber: demoNutrition.fiber,
                  calories: demoNutrition.calories,
                  goal: demoNutrition.chartGoal,
                })}
              </div>
              <ul className="dnp-nutrition-legends">
                <li>
                  <span className="nutri swatch protein"></span> Protein: <b>{demoNutrition.protein}g</b>
                  <span className="nutri-ideal">({demoNutrition.ideal.protein}g)</span>
                </li>
                <li>
                  <span className="nutri swatch fat"></span> Fat: <b>{demoNutrition.fat}g</b>
                  <span className="nutri-ideal">({demoNutrition.ideal.fat}g)</span>
                </li>
                <li>
                  <span className="nutri swatch carbs"></span> Carbs: <b>{demoNutrition.carbs}g</b>
                  <span className="nutri-ideal">({demoNutrition.ideal.carbs}g)</span>
                </li>
                <li>
                  <span className="nutri swatch fiber"></span> Fiber: <b>{demoNutrition.fiber}g</b>
                  <span className="nutri-ideal">({demoNutrition.ideal.fiber}g)</span>
                </li>
              </ul>
            </div>
            <div className="dnp-nutrition-footnote">
              Nutrition breakdown vs goal of {demoNutrition.chartGoal} kcal/day.
            </div>
          </div>

          {/* DIETARY NOTES */}
          <div className="dnp-card dnp-notes-card" aria-label="Dietary Notes">
            <div className="dnp-card-title">
              <i className="fa fa-notes-medical"></i> Dietary Notes
            </div>
            <form className="dnp-notes-form" onSubmit={handleAddNote}>
              <input
                className="dnp-note-input"
                value={newNote}
                placeholder="Add new note…"
                maxLength={200}
                onChange={(e) => setNewNote(e.target.value)}
                aria-label="Add dieting note"
              />
              <button type="submit" className="dnp-btn" title="Add note">
                <i className="fa fa-plus"></i>
              </button>
            </form>
            <ul className="dnp-notes-list">
              {notes.map((n, idx) => (
                <li key={n.date + idx} className="dnp-note-item">
                  <span className="dnp-note-date">{n.date}</span>
                  <span className="dnp-note-content">{n.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <section className="dnp-side-stack">
          {/* WEEKLY MEALS PLANNER */}
          <div className="dnp-card week-calendar" aria-label="Weekly Meals Planner">
            <div className="dnp-card-title">
              <i className="fa fa-calendar-alt"></i> Week Overview
            </div>
            <table className="dnp-calendar-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                </tr>
              </thead>
              <tbody>
                {weekMealsScheduled.map((day, idx) => (
                  <tr key={day.day}>
                    <td>{day.day}</td>
                    <td>
                      {day.breakfast ? (
                        <span className="dnp-meal-dot yes">
                          <i className="fa fa-check"></i>
                        </span>
                      ) : (
                        <span className="dnp-meal-dot no">
                          <i className="fa fa-minus"></i>
                        </span>
                      )}
                    </td>
                    <td>
                      {day.lunch ? (
                        <span className="dnp-meal-dot yes">
                          <i className="fa fa-check"></i>
                        </span>
                      ) : (
                        <span className="dnp-meal-dot no">
                          <i className="fa fa-minus"></i>
                        </span>
                      )}
                    </td>
                    <td>
                      {day.dinner ? (
                        <span className="dnp-meal-dot yes">
                          <i className="fa fa-check"></i>
                        </span>
                      ) : (
                        <span className="dnp-meal-dot no">
                          <i className="fa fa-minus"></i>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PREFERRED / RESTRICTED FOODS (TABS) */}
          <div className="dnp-card foods-list-card" aria-label="Preferred and Restricted Foods">
            <div className="dnp-card-title">
              <i className="fa fa-apple-alt"></i> Foods
            </div>
            <div className="dnp-tabs-row">
              <button
                className={"dnp-tab-btn" + (activeFoodsTab === "preferred" ? " active" : "")}
                onClick={() => setActiveFoodsTab("preferred")}
                aria-selected={activeFoodsTab === "preferred"}
                tabIndex={0}
                type="button"
              >
                <i className="fa fa-seedling"></i> Preferred Foods
              </button>
              <button
                className={"dnp-tab-btn" + (activeFoodsTab === "restricted" ? " active" : "")}
                onClick={() => setActiveFoodsTab("restricted")}
                aria-selected={activeFoodsTab === "restricted"}
                tabIndex={0}
                type="button"
              >
                <i className="fa fa-ban"></i> Restricted
              </button>
            </div>
            <ul className="dnp-foods-list">
              {(activeFoodsTab === "preferred" ? demoFoodsPreferred : demoFoodsRestricted).map((f, idx) => (
                <li key={f.name + idx} className="dnp-food-item">
                  <i className={`fa ${f.icon}`}></i> {f.name}
                </li>
              ))}
            </ul>
          </div>

          {/* WATER INTAKE TRACKER */}
          <div className="dnp-card water-card" aria-label="Water Intake Tracker">
            <div className="dnp-card-title">
              <i className="fa fa-tint"></i> Water Intake
            </div>
            <div className="dnp-water-row" aria-label="Daily Water Intake">
              {drops}
              <span className="dnp-water-label">{waterIntake}/8 cups</span>
            </div>
          </div>

          {/* ATTACHMENTS / FILES */}
          <div className="dnp-card uploads-card" aria-label="Dietary Attachments">
            <div className="dnp-card-title-row">
              <span className="dnp-card-title">
                <i className="fa fa-paperclip"></i> Dietary Files
              </span>
              <label className="dnp-btn dnp-upload-btn" tabIndex={0} aria-label="Upload dietary file">
                <i className="fa fa-upload"></i>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileRef}
                  onChange={handleAttach}
                />
              </label>
            </div>
            <div className="dnp-files-list">
              {attachments.map((f, idx) =>
                f.type === "image" ? (
                  <div className="dnp-file-preview dnp-file-img" key={idx}>
                    <img src={f.url} alt={f.fileName} loading="lazy" />
                    <div className="dnp-file-meta">
                      <span>
                        <i className="fa fa-image"></i> {f.fileName}
                      </span>
                      <span className="dnp-file-date">{f.uploaded}</span>
                    </div>
                  </div>
                ) : (
                  <div className="dnp-file-preview dnp-file-doc" key={idx}>
                    <i className="fa fa-file-alt"></i>
                    <div className="dnp-file-meta">
                      <span>{f.fileName}</span>
                      <span className="dnp-file-date">{f.uploaded}</span>
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
export default DietNutritionPage;
