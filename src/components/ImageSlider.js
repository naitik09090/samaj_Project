import { useEffect, useRef, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router";
import { useParams } from "react-router";

const ImageSlider = () => {
    const [data1, setData1] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("All");
    const [subOption, setSubOption] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    // const [value, setValue] = useState("");

    const carouselRef = useRef(null);
    const { id } = useParams();
    const [school, setSchool] = useState(null);

    const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";
    const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");

    // Fetch ALL schools
    useEffect(() => {
        fetch(`${URL}/api/v1/schools/schools/`)
            .then((res) => res.json())
            .then((json) => {
                setData1(json);
                setFilteredData(json);
                console.log(setSelectedOption);
            })
            .catch((err) => console.error(err));
    }, []);

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

    useEffect(() => {
        const allData = data1?.data || [];
        const all = allData;

        if (selectedOption === "All") {
            setFilteredData({ ...data1, data: all });
            return;
        }

        if (!subOption) return; // wait until user selects sub option

        console.log(setSubOption);

        const filtered = all.filter(
            (item) => item[selectedOption] === subOption
        );

        setFilteredData({ ...data1, data: filtered });
    }, [selectedOption, subOption, data1]);


    // Filter Data
    // const handleFilter = () => {
    //     const all = allData;

    //     if (selectedOption === "All") {
    //         setFilteredData({ ...data1, data: all });
    //         return;
    //     }

    //     let type = selectedOption.split(":")[0];   // location OR category
    //     let value = selectedOption.split(":")[1];

    //     const filtered = all.filter(item => item[type] === value);

    //     setFilteredData({ ...data1, data: filtered });
    // };


    // chunk function
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const cardChunks = chunkArray(filteredData?.data || [], 5);
    const cardChunksMobile = chunkArray(filteredData?.data || [], 4);

    return (
        <div className="container-fluid" style={{ borderRadius: "22px" }}>

            {/* <div className="row mb-4">
                <div className="col-12">
                    <div
                        className="card shadow-sm border-0"
                        style={{
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #067C71 0%, #0a9d8f 100%)",
                            padding: "40px",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >

                        <div className="row align-items-center">

                            <div className="col-md-6">
                                <h2 className="text-white fw-bold mb-3">
                                    બધી સંસ્થાઓ
                                </h2>
                                <p className="text-white mb-4" style={{ opacity: 0.9 }}>
                                    અહીં થી તમે સંસ્થાઓ ને કેટેગરી અથવા સ્થાન મુજબ ફિલ્ટર કરી શકો છો.
                                </p>

                                <div className="bg-white p-4 rounded-3 shadow-sm" style={{ maxWidth: "380px" }}>
                                    <select
                                        className="form-select form-select-lg"
                                        value={selectedOption}
                                        onChange={(e) => {
                                            setSelectedOption(e.target.value);
                                            setSubOption("");
                                        }}
                                    >
                                        <option value="All">બધી સંસ્થાઓ</option>
                                        <option value="location">📍 સ્થાન થી ફિલ્ટર</option>
                                        <option value="category">🏷️ કેટેગરી થી ફિલ્ટર</option>
                                    </select>

                                    {selectedOption === "category" && (
                                        <select
                                            className="form-select form-select-lg mt-3"
                                            value={subOption}
                                            onChange={(e) => setSubOption(e.target.value)}
                                        >
                                            <option value="">કેટેગરી પસંદ કરો</option>
                                            {uniqueCategories.map((cat, i) => (
                                                <option key={i} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    )}

                                    {selectedOption === "location" && (
                                        <select
                                            className="form-select form-select-lg mt-3"
                                            value={subOption}
                                            onChange={(e) => setSubOption(e.target.value)}
                                        >
                                            <option value="">સ્થાન પસંદ કરો</option>
                                            {uniqueLocations.map((loc, i) => (
                                                <option key={i} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-end">
                                <img
                                    src={kanha}
                                    alt="kanha"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "350px",
                                        objectFit: "contain",
                                        position: "relative",
                                        zIndex: 1
                                    }}
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </div> */}

            {/* CAROUSEL */}
            <div id="schoolCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000" ref={carouselRef}>
                <div className="carousel-inner">
                    <div className='py-2'>
                        <h1 className='text-center' style={{ color: '#067C71', fontWeight: '600' }}>આપણી સંસ્થા</h1>
                    </div>
                    {/* <div className="row mb-4">
                        <div className="col-12">
                            <div
                                className="shadow-sm border-0"
                                style={{
                                    borderRadius: "20px",
                                    background: "linear-gradient(135deg, #067C71 0%, #0a9d8f 100%)",
                                    padding: "25px"
                                }}
                            >
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <h2
                                            className="mb-1 text-white"
                                            style={{ fontWeight: "700", fontSize: "28px" }}
                                        >
                                            આપણી સંસ્થા
                                        </h2>
                                        <p className="mb-0 text-white" style={{ opacity: 0.9, fontSize: "14px" }}>
                                            {filteredData?.data?.length || 0} સંસ્થાઓ
                                        </p>
                                    </div>

                                    <div className="col-md-5 content-box1">
                                        <div className="d-flex gap-2 align-items-center">
                                            <div style={{ position: "relative", flex: 1 }}>
                                                <select
                                                    className="form-select form-select-lg"
                                                    value={selectedOption}
                                                    onChange={(e) => {
                                                        setSelectedOption(e.target.value);
                                                        setSubOption("");
                                                    }}
                                                >
                                                    <option value="All">બધી સંસ્થાઓ</option>
                                                    <option value="location">📍 સ્થાન થી ફિલ્ટર</option>
                                                    <option value="category">🏷️ કેટેગરી થી ફિલ્ટર</option>
                                                </select>

                                                {selectedOption === "category" && (
                                                    <select
                                                        className="form-select form-select-lg mt-2"
                                                        value={subOption}
                                                        onChange={(e) => setSubOption(e.target.value)}
                                                    >
                                                        <option value="">કેટેગરી પસંદ કરો</option>
                                                        {uniqueCategories.map((cat, i) => (
                                                            <option key={i.id} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                )}

                                                {selectedOption === "location" && (
                                                    <select
                                                        className="form-select form-select-lg mt-2"
                                                        value={subOption}
                                                        onChange={(e) => setSubOption(e.target.value)}
                                                    >
                                                        <option value="">સ્થાન પસંદ કરો</option>
                                                        {uniqueLocations.map((loc, i) => (
                                                            <option key={i.id} value={loc}>{loc}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Desktop View */}
                    <div className="d-none d-md-block">
                        {cardChunks.length > 0 ? (
                            cardChunks.map((chunk, index) => (
                                <div key={index} className={` content-box2 carousel-item ${index === 0 ? "active" : ""}`}>
                                    {/* Desktop Filter */}
                                    <div className="filter-bar">
                                        <select className="filters">
                                            <option className="filter-item">
                                                સંસ્થાઓ ના પ્રકાર
                                            </option>
                                        </select>
                                        <select className="filters">
                                            <option className="filter-item">
                                                સ્થાન
                                            </option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="search-box"
                                        />
                                    </div>
                                    <div className="row justify-content-center">
                                        {chunk.map((data) => (
                                            <div key={data.id} className="col-md-2 p-1 mb-5">
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
                        <div id="mobileSchoolCarousel" className="carousel content-box1 slide" data-bs-interval="4000">
                            {/* Mobile Header */}
                            <div className="mobile-header">
                                <button
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                    className="menu-btn"
                                    aria-label="Open filters"
                                >
                                    ☰
                                </button>

                                {mobileOpen && (
                                    <div className="mobile-filter-panel">
                                        <select className="mobile-select">
                                            <option>સંસ્થાઓ ના પ્રકાર</option>
                                        </select>

                                        <select className="mobile-select">
                                            <option>સ્થાન</option>
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="mobile-search"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="carousel-inner">
                                {cardChunksMobile.map((pair, idx) => (
                                    <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
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
                        </div>
                    </div>

                </div>
            </div>

            {/* Navigation Buttons (Mobile) */}
            <hr className="border-light" />
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center gap-2">

                        {/* Previous */}
                        <button
                            className="btn btn-light rounded shadow"
                            type="button"
                            data-bs-target="#mobileSchoolCarousel"
                            data-bs-slide="prev"
                            aria-label="Previous slide"
                        >
                            <GrFormPrevious aria-hidden="true" />
                        </button>

                        {/* Next */}
                        <button
                            className="btn btn-light rounded shadow"
                            type="button"
                            data-bs-target="#mobileSchoolCarousel"
                            data-bs-slide="next"
                            aria-label="Next slide"
                        >
                            <MdOutlineNavigateNext aria-hidden="true" />
                        </button>

                    </div>
                </div>
            </div>


        </div >
    );
};

export default ImageSlider;
