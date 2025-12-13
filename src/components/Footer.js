import React from 'react'
import { CiMail } from "react-icons/ci";
// import { GiFemaleVampire } from "react-icons/gi";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { GiFemaleVampire } from "react-icons/gi";

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <div className="container-fluid py-3 h-100">
                {/* DESKTOP VIEW */}
                <footer className="FT_1 px-md-4 px-lg-5 py-4 d-none d-md-block mt-auto">
                    <div className="d-flex flex-row justify-content-between w-100 border-bottom pb-4 border-secondary-subtle">

                        {/* Left Section */}
                        <div style={{ maxWidth: "24rem" }}>
                            <h2 className="text-white h5 m-0 d-flex align-items-center">
                                <span style={{ fontWeight: 600 }}>આહિર</span>
                                <span style={{ color: "#001d1aff", fontWeight: 600 }}> સમાજ</span>
                            </h2>
                            <p className="small mt-2 text-white">
                                <CiMail /> contact@ahirsamaj.in
                            </p>
                        </div>

                        {/* Menu */}
                        <div>
                            <ul className="list-unstyled small text-start footer-links">
                                <li><a href="/" className="text-white text-decoration-none">હોમ</a></li>
                                <li><a href="/ImageSlider" className="text-white text-decoration-none">સ્કૂલ</a></li>
                                <li><a href="/LatestNews" className="text-white text-decoration-none">લેટેસ્ટ ન્યૂઝ</a></li>
                                <li><a href="/about" className="text-white text-decoration-none">અબાઉટ</a></li>
                                <li><a href="/Apno_Etiyas" className="text-white text-decoration-none">આપણો ઈતિહાસ</a></li>
                            </ul>
                        </div>
                    </div>

                    <p className="pt-3 text-center small mb-0 text-white">
                        © 2025 Design & Developed by Ahir Samaj.
                    </p>
                </footer>

                {/* MOBILE VIEW */}
                <footer className="FT_1 px-3 py-4 d-block d-md-none text-center">

                    <div>

                        {/* Logo & Contact */}
                        <div className="mb-4">
                            <h2 className="text-white h5 m-0">
                                <span style={{ fontWeight: 600 }}>આહિર</span>
                                <span style={{ color: "#001d1aff", fontWeight: 600 }}> સમાજ</span>
                            </h2>
                            <p className="small text-white mt-2">
                                <CiMail /> contact@ahirsamaj.in
                            </p>
                            <hr />
                        </div>

                        {/* Center Menu */}
                        <ul className="list-unstyled small text-center footer-links">
                            <li className="mb-2"><a href="/" className="text-white text-decoration-none">હોમ</a></li>
                            <li className="mb-2"><a href="/ImageSlider" className="text-white text-decoration-none">સ્કૂલ</a></li>
                            <li className="mb-2"><a href="/LatestNews" className="text-white text-decoration-none">લેટેસ્ટ ન્યૂઝ</a></li>
                            <li className="mb-2"><a href="/about" className="text-white text-decoration-none">અબાઉટ</a></li>
                            <li className="mb-2"><a href="/Apno_Etiyas" className="text-white text-decoration-none">આપણો ઈતિહાસ</a></li>
                        </ul>
                        <hr />
                    </div>

                    <p className="pt-3 text-center small mb-0 text-white">
                        © 2025 Design & Developed by Ahir Samaj.
                    </p>
                </footer>

            </div>
        </>
    )
}

export default Footer