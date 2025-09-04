import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-bootstrap';
import img4 from '../images/img_4.jpg';
import img5 from '../images/img_5.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import wifi from "../images/wifi.png";
import food from "../images/food.png";
import security1 from "../images/security1.png";
import library from "../images/library.png";
import fb from "../images/fb.png";
import ig from "../images/ig.png";
import wd from "../images/wd.png";
import email_1 from "../images/Mail_icon.png";
import phone_1 from "../images/Call_icon.png";
import Location_icon from "../images/Location_icon.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [index, setIndex] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const sliderRef = useRef(null);

    const images = [img4, img5, img5, img5];

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Subject: "",
        Message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleThumbnailClick = (idx) => {
        setIndex(idx);
        setAutoSlide(false);
    };

    useEffect(() => {
        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/schools/schools/")
            .then((res) => res.json())
            .then((json) => setData3(json))
            .catch((err) => console.error(err));

        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/schools/schools/?id=4")
            .then((res) => res.json())
            .then((json) => {
                setData4(json);
                if (json && json.length > 0) setSelectedData(json[0]);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const timer = autoSlide
            ? setInterval(() => setIndex((prev) => (prev + 1) % images.length), 3000)
            : null;
        return () => clearInterval(timer);
    }, [autoSlide, images.length]);

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="container-fluid">
            {/* Carousel */}
            <div className="container-fluid">
                <div className="rounded overflow-hidden">
                    <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
                        {images.map((src, idx) => (
                            <Carousel.Item key={idx}>
                                <img
                                    className="w-100"
                                    src={src?.replace("http://", "https://")}
                                    alt={`Slide ${idx}`}
                                    style={{ height: '700px', objectFit: 'cover' }}
                                />
                                <Carousel.Caption>
                                    <h3>Lorem Ipsum is simply dummy text of the</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="d-flex justify-content-end p-3 gap-2 mb-5">
                        {images.map((src, idx) => (
                            <img
                                key={idx}
                                src={src?.replace("http://", "https://")}
                                onClick={() => handleThumbnailClick(idx)}
                                alt={`Thumb ${idx}`}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                    border: idx === index ? '2px solid #007bff' : '2px solid transparent',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Text */}
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-5 justify-content-center text-start NewS_Txt">
                        <h1>Licensed & <br />Regulated Exchange</h1>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-12 col-sm-12 col-md-5 col-lg-4 NewS_Txt">
                        <p>Lorem Ipsum is simply dummy text of the printing and <br /> typesetting industry.
                            Lorem Ipsum has been the industry's <br /> standard dummy text ever since the 1500s,
                            when an unknown <br /> printer took a galley of type and scrambled ..</p>
                    </div>
                </div>
            </div>

            {/* Four Cards */}
            <div className="container-fluid py-5 mb-5">
                <div className="row justify-content-center g-4">
                    {[{ img: wifi, title: 'Unlimited Wifi' }, { img: food, title: 'Best Food' }, { img: security1, title: 'Best Security' }, { img: library, title: 'Library' }].map((card, idx) => (
                        <div className="col-12 col-sm-6 col-md-3" key={idx}>
                            <div className="text-center p-4 icon_11 border rounded-4">
                                <div className="icon-circle mb-3 mx-auto">
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="icon-img"
                                        style={{ width: "50px", height: "60px", objectFit: "contain" }}
                                    />
                                </div>
                                <h1 className="fw-bold card_Data_1">{card.title}</h1>
                                <p className="text-muted small card_Data_1">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Slider Cards */}
            <div className="container-fluid bG_3">
                <Slider ref={sliderRef} {...settings}>
                    {Array.isArray(data3?.data) &&
                        data3.data.map((data) => (
                            <div key={data.id} className="p-3">
                                <div
                                    className="p-3"
                                    style={{
                                        maxWidth: "auto",
                                        maxHeight: "300px",
                                        backgroundColor: "white",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedData(data)}
                                >
                                    <p className="mt-3 text-center">{data.category_name}</p>
                                    <img
                                        src={data.logo?.replace("http://", "https://")}
                                        alt={`${data.name} logo`}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <p className="mt-3 text-center">{data.name}</p>
                                </div>
                            </div>
                        ))}
                </Slider>

                {/* Bottom Info + Buttons */}
                <div className="row align-items-center mt-4">
                    <div className="col-12 col-md-10 text-white mb-md-0 text-center text-md-start">
                        <p className="py-5 p-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has <br /> been the industry's standard dummy text
                            ever since the 1500s...
                        </p>
                    </div>
                    <div className="col-12 col-md-2 text-center text-md-end d-flex gap-2 justify-content-center justify-content-md-end">
                        {/* Prev Button */}
                        <button
                            onClick={() => sliderRef.current.slickPrev()}
                            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                            aria-label="Previous Slide"
                        >
                            <GrFormPrevious />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={() => sliderRef.current.slickNext()}
                            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                            aria-label="Next Slide"
                        >
                            <MdOutlineNavigateNext />
                        </button>
                    </div>
                </div>
            </div>


            {/* Form and Details */}
            <div className="container-fluid py-2">
                <div className="row">
                    {/* Buttons for data4 */}
                    {Array.isArray(data4) && data4.length > 0 && data4.map((item, idx) => (
                        <div className="col-md-2" key={idx}>
                            <button className="btn btn-primary mb-3 w-100" onClick={() => setSelectedData(item)}>
                                {item.name}
                            </button>
                        </div>
                    ))}

                    {/* Details */}
                    {selectedData && (
                        <div className="col-md-6 text-start Details_Form py-5">
                            <div className="h-100" style={{ transition: "none" }}>
                                <div className="mb-3 text-center">
                                    {selectedData.logo && (
                                        <img
                                            src={selectedData.logo?.replace("http://", "https://")}
                                            alt={`${selectedData.name} logo`}
                                            style={{ maxHeight: "120px", objectFit: "contain", transition: "none" }}
                                        />
                                    )}
                                </div>
                                <p className="text-center mb-3">{selectedData.name}</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <p>More info about <b>{selectedData.name}</b> in <b>{selectedData.category_name}</b> category.</p>
                            </div>
                        </div>
                    )}

                    {/* Contact Form */}
                    <div className="col-md-6 py-5">
                        <form onSubmit={handleSubmit} className="form_Main p-4">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h1>Let's get you to the right place</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                    <input type="text" id="inputFirstName" name="FirstName" className="form-control" placeholder="First Name" value={formData.FirstName} onChange={handleChange} required />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                    <input type="text" id="inputLastName" name="LastName" className="form-control" placeholder="Last Name" value={formData.LastName} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Email (required)</label>
                                <input type="email" id="inputEmail" name="Email" className="form-control" placeholder="Enter Your Email" value={formData.Email} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputSubject" className="form-label">Subject (required)</label>
                                <input type="text" id="inputSubject" name="Subject" className="form-control" placeholder="Enter Your Subject" value={formData.Subject} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputMessage" className="form-label">Message (required)</label>
                                <textarea id="inputMessage" name="Message" rows={5} cols={112} placeholder="Send This Message..." className="form-control msg" value={formData.Message} onChange={handleChange} />
                            </div>

                            <div>
                                <button type="submit" className="submit_btn">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-6 Location_Ditails mb-3">
                        {selectedData && (
                            <>
                                <h1 className="fw-bold mb-4">Contact Us</h1>
                                <p>
                                    <img src={email_1?.replace("http://", "https://")} height={20} width={20} alt="email" /> hello@tailark.com
                                </p>
                                <p>
                                    <img src={phone_1?.replace("http://", "https://")} height={20} width={20} alt="phone" /> +91 {selectedData.contact_number}
                                </p>
                                <p>
                                    <img src={Location_icon?.replace("http://", "https://")} height={20} width={20} alt="location" />
                                    {selectedData.description} {selectedData.city} {selectedData.taluka} {selectedData.district} {selectedData.state} {selectedData.pincode}
                                </p>
                                <div className="bg-white border-top justify-content-between text-bottom p-3">
                                    {selectedData.website && (
                                        <a href={selectedData.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none p-2">
                                            <img src={wd?.replace("http://", "https://")} height={20} width={20} alt="website" />
                                        </a>
                                    )}
                                    {selectedData.facebook && (
                                        <a href={selectedData.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none p-2">
                                            <img src={fb?.replace("http://", "https://")} height={20} width={20} alt="facebook" />
                                        </a>
                                    )}
                                    {selectedData.instagram && (
                                        <a href={selectedData.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none p-2">
                                            <img src={ig?.replace("http://", "https://")} height={20} width={20} alt="instagram" />
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="col-md-6 mb-2">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7482742926125!2d110.37422091477188!3d-6.914744969491869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57d14f2a5aef%3A0xd80b45669df4c6!2sYogyakarta!5e0!3m2!1sen!2sid!4v1613434479394!5m2!1sen!2sid"
                            width="100%"
                            height="300"
                            title="Map showing store locations"
                            style={{ border: '1px solid #ccc', borderRadius: '30px' }}
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
