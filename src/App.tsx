import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import Locations from "./pages/Locations";
import Episodes from "./pages/Episodes";
import LocationPage from "./pages/LocationPage";
import EpisodePage from "./pages/EpisodePage";

const App: React.FC = () => {
  return (
    // Router component provides navigation capabilities in the app
    <Router>
      {/* Routes component contains all the route definitions */}
      <Routes>
        {/* Define routes for different pages in the app */}
        <Route path="/" element={<HomePage />} /> {/* Route for Home Page */}
        <Route path="/locations" element={<Locations />} />{" "}
        {/* Route for Locations Page */}
        <Route path="/location/:id" element={<LocationPage />} />{" "}
        {/* Route for Location Details Page */}
        <Route path="/episodes" element={<Episodes />} />{" "}
        {/* Route for Episodes Page */}
        <Route path="/episode/:id" element={<EpisodePage />} />{" "}
        {/* Route for Episode Details Page */}
        <Route path="/character/:id" element={<CharacterPage />} />{" "}
        {/* Route for Character Details Page */}
      </Routes>
    </Router>
  );
};

export default App;
