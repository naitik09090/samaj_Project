// import "./App.scss";
// import "./css/Navbar.scss";
// import "./css/Home.scss";
// import "./css/Latest.scss";
// import "./css/About.scss";
// import "./css/Footer.scss";
// import "./css/School.scss";
// import "./css/Apno_Etiyas.scss";
// import Navbar from "./components/Navbar.js";
// import HomePage from "./components/Home.js";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer.js";
// import Latest from "./components/Latest.js";
// import School from "./components/School.js";
// // import Schools_1 from "./components/Schools_1.js";
// import Cards from "./components/Cards.js";
// // import News from "./components/News.js";
// import Privacy from "./components/Privacy.js";
// import About from "./components/About.js";
// import News from "./components/News.js";
// import Terms from "./components/Terms.js";
// import Contact from "./components/Contact.js";
// import ImageSlider from "./components/ImageSlider.js";
// import LatestNews from "./components/LatestNews.js";
// import ApnoEtiyas from "./components/Apno_Etiyas.js";
// import { useEffect } from "react";

// function App() {

//   useEffect(() => {
//     // Disable text selection for elements
//     // with class "no-select"
//     const noSelectElements = document.querySelectorAll(".no-select");
//     noSelectElements.forEach((element) => {
//       element.style.webkitUserSelect = "none";
//       element.style.mozUserSelect = "none";
//       element.style.msUserSelect = "none";
//       element.style.userSelect = "none";
//     });
//   }, []);


//   return (
//     <>
//       <div className="no-select">
//         <Router>
//           <div className="d-flex flex-column min-vh-100">
//             <Navbar />

//             <main className="flex-grow-1">
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/news" element={<News />} />
//                 <Route path="/LatestNews" element={<LatestNews />} />
//                 <Route path="/latest/:id" element={<Latest />} />
//                 <Route path="/school/:id" element={<School />} />
//                 <Route path="/ImageSlider" element={<ImageSlider />} />
//                 <Route path="/cards" element={<Cards />} />
//                 <Route path="/privacy-policy" element={<Privacy />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/terms" element={<Terms />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/Apno_Etiyas" element={<ApnoEtiyas />} />
//               </Routes>
//             </main>

//             <Footer />
//           </div>
//         </Router>
//       </div>
//     </>
//   );
// }

// export default App;
import "./App.scss";
import "./css/Navbar.scss";
import "./css/Home.scss";
import "./css/Latest.scss";
import "./css/About.scss";
import "./css/Footer.scss";
import "./css/School.scss";
import "./css/Apno_Etiyas.scss";
import "./css/carousel.scss";
import "./css/utilities.scss";

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
                <Route path="/ImageSlider" element={<ImageSlider />} />
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
