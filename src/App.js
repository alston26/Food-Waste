import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import LocationsPage from './pages/LocationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/locations" element={<LocationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
