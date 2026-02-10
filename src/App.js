import "./App.scss";
import "./css/Navbar.scss";
import "./css/Home.scss";
import "./css/Latest.scss";
import "./css/About.scss";
import "./css/Footer.scss";
import "./css/School.scss";
import "./css/Apno_Etiyas.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 🔥 Lazy loaded pages
const HomePage = lazy(() => import("./components/Home"));
const News = lazy(() => import("./components/News"));
const LatestNews = lazy(() => import("./components/LatestNews"));
const Latest = lazy(() => import("./components/Latest"));
const School = lazy(() => import("./components/School"));
const ImageSlider = lazy(() => import("./components/ImageSlider"));
// const Cards = lazy(() => import("./components/Cards"));
// const Privacy = lazy(() => import("./components/Privacy"));
// const About = lazy(() => import("./components/About"));
// const Terms = lazy(() => import("./components/Terms"));
// const Contact = lazy(() => import("./components/Contact"));
const ApnoEtiyas = lazy(() => import("./components/Apno_Etiyas"));

function App() {

  useEffect(() => {
    document.querySelectorAll(".no-select").forEach(el => {
      el.style.userSelect = "none";
    });
  }, []);

  return (
    <div className="no-select">
      <Router>
        <div className="d-flex flex-column min-vh-100">

          <Navbar />

          <main className="flex-grow-1">
            <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<News />} />
                <Route path="/LatestNews" element={<LatestNews />} />
                <Route path="/latest/:id" element={<Latest />} />
                <Route path="/school/:id" element={<School />} />
                <Route path="/Our_Schools" element={<ImageSlider />} />
                {/* <Route path="/cards" element={<Cards />} /> */}
                {/* <Route path="/privacy-policy" element={<Privacy />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/terms" element={<Terms />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
                <Route path="/Apno_Etiyas" element={<ApnoEtiyas />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />

        </div>
      </Router>
    </div>
  );
}

export default App;
