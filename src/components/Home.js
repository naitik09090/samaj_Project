import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Kano from '../images/Kano.webp'
// import { Carousel } from 'react-bootstrap';
import { PiBuildingsBold } from "react-icons/pi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import calendar from "../images/calendar.png"

const Home = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [slock, setSlock] = useState([]);
    const carouselRef = useRef(null);
    const [index, setIndex] = useState(0);
    // const [selectedCard, setSelectedCard] = useState(null);
    const [data4, setData4] = useState([]);
    const { id } = useParams();

    // 👉 NEXT
    const handleNext = () => {
        setIndex((prev) => (prev + 1) % filteredData.length);
    };
    // ⏳ Auto-slide every 10 secs
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 10000);

        return () => clearInterval(timer);
    }, [handleNext]);

    const filteredData = slock?.data?.filter(item => item.id >= 1 && item.id <= 4) ?? [];
    // 👉 PREV
    const handlePrev = () => {
        setIndex((prev) =>
            prev === 0 ? filteredData.length - 1 : prev - 1
        );
    };
    // const navigate = useNavigate()

    // { data: [] }

    // const handleSelect = (selectedIndex) => {
    //     setIndex(selectedIndex);
    // };

    const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";


    // useEffect(() => {
    //     fetch(`${URL}/api/v1/slideshow/`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             console.log("data2",json.data);
    //             setData2(json.data);
    //         })
    //         .catch((err) => console.error(err));
    // }, []);

    // first slider api call
    useEffect(() => {
        const fetchSlides = () => {
            const isMobile = window.innerWidth < 768;
            const viewType = isMobile ? "mobile" : "desktop";

            fetch(`${URL}/api/v1/slideshow?viewtype=${viewType}`)
                .then((res) => res.json())
                .then((json) => setData2(json.data))
                .catch((err) => console.error(err));
        };

        // fetch on first load
        fetchSlides();

        // fetch again when screen size changes
        window.addEventListener("resize", fetchSlides);

        return () => window.removeEventListener("resize", fetchSlides);
    }, []);



    // news api call
    useEffect(() => {
        fetch(`${URL}/api/v1/news/${id}`).then((res) => res.json())
            .then((json) => {
                console.log(json);
                setData4(json);
                console.log("News Data:-", json.data[0])
            })
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        fetch(`${URL}/api/v1/news/`)
            .then((res) => res.json())
            .then((json) => {
                console.log("News list:", json);
                setData4(json);
            })
            .catch((err) => console.error(err));
    }, []);


    // slock api call
    useEffect(() => {
        fetch(`${URL}/api/v1/slokas/`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setSlock(json);
            })
            .catch((err) => console.error(err));
    }, []);

    // useEffect(() => {
    //     fetch(`${URL}/api/v1/history/histories/?id=1`)
    //         .then((res) => res.json())
    //         .then((json) => setData3(json))
    //         .catch((err) => console.error(err));
    //     console.log(data3);
    // }, []);

    // Chunk into groups of 4
    // const chunkArray = (arr, size) => {
    //     const result = [];
    //     for (let i = 0; i < arr.length; i += size) {
    //         result.push(arr.slice(i, i + size));
    //     }
    //     return result;
    // };

    // const logoChunks = chunkArray(data3?.data || [], 4);

    // school api call
    useEffect(() => {
        fetch(`${URL}/api/v1/schools/schools/`)
            .then((res) => res.json())
            .then((json) => setData1(json))
            .catch((err) => console.error(err));
    }, []);

    const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");

    // const handleClick = (data) => {
    //     navigate("/news", { state: { newsData: data } }); // ✅ state pass
    // };

    // Chunk data into sets of 3
    const chunkArray1 = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    // Desktop view school slider
    const cardChunks = chunkArray1(data1.data || [], 5);
    // mobile view school slider
    const cardChunks1 = chunkArray1(data1.data || [], 2);

    // apno_Etiyas no data
    const ideologyData = [
        {
            title: "Unity (એકતા અને ભાઈચારો)",
            text: "We believe every Ahir, whether from any village or region, is part of one family. Our goal is to bring every member of the community on a single platform where we stay connected, informed, and supportive of each other."
        },
        // {
        //     title: "Education for Every Child (દરેક બાળક માટે શિક્ષણ)",
        //     text: "Education is the foundation of progress. Our ideology promotes equal access to quality education for every Ahir student by connecting them with schools, hostels, scholarships, guidance, and opportunities."
        // },
        {
            title: "Preserving Our History & Culture (ઇતિહાસ અને સંસ્કૃતિને સાચવવું)",
            text: "We take pride in our rich heritage — from Shri Krishna’s lineage to our traditions of courage and hard work. This platform helps preserve and share our history, surnames, values, and cultural identity with the next generation."
        },
        {
            title: "Youth Empowerment (યુવા સશક્તિકરણ)",
            text: "Our youth are the future leaders of Ahir Samaj. We encourage skill development, awareness, digital education, and active participation in community events."
        },
        {
            title: "Growth Through Digital Connectivity (ડિજિટલ જોડાણ દ્વારા વૃદ્ધિ)",
            text: "The world is moving fast — information must be accessible. Our ideology is to bring the entire Samaj online so that every child, parent, and elder can access important information anytime, anywhere."
        }
    ];

    // const [expanded, setExpanded] = useState(() => ideologyData.map(() => false));

    // const toggleExpand = (idx) => {
    //     setExpanded((prev) => {
    //         const copy = [...prev];
    //         copy[idx] = !copy[idx];
    //         return copy;
    //     });
    // };
    const truncate = (str, n) => (str && str.length > n ? str.slice(0, n) + "…" : str || "");
    const items = Array.isArray(data4?.data) ? data4.data : [];

    return (
        <>
            <div className='container-fluid'>
                {/* img_Slider */}
                <div className="container-fluid mb-3">
                    {/* <Carousel fade activeIndex={index} onSelect={handleSelect} controls={false} indicators={false} interval={3000}>
                        {Array.isArray(data2) &&
                            data2.map((data, index) => (
                                <Carousel.Item key={data.id ?? index}>
                                    <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: "auto" }}
                                    >
                                        <img
                                            src={data.image?.replace("http://", "https://")}
                                            alt={data.title || "Slideshow image"}
                                            className="d-block"
                                            width={1600}
                                            height={800}
                                            style={{ maxHeight: "auto", objectFit: "cover", borderRadius: "22px" }}
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                    </Carousel> */}

                    {Array.isArray(data2) &&
                        data2.map((data, index) => (
                            <div className="d-flex flex-column justify-content-center align-items-center"
                                style={{ height: "auto" }} key={index.id}>

                                <img
                                    src={data.image?.replace("http://", "https://")}
                                    alt={data.title}
                                    className="d-block"
                                    width={1600}
                                    height={800}
                                    style={{ maxHeight: "auto", objectFit: "cover", borderRadius: "22px" }}
                                    loading="lazy"
                                />
                            </div>
                        ))}

                </div>

                <div className='container-fluid py-5'>
                    <div className='row justify-content-center text-center text-black'>

                        <div className='col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />  {/* ✅ fixed size */}
                            <h2 style={{ minHeight: "40px" }}>100+</h2> {/* ✅ reserve space */}
                            <p>Sanstha StartYear</p>
                        </div>

                        <div className='CoL_B col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>100+</h2>
                            <p>Total Sanstha</p>
                        </div>

                        <div className='CoL_B col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>100+</h2>
                            <p>Total Sanstha Year</p>
                        </div>

                        <div className='CoL_B col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>100+</h2>
                            <p>Total Sanstha Year</p>
                        </div>

                    </div>

                </div>

                {/* About Details */}
                <div className="container-fluid mb-5">

                    {/* ----------------------------
                        DESKTOP: show slider-like single item
                        ---------------------------- */}
                    <div className="d-none d-md-block py-5">
                        {filteredData.map((data, i) =>
                            i === index && (
                                <div key={data.id} className="row justify-content-center align-items-start g-3">
                                    <div className="col-12 col-md-3 img_1_Main text-center">
                                        <img
                                            src={data.sloka_image}
                                            className="img-fluid krishna-img"
                                            alt={`Krishna ${data.id}`}
                                            style={{ objectFit: "contain", width: "auto" }}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="col-12 col-md-8 col-lg-7">
                                        <div className="slock_Bg p-4 mx-auto">
                                            <b className="b_Tages mb-2">
                                                (अध्याय {data.chapter}, श्लोक {data.verse})
                                            </b>

                                            <h2 className="h2_Tages mb-3">{data.sloka_sans}</h2>

                                            <b className="b_Tages mb-2">:: अनुवाद ::</b>

                                            <p className="p_Tages mb-2">{data.sloka_guj}</p>
                                            <p className="p_Tages mb-3">{data.sloka_eng}</p>

                                            <hr />

                                            <p className="p_Tages mb-0">
                                                {data.sloka_origin} — Chapter {data.chapter}, Verse {data.verse}
                                            </p>
                                            <div className="col-12 d-flex justify-content-end py-2">
                                                <button className="btn NandRBtn me-2" onClick={handlePrev}>⟵</button>
                                                <button className="btn NandRBtn" onClick={handleNext}>⟶</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* ----------------------------
                        MOBILE: grid 2-per-row (only visible on sm/xs)
                        ---------------------------- */}
                    {/* <div className="d-block d-md-none">
                        <div className="row g-2">
                            {filteredData.map((data, i) =>
                                i === index && (
                                    <div key={data.id} className="row h-100 justify-content-center align-items-start g-3">
                                        <div className="col-12 col-sm-12 col-md-3 img_1_Main1">
                                            <img
                                                src={data.sloka_image}
                                                className="img-fluid"
                                                alt={`Krishna ${data.id}`}
                                                style={{ objectFit: "contain", width: "auto" }}
                                            />
                                        </div>

                                        <div className="col-12 col-sm-12 h-100">
                                            <div className="slock_Bg1 p-4 mx-auto py-5">
                                                <b className="b_Tages1 d-block mb-2">
                                                    (अध्याय {data.chapter}, श्लोक {data.verse})
                                                </b>

                                                <h2 className="h2_Tages1 mb-3">{data.sloka_sans}</h2>

                                                <b className="b_Tages1 d-block mb-2">:: अनुवाद ::</b>

                                                <p className="p_Tages1 mb-2">{data.sloka_guj}</p>
                                                <p className="p_Tages1 mb-3">{data.sloka_eng}</p>

                                                <hr />

                                                <p className="p_Tages1 mb-0">
                                                    {data.sloka_origin} — Chapter {data.chapter}, Verse {data.verse}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <button className="btn NandRBtn1 me-2" onClick={handlePrev}>⟵</button>
                                            <button className="btn NandRBtn1" onClick={handleNext}>⟶</button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div> */}

                    <div className="d-block d-md-none">
                        <div className="row">
                            {filteredData.map((data, i) =>
                                i === index && (
                                    <div key={data.id} className="row h-100 w-100 mb-3 justify-content-center g-3">

                                        <div className="col-12 col-sm-12 h-100">
                                            <div className="slock_Bg1 text-center p-4 mx-auto">
                                                <b className="b_Tages1 mb-2">
                                                    (अध्याय {data.chapter}, श्लोक {data.verse})
                                                </b>

                                                <h2 className="h2_Tages1 mb-3">{data.sloka_sans}</h2>
                                                <div className="col-12 col-sm-12 col-md-3 img_1_Main1">
                                                    <img
                                                        src={data.sloka_image}
                                                        className="img-fluid"
                                                        alt={`Krishna ${data.id}`}
                                                        style={{ objectFit: "contain", width: "auto" }}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <b className="b_Tages1 mb-2">:: अनुवाद ::</b>

                                                <p className="p_Tages1 mb-2">{data.sloka_guj}</p>
                                                <p className="p_Tages1 mb-3">{data.sloka_eng}</p>

                                                <hr />

                                                <p className="p_Tages1 mb-3">
                                                    {data.sloka_origin} — Chapter {data.chapter}, Verse {data.verse}
                                                </p>
                                                <div className="col-12 d-flex justify-content-center py-2">
                                                    <button className="btn NandRBtn1 me-2" onClick={handlePrev}>⟵</button>
                                                    <button className="btn NandRBtn1" onClick={handleNext}>⟶</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* BANNER SECTION */}
                <div className="container-fluid bG_2"
                >
                    {/* DESKTOP VIEW */}
                    <div className="floating-box container p-4 mb-5 rounded shadow d-none d-md-block">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-10 text-center">
                                <h1 className="fw-bold fs-3 text121 text-white m-0">
                                    આપણી સંસ્થા
                                </h1>
                            </div>

                            <div className="col-md-2 text-end">
                                <button type="button" className="btn btn-success">
                                    View All
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Desktop view */}
                    <div className="d-none d-md-block mb-3">
                        <div id="schoolCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000" ref={carouselRef}>
                            <div className="carousel-inner">
                                {cardChunks.map((chunk, index) => (
                                    <div key={`chunk-${index}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <div className="row justify-content-center">
                                            {chunk.map((data) => (
                                                <div key={data.id} className="col-md-2 col-sm-6 col-6 p-3">
                                                    <Link to={`/school/${data.id}`} className="text-decoration-none text-dark">
                                                        <div
                                                            className="shadow-sm h-100 d-flex flex-column justify-content-between align-items-center text-center"
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderRadius: "15px",
                                                                padding: "10px",
                                                                backgroundColor: "#fff",
                                                            }}
                                                        >
                                                            {data.logo ? (
                                                                <img
                                                                    src={secureUrl(data.logo)}
                                                                    className="rounded-1 mb-1"
                                                                    alt={"Ahir Samaj"}
                                                                    style={{ width: "100%", height: 180, objectFit: "contain" }}
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="rounded-1 h-100 mb-1 d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        background: "#ffffff",
                                                                        color: "#067C71",
                                                                        fontWeight: 700,
                                                                        fontSize: "20px",
                                                                        borderRadius: "8px"
                                                                    }}
                                                                >
                                                                    Ahir Samaj
                                                                </div>
                                                            )}
                                                            <span className="fw-bold text-dark text-center" style={{ fontSize: 14 }}>{data.name}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Optional: carousel controls (desktop only) */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#schoolCarousel" data-bs-slide="prev" style={{ width: 50 }}>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#schoolCarousel" data-bs-slide="next" style={{ width: 50 }}>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    {/* MOBILE VIEW */}
                    <div className="floating-box1 container p-3 rounded shadow d-block d-md-none">
                        <div className="row text-center">
                            <div className="col-12 mb-2">
                                <h1 className="fw-bold h2 fs-5 m-0">
                                    આપણી સંસ્થા
                                </h1>
                            </div>

                            <div className="col-12">
                                <button type="button" className="btn btn-success">
                                    View All
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* ------------------ MOBILE: 2 cards per slide carousel ------------------ */}
                    <div className="d-block d-md-none w-100">
                        <div
                            id="mobileSchoolCarousel"
                            className="carousel slide"
                            data-bs-ride="carousel"
                            data-bs-interval="4000"
                        >
                            <div className="carousel-inner">

                                {cardChunks1.map((pair, idx) => (
                                    <div
                                        key={idx}
                                        className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                    >
                                        <div className="row gx-2 gy-2 px-1">

                                            {pair.map((data) => (
                                                <div key={data.id} className="col-6">
                                                    <Link
                                                        to={`/school/${data.id}`}
                                                        className="text-decoration-none text-dark d-block h-100"
                                                    >
                                                        <div
                                                            className="shadow-sm bg-white d-flex flex-column align-items-center text-center h-100"
                                                            style={{
                                                                borderRadius: "14px",
                                                                padding: "10px",
                                                                minHeight: "200px",
                                                            }}
                                                        >

                                                            {/* Logo */}
                                                            <div
                                                                style={{
                                                                    height: "90px",
                                                                    width: "100%",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    marginBottom: "6px",
                                                                }}
                                                            >
                                                                <img
                                                                    src={secureUrl(data.logo)}
                                                                    alt="logo"
                                                                    style={{
                                                                        maxHeight: "80px",
                                                                        maxWidth: "100%",
                                                                        objectFit: "contain",
                                                                    }}
                                                                    loading='lazy'
                                                                />
                                                            </div>

                                                            {/* Name */}
                                                            <div
                                                                className="fw-bold"
                                                                style={{
                                                                    fontSize: "12px",
                                                                    minHeight: "36px",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                {data.name}
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}

                                            {pair.length === 1 && <div className="col-6" />}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>



                    {/* Bottom Info + Buttons */}
                    <div className="row mb-3">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="d-flex justify-content-center align-items-center gap-2">

                                <button
                                    className="btn btn-light rounded shadow"
                                    type="button"
                                    data-bs-target="#mobileSchoolCarousel"
                                    data-bs-slide="prev"
                                >
                                    <GrFormPrevious aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                <button
                                    className="btn btn-light rounded shadow"
                                    type="button"
                                    data-bs-target="#mobileSchoolCarousel"
                                    data-bs-slide="next"
                                >
                                    <MdOutlineNavigateNext aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Ideology Section */}
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* LEFT TEXT SECTION */}
                    <div className="col-md-8">
                        <h1 className="fw-bold text-center">Ideology <br /> (અમારી વિચારસરણી)</h1>
                        <p className="text-center">Our ideology is built on the principles that have guided the Ahir community for generations — <b> Unity, Education, Culture, and Service.</b></p>
                        <p className="text-center">We believe that a strong community is created when every member grows together, supports each other,
                            and preserves the values passed down by our ancestors.</p>
                        <div className="d-none d-md-block">
                            <div className="row g-4 justify-content-center">

                                {ideologyData.map((item, index) => (
                                    <div className="col-md-6 d-flex justify-content-center" key={index.id}>
                                        <div
                                            className="card shadow-sm rounded-4 border-0"
                                            style={{ width: "100%", maxWidth: "300px" }}
                                        >
                                            <div className="card-body d-flex flex-column text-center">

                                                <h5 className="fw-bold mb-2">{item.title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>


                        {/* ---------------- MOBILE (xs-sm) - compact 2-per-row layout ---------------- */}
                        <div className="d-block d-md-none">
                            <div className="row g-3 justify-content-center">
                                {ideologyData.map((item, index) => (
                                    <div className="col-6" key={index.id}>
                                        <div className="mobile-card shadow-sm">
                                            <div className="content-box">
                                                <b className="title h6">
                                                    {truncate(item.title, 70)}
                                                </b>

                                                {/* <p className="description">
                                                    {expanded[index] ? item.text : truncate(item.text, 30)}
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    {/* RIGHT IMAGE SECTION */}
                    <div className="col-md-4 text-center mt-4 mt-lg-0">
                        <picture>
                            <source
                                srcSet={Kano?.replace(/^http:\/\//i, "https://").replace(/\.(png|jpg|jpeg)$/i, ".webp")}
                                type="image/webp"
                                loading="lazy"
                            />
                            <img
                                src={Kano?.replace(/^http:\/\//i, "https://")}
                                alt="Lord Krishna"
                                className="img-fluid2"
                                width="400"   // keeps aspect ratio
                                height="600"
                                style={{ borderRadius: "16px" }}
                                loading="lazy"
                            />
                        </picture>
                    </div>
                </div>
            </div>

            {/* Youtube video */}
            <div className="container-fluid text-center p-3">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="ratio ratio-16x9" style={{ maxWidth: '1600px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                            <iframe
                                src="https://www.youtube.com/embed/xby0-Ecnjw0?list=RDxby0-Ecnjw0"
                                title="Aditya Gadhavi | Shamaliyo"
                                FrameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest News Section */}
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 justify-content-center text-center'>
                        <h1>લેટેસ્ટ ન્યૂઝ</h1>
                        {/* ---------------- DESKTOP (md+) - show full grid (4 per row) ---------------- */}
                        <div className="d-none d-md-block">
                            <div className="row py-4">
                                {items.map((data) => (
                                    <div className="col-md-6 col-lg-3" key={data.id}>
                                        <div className="Main-Card_1 shadow-sm p-1 h-100 d-flex flex-column">
                                            <img
                                                src={secureUrl(data.images[0].image)}
                                                className="Main-Card_2 mb-2"
                                                // alt={`${data.name} image`}
                                                alt='Desktop View Img'
                                                loading="lazy"
                                                style={{
                                                    objectFit: "contain", // fill to full img show
                                                    backgroundColor: "#f3f3f3",
                                                    borderRadius: "20px",
                                                    width: "100%",
                                                    height: 200,         // consistent card image height on desktop
                                                }}
                                            />
                                            <div className="card-body1 d-flex flex-column" style={{ minHeight: 200 }}>
                                                <p className="text-start text-muted mb-2" style={{ fontSize: 14 }}>
                                                    <img src={calendar} className="claendar_Icon" loading="lazy" height={18} width={18} alt="calendar" />

                                                    {new Date(data?.published_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                <h6 className="text-start title-line-1 h-100" style={{ marginBottom: 8 }}>{data.title}</h6>
                                                <p className="text-muted text-start title-content-2" style={{ flexGrow: 1 }}>
                                                    {typeof data.content === "string" ? (data.content.length > 140 ? data.content.slice(0, 140) + "…" : data.content) : ""}
                                                </p>

                                                {/* ALWAYS BOTTOM BUTTON */}
                                                <div className="mt-auto">
                                                    <hr />
                                                    <Link
                                                        to={`/latest/${data.id}`}
                                                        className="text-decoration-none w-100"
                                                        aria-label={`Read full article: ${data.title}`}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-between px-2 py-3">
                                                            <span className="text-dark fw-semibold">Learn More</span>
                                                            <FaArrowRightLong className="text-dark" aria-hidden="true" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ---------------- MOBILE (xs-sm) - compact 2-per-row ---------------- */}
                        <div className="d-block d-md-none">
                            <div className="row py-3 gx-2 gy-3">
                                {items.map((data) => (
                                    <div className="col-6" key={data.id}>
                                        <div className="Main-Card_1 p-1 shadow-sm d-flex flex-column">
                                            <div>
                                                <img
                                                    src={secureUrl(data.images[0].image)}
                                                    className="Main-Card_2 mb-1"
                                                    // alt={`${data.name} image`}
                                                    alt="Mobile view img"
                                                    loading="lazy"
                                                    style={{
                                                        objectFit: "contain",
                                                        backgroundColor: "#067C71",
                                                        borderRadius: "22px",
                                                        width: "100%",
                                                        height: 110,
                                                    }}
                                                />
                                            </div>
                                            <div className="card-body1 d-flex flex-column" style={{ padding: "8px" }}>
                                                <p className="text-start text-muted mb-1" style={{ fontSize: 12 }}>
                                                    <img src={calendar} className="claendar_Icon" loading="lazy" height={16} width={16} alt="calendar" />
                                                    {new Date(data?.published_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                <h1 className="h6 text-start title-line-1" style={{ fontSize: 14 }}>
                                                    {data.title.length > 60 ? data.title.slice(0, 60) + "…" : data.title}
                                                </h1>

                                                <p className="text-muted text-start small" style={{ fontSize: 12 }}>
                                                    {typeof data.content === "string" ? (data.content.length > 40 ? data.content.slice(0, 30) + "…" : data.content) : ""}
                                                </p>

                                                <div className="mt-auto">
                                                    <hr />
                                                    <div className="d-flex align-items-center justify-content-between px-2">
                                                        <Link
                                                            to={`/latest/${data.id}`}
                                                            className="learn_BTn1 text-decoration-none"
                                                            aria-label={`Learn more about ${data.title}`}
                                                        >
                                                            Learn More <FaArrowRightLong />
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <h1>Get Updated <br />
                            From Our News & Insights</h1> */}
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className="container">
                    {/* <div className='row'>
                        {cardChunks.map((chunk, index) => (
                            <div
                                key={`chunk-${index}`}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <div className="row justify-content-center">
                                    {chunk.map((data) => (
                                        <div key={data.id} className="col-md-3 col-sm-6 p-3">
                                            <Link to={`/school/${data.id}`} className="text-decoration-none text-dark">
                                                    <div className="col-md-12">
                                                        <button className="btn btn-primary mb-3 w-100">
                                                            {data.name}
                                                        </button>
                                                    </div>
                                            </Link>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        ))}
                    </div> */}
                    <div className="container my-5">
                        {/* Carousel */}
                        {/* <div id="schoolCarousel1" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000" ref={carouselRef}>
                            <div
                                id="schoolCarousel1"
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    {selectedCard && (
                                        <div
                                            className="modal fade show"
                                            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                                            onClick={() => setSelectedCard(null)}
                                        >
                                            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">{selectedCard.categories}</h5>
                                                        <button className="btn-close" onClick={() => setSelectedCard(null)}></button>
                                                    </div>

                                                    <div className="modal-body">
                                                        <p><b>Description:</b> {selectedCard.description}</p>
                                                        <p><b>Categories:</b> {selectedCard.categories}</p>
                                                        <p><b>Tags:</b> {selectedCard.tags}</p>
                                                        <p><b>Created:</b> {selectedCard.created_at}</p>
                                                        <p><b>Updated:</b> {selectedCard.updated_at}</p>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button className="btn btn-secondary" onClick={() => setSelectedCard(null)}>Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div> */}
                        {/* <div className='row justify-content-center text-center mb-5'>
                            <div className="col-md-3 m-4 position-relative d-flex align-items-center justify-content-center text-white rounded shadow-sm" style={{ maxWidth: '30rem' }}>
                                <div
                                    className="position-absolute bottom-0 d-flex align-items-center justify-content-around px-2 py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                                    style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                                >
                                    <p className="mb-0 text-center text-light">Learn More</p>
                                    <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                                <img
                                    className="rounded"
                                    src={img1?.replace(/^http:\/\//i, "https://")}
                                    alt="girlWithHeadphone"
                                    width={800}    // ✅ actual width
                                    height={600}   // ✅ actual height
                                    loading="lazy" // ✅ lazy load
                                    style={{ width: "800px", height: "auto", borderRadius: "0.375rem" }}
                                />

                            </div>
                            <div className="col-md-3 m-4 position-relative d-flex align-items-center justify-content-center text-white rounded shadow-sm" style={{ maxWidth: '30rem' }}>
                                <div
                                    className="position-absolute bottom-0 d-flex align-items-center justify-content-around px-2 py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                                    style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                                >
                                    <p className="mb-0 text-center text-light">Learn More</p>
                                    <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                                <img
                                    className="rounded"
                                    src={img1?.replace(/^http:\/\//i, "https://")}
                                    alt="girlWithHeadphone"
                                    width={800}    // ✅ actual width
                                    height={600}   // ✅ actual height
                                    loading="lazy" // ✅ lazy load
                                    style={{ width: "800px", height: "auto", borderRadius: "0.375rem" }}
                                />

                            </div>
                            <div className="col-md-3 m-4 position-relative d-flex align-items-center justify-content-center text-white rounded shadow-sm" style={{ maxWidth: '30rem' }}>
                                <div
                                    className="position-absolute bottom-0 d-flex align-items-center justify-content-around px- py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                                    style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                                >
                                    <p className="mb-0 text-center text-light">Learn More</p>
                                    <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                                <img
                                    className="rounded"
                                    src={img1?.replace(/^http:\/\//i, "https://")}
                                    alt="girlWithHeadphone"
                                    width={800}    // ✅ actual width
                                    height={600}   // ✅ actual height
                                    loading="lazy" // ✅ lazy load
                                    style={{ width: "800px", height: "auto", borderRadius: "0.375rem" }}
                                />

                            </div>
                        </div> */}

                        {/* Custom Prev/Next Buttons */}
                        {/* <div className="d-flex justify-content-center gap-2 mt-4">
                            <button
                                className="btn btn-light rounded shadow"
                                type="button"
                                data-bs-target="#schoolCarousel1"
                                data-bs-slide="prev"
                            >
                                <GrFormPrevious aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button
                                className="btn btn-light rounded shadow"
                                type="button"
                                data-bs-target="#schoolCarousel1"
                                data-bs-slide="next"
                            >
                                <MdOutlineNavigateNext aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div> */}
                    </div>

                </div>

            </div>
            {/* <div className="container-fluid">
                <div className='row justify-content-center text-center py-3'>
                    <div className="col-md-3 position-relative d-flex align-items-center justify-content-center text-white rounded">
                        <div
                            className="position-absolute bottom-0 d-flex align-items-center justify-content-around px-2 py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                            style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                        >
                            <p className="mb-0 text-center text-light">Learn More</p>
                            <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <FaArrowRightLong />
                            </button>
                        </div>
                        <img
                            className="rounded"
                            src={img1?.replace(/^http:\/\//i, "https://")}
                            alt="girlWithHeadphone"
                            loading="lazy"
                            style={{ width: "auto", height: "auto", borderRadius: "0.375rem" }}
                        />
                        <img
                                                    src={secureUrl(data.images[0].image)}
                                                    className="card-img-top"
                                                    alt={`${data.name} image`}
                                                    style={{ height: "300px" }}
                                                />

                    </div>
                    <div className="col-md-3 position-relative d-flex align-items-center justify-content-center text-white rounded">
                        <div
                            className="position-absolute bottom-0 d-flex align-items-center justify-content-around px-2 py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                            style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                        >
                            <p className="mb-0 text-center text-light">Learn More</p>
                            <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <FaArrowRightLong />
                            </button>
                        </div>
                        <img
                            className="rounded"
                            src={img1?.replace(/^http:\/\//i, "https://")}
                            alt="girlWithHeadphone"
                            loading="lazy"
                            style={{ width: "auto", height: "auto", borderRadius: "0.375rem" }}
                        />

                    </div>
                    <div className="col-md-3 position-relative d-flex align-items-center justify-content-center text-white rounded">
                        <div
                            className="position-absolute bottom-0 d-flex align-items-center justify-content-around px-2 py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                            style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                        >
                            <p className="mb-0 text-center text-light">Learn More</p>
                            <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <FaArrowRightLong />
                            </button>
                        </div>
                        <img
                            className="rounded"
                            src={img1?.replace(/^http:\/\//i, "https://")}
                            alt="girlWithHeadphone"
                            loading="lazy"
                            style={{ width: "auto", height: "auto", borderRadius: "0.375rem" }}
                        />

                    </div>
                    <div className="col-md-3 position-relative d-flex align-items-center justify-content-center text-white rounded">
                        <div
                            className="position-absolute bottom-0 d-flex align-items-center justify-content-around px-2 py-2 bg-white bg-opacity-10 border border-white border-opacity-25 rounded"
                            style={{ backdropFilter: 'blur(10px)', width: '95%' }}
                        >
                            <p className="mb-0 text-center text-light">Learn More</p>
                            <button type="button" className="btn btn-dark btn-md px-5 rounded-pill" aria-label="Start free trial" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <FaArrowRightLong />
                            </button>
                        </div>
                        <img
                            className="rounded"
                            src={img1?.replace(/^http:\/\//i, "https://")}
                            alt="girlWithHeadphone"
                            loading="lazy"
                            style={{ width: "auto", height: "auto", borderRadius: "0.375rem" }}
                        />

                    </div>
                </div>
            </div> */}
        </>
    )
}
export default Home