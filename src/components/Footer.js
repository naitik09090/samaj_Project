import React from 'react'
import { CiMail } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";
// import { GiFemaleVampire } from "react-icons/gi";

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className="FT_1 px-3 px-md-4 px-lg-5 pt-4 mb-4 m-4">
                <div className="d-flex flex-column flex-md-row justify-content-between w-100 gap-4 border-bottom pb-4 border-secondary-subtle">
                    <div className="mb-3" style={{ maxWidth: '24rem' }}>
                        <p className="small">
                            © 2024, UAB Coin Sonic. All rights reserved. <br />
                            Registration number: 306200594 <br />
                            <CiMail />{" "}info@Instaxchange.com <br />
                            <HiOutlineLocationMarker /> {" "}UAB Coin Sonic 2023, J Basanaviciaus g. 26, Vilnius
                        </p>
                    </div>

                    <div className="d-flex flex-column flex-md-row gap-5">
                        <div>
                            <h2 className="fw-semibold mb-3">Products</h2>
                            <ul className="list-unstyled small footer-links">
                                <li>
                                    <a href="#" className="nav-link px-3 py-2 text-white">AML Disclaimer</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-3 py-2 text-white">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-3 py-2 text-white">Terms and Conditions</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-3 py-2 text-white">Risk Disclaimer</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-3 py-2 text-white">Cookies Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-3 py-2 text-white">Complaints Policy</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

                <p className="pt-3 text-start small mb-0">
                    © 2024 Merco. All rights reserved.
                </p>
            </footer>
        </>
    )
}

export default Footer