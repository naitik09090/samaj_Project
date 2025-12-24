import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
// import img4 from '../images/img_4.jpg';
// import img5 from '../images/img_5.jpg';
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";

const ImageSlider = () => {
    const [data1, setData1] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [index, setIndex] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    // const [autoSlide, setAutoSlide] = useState(true);
    // const sliderRef = useRef(null);
    const carouselRef = useRef(null);
    const { id } = useParams();
    const [school, setSchool] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");
    const [schoolTypes, setSchoolTypes] = useState([]);
    const [selectedSchoolType, setSelectedSchoolType] = useState(null);
    const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    // Mapping of API school types to Gujarati display names
    const schoolTypeLabels = {
        "Ahir Boarding": "આહીર બોર્ડિંગ",
        "Ahir Charitable Trust": "આહિર ચેરિટેબલ ટ્રસ્ટ",
        "Ahir Samaj": "આહીર સમાજ વાડી",
        "KANYA CHHATRALAYA": "કન્યા છત્રાલય",
        "Kanya Chhatra Alaya": "કન્યા છત્રાલય",
        "CHHATRALAYA": "છત્રાલય",
        "Chhatra Alaya": "છત્રાલય",
        "Ahir Kalyan Mandal": "આહિર કેળવણી મંડળ",
    };

    // const getSchoolLabel = (type) => {
    //     if (!type) return "";
    //     const foundKey = Object.keys(schoolTypeLabels).find(k => k.toLowerCase() === String(type).toLowerCase());
    //     return schoolTypeLabels[foundKey] || type;
    // };

    const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Subject: "",
        Message: "",
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        console.log(setSelectedData);
        // setAutoSlide(false);
    };

    // useEffect(() => {
    //     fetch(`${URL}/api/v1/schools/schools/`)
    //         .then((res) => res.json())
    //         .then((json) => setData3(json))
    //         .catch((err) => console.error(err));

    //     fetch(`${URL}/api/v1/schools/schools/?id=4`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             setData4(json);
    //             if (json && json.length > 0) setSelectedData(json[0]);
    //         })
    //         .catch((err) => console.error(err));
    // }, []);

    useEffect(() => {
        fetch(`${URL}/api/v1/schools/schools/`)
            .then(res => res.json())
            .then(result => {
                const list = Array.isArray(result.data) ? result.data : [];
                const found = list.find(item => {
                    return String(item.id) === String(id) ||
                        String(item._id) === String(id) ||
                        String(item.schoolId) === String(id);
                });
                console.log("Found:-", found)
                setSchool(found)
            })
            .catch(err => console.error(err));
    }, [id]);
    useEffect(() => {
        fetch(`${URL}/api/v1/schools/schools/`)
            .then((res) => res.json())
            .then((json) => {
                setData1(json);
                setFilteredData(json);
                // extract unique school_type values for filter buttons
                const types = [...new Set(json.data?.map(s => s.school_type).filter(Boolean))].sort();
                setSchoolTypes(types);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const all = data1?.data || [];
        if (selectedSchoolType == null) {
            setFilteredData({ ...data1, data: all });
            return;
        }
        const filtered = all.filter(item => item.school_type === selectedSchoolType);
        setFilteredData({ ...data1, data: filtered });
    }, [selectedSchoolType, data1]);

    // Search API call with school_type and search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            console.log(setSearchTerm);
            // If no search term, use the type filter logic
            const all = data1?.data || [];
            if (selectedSchoolType == null) {
                setFilteredData({ ...data1, data: all });
            } else {
                const filtered = all.filter(item => item.school_type === selectedSchoolType);
                setFilteredData({ ...data1, data: filtered });
            }
            return;
        }

        // Call search API with school_type parameter
        let searchUrl = `${URL}/api/v1/schools/schools/?search=${encodeURIComponent(searchTerm)}`;
        if (selectedSchoolType != null) {
            searchUrl += `&school_type=${encodeURIComponent(selectedSchoolType)}`;
        }

        fetch(searchUrl)
            .then(res => res.json())
            .then(json => setFilteredData(json))
            .catch(err => console.error("Search error:", err));
    }, [searchTerm, selectedSchoolType]);

    // 1) Fetch single school by id (safer than fetching whole list and .find)
    // useEffect(() => {
    //     if (!id) return;
    //     fetch(`${URL}/api/v1/schools/schools/${id}`) // <-- single school endpoint
    //         .then((res) => res.json())
    //         .then((result) => {
    //             // If API returns object or { data: {...} } adjust accordingly:
    //             const found = result?.data ?? result; // try both shapes
    //             console.log("Fetched school:", found);
    //             setSchool(found);
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching school:", err);
    //         });
    // }, [id]);

    // 2) optional: keep your other fetch if you need it elsewhere
    // useEffect(() => {
    //     fetch(`${URL}/api/v1/schools/schools/`)
    //         .then((res) => res.json())
    //         .then((json) => setData1(json))
    //         .catch((err) => console.error(err));
    // }, []);

    // 3) build combined media array (photos + videos) with stable ordering & keys
    const combined = useMemo(() => {
        const photos = Array.isArray(school?.photos) ? school.photos : [];
        const videos = Array.isArray(school?.videos) ? school.videos : [];

        const arr = [
            ...photos.map((p) => ({ ...p, _type: "image", _key: `photo-${p.id}` })),
            ...videos.map((v) => ({ ...v, _type: "video", _key: `video-${v.id}` }))
        ].sort((a, b) => {
            // put all images first, then videos
            if (a._type !== b._type) return a._type === "image" ? -1 : 1;

            // when same type, sort by order
            const ao = Number.isFinite(a.order) ? a.order : 0;
            const bo = Number.isFinite(b.order) ? b.order : 0;
            return ao - bo;
        })


        console.log("DEBUG combined media:", arr, "length:", arr.length);
        return arr;
    }, [school]);

    // 4) helper to extract youtube id
    // function getYouTubeId(url = "") {
    //     const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    //     return m ? m[1] : null;
    // }

    // if (!school) return <div>Loading school...</div>;

    //   if (!school) return <p>Loading...</p>;
    // useEffect(() => {
    //     const timer = autoSlide
    //         ? setInterval(() => setIndex((prev) => (prev + 1) % images.length), 3000)
    //         : null;
    //     return () => clearInterval(timer);
    // }, [autoSlide, images.length]);

    // const settings = {
    //     dots: false,
    //     arrows: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     responsive: [
    //         { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    //         { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    //         { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    //     ],
    // };

    const getMapSrc = (mapStr) => {
        if (!mapStr) return null;
        if (/^https?:\/\//.test(mapStr)) return mapStr;
        const match = mapStr.match(/src=["']([^"']+)["']/i);
        return match ? match[1] : null;
    };

    const chunkArray1 = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    // const chunkMobileCards = (arr) => {
    //     const result = [];
    //     for (let i = 0; i < arr.length; i += 2) {
    //         result.push(arr.slice(i, i + 2));
    //     }
    //     return result;
    // };

    // compute filtered list (null = show all)
    // Filter schools by selected school type - if null, show all
    const filteredSchools = selectedSchoolType
        ? data1.data?.filter(school => school.school_type === selectedSchoolType) || []
        : data1.data || [];

    // sliding windows helper (wrap-around) — we will render windows that shift by 1
    // const makeSlidingWindows = (arr = [], size = 5) => {
    //     const items = Array.isArray(arr) ? arr : [];
    //     if (!items.length) return [];
    //     const ext = items.concat(items.slice(0, Math.max(0, size - 1)));
    //     const windows = [];
    //     for (let i = 0; i < items.length; i++) {
    //         windows.push(ext.slice(i, i + size));
    //     }
    //     return windows;
    // };

    // sliding windows helper (shift by 1). If items <= window size, return single window without duplication.
    const makeSlidingWindows = (arr = [], size = 5) => {
        const items = Array.isArray(arr) ? arr : [];
        if (!items.length) return [];
        if (items.length <= size) return [items.slice()];
        const ext = items.concat(items.slice(0, Math.max(0, size - 1)));
        const windows = [];
        for (let i = 0; i < items.length; i++) {
            windows.push(ext.slice(i, i + size));
        }
        return windows;
    };

    const itemsArr = filteredData?.data || [];
    const cardWindowsDesktop = makeSlidingWindows(itemsArr, 4);
    const cardWindowsMobile = makeSlidingWindows(itemsArr, 4);

    // Handlers for desktop and mobile carousel navigation (move by one card)
    const handleNextDesktop = () => {
        if (!cardWindowsDesktop.length) return;
        setActiveDesktopIndex(i => (i + 1) % cardWindowsDesktop.length);
    };

    const handlePrevDesktop = () => {
        if (!cardWindowsDesktop.length) return;
        setActiveDesktopIndex(i => (i - 1 + cardWindowsDesktop.length) % cardWindowsDesktop.length);
    };

    const handleNextMobile = () => {
        if (!cardWindowsMobile.length) return;
        setActiveMobileIndex(i => (i + 1) % cardWindowsMobile.length);
    };

    const handlePrevMobile = () => {
        if (!cardWindowsMobile.length) return;
        setActiveMobileIndex(i => (i - 1 + cardWindowsMobile.length) % cardWindowsMobile.length);
    };

    // Reset active indexes when data length changes
    useEffect(() => {
        if (activeDesktopIndex >= cardWindowsDesktop.length) setActiveDesktopIndex(0);
    }, [cardWindowsDesktop.length]);

    useEffect(() => {
        if (activeMobileIndex >= cardWindowsMobile.length) setActiveMobileIndex(0);
    }, [cardWindowsMobile.length]);

    return (
        <div className="container-fluid w-100">
            {school && (
                <h3 className="text-center mb-3" style={{ fontWeight: 600, fontSize: "35px", color: "#067C71" }}>{school?.name}</h3>
            )}
            {/* Carousel */}
            <div className="container-fluid">
                <div className="overflow-hidden">
                    <div className="F_SliderMain">
                        <Carousel
                            activeIndex={index}
                            onSelect={handleSelect}
                            interval={2000}
                            controls={true}
                            indicators={false}
                            fade={false}
                        >
                            {combined.map((item) => {
                                // IMAGE SLIDE
                                if (item._type === "image") {
                                    return (
                                        <Carousel.Item key={item._key}>
                                            <img
                                                className="slide-media w-100 F_Slider1"
                                                src={item.image}
                                                alt={item.caption || `photo-${item.id}`}
                                                style={{
                                                    height: isMobile ? "260px" : "760px",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Carousel.Item>
                                    );
                                }

                                // ---- VIDEO SLIDE ----
                                const url = item.video_url;

                                // YouTube embed detect
                                const yt = url.match(
                                    /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
                                );
                                const ytId = yt ? yt[1] : null;

                                // YOUTUBE VIDEO
                                if (ytId) {
                                    return (
                                        <Carousel.Item key={item._key}>
                                            <iframe
                                                title={"yt-" + ytId}
                                                src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&mute=1`}
                                                className="slide-media"
                                                style={{
                                                    width: "100%",
                                                    height: isMobile ? "260px" : "760px",
                                                }}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </Carousel.Item>
                                    );
                                }

                                // NORMAL VIDEO
                                return (
                                    <Carousel.Item key={item._key}>
                                        <video
                                            className="w-100"
                                            src={url}
                                            controls
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            style={{
                                                height: isMobile ? "260px" : "760px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                    </div>

                    {/* Thumbnails */}
                    <div className="d-flex justify-content-end p-3 gap-2">

                        {combined.map((item, idx) => (
                            <div key={item._key}>
                                {/* VIDEO THUMBNAIL */}
                                {item._type === "video" ? (
                                    <video
                                        src={item.video_url}
                                        onClick={() => handleThumbnailClick(idx)}
                                        style={{
                                            width: isMobile ? "35px" : "60px",
                                            height: isMobile ? "60px" : "90px",
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                            border: idx === index ? "2px solid #007bff" : "2px solid white",
                                            backgroundColor: "black",
                                            cursor: "pointer",
                                            position: "relative",
                                            bottom: isMobile ? "80px" : "120px",
                                            right: isMobile ? "35px" : "20px",
                                        }}
                                    />

                                ) : (
                                    /* IMAGE THUMBNAIL */
                                    <img
                                        src={item.image}
                                        onClick={() => handleThumbnailClick(idx)}
                                        alt={`Thumb ${idx}`}
                                        style={{
                                            width: isMobile ? "35px" : "60px",
                                            height: isMobile ? "60px" : "90px",
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                            border: idx === index ? "2px solid #007bff" : "2px solid white",
                                            cursor: "pointer",
                                            position: "relative",
                                            bottom: isMobile ? "80px" : "120px",
                                            right: isMobile ? "35px" : "20px",
                                        }}
                                    />

                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Carousel
                            activeIndex={index}
                            onSelect={handleSelect}
                            controls={false}
                            indicators={false}
                        >
                            {school?.photos?.map((item, idx) => (
                                <Carousel.Item key={idx}>

                                    {item.video_url ? (
                                        <video
                                            className="w-100"
                                            style={{ height: "800px", objectFit: "cover" }}
                                            src={item.video_url}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            className="w-100 F_Slider1"
                                            src={item.image}
                                            alt={`Slide ${idx}`}
                                            style={{ height: "800px", objectFit: "cover" }}
                                        />
                                    )}

                                </Carousel.Item>
                            ))}
                        </Carousel> */}

            {/* Section Text */}
            {/* <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-5 justify-content-center text-start NewS_Txt">
                        <h1>Licensed & <br />Regulated Exchange</h1>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-12 col-sm-12 col-md-5 col-lg-4 NewS_Txt">
                        <p></p>
                    </div>
                </div>
            </div> */}

            {/* Four Cards */}
            {/* DESKTOP — visible on md+ */}
            <div className="d-none d-md-block">
                <div className="container-fluid py-5">
                    <div className="row justify-content-center g-2">
                        {[{ img: wifi, title: 'Unlimited Wifi' }, { img: food, title: 'Best Food' }, { img: security1, title: 'Best Security' }, { img: library, title: 'Library' }].map((card, idx) => (
                            <div className="col-md-3" key={idx.id}>
                                <div className="text-center p-3 icon_11 border rounded-4">
                                    <div className="icon-circle mx-auto">
                                        <img
                                            src={card.img}
                                            alt={card.title}
                                            className="icon-img"
                                            style={{ width: "auto", height: "50px", objectFit: "contain" }}
                                        />
                                    </div>
                                    <b className="card_Data_1">{card.title}</b>
                                    {/* <p className="text-muted small card_Data_1"></p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MOBILE — visible on xs & sm */}
            <div className="d-block d-md-none">
                <div className="container-fluid">
                    <div className="row gx-2 gy-4 justify-content-center">
                        {[{ img: wifi, title: 'Unlimited Wifi' }, { img: food, title: 'Best Food' }, { img: security1, title: 'Best Security' }, { img: library, title: 'Library' }].map((card, idx) => (
                            <div className="col-6" key={idx}>
                                <div className="text-center p-3 mb-5 icon_111 border rounded-3">
                                    <div className="icon-circle mx-auto">
                                        <img
                                            src={card.img}
                                            alt={card.title}
                                            className="icon-img"
                                            style={{ width: "auto", height: "48px", objectFit: "contain" }}
                                        />
                                    </div>
                                    <b className="d-block card_Data_1" style={{ fontSize: 14 }}>{card.title}</b>
                                    {/* <p className="text-muted small mb-0 card_Data_1"></p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Details and Map */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 Location_Details">
                        {selectedData && (
                            <>
                                <h1 className="fw-bold mb-2">Contact Us</h1>
                                <div>
                                    {school?.email && (
                                        <a href={school?.email} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">
                                            <img src={email_1?.replace("http://", "https://")} alt="email" height={25} width={25} />
                                            {school?.email}
                                        </a>
                                    )}
                                </div>
                                <div>
                                    {school?.contact_number && (
                                        <a href={school?.contact_number} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">
                                            <img src={phone_1?.replace("http://", "https://")} alt="phone" height={25} width={25} />
                                            +91 {school?.contact_number}
                                        </a>
                                    )}
                                </div>
                                <div>
                                    {school?.address && (
                                        <a href={school?.address} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">
                                            <img src={Location_icon?.replace("http://", "https://")} alt="location" height={25} width={25} />
                                            {school?.address}
                                        </a>
                                    )}
                                </div>
                                <div>
                                    {school?.website && (
                                        <a href={school?.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">
                                            <img src={wd?.replace("http://", "https://")} alt="website" height={25} width={25} />
                                            {school?.website}
                                        </a>
                                    )}
                                </div>
                                <div>
                                    {school?.facebook && (
                                        <a href={school?.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">
                                            <img src={fb?.replace("http://", "https://")} alt="facebook" height={25} width={25} />
                                            {school?.facebook}
                                        </a>
                                    )}
                                </div>
                                <div>
                                    {school?.instagram && (
                                        <a href={school?.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">
                                            <img src={ig?.replace("http://", "https://")} alt="instagram" height={20} width={20} />
                                            {school?.instagram}
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>


                    {/* Contact Form */}
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="form_Main p-3 mb-2">
                            <div className="row mb-1">
                                <div className="col-md-12">
                                    <h1>Let's get you to the right place</h1>
                                    <p></p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                    <input type="text" id="inputFirstName" name="FirstName" className="form-control" placeholder="First Name" value={formData.FirstName} onChange={handleChange} required />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                    <input type="text" id="inputLastName" name="LastName" className="form-control" placeholder="Last Name" value={formData.LastName} onChange={handleChange} required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="inputEmail" className="form-label">Email (required)</label>
                                <input type="email" id="inputEmail" name="Email" className="form-control" placeholder="Enter Your Email" value={formData.Email} onChange={handleChange} required />
                            </div>

                            <div>
                                <label htmlFor="inputSubject" className="form-label">Subject (required)</label>
                                <input type="text" id="inputSubject" name="Subject" className="form-control" placeholder="Enter Your Subject" value={formData.Subject} onChange={handleChange} />
                            </div>

                            <div className='mb-1'>
                                <label htmlFor="inputMessage" className="form-label">Message (required)</label>
                                <textarea id="inputMessage" name="Message" rows={3} cols={112} placeholder="Send This Message..." className="form-control msg" value={formData.Message} onChange={handleChange} />
                            </div>

                            <div>
                                <button type="submit" className="submit_btn">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {school?.map && (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mb-3'>
                            <div
                                className="ratio ratio-16x9"
                                style={{ maxWidth: '1600px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
                            >
                                <iframe
                                    src={getMapSrc(school.map)}
                                    title="Map showing store locations"
                                    style={{ border: '1px solid #ccc', borderRadius: '30px' }}
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Slider */}
            <div className="container-fluid bG_3">
                <div id="schoolCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000" ref={carouselRef}>
                    <div className="carousel-inner">
                        <div className='py-2'>
                            <h1 className='text-center text-white'>આપણી સંસ્થા</h1>
                        </div>
                        {/* Desktop View */}
                        <div className="d-none d-md-block">
                            {cardWindowsDesktop.length > 0 ? (
                                cardWindowsDesktop.map((chunk, index) => (
                                    <div key={index} className={`carousel-item ${index === activeDesktopIndex ? "active" : ""}`}>
                                        <div className="col-md-12 d-flex justify-content-center align-items-center mb-3 flex-wrap gap-2">
                                            <div className="col-md-2"></div>

                                            {/* All Button */}
                                            {/* <div className="col-md-1 py-2" key="all">
                                                <button
                                                    onClick={() => setSelectedSchoolType(null)}
                                                    className="btn text-white w-100 d-flex justify-content-center align-items-center text-center"
                                                    style={{
                                                        backgroundColor: selectedSchoolType === null ? "#EFA325" : "#038176",
                                                        border: `2px solid ${selectedSchoolType === null ? "#EFA325" : "#ffffff"}`,
                                                        borderRadius: "22px",
                                                        height: "60px",
                                                        whiteSpace: "normal",
                                                        fontSize: "14px",
                                                        gap: "15px",
                                                        transition: "all 0.3s ease",
                                                        boxShadow: selectedSchoolType === null ? "0 0 8px rgba(6, 124, 113, 0.5)" : "none",
                                                        fontWeight: selectedSchoolType === null ? "bold" : "normal",
                                                    }}
                                                >
                                                    ઓલ સ્કૂલ
                                                </button>
                                            </div> */}

                                            {/* School Type Buttons */}
                                            {schoolTypes.length > 0 ? schoolTypes.map((type, i) => (
                                                <div className="col-md-1" key={i}>
                                                    <button
                                                        onClick={() => setSelectedSchoolType(type)}
                                                        className="btn text-white w-100 d-flex justify-content-center align-items-center text-center"
                                                        style={{
                                                            backgroundColor: selectedSchoolType === type ? "#EFA325" : "#038176",
                                                            border: `2px solid ${selectedSchoolType === type ? "#EFA325" : "#ffffff"}`,
                                                            borderRadius: "22px",
                                                            height: "60px",
                                                            whiteSpace: "normal",
                                                            fontSize: "14px",
                                                            gap: "15px",
                                                            transition: "all 0.3s ease",
                                                            boxShadow: selectedSchoolType === type ? "0 0 8px rgba(6, 124, 113, 0.5)" : "none",
                                                            fontWeight: selectedSchoolType === type ? "bold" : "normal",
                                                        }}
                                                    >{schoolTypeLabels[type] || type}
                                                    </button>
                                                </div>
                                            )) : null}

                                            <div className="col-md-2"></div>
                                        </div>
                                        <div className="row justify-content-center">
                                            {chunk.map((data) => (
                                                <div key={data.id} className="col-md-2 School_Card p-1 mb-5">
                                                    <Link to={`/school/${data.id}`} className="text-decoration-none text-dark">
                                                        <div
                                                            className="shadow-sm h-100 d-flex flex-column justify-content-between align-items-center text-center"
                                                            style={{
                                                                borderRadius: "15px",
                                                                padding: "20px",
                                                                backgroundColor: "#fff",
                                                            }}
                                                        >
                                                            {data.logo ? (
                                                                <img
                                                                    src={secureUrl(data.logo)}
                                                                    alt="logo School"
                                                                    className="rounded-1 mb-3"
                                                                    style={{ height: "150px", objectFit: "contain" }}
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="rounded-1 d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "150px",
                                                                        background: "#ffffff",
                                                                        color: "#067C71",
                                                                        fontWeight: 700,
                                                                        fontSize: "30px",
                                                                        borderRadius: "8px",
                                                                    }}
                                                                >
                                                                    Ahir Samaj
                                                                </div>
                                                            )}
                                                            <span className="fw-bold text-dark">{data.name}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-center">
                                                <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                                                    <button
                                                        className="btn btn-light rounded shadow"
                                                        type="button"
                                                        onClick={handlePrevDesktop}
                                                        aria-label="Previous slide"
                                                    >
                                                        <GrFormPrevious aria-hidden="true" />
                                                    </button>
                                                    <button
                                                        className="btn btn-light rounded shadow"
                                                        type="button"
                                                        onClick={handleNextDesktop}
                                                        aria-label="Next slide"
                                                    >
                                                        <MdOutlineNavigateNext aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="carousel-item active text-center py-5">
                                    <p>No results found.</p>
                                </div>
                            )}
                        </div>


                        {/* Mobile View */}
                        <div className="d-block d-md-none">
                            <div id="mobileSchoolCarousel" className="carousel slide" data-bs-interval="4000">
                                <div className="carousel-inner">
                                    {cardWindowsMobile.map((pair, idx) => (
                                        <div key={idx} className={`carousel-item ${idx === activeMobileIndex ? "active" : ""}`}>
                                            <div className="d-flex d-md-none py-3 overflow-auto gap-2 px-1" style={{ scrollbarWidth: "none" }}>

                                                {/* All Button */}
                                                {/* <button
                                                    onClick={() => setSelectedSchoolType(null)}
                                                    className="btn text-white flex-shrink-0"
                                                    style={{
                                                        minWidth: "130px",
                                                        height: "50px",
                                                        backgroundColor: selectedSchoolType === null ? "#EFA325" : "#038176",
                                                        border: `2px solid ${selectedSchoolType === null ? "#EFA325" : "#ffffff"}`,
                                                        borderRadius: "22px",
                                                        fontSize: "14px",
                                                        fontWeight: selectedSchoolType === null ? "bold" : "normal",
                                                    }}
                                                >
                                                    ઓલ સ્કૂલ
                                                </button> */}

                                                {/* School Type Buttons */}
                                                {schoolTypes.map((type, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedSchoolType(type)}
                                                        className="btn text-white flex-shrink-0"
                                                        style={{
                                                            minWidth: "130px",
                                                            height: "50px",
                                                            backgroundColor: selectedSchoolType === type ? "#EFA325" : "#038176",
                                                            border: `2px solid ${selectedSchoolType === type ? "#EFA325" : "#ffffff"}`,
                                                            borderRadius: "22px",
                                                            fontSize: "14px",
                                                            fontWeight: selectedSchoolType === type ? "bold" : "normal",
                                                        }}
                                                    >
                                                        {schoolTypeLabels[type] || type}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="row gx-3 gy-2 p-2">
                                                {pair.map((data) => (
                                                    <div key={data.id} className="col-6 p-2">
                                                        <Link to={`/school/${data.id}`} className="text-decoration-none text-dark">
                                                            <div
                                                                className="shadow-sm d-flex flex-column align-items-center text-center"
                                                                style={{
                                                                    borderRadius: "12px",
                                                                    padding: "10px",
                                                                    backgroundColor: "#fff",
                                                                    height: "180px",
                                                                    justifyContent: "space-between",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "auto",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    {data.logo ? (
                                                                        <img
                                                                            src={secureUrl(data.logo)}
                                                                            alt={`${data.name} logo`}
                                                                            width="120"
                                                                            height="120"
                                                                            loading="lazy"
                                                                            style={{
                                                                                objectFit: "contain",
                                                                                display: "block",
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            style={{
                                                                                width: "100%",
                                                                                height: "120px",
                                                                                background: "#ffffff",
                                                                                color: "#067C71",
                                                                                fontWeight: 700,
                                                                                fontSize: "18px",
                                                                                borderRadius: "8px",
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                justifyContent: "center",
                                                                            }}
                                                                        >
                                                                            Ahir Samaj
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <span
                                                                    className="fw-bold text-dark small"
                                                                    style={{
                                                                        fontSize: "10px",
                                                                        minHeight: "32px",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    {data.name}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                                {pair.length === 1 && <div className="col-6"></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons (Inside Mobile Carousel) */}
                                <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                                    {/* Previous */}
                                    <button
                                        className="btn btn-light rounded shadow"
                                        type="button"
                                        onClick={handlePrevMobile}
                                        aria-label="Previous slide"
                                    >
                                        <GrFormPrevious aria-hidden="true" />
                                    </button>

                                    {/* Next */}
                                    <button
                                        className="btn btn-light rounded shadow"
                                        type="button"
                                        onClick={handleNextMobile}
                                        aria-label="Next slide"
                                    >
                                        <MdOutlineNavigateNext aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ImageSlider;
