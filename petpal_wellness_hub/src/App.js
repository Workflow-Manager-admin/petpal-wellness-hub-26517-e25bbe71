import React from 'react';
import './App.css';
import FurEverCareNavbar from './FurEverCareNavbar';
import FurEverCareLanding from './FurEverCareLanding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PetProfilePage from "./PetProfilePage";
import HealthTrackerPage from "./HealthTrackerPage";

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
            {/* Future routes go here */}
            <Route path="/health-tracker" element={<HealthTrackerPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;