import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Kano from '../images/Kano.webp'
// import Kano1 from '../images/kano1.png' // Unused import
import { PiBuildingsBold } from "react-icons/pi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import calendar from "../images/calendar.png"



import defaultSlideshow from '../data/sliderData.json';
import defaultSloka from '../data/slokaData.json';
import defaultNews from '../data/newsData.json';
import defaultSchools from '../data/schoolData.json';

const Home = () => {
    // All data is loaded directly from JSON files in src/data directory
    const [data1] = useState(defaultSchools);
    const [data2, setData2] = useState(() => {
        // Filter slideshow based on initial viewport
        const isMobile = window.innerWidth < 768;
        const viewType = isMobile ? "mobile" : "desktop";
        const allSlides = defaultSlideshow.data || defaultSlideshow;
        return allSlides.filter(slide => slide.viewtype === viewType);
    });
    const [slock] = useState(defaultSloka);
    const [index, setIndex] = useState(0);
    const [data4] = useState(defaultNews);
    const [schoolTypes] = useState(() => {
        return [...new Set(defaultSchools.data?.map(school => school.school_type).filter(Boolean))].sort();
    });
    const [selectedSchoolType, setSelectedSchoolType] = useState(null);
    const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);
    const [filteredData1, setFilteredData1] = useState(defaultSchools);
    const [counter, setCounter] = useState(0); // Counter for animation
    // const { id } = useParams(); // Unused variable

    // Display data directly using state (leveraging background updates and initial cache)
    const displayNews = data4;
    const displaySchools = data1;
    const displaySlokas = slock;

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // 👈 NO smooth, direct jump
    }, [pathname]);

    // Filter slideshow based on viewport and handle resize
    useEffect(() => {
        const updateSlideshow = () => {
            const isMobile = window.innerWidth < 768;
            const viewType = isMobile ? "mobile" : "desktop";
            const allSlides = defaultSlideshow.data || defaultSlideshow;
            const filteredSlides = allSlides.filter(slide => slide.viewtype === viewType);
            setData2(filteredSlides);
        };

        // Debounce resize handler to reduce main-thread work
        let resizeTimeout;
        const debouncedUpdateSlideshow = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSlideshow, 300);
        };

        window.addEventListener("resize", debouncedUpdateSlideshow);
        return () => {
            window.removeEventListener("resize", debouncedUpdateSlideshow);
            clearTimeout(resizeTimeout);
        };
    }, []);

    const filteredData = useMemo(() =>
        displaySlokas?.data?.filter(t => t.id >= 1 && t.id <= 4) ?? [],
        [displaySlokas?.data]
    );

    // Counter animation from 1 to 100 (deferred for better performance)
    useEffect(() => {
        // Defer animation by 500ms to prioritize initial render
        const timeout = setTimeout(() => {
            const duration = 2000;
            const steps = 100;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                setCounter(currentStep);

                if (currentStep >= steps) {
                    clearInterval(timer);
                }
            }, stepDuration);

            return () => clearInterval(timer);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    // 👉 NEXT (memoized)
    const handleNext = useCallback(() => {
        setIndex(e => (e + 1) % filteredData.length)
    }, [filteredData.length]);

    // 👉 PREV (memoized)
    const handlePrev = useCallback(() => {
        setIndex(e => 0 === e ? filteredData.length - 1 : e - 1)
    }, [filteredData.length]);

    // 👉 AUTO-ROTATE EVERY 4 SECONDS
    useEffect(() => {
        if (filteredData.length === 0) return;
        const interval = setInterval(() => {
            setIndex(e => (e + 1) % filteredData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [filteredData.length]);

    // All data is now loaded from JSON files in src/data directory
    // No API calls needed



    // News data is loaded from defaultNews JSON file
    // No API call needed - data is already in state from initialization


    // Sloka data is loaded from defaultSloka JSON file
    // No API call needed - data is already in state from initialization

    // School data is loaded from defaultSchools JSON file
    // No API call needed - data is already in state from initialization
    //     console.log('\n🚀 ========== SCHOOLS API CALL STARTED (Home.js) ==========');
    //     console.log('📍 Step 1: useEffect triggered for schools data');
    //     console.log('   API Endpoint:', `${URL}/api/v1/schools/schools/`);

    //     startTransition(() => {
    //         // Only show "Loading..." if no cached data
    //         const hasCachedSchools = data1 && ((Array.isArray(data1) && data1.length > 0) || (data1.data && data1.data.length > 0));

    //         if (!hasCachedSchools) {
    //             console.log('   🎨 Setting optimistic loading data (No cache found)');
    //             setOptimisticSchools(createLoadingSchools());
    //         } else {
    //             console.log('   🎨 Using cached data immediately (skipping skeleton)');
    //         }

    //         console.log('\n🌐 Step 3: Making actual schools API call inside startTransition...');

    //         fetch(`${URL}/api/v1/schools/schools/`)
    //             .then((res) => {
    //                 console.log('\n✅ Step 4: Schools API Response received!');
    //                 return res.json();
    //             })
    //             .then((json) => {
    //                 console.log('\n📦 Step 5: Processing schools API data');

    //                 // Update state
    //                 setData1(json);
    //                 setFilteredData1(json);

    //                 // Cache the data
    //                 localStorage.setItem('home_schools', JSON.stringify(json));
    //                 console.log('   💾 Schools data cached to localStorage');

    //                 // Extract unique school types from the data
    //                 const types = [...new Set(json.data?.map(school => school.school_type).filter(Boolean))].sort();
    //                 setSchoolTypes(types);

    //                 console.log('\n✨ Step 6: Schools state updated!');
    //                 console.log('========== SCHOOLS API CALL COMPLETED ==========\n');
    //             })
    //             .catch((err) => {
    //                 console.error('\n❌ Schools API Error:', err);
    //             });
    //     });
    // }, []);

    useEffect(() => {
        const all = data1?.data || [];
        if (selectedSchoolType == null) {
            setFilteredData1({ ...data1, data: all });
            return;
        }
        const filtered = all.filter(item => item.school_type === selectedSchoolType);
        setFilteredData1({ ...data1, data: filtered });
    }, [selectedSchoolType, data1]);

    // 📺 Console logging moved to useEffect to prevent multiple renders
    // Uncomment below if you need to debug data sources
    // useEffect(() => {
    //     console.log('\n📺 UI Data Sources (Home.js):');
    //     console.log('   isPending (useTransition):', isPending);
    //     console.log('   Regular news data (data4):', data4);
    //     console.log('   Optimistic news data (optimisticNews):', optimisticNews);
    //     console.log('   Display news data (displayNews):', displayNews);
    //     console.log('   Regular schools data (data1):', data1);
    //     console.log('   Optimistic schools data (optimisticSchools):', optimisticSchools);
    //     console.log('   Display schools data (displaySchools):', displaySchools);
    //     console.log('   💡 Using displayNews and displaySchools in JSX for instant UX!\n');
    // }, [isPending, data4, optimisticNews, data1, optimisticSchools]);

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
    // useEffect(() => {
    //     if (!id) {
    //         setSchool(null);
    //         return;
    //     }
    //     fetch(`${URL}/api/v1/schools/schools/${id}`)
    //         .then((res) => res.json())
    //         .then((result) => setSchool(result?.data ?? result))
    //         .catch((err) => console.error("Error fetching school:", err));
    // }, [id]);

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

    // 🎯 OPTIONAL: You can also use displaySchools data here for loading placeholders
    // const itemsArr = displaySchools?.data || [];
    // This would show loading placeholders immediately while fetching real schools

    // 📺 Console logging commented out to prevent re-renders
    // console.log('\n🏫 Schools Data for Carousel:');
    // console.log('   Using filteredData1:', filteredData1);
    // console.log('   Available displaySchools (with loading state):', displaySchools);
    // console.log('   💡 Switch to displaySchools for instant loading feedback!\n');

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
    }, [cardWindowsDesktop.length, activeDesktopIndex]);

    useEffect(() => {
        if (activeMobileIndex >= cardWindowsMobile.length) setActiveMobileIndex(0);
    }, [cardWindowsMobile.length, activeMobileIndex]);


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

    // 🎯 HOW TO USE DISPLAY DATA IN UI:
    // Instead of using data4 directly, use displayNews
    // This will show loading placeholders first, then automatically update to real data

    // 📺 Console logging commented out to prevent re-renders
    // console.log('\n📺 UI Data Sources:');
    // console.log('   Regular news data (data4):', data4);
    // console.log('   Display news data (displayNews with loading state):', displayNews);
    // console.log('   💡 Use displayNews in your JSX for better UX!\n');

    // For news items - use displayNews instead of data4
    const items = Array.isArray(displayNews?.data) ? displayNews.data : [];

    return (
        <>
            <div className='container-fluid'>
                {/* img_Slider */}
                <div className="container-fluid mb-3">
                    {Array.isArray(data2) &&
                        data2.map((data, idx) => (
                            <div className="d-flex flex-column justify-content-center align-items-center" key={data?.id ?? idx}>

                                {/* <img
                                    src={secureUrl(data.image)}
                                    alt={data.title}
                                    className="d-block slideshow-img"
                                    loading="lazy"
                                    width="364"
                                    height="364"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "22px"
                                    }}
                                /> */}
                                <picture>
                                    <source
                                        srcSet={secureUrl(data.image).replace(/\.(png|jpg|jpeg)$/i, '.webp')}
                                        type="images/webp"
                                    />
                                    <img
                                        src={secureUrl(data.image)}
                                        alt={data.title}
                                        className="d-block"
                                        loading="eager"
                                        width="364"
                                        height="364"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "cover",
                                            borderRadius: "22px"
                                        }}
                                    />
                                </picture>
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
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>{counter}</h2>
                            <p>આહીર બોર્ડિંગ</p>
                        </div>

                        <div className='CoL_B col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>{counter}</h2>
                            <p>આહિર ચેરિટેબલ ટ્રસ્ટ</p>
                        </div>

                        <div className='CoL_B col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>{counter}</h2>
                            <p>આહીર સમાજ વાડી</p>
                        </div>

                        <div className='CoL_B col-6 col-md-3 col-sm-6'>
                            <PiBuildingsBold size={40} />
                            <h2 style={{ minHeight: "40px" }}>{counter}</h2>
                            <p>કન્યા છત્રાલય</p>
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
                                <div key={data.id} className="row justify-content-center align-items-start g-3" data-bs-interval="4000">
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-2'></div>
                                            <div className='col-md-12 col-lg-8 slokaBox_BG col-12 d-flex'>
                                                <div className='col-md-4 p-2 d-flex justify-content-center align-items-center'>
                                                    <div className="imgBox">
                                                        <img
                                                            src={data.sloka_image}
                                                            alt={`Krishna ${data.id}`}
                                                            loading="lazy"
                                                            className="krishna-img h-100"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className='col-md-1'></div> */}
                                                <div className="col-md-8">
                                                    <div className="slokaBox text-white p-4">
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
                                    <div key={data.id} className="row h-100 w-100 mb-5 justify-content-center g-0" data-bs-interval="8000">

                                        <div className="col-12 col-sm-12 h-100">
                                            <div className="slock_Bg1 text-center p-4">
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
                                <a href='/Our_Schools'>
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
                            {/* <div className="col-auto">
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
                            </div> */}

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
                                            <div key={data.id} className="col-md-3 col-lg-3">
                                                <Link to={`/school/${data.id}`} className="text-decoration-none text-dark">
                                                    <div
                                                        className="h-100 School_Card m-1 d-flex flex-column justify-content-between align-items-center text-center"
                                                        style={{
                                                            borderRadius: "15px",
                                                            padding: "20px",
                                                            backgroundColor: "#fff",
                                                            minHeight: "auto",
                                                            cursor: "pointer",
                                                        }}
                                                    >

                                                        {data.logo && data.logo.trim() !== "" ? (
                                                            // <picture className="mb-3">
                                                            //     <source
                                                            //         srcSet={secureUrl(data.logo).replace(/\.(png|jpg|jpeg)$/i, '.webp')}
                                                            //         type="image/webp"
                                                            //     />
                                                            <img
                                                                src={secureUrl(data.logo)}
                                                                alt={`${data.name} logo`}
                                                                width="250"
                                                                height="150"
                                                                loading="lazy"
                                                                className="rounded-1"
                                                                style={{ height: "150px", width: "100%", objectFit: "contain" }}
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentElement.nextElementSibling?.classList.remove('d-none');
                                                                }}
                                                            />
                                                            // </picture>
                                                        ) : (
                                                            <div
                                                                className="rounded-1 d-flex align-items-center justify-content-center mb-3"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "150px",
                                                                    background: "#f0f0f0",
                                                                    color: "#067C71",
                                                                    fontWeight: 700,
                                                                    fontSize: "24px",
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
                                <a href='/Our_Schools'>
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
                                            {/* <button
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
                                            </button> */}



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
                                                                    height: "120px",
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
                    <div className="col-md-12 mb-5">
                        <h1 className="fw-bold text-center py-2" style={{ color: "#067C71" }}>Ideology <br /> (અમારી વિચારસરણી)</h1>
                        <p className="text-center">Our ideology is built on the principles that have guided the Ahir community for generations — <b> Unity, Education, Culture, and Service.</b></p>
                        <p className="text-center">We believe that a strong community is created when every member grows together, supports each other,
                            and preserves the values passed down by our ancestors.</p>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-7">
                        <div className="d-none d-md-block">
                            <div className="row g-3 justify-content-center">
                                {ideologyData.map((item, index) => (
                                    <div className="col-md-5 d-flex justify-content-center" key={index}>
                                        <div
                                            className="card_Ideology"
                                            style={{ width: "100%", maxWidth: "470px" }}
                                        >
                                            {/* <h5 className="text-center fw-bold mb-2">{item.title}</h5> */}
                                            <h1
                                                dangerouslySetInnerHTML={{ __html: item.title }} className='text-center h6'
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
                                                    dangerouslySetInnerHTML={{ __html: item.title }} className='text-center title h4'
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
                    <div className="col-md-4 text-center mt-4 mt-lg-0 d-flex align-items-center justify-content-start">
                        <picture>
                            <source
                                srcSet={Kano?.replace(/^http:\/\//i, "https://").replace(/\.(png|jpg|jpeg)$/i, ".webp")}
                                type="image/webp"
                            />
                            <img
                                src={Kano?.replace(/^http:\/\//i, "https://")}
                                alt="Lord Krishna"
                                width="400"
                                height="400"
                                style={{ borderRadius: "16px", maxHeight: "400px", width: "auto", height: "auto" }}
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
                            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4m79KoSpfck?si=extlUtA2DZDIHY8L" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            {/* Latest News Section */}
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 justify-content-center text-center'>
                        <h1 className="fw-bold text-center py-2" style={{ color: "#067C71" }}>લેટેસ્ટ ન્યૂઝ</h1>
                        {/* ---------------- DESKTOP (md+) - show full grid (4 per row) ---------------- */}
                        <div className="d-none d-md-block">
                            <div className="row py-4">
                                {items.map((data) => (
                                    <div className="col-md-6 col-lg-3" key={data.id}>
                                        <div className="Main-Card_1 shadow-sm p-1 h-100 d-flex flex-column">
                                            {data.images && data.images.length > 0 ? (
                                                <picture>
                                                    <source
                                                        srcSet={secureUrl(data.images[0].image).replace(/\.(png|jpg|jpeg)$/i, '.webp')}
                                                        type="images/webp"
                                                    />
                                                    <img
                                                        src={secureUrl(data.images[0].image)}
                                                        className="Main-Card_2 mb-2"
                                                        alt="Desktop View Img"
                                                        width="300"
                                                        height="200"
                                                        loading="lazy"
                                                        style={{
                                                            objectFit: "contain",
                                                            backgroundColor: "#ffffff",
                                                            borderRadius: "20px",
                                                            width: "100%",
                                                            height: 200,
                                                        }}
                                                    />
                                                </picture>
                                            ) : (
                                                <div
                                                    className="Main-Card_2 mb-2 d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: "#f0f0f0",
                                                        borderRadius: "20px",
                                                        width: "100%",
                                                        height: 200,
                                                        color: "#999",
                                                    }}
                                                >
                                                    No Image
                                                </div>
                                            )}

                                            <div className="card-body1 d-flex p-2 flex-column" style={{ minHeight: 200 }}>
                                                <p className="text-start text-muted mb-2" style={{ fontSize: 14 }}>
                                                    <img src={calendar} className="claendar_Icon" loading="lazy" height={18} width={18} alt="calendar" />

                                                    {new Date(data?.published_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                <h6 className="text-start title-line-1" style={{ marginBottom: 8, color: '#067C71' }}>{data.title}</h6>
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
                                                        <div className="d-flex align-items-center justify-content-between px-2 py-auto">
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
                                                {data.images && data.images.length > 0 ? (
                                                    <picture>
                                                        <source
                                                            srcSet={secureUrl(data.images[0].image).replace(/\.(png|jpg|jpeg)$/i, '.webp')}
                                                            type="images/webp"
                                                        />
                                                        <img
                                                            src={secureUrl(data.images[0].image)}
                                                            className="Main-Card_2 mb-1"
                                                            alt="Mobile view img"
                                                            width="180"
                                                            height="110"
                                                            loading="lazy"
                                                            style={{
                                                                objectFit: "contain",
                                                                backgroundColor: "#ffffff",
                                                                borderRadius: "22px",
                                                                width: "100%",
                                                                height: 110,
                                                            }}
                                                        />
                                                    </picture>
                                                ) : (
                                                    <div
                                                        className="Main-Card_2 mb-1 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            backgroundColor: "#f0f0f0",
                                                            borderRadius: "22px",
                                                            width: "100%",
                                                            height: 110,
                                                            color: "#999",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        No Image
                                                    </div>
                                                )}

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

                                                <h1 className="h6 text-start title-line-1" style={{ fontSize: 14, color: "#067C71" }}>
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
            </div >
        </>
    )
}
export default Home