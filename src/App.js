import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./css/Navbar.css";
import "./css/Home.css";
import "./css/Latest.css";
import "./css/About.css";
import "./css/Footer.css";
import Navbar from "./components/Navbar.js";
import HomePage from "./components/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.js";
import Latest from "./components/Latest.js";
import About from "./components/About.js";
import Cards from "./components/Cards.js";
import News from "./components/News.js";

function App() {

  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/about" element={<About />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
