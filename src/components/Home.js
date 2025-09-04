import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import img1 from '../images/img_1.webp'
// import img_2 from '../images/img_2.jpg';
import Krishna from '../images/Krishna.webp';
import Kano from '../images/Kano.webp'
import { Carousel } from 'react-bootstrap';
import { PiBuildingsBold } from "react-icons/pi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
    const [data1, setData1] = useState([]);
    const [slock, setSlock] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const carouselRef = useRef(null);
    const [index, setIndex] = useState(0);

    const navigate = useNavigate()
    // { data: [] }

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    useEffect(() => {
        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/slideshow/")
            // console.log(res.image);
            .then((res) => res.json())
            .then((json) => {
                // console.log(json.data);
                setData2(json.data);
            })
            .catch((err) => console.error(err));
    }, []);




    useEffect(() => {
        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/slokas/")
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                setSlock(json);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/history/histories/")
            .then((res) => res.json())
            .then((json) => setData3(json))
            .catch((err) => console.error(err));
    }, []);

    // Chunk into groups of 4
    // const chunkArray = (arr, size) => {
    //     const result = [];
    //     for (let i = 0; i < arr.length; i += size) {
    //         result.push(arr.slice(i, i + size));
    //     }
    //     return result;
    // };

    // const logoChunks = chunkArray(data3?.data || [], 4);

    useEffect(() => {
        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/schools/schools/")
            .then((res) => res.json())
            .then((json) => setData1(json))
            .catch((err) => console.error(err));
    }, []);

    const handleClick = (data) => {
        navigate("/news", { state: { newsData: data } }); // ✅ state pass
    };

    // Chunk data into sets of 3
    const chunkArray1 = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const cardChunks = chunkArray1(data1.data || [], 4);

    // const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <div className='container-fluid'>
                {/* img_Slider */}
                <div className="container-fluid py-5">
                    <Carousel fade activeIndex={index} onSelect={handleSelect} controls={false} indicators={false} interval={3000}>
                        {Array.isArray(data2) &&
                            data2.map((data, index) => (
                                <Carousel.Item key={data.id ?? index}>
                                    <div
                                        className="w-100 d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: "auto" }}
                                    >
                                        <h2>{data.title}</h2>
                                        <img
                                            src={data.image?.replace("http://", "https://")}
                                            alt={data.title || "Slideshow image"}
                                            className="d-block"
                                            width={600}   // ✅ real width of Somnath image
                                            height={600}  // ✅ real height of Somnath image
                                            style={{ maxHeight: "auto", objectFit: "cover" }}
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </div>

                <div className='container-fluid'>
                    <div className='row BuiLD_BG justify-content-center text-center text-black'>

                        <div className='col-md-3 col-12'>
                            <PiBuildingsBold size={48} />  {/* ✅ fixed size */}
                            <h1 style={{ minHeight: "48px" }}>100+</h1> {/* ✅ reserve space */}
                            <span>Sanstha StartYear</span>
                        </div>

                        <div className='CoL_B col-md-3 col-12'>
                            <PiBuildingsBold size={48} />
                            <h1 style={{ minHeight: "48px" }}>100+</h1>
                            <span>Total Sanstha</span>
                        </div>

                        <div className='CoL_B col-md-3 col-12'>
                            <PiBuildingsBold size={48} />
                            <h1 style={{ minHeight: "48px" }}>100+</h1>
                            <span>Total Sanstha Year</span>
                        </div>

                        <div className='CoL_B col-md-3 col-12'>
                            <PiBuildingsBold size={48} />
                            <h1 style={{ minHeight: "48px" }}>100+</h1>
                            <span>Total Sanstha Year</span>
                        </div>

                    </div>

                </div>

                {/* About Details */}

                <div className="container-fluid mb-5">
                    <div className="row align-items-center justify-content-end">
                        {/* LEFT IMAGE + KRISHNA */}
                        <div className="col-12 col-md-4 position-relative text-center py-3 mb-md-0">
                            <img
                                src={Krishna}
                                alt="Illustration of Krishna"
                                className="krishna-image"
                                loading='lazy'
                                width={600}     // 🔹 reserve space (same as your inline width)
                                height={400}    // 🔹 replace with actual natural height
                                style={{ width: "600px", height: "auto" }}
                            />
                        </div>
                        {/* RIGHT TEXT */}
                        <div className="col-md-7">
                            <div className="align-items-start mb-5">
                                <ul>
                                    {Array.isArray(slock?.data) &&
                                        slock.data.map((data) => (
                                            <React.Fragment key={data.id}>
                                                {/* <li className='mb-2'>{data.sloka_sans} <br /></li>
                                                <li className='mb-1'>{data.sloka_guj} <br /></li>
                                                <li className='mb-2'>{data.sloka_eng} <br /></li>
                                                <li className='py-2'>{data.sloka_origin}, {" "}
                                                    chapter: {data.chapter}, {" "}
                                                    verse: {data.verse}</li> */}
                                                <div className='row'>
                                                    <b className='mb-2 SHlok_1'>(अध्याय 4, श्लोक 7) <br /> </b>
                                                    <div className='mb-2'>{data.sloka_sans} <br /></div>
                                                    <b className='py-2 mb-1 SHlok_2'>:: अनुवाद ::</b>
                                                    <div className='mb-1'>{data.sloka_guj} <br /></div>
                                                    <div className='mb-2'>{data.sloka_eng} <br /></div>
                                                    <div className='Row_Bottom'></div>
                                                    <div className='py-2'>{data.sloka_origin}, {" "}
                                                        chapter: {data.chapter}, {" "}
                                                        verse: {data.verse}</div>
                                                </div>
                                            </React.Fragment>
                                        ))}

                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
                {/* BANNER SECTION */}
                <div className="container-fluid bG_2">



                    <div className="floating-box container p-4 rounded shadow">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <p className="mb-3 mb-md-0 fw-bold fs-5 text-dark">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                            </p>
                            <button type="button" className="btn btn-success">View All Branch</button>
                        </div>
                    </div>
                    {/* Cards */}
                    {/* Slider */}
                    <div id="schoolCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000" ref={carouselRef}>
                        <div className="carousel-inner">
                            {cardChunks.map((chunk, index) => (
                                <div
                                    key={`chunk-${index}`}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                >
                                    <div className="row justify-content-center">
                                        {chunk.map((data) => (
                                            <div key={data.id ?? `item-${index}`} className="col-md-3 col-sm-6 p-3">
                                                <Link
                                                    to="/latest"
                                                    className="text-decoration-none text-dark"
                                                >
                                                    <div
                                                        className="shadow-sm h-100 d-flex flex-column justify-content-between align-items-center text-center"
                                                        style={{
                                                            width: "100%",
                                                            borderRadius: "15px",
                                                            padding: "20px",
                                                            backgroundColor: "#fff",
                                                        }}
                                                    >
                                                        <p className="fw-semibold text-primary mb-2">
                                                            {data.category_name}
                                                        </p>
                                                        {/* <img
                                                            src={data.logo?.replace(/^http:\/\//i, "https://")} // 🔒 Force HTTPS
                                                            alt={`${data.name} logo`}
                                                            style={{
                                                                maxWidth: "100%",
                                                                maxHeight: "100px",
                                                                objectFit: "contain",
                                                            }}
                                                        /> */}
                                                        <p className="mt-3 fw-bold text-dark">{data.name}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-light" />

                    {/* Bottom Info + Buttons */}
                    <div className="row align-items-center">
                        {/* Text */}
                        <div className="col-12 col-md-10 text-white mb-md-0 text-center text-md-start">
                            <p className="p-4">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has <br className="py-5" /> been the
                                industry's standard dummy text ever since the 1500s...
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="col-12 col-md-2 text-center text-end d-flex gap-2">
                            <div className="d-flex justify-content-center gap-2 mt-4">
                                <button
                                    className="btn btn-light rounded shadow"
                                    type="button"
                                    data-bs-target="#schoolCarousel"
                                    data-bs-slide="prev"
                                >
                                    <GrFormPrevious aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                <button
                                    className="btn btn-light rounded shadow"
                                    type="button"
                                    data-bs-target="#schoolCarousel"
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
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* LEFT TEXT SECTION */}
                    <div className='col-md-1'></div>
                    <div className="col-md-5">
                        <h2 className="fw-bold mb-4">An Ideology</h2>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>
                    </div>
                    <div className='col-md-1'></div>
                    {/* RIGHT IMAGE SECTION */}
                    <div className="col-md-5 text-center mt-4 mt-lg-0">
                        <picture>
                            <source
                                srcSet={Kano?.replace(/^http:\/\//i, "https://").replace(/\.(png|jpg|jpeg)$/i, ".webp")}
                                type="image/webp"
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

            <div className="container-fluid text-center py-5">
                <div className='row'>
                    <iframe className='Youtube_Link' src="https://www.youtube.com/embed/xby0-Ecnjw0?list=RDxby0-Ecnjw0"
                        title="Aditya Gadhavi | Shamaliyo | Nonstop Ras | Nonstop Krishna New Song @StudioSharda" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>


                </div>
            </div>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12 justify-content-center text-center'>
                        <h1>Get Updated <br />
                            From Our News & Insights</h1>
                        <p className='p_12'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum <br /> has been the industry's standard dummy text ever since .
                        </p>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className="container">
                    <div className='row m-4'>
                        <div className="col-md-2">
                            <button className="btn btn-primary mb-3 w-100" onClick={() => window.location.href = '/news'}>
                                શ્રી શામપુરા વિભાગ સેવા સહકારી મંડળી લિ.શામપુરા
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary mb-3 w-100" onClick={() => window.location.href = '/news'}>
                                શ્રી યદુનંદન જનરલ ચારી ટ્રસ્ટ દહેગામ અમદાવાદ
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary mb-3 w-100" onClick={() => window.location.href = '/news'}>
                                ગુજરાત આહીર કન્યા છાત્રાલય અને શૈક્ષણિક સંકુલ - અમદાવાદ
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary mb-3 w-100" onClick={() => window.location.href = '/news'}>
                                શ્રી યદુનંદન વિદ્યાર્થી આશ્રમ ટ્રસ્ટ જૂનાગઢ
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary mb-3 w-100" onClick={() => window.location.href = '/news'}>
                                શ્રી આહીર કન્યા વિદ્યાલય ભુજોડી
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary mb-3 w-100" onClick={() => window.location.href = '/news'}>
                                View All News
                            </button>
                        </div>
                    </div>
                    <div className="container my-5">
                        {/* Carousel */}
                        <div id="schoolCarousel1" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000" ref={carouselRef}>
                            <div
                                id="schoolCarousel1"
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    {cardChunks.map((chunk, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            key={`chunk-${index}`}
                                        >
                                            <div className="row justify-content-center">
                                                {chunk.map((data, i) => (
                                                    <div
                                                        className="col-md-3 mb-4"
                                                        key={data.id ?? `item-${index}-${i}`}
                                                        onClick={() => handleClick(data)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <div className="h-100 card">
                                                            <div className="card-body">
                                                                <p>{data.description}</p>
                                                                <p>{data.categories}</p>
                                                                <p>{data.tags}</p>
                                                                <p>{data.created_at}</p>
                                                                <p>{data.updated_at}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Custom Prev/Next Buttons */}
                        <div className="d-flex justify-content-center gap-2 mt-4">
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
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid">
                <div className='row'>
                    <div className="custom-divider2 my-4"></div>
                    <div className="col-md-12 text-center Documentary_H1">
                        <h1> Documentary</h1>
                    </div>
                </div>
                <div className='row justify-content-center text-center mb-5'>
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
                </div>
            </div>
        </>
    )
}

export default Home