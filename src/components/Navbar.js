import React, { useState, useEffect } from "react";
import { FiMail, FiFacebook } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { TfiTwitter } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import SamajLogo from '../images/ahir_samaj_logo1.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const navStyle = {
    top: isScrolled ? 0 : 60,
    left: 0,
    right: 0,
    zIndex: 3000,
    position: "fixed",
    backgroundColor: isScrolled ? "#067C71" : "#ffffff",
    border: isScrolled ? "1px solid #057c71" : "1px solid #ffffff",
    borderRadius: isScrolled ? "0px 0px 22px 22px" : "22px",
    height: isScrolled ? "55px" : "auto",
    paddingLeft: "0px",
    paddingRight: "20px",
    transition: "all 0.3s ease"
  };

  return (
    <div className="container-fluid">

      {/* ---------------------- TOP BAR (EMAIL + SOCIAL ICONS) ---------------------- */}
      <div className="row F_NAv py-1">

        {/* Email */}
        <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center">
          <b className="email p-2">
            <FiMail className="MSg_Icon" /> contact@ahirsamaj.in
          </b>
        </div>

        <div className="col-lg-6 d-none d-lg-block"></div>

        {/* Desktop icons (HIDE ON MOBILE & TABLET) */}
        <div className="col-lg-2 d-none d-lg-flex justify-content-end py-2">

          <LuLinkedin type="button" className="LiNK_Icon py-0" />
          <TfiTwitter type="button" className="LiNK_Icon py-0" />
          <FaInstagram type="button" className="LiNK_Icon py-0" />
          <FiFacebook type="button" className="LiNK_Icon py-0" />

          {/* Language Button */}
          <div className="position-relative">
            <button
              type="button"
              className="border-0 bg-transparent py-0"
              aria-label="Share"
              onClick={() => setLangOpen(!langOpen)}
            >
              <BiWorld className="LiNK_Icon" aria-hidden="true" />
            </button>

            {langOpen && (
              <div
                className="position-absolute bg-white shadow-sm rounded"
                style={{ top: "100%", left: "-80px", zIndex: 5000 }}
              >
                <select
                  className="form-select"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setLangOpen(false);
                  }}
                >
                  <option>English</option>
                  <option>Gujarati</option>
                  <option>Hindi</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------- MOBILE BACKDROP ---------------------- */}
      <div
        className={`position-fixed h-100 top-0 start-0 d-md-none`}
        style={{
          zIndex: menuOpen ? 2999 : -1000,
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          backgroundColor: "rgba(0,0,0,0.15)",
          transition: "opacity 0.25s ease",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ---------------------- MAIN NAVBAR ---------------------- */}
      <nav
        className="position-fixed"
        style={navStyle}
      >
        <div className="container-fluid">
          <div className="row align-items-center">

            {/* LOGO */}
            <div className="col-6 col-md-4 col-lg-3 d-flex align-items-center">
              <a href="/" className="text-decoration-none">
                <img src={SamajLogo} alt='Samaj Logo' height={40} width={105} style={{ borderRadius: '30px', paddingTop: isScrolled ? '5px' : '0px' }} />
              </a>
            </div>

            {/* ---------------------- DESKTOP MENU ---------------------- */}
            <div className="col-md-8 col-lg-9 d-none d-md-flex justify-content-end">
              <ul className="d-flex gap-3 list-unstyled py-3 m-0">

                <li><a href="/" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }}>હોમ</a></li>
                <li><a href="/Our_Schools" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }}>સ્કૂલ</a></li>
                <li><a href="/LatestNews" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }}>લેટેસ્ટ ન્યૂઝ</a></li>
                {/* <li><a href="/about" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }}>અબાઉટ</a></li> */}
                <li><a href="/Apno_Etiyas" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }}>આપણો ઈતિહાસ</a></li>

              </ul>
            </div>

            {/* ---------------------- MOBILE HAMBURGER ---------------------- */}
            <div className="col-6 d-flex justify-content-end d-md-none">
              <button
                type="button"
                className="border-0 bg-transparent"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                  <path d="M3 7h24M3 14h24M3 21h24" stroke={isScrolled ? "#FFFFFF" : "#067C71"} strokeWidth="2" />
                </svg>
              </button>

            </div>

            {/* ---------------------- MOBILE DROPDOWN ---------------------- */}
            <div className="col-12 d-md-none">
              <div
                className="text-center p-4"
                style={{
                  display: menuOpen ? "block" : "none",
                  // borderTopLeftRadius: 10,
                  // borderTopRightRadius: 10,
                  backgroundColor: isScrolled ? "#067C71" : "#ffffff",
                  width: isScrolled ? "295px" : "295px",
                  height: isScrolled ? "auto" : "auto",
                  borderRadius: isScrolled ? "0px 0px 22px 22px" : "0px 0px 22px 22px",
                }}
              >
                <ul className="list-unstyled mb-2">
                  <li className="mb-2"><a href="/" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>હોમ</a></li>
                  <li className="mb-2"><a href="/Our_Schools" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>સ્કૂલ</a></li>
                  <li className="mb-2"><a href="/LatestNews" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>લેટેસ્ટ ન્યૂઝ</a></li>
                  {/* <li className="mb-2"><a href="/about" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>અબાઉટ</a></li> */}
                  <li className="mb-2"><a href="/Apno_Etiyas" style={{ color: isScrolled ? "#FFFFFF" : "#067C71", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>આપણો ઈતિહાસ</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div style={{ height: 90 }}></div>
    </div>
  );
};

export default Navbar;