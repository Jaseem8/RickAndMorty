import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import Locations from "./pages/Locations";
import Episodes from "./pages/Episodes";
import LocationPage from "./pages/LocationPage";
import EpisodePage from "./pages/EpisodePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episode/:id" element={<EpisodePage />} />

        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
