import React from 'react';
import './App.css';
import FurEverCareNavbar from './FurEverCareNavbar';
import FurEverCareLanding from './FurEverCareLanding';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import PetProfilePage from "./PetProfilePage";
import HealthTrackerPage from "./HealthTrackerPage";
import DietNutritionPage from "./DietNutritionPage";
import ActivityPage from "./ActivityPage";

// PUBLIC_INTERFACE
// Wrapper to access pet id for DietNutritionPage via useParams
function DietNutritionPageWithParams() {
  // We could use id if DietNutritionPage needs it later
  const { id } = useParams();
  // Optionally pass id as prop when/if DietNutritionPage supports it
  return <DietNutritionPage petId={id} />;
}

// PUBLIC_INTERFACE
// Wrapper for ActivityPage with dynamic :id param, in case future enhancement needed
function ActivityPageWithParams() {
  // For now, no prop required but allows easy extension
  return <ActivityPage />;
}

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <FurEverCareNavbar />
        <main style={{ paddingTop: 96 }}>
          <Routes>
            <Route path="/" element={<FurEverCareLanding />} />
            <Route path="/pet/:id" element={<PetProfilePage />} />
            {/* Health Tracker with dynamic pet id */}
            <Route path="/pet/:id/health" element={<HealthTrackerPage />} />
            {/* Diet & Nutrition Page: dynamic route for pet id */}
            <Route path="/pet/:id/diet" element={<DietNutritionPageWithParams />} />
            {/* Activity Tracker Page: dynamic route for pet id */}
            <Route path="/pet/:id/activity" element={<ActivityPageWithParams />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;