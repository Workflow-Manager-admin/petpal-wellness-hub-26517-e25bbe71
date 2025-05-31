import React from 'react';
import './App.css';
import FurEverCareNavbar from './FurEverCareNavbar';
import FurEverCareLanding from './FurEverCareLanding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <FurEverCareNavbar />
        <main style={{ paddingTop: 96 }}>
          <Routes>
            <Route path="/" element={<FurEverCareLanding />} />
            {/* Future routes go here */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;