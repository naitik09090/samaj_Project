import React, { useState, useEffect } from 'react';
// import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Kano from '../images/Kano.webp'
import { PiBuildingsBold } from "react-icons/pi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import calendar from "../images/calendar.png"



const Home = () => {
    const [data1, setData1] = useState([]),
        [data2, setData2] = useState([]),
        [slock, setSlock] = useState([]),
        [index, setIndex] = useState(0),
        [data4, setData4] = useState([]),
        [schoolTypes, setSchoolTypes] = useState([]),
        [selectedSchoolType, setSelectedSchoolType] = useState(null),
        [activeDesktopIndex, setActiveDesktopIndex] = useState(0),
        [activeMobileIndex, setActiveMobileIndex] = useState(0),
        [filteredData1, setFilteredData1] = useState([]),
        [school, setSchool] = useState(null),
        { id } = useParams();
    // carouselRef = useRef(null),
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedOption, setSelectedOption] = useState("All");
    // const [subOption, setSubOption] = useState("");

    const filteredData = slock?.data?.filter(t => t.id >= 1 && t.id <= 4) ?? [];

    // 👉 NEXT
    const handleNext = () => {
        setIndex(e => (e + 1) % filteredData.length)
    };

    // 👉 PREV
    const handlePrev = () => {
        setIndex(e => 0 === e ? filteredData.length - 1 : e - 1)
    };

    // 👉 AUTO-ROTATE EVERY 4 SECONDS
    useEffect(() => {
        if (filteredData.length === 0) return;
        const interval = setInterval(() => {
            setIndex(e => (e + 1) % filteredData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [filteredData.length]);
    // const slideCarousel = (direction) => {
    //     const isMobile = window.innerWidth < 768;
    //     const carouselId = isMobile
    //         ? "mobileSchoolCarousel"
    //         : "desktopSchoolCarousel";

    //     const el = document.getElementById(carouselId);
    //     if (!el) return;

    //     const carousel = Carousel.getOrCreateInstance(el, {
    //         interval: false,
    //         ride: false,
    //     });

    //     direction === "next" ? carousel.next() : carousel.prev();
    // };




    const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";

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
    /* The above code is written in JavaScript and utilizes the useEffect hook from React. */
    // useEffect(() => {
    //     fetch(`${URL}/api/v1/news/${id}`).then((res) => res.json())
    //         .then((json) => {
    //             console.log(json);
    //             setData4(json);
    //             console.log("News Data:-", json.data[0])
    //         })
    //         .catch((err) => console.error(err));
    // }, [id]);

    // useEffect(() => {
    //     fetch(`${URL}/api/v1/news/`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             console.log("News list:", json);
    //             setData4(json);
    //         })
    //         .catch((err) => console.error(err));
    // }, []);

    useEffect(() => {
        const endpoint = id
            ? `${URL}/api/v1/news/${id}`
            : `${URL}/api/v1/news/`;

        fetch(endpoint)
            .then(res => res.json())
            .then(json => setData4(json))
            .catch(console.error);
    }, [id]);


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

    // school api call
    useEffect(() => {
        fetch(`${URL}/api/v1/schools/schools/`)
            .then((res) => res.json())
            .then((json) => {
                setData1(json);
                setFilteredData1(json);
                // Extract unique school types from the data
                const types = [...new Set(json.data?.map(school => school.school_type).filter(Boolean))].sort();
                setSchoolTypes(types);
            })
            .catch((err) => console.error(err));
    }, []);
    useEffect(() => {
        const all = data1?.data || [];
        if (selectedSchoolType == null) {
            setFilteredData1({ ...data1, data: all });
            return;
        }
        const filtered = all.filter(item => item.school_type === selectedSchoolType);
        setFilteredData1({ ...data1, data: filtered });
    }, [selectedSchoolType, data1]);

    // Search API call with school_type and search term
    // useEffect(() => {
    //     if (!searchTerm.trim()) {
    //         // If no search term, use the type filter logic
    //         const all = data1?.data || [];
    //         if (selectedSchoolType == null) {
    //             setFilteredData1({ ...data1, data: all });
    //         } else {
    //             const filtered = all.filter(item => item.school_type === selectedSchoolType);
    //             setFilteredData1({ ...data1, data: filtered });
    //         }
    //         return;
    //     }

    //     // Call search API with school_type parameter
    //     // let searchUrl = `${URL}/api/v1/schools/schools/?search=${encodeURIComponent(searchTerm)}`;
    //     if (selectedSchoolType != null) {
    //         // searchUrl += `&school_type=${encodeURIComponent(selectedSchoolType)}`;
    //     }

    //     fetch(searchUrl)
    //         .then(res => res.json())
    //         .then(json => setFilteredData1(json))
    //         .catch(err => console.error("Search error:", err));
    // }, [selectedSchoolType]);

    // Fetch single school
    useEffect(() => {
        if (!id) {
            setSchool(null);
            console.log(school);
            return;
        }
        fetch(`${URL}/api/v1/schools/schools/${id}`)
            .then((res) => res.json())
            .then((result) => setSchool(result?.data ?? result))
            .catch((err) => console.error("Error fetching school:", err));
    }, [id]);

    // Extract data array (your API returns { data: [...] })

    // useEffect(() => {
    //     const allData = data1?.data || [];
    //     const all = allData;

    //     if (selectedOption === "All") {
    //         setFilteredData1({ ...data1, data: all });
    //         return;
    //     }

    //     if (!subOption) return; // wait until user selects sub option

    //     console.log(setSubOption);

    //     const filtered = all.filter(
    //         (item) => item[selectedOption] === subOption
    //     );

    //     setFilteredData1({ ...data1, data: filtered });
    // }, [selectedOption, subOption, data1]);

    // const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");
    // const secureUrl = e => e ? e.replace(/^http:\/\//i, ".webp") : "";
    const secureUrl = (url = "") =>
        url.startsWith("http://")
            ? url.replace("http://", "https://")
            : url;
    // Mapping of API school types to Gujarati display names
    const schoolTypeLabels = {
        "Ahir Boarding": "આહીર બોર્ડિંગ",
        "Ahir Charitable Trust": "આહિર ચેરિટેબલ ટ્રસ્ટ",
        "KANYA CHHATRALAYA": "કન્યા છત્રાલય",
        "CHHATRALAYA": "છત્રાલય",
        "Ahir Kalyan Mandal": "આહિર કેળવણી મંડળ",
        "Ahir Samaj": "આહીર સમાજ વાડી",
    };

    // const handleClick = (data) => {
    //     navigate("/news", { state: { newsData: data } }); // ✅ state pass
    // };

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

    const itemsArr = filteredData1?.data || [];
    const cardWindowsDesktop = makeSlidingWindows(itemsArr, 5);
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

    // apno_Etiyas no data
    const ideologyData = [
        {
            title: "Unity <br /> (એકતા અને ભાઈચારો)",
            text: "We believe every Ahir, whether from any village or region, is part of one family. Our goal is to bring every member of the community on a single platform where we stay connected, informed, and supportive of each other."
        },
        // {
        //     title: "Education for Every Child (દરેક બાળક માટે શિક્ષણ)",
        //     text: "Education is the foundation of progress. Our ideology promotes equal access to quality education for every Ahir student by connecting them with schools, hostels, scholarships, guidance, and opportunities."
        // },
        {
            title: "Preserving Our History & Culture <br /> (ઇતિહાસ અને સંસ્કૃતિને સાચવવું)",
            text: "We take pride in our rich heritage — from Shri Krishna’s lineage to our traditions of courage and hard work. This platform helps preserve and share our history, surnames, values, and cultural identity with the next generation."
        },
        {
            title: "Youth Empowerment <br /> (યુવા સશક્તિકરણ)",
            text: "Our youth are the future leaders of Ahir Samaj. We encourage skill development, awareness, digital education, and active participation in community events."
        },
        {
            title: "Growth Through Digital Connectivity <br /> (ડિજિટલ જોડાણ દ્વારા વૃદ્ધિ)",
            text: "The world is moving fast — information must be accessible. Our ideology is to bring the entire Samaj online so that every child, parent, and elder can access important information anytime, anywhere."
        }
    ];

    // const truncate = (t, a) => t && t.length > a ? t.slice(0, a) + "…" : t || ""
    const items = Array.isArray(data4?.data) ? data4.data : [];

    return (
        <>
            <div className='container-fluid'>
                {/* img_Slider */}
                <div className="container-fluid mb-3">
                    {Array.isArray(data2) &&
                        data2.map((data, idx) => (
                            <div className="d-flex flex-column justify-content-center align-items-center"
                                style={{ height: "100%" }} key={data?.id ?? idx}>

                                <img
                                    src={secureUrl(data.image)}
                                    alt={data.title}
                                    className="d-block"
                                    loading="eager"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                        borderRadius: "22px"
                                    }}
                                />
                                {/* <picture>
                                    <source srcSet={secureUrl(data.image_webp)} type="image/webp" />
                                    <img
                                        src={secureUrl(data.image)}
                                        alt={data.title}
                                        loading="lazy"
                                        style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "22px" }}
                                    />
                                </picture> */}

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
                                <div key={data.id} className="row justify-content-center align-items-start g-3" data-bs-interval="2000">
                                    <div className='col-md-10'>
                                        <div className='row'>
                                            <div className='col-md-12 slokaBox_BG col-12 d-flex'>
                                                <div className='col-md-3 d-flex justify-content-start align-items-start'>
                                                    <div className="imgBox">
                                                        <img
                                                            src={data.sloka_image}
                                                            alt={`Krishna ${data.id}`}
                                                            loading="lazy"
                                                            className="krishna-img"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className='col-md-1'></div> */}
                                                <div className="col-md-9">
                                                    <div className="slokaBox text-white p-5">
                                                        <b className="b_Tages mb-2">
                                                            (अध्याय {data.chapter}, श्लोक {data.verse})
                                                        </b>

                                                        <h2 className="h2_Tages mb-2">{data.sloka_sans}</h2>

                                                        <b className="b_Tages mb-1">:: अनुवाद ::</b>

                                                        <div className="contentArea">
                                                            <p className="p_Tages mb-2">{data.sloka_guj}</p>
                                                            <p className="p_Tages mb-0">{data.sloka_eng}</p>
                                                        </div>

                                                        <hr />

                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p className="p_Tages mb-0">
                                                                {data.sloka_origin} — Chapter {data.chapter}, Verse {data.verse}
                                                            </p>

                                                            <div className='BtnSlock'>
                                                                <button className="btn NandRBtn me-2" onClick={handlePrev}>
                                                                    <GrFormPrevious />
                                                                </button>
                                                                <button className="btn NandRBtn" onClick={handleNext}>
                                                                    <MdOutlineNavigateNext />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-12 col-md-3 col-lg-3 img_1_Main text-center">
                                        <img
                                            src={data.sloka_image}
                                            className="img-fluid krishna-img"
                                            alt={`Krishna ${data.id}`}
                                            style={{ objectFit: "contain", width: "auto" }}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="col-12 col-md-8 col-lg-7">
                                        <div className="slock_Bg h-100 p-4">
                                            <b className="b_Tages mb-2">
                                                (अध्याय {data.chapter}, श्लोक {data.verse})
                                            </b>

                                            <h2 className="h2_Tages mb-2">{data.sloka_sans}</h2>

                                            <b className="b_Tages mb-1">:: अनुवाद ::</b>

                                            <p className="p_Tages mb-0 py-2">{data.sloka_guj}</p>
                                            <p className="p_Tages mb-0">{data.sloka_eng}</p>

                                            <hr />

                                            <p className="p_Tages mb-0">
                                                {data.sloka_origin} — Chapter {data.chapter}, Verse {data.verse}
                                            </p>
                                            <div className="col-12 d-flex m-0 justify-content-end">
                                                <button className="btn NandRBtn me-2" onClick={handlePrev}><GrFormPrevious aria-hidden="true" /></button>
                                                <button className="btn NandRBtn" onClick={handleNext}><MdOutlineNavigateNext aria-hidden="true" /></button>
                                            </div>
                                        </div>
                                    </div> */}
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
                                    <div key={data.id} className="row h-100 w-100 mb-5 justify-content-center g-0">

                                        <div className="col-12 col-sm-12 h-100">
                                            <div className="slock_Bg1 text-center p-4 ">
                                                <b className="b_Tages1 w-100 p-2 mb-3">
                                                    (अध्याय {data.chapter}, श्लोक {data.verse})
                                                </b>

                                                <h2 className="h2_Tages1 py-3">{data.sloka_sans}</h2>
                                                <div className="col-12 col-sm-12 col-md-3 py-2 img_1_Main1 mx-auto">
                                                    <img
                                                        src={data.sloka_image}
                                                        className="krishna-img-mobile"
                                                        alt={`Krishna ${data.id}`}
                                                        style={{ objectFit: "contain", width: "auto", height: "300px" }}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <b className="b_Tages1 w-100 p-2 mb-2">:: अनुवाद ::</b>

                                                <p className="p_Tages1 my-3 mb-2">{data.sloka_guj}</p>
                                                <p className="p_Tages1 mb-3">{data.sloka_eng}</p>

                                                <hr />

                                                <p className="p_Tages1 mb-3">
                                                    {data.sloka_origin} — Chapter {data.chapter}, Verse {data.verse}
                                                </p>
                                                <div className="col-12 d-flex justify-content-center py-2">
                                                    <button className="btn NandRBtn1 me-2" aria-label="Search schools" onClick={handlePrev}><GrFormPrevious /></button>
                                                    <button className="btn NandRBtn1" aria-label="Search schools" onClick={handleNext}><MdOutlineNavigateNext /></button>
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
                <div className="container-fluid bG_2">
                    {/* DESKTOP VIEW */}
                    <div className="floating-box container p-4 mb-5 rounded shadow d-none d-md-block">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-10 text-center">
                                <h1 className="fw-bold fs-3 text121 text-white m-0">
                                    આપણી સંસ્થા
                                </h1>
                            </div>

                            <div className="col-md-2 text-end">
                                <a href='/ImageSlider'>
                                    <button type="button" className="btn btn-success">
                                        View All
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Desktop View */}
                    <div className="d-none d-md-block">
                        {/* Filter Buttons - Outside Carousel */}
                        <div className="row justify-content-center align-items-center mb-4">
                            {/* All Button */}
                            <div className="col-auto">
                                <button
                                    onClick={() => setSelectedSchoolType(null)}
                                    className="btn text-white"
                                    style={{
                                        backgroundColor: selectedSchoolType === null ? "#EFA325" : "#038176",
                                        border: `2px solid ${selectedSchoolType === null ? "#067C71" : "#ffffff"}`,
                                        borderRadius: "22px",
                                        height: "60px",
                                        minWidth: "120px",
                                        whiteSpace: "normal",
                                        fontSize: "14px",
                                        transition: "all 0.3s ease",
                                        boxShadow: selectedSchoolType === null ? "0 0 8px rgba(6, 124, 113, 0.5)" : "none",
                                        fontWeight: selectedSchoolType === null ? "bold" : "normal",
                                    }}
                                >
                                    ઓલ સ્કૂલ
                                </button>
                            </div>

                            {/* School Type Buttons */}
                            {schoolTypes.length > 0 ? schoolTypes.map((type) => (
                                <div className="col-auto" key={type}>
                                    <button
                                        onClick={() => setSelectedSchoolType(type)}
                                        className="btn text-white"
                                        style={{
                                            backgroundColor: selectedSchoolType === type ? "#EFA325" : "#038176",
                                            border: `2px solid ${selectedSchoolType === type ? "#067C71" : "#ffffff"}`,
                                            borderRadius: "22px",
                                            height: "60px",
                                            minWidth: "120px",
                                            whiteSpace: "normal",
                                            fontSize: "14px",
                                            transition: "all 0.3s ease",
                                            boxShadow: selectedSchoolType === type ? "0 0 8px rgba(6, 124, 113, 0.5)" : "none",
                                            fontWeight: selectedSchoolType === type ? "bold" : "normal",
                                        }}
                                    >{schoolTypeLabels[type] || type}
                                    </button>
                                </div>
                            )) : null}
                        </div>

                        {/* Carousel with School Cards Only */}
                        {cardWindowsDesktop.length > 0 ? (
                            cardWindowsDesktop.map((chunk, index) => (
                                <div
                                    key={index}
                                    className={`${index === activeDesktopIndex ? "" : "d-none"}`}
                                >
                                    <div className="row justify-content-center g-3 mb-4">
                                        {chunk.map((data) => (
                                            <div key={data.id} className="col-md-2 col-lg-2">
                                                <Link to={`/school/${data.id}`} className="text-decoration-none text-dark">
                                                    <div
                                                        className="shadow-sm h-100 d-flex flex-column justify-content-between align-items-center text-center"
                                                        style={{
                                                            borderRadius: "15px",
                                                            padding: "20px",
                                                            backgroundColor: "#fff",
                                                            minHeight: "240px",
                                                        }}
                                                    >
                                                        {data.logo ? (
                                                            <img
                                                                src={secureUrl(data.logo)}
                                                                alt="logo School"
                                                                className="rounded-1 mb-3"
                                                                style={{ height: "150px", width: "100%", objectFit: "contain" }}
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="rounded-1 d-flex align-items-center justify-content-center mb-3"
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
                                                        <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>{data.name}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <p>No results found.</p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="d-flex justify-content-center align-items-center gap-2 my-3">
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

                    {/* Mobile VIEW */}
                    <div className="floating-box1 container p-4 shadow d-block d-md-none">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-12 text-center">
                                <h1 className="fw-bold fs-3 m-0 mb-2 floating-title">
                                    આપણી સંસ્થા
                                </h1>
                            </div>

                            <div className="col-md-12 text-center">
                                <a href='/ImageSlider'>
                                    <button type="button" className="btn btn-success">
                                        View All
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="d-block d-md-none">
                        <div id="mobileSchoolCarousel" className="carousel slide" data-bs-interval="4000">
                            <div className="carousel-inner">
                                {cardWindowsMobile.map((pair, idx) => (
                                    <div key={idx} className={`carousel-item ${idx === activeMobileIndex ? "active" : ""}`}>
                                        <div className="d-flex d-md-none py-3 overflow-auto gap-2 px-1" style={{ scrollbarWidth: "none" }}>

                                            {/* All Button */}
                                            <button
                                                onClick={() => setSelectedSchoolType(null)}
                                                className="btn flex-shrink-0"
                                                style={{
                                                    minWidth: "130px",
                                                    height: "50px",
                                                    backgroundColor: selectedSchoolType === null ? "#EFA325" : "#038176",
                                                    color: selectedSchoolType === null ? "#1A1A1A" : "#FFFFFF", // ✅ FIX
                                                    border: `2px solid ${selectedSchoolType === null ? "#067C71" : "#ffffff"}`,
                                                    borderRadius: "22px",
                                                    fontSize: "13px",
                                                    fontWeight: selectedSchoolType === null ? "bold" : "normal",
                                                }}
                                            >
                                                ઓલ સ્કૂલ
                                            </button>



                                            {/* School Type Buttons */}
                                            {schoolTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setSelectedSchoolType(type)}
                                                    className="btn flex-shrink-0"
                                                    style={{
                                                        minWidth: "130px",
                                                        height: "50px",
                                                        backgroundColor: selectedSchoolType === type ? "#EFA325" : "#038176",
                                                        color: selectedSchoolType === type ? "#1A1A1A" : "#FFFFFF",
                                                        border: `2px solid ${selectedSchoolType === type ? "#067C71" : "#ffffff"}`,
                                                        borderRadius: "22px",
                                                        fontSize: "13px",
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
                                                                borderRadius: "22px",
                                                                padding: "10px",
                                                                backgroundColor: "#fff",
                                                                height: "200px",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100px",
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
                                                                    fontSize: "12px",
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
            </div >
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
                                    <div className="col-md-5 d-flex justify-content-center" key={index}>
                                        <div
                                            className="card_Ideology"
                                            style={{ width: "100%", maxWidth: "470px" }}
                                        >
                                            {/* <h5 className="text-center fw-bold mb-2">{item.title}</h5> */}
                                            <h1
                                                dangerouslySetInnerHTML={{ __html: item.title }} className='text-center h4'
                                            />

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>


                        {/* ---------------- MOBILE (xs-sm) - compact 2-per-row layout ---------------- */}
                        <div className="d-block d-md-none">
                            <div className="row g-3 justify-content-center">
                                {ideologyData.map((item, index) => (
                                    <div className="col-6" key={index}>
                                        <div className="mobile-card">
                                            <div className="content-box">
                                                <h1
                                                    dangerouslySetInnerHTML={{ __html: item.title }} className='text-center h4'
                                                />

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
            <div className="container-fluid text-center p-3" >
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="ratio ratio-16x9" style={{ maxWidth: '1600px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/4m79KoSpfck?si=extlUtA2DZDIHY8L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
                                                    <a
                                                        href={`/latest/${data.id}`}
                                                        className="text-decoration-none w-100"
                                                        aria-label={`Read article: ${data.title}`}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-between px-2 py-3">
                                                            <span className="text-dark fw-semibold">
                                                                Learn More
                                                                <span className="visually-hidden"> about {data.title}</span>
                                                            </span>
                                                            <FaArrowRightLong className="text-dark" aria-hidden="true" />
                                                        </div>
                                                    </a>

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
                                                        <a
                                                            href={`/latest/${data.id}`}
                                                            className="learn_BTn1 text-decoration-none"
                                                            aria-label={`Read article: ${data.title}`}
                                                        >
                                                            <span>
                                                                Learn More <FaArrowRightLong aria-hidden="true" />
                                                                <span className="visually-hidden"> about {data.title}</span>
                                                            </span>
                                                        </a>

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
        </>
    )
}
export default Home