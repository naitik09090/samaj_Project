import React, { useState } from 'react';
import { GiFemaleVampire } from "react-icons/gi";
import { TfiEmail } from "react-icons/tfi";
import { LuLinkedin } from "react-icons/lu";
import { TfiTwitter } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
// import img1 from '../images/img_1.jpg'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const divRef = useRef(null);

    return (
        <div className="container-fluid">
            <div className="row F_NAv py-1">
                <div className='col-md-2'>
                    <b className="email"><TfiEmail className='MSg_Icon' />info14@gmail.com</b>
                </div>
                <div className='col-md-8'></div>
                <div className='col-md-2'>
                    {/* LinkedIn */}
                    <LuLinkedin className='LiNK_Icon' />

                    {/* Twitter */}
                    <TfiTwitter className='LiNK_Icon' />

                    <FaInstagram className='LiNK_Icon' />

                    <FiFacebook className='LiNK_Icon' />
                </div>
            </div>

            <nav className="position-relative d-flex align-items-center justify-content-between py-2 px-md-5 bg-white text-dark">
                {/* Logo & Title */}
                <div className="d-flex flex-column">
                    <h2 className="text-black m-0 d-flex align-items-center gap-1">
                        <GiFemaleVampire className="LOgo_ICon" />
                        કન્યા <span className="text-danger">છાત્રાલય</span>
                        {/* <p className="Nav_P m-0 small">Lorem Ipsum is simply dummy</p> */}
                    </h2>
                </div>

                {/* Desktop Menu */}
                <div className="d-flex flex-column">
                    <ul className="d-none d-md-flex align-items-center gap-3 list-unstyled">
                        <li><a href="/" className="text-dark text-decoration-none py-2">Home</a></li>
                        <li><a href="latest" className="text-dark text-decoration-none">Latest News</a></li>
                        <li><a href="about" className="text-dark text-decoration-none">About us</a></li>
                        <li><a href="#" className="Contact_Us_Bg_COlor text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
                {/* Mobile Menu Toggle */}
                <button
                    aria-label="menu-btn"
                    type="button"
                    className="d-inline d-md-none border-0 bg-transparent"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                        <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" fill="#000" />
                    </svg>
                </button>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="position-absolute top-100 start-0 w-100 bg-white shadow-sm p-4 d-md-none z-3">
                        <ul className="list-unstyled mb-4">
                            <li className="mb-2"><a href="/" className="text-dark text-decoration-none">Home</a></li>
                            <li className="mb-2"><a href="latest" className="text-dark text-decoration-none">Latest News</a></li>
                            <li className="mb-2"><a href="about" className="text-dark text-decoration-none">About us</a></li>
                            <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Contact Us</a></li>
                        </ul>

                        <button className="btn btn-outline-secondary w-100 rounded-pill">
                            Get started
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
