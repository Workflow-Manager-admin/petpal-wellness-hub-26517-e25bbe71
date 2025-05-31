import React from 'react';
import './App.css';
import FurEverCareNavbar from './FurEverCareNavbar';

function App() {
  return (
    <div className="app">
      <FurEverCareNavbar />
      <main>
        <div className="container" style={{ paddingTop: 96 }}>
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            <h1 className="title">petpal_wellness_hub</h1>
            <div className="description">
              Start building your application.
            </div>
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;