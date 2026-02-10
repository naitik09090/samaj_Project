import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import calendar from "../images/calendar.png"
import { FaArrowRightLong } from "react-icons/fa6";
import defaultNewsList from '../data/newsData.json';

const About_us = () => {
    // All data is loaded directly from JSON files in src/data directory
    const [data4, setData4] = useState(defaultNewsList);
    const { id } = useParams();
    const [data, setData] = useState(null);



    // Find single news item from the list based on URL id parameter (client-side lookup)
    useEffect(() => {
        if (!id) {
            setData(null);
            return;
        }

        if (defaultNewsList?.data && Array.isArray(defaultNewsList.data)) {
            const foundNews = defaultNewsList.data.find(item => item.id == id);
            setData(foundNews || null);
        }
    }, [id]);

    const chunkArray1 = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");

    // 🎯 Use data4 directly for UI
    const cardChunks = chunkArray1(data4?.data || [], 5);



    return (
        <div className='container-fluid'>
            {/* SHOW ONLY NEWS LIST when NO id */}
            {!id && (
                <>
                    <div>
                        <h1 className="text-center mb-5" style={{ color: "#067C71", fontWeight: "600" }}>
                            લેટેસ્ટ ન્યૂઝ
                        </h1>
                    </div>

                    {/* ---------------- DESKTOP: original carousel (visible on md+) ---------------- */}
                    <div className="d-none d-md-block">
                        <div id="newsCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                {cardChunks && cardChunks.length > 0 ? (
                                    cardChunks.map((chunk, index) => (
                                        <div key={`chunk-${index}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <div className="row justify-content-center g-3">

                                                {chunk.map((newsItem) => (
                                                    <div
                                                        key={newsItem.id}
                                                        className="col-auto d-flex justify-content-center mb-3"
                                                    >
                                                        <div
                                                            className="Main-Card_1 p-2 shadow-sm d-flex flex-column"
                                                            style={{
                                                                width: "220px",
                                                                minHeight: "350px",
                                                                borderRadius: "20px",
                                                                backgroundColor: "#fff",
                                                            }}
                                                        >
                                                            {/* Show image only if not loading */}
                                                            {!newsItem.isLoading && newsItem.images?.[0]?.image ? (
                                                                <img
                                                                    src={secureUrl(newsItem.images[0].image)}
                                                                    className="mb-2"
                                                                    alt={`${newsItem.title}`}
                                                                    loading='lazy'
                                                                    style={{
                                                                        height: "180px",
                                                                        width: "100%",
                                                                        objectFit: "contain",
                                                                        borderRadius: "15px",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="mb-2 d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        height: "180px",
                                                                        width: "100%",
                                                                        backgroundColor: "#f0f0f0",
                                                                        borderRadius: "15px",
                                                                        color: "#999",
                                                                    }}
                                                                >
                                                                    {newsItem.isLoading ? "⏳" : "No Image"}
                                                                </div>
                                                            )}

                                                            <div className="card-body1 d-flex flex-column flex-grow-1">
                                                                {!newsItem.isLoading && newsItem.published_at && (
                                                                    <p className="text-start text-muted mt-1 d-flex align-items-center">
                                                                        <img
                                                                            src={calendar}
                                                                            className="me-2"
                                                                            height={20}
                                                                            width={20}
                                                                            alt=""
                                                                        />
                                                                        {new Date(newsItem.published_at).toLocaleDateString("en-GB", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        })}
                                                                    </p>
                                                                )}

                                                                <h6 className="m-1 text-start title-line-1" style={{ color: "#067C71" }}>{newsItem.title}</h6>
                                                                <p className="m-1 text-muted text-start title-content-2">{newsItem.content || newsItem.description}</p>

                                                                <div className="mt-auto">
                                                                    {!newsItem.isLoading ? (
                                                                        <Link
                                                                            to={`/latest/${newsItem.id}`}
                                                                            className="text-decoration-none w-100"
                                                                            aria-label={`Read full article: ${newsItem.title}`}
                                                                        >
                                                                            <div className="d-flex align-items-center justify-content-between px-3 py-2">
                                                                                <span className="text-dark fw-semibold">
                                                                                    Learn More
                                                                                    <span className="visually-hidden">about {newsItem.title}</span>
                                                                                </span>
                                                                                <FaArrowRightLong className="text-dark" aria-hidden="true" />
                                                                            </div>
                                                                        </Link>
                                                                    ) : (
                                                                        <div className="d-flex align-items-center justify-content-between px-3 py-2">
                                                                            <span className="text-muted">Loading...</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))}

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="carousel-item active">
                                        <div className="text-center text-muted py-5 col-12">
                                            <p>Loading news...</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Carousel controls - only show if we have multiple slides */}
                            {cardChunks && cardChunks.length > 1 && (
                                <>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#newsCarousel"
                                        data-bs-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#newsCarousel"
                                        data-bs-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ---------------- MOBILE: 2-per-row grid (visible on xs & sm) ---------------- */}
                    <div className="d-block d-md-none">
                        <div className="container-fluid">
                            {Array.isArray(cardChunks) && cardChunks.length > 0 ? (
                                (() => {
                                    const flat = cardChunks.flat();
                                    const rows = [];
                                    for (let i = 0; i < flat.length; i += 2) rows.push(flat.slice(i, i + 2));

                                    return rows.map((pair, rowIndex) => (
                                        <div key={`mobile-row-${rowIndex}`} className="row gx-2 gy-3 py-1">
                                            {pair.map((newsItem) => (
                                                <div className="col-6" key={newsItem.id}>
                                                    <div className="Main-Card_1 p-1 h-100 shadow-sm d-flex flex-column">
                                                        {/* Show image only if not loading */}
                                                        {!newsItem.isLoading && newsItem.images?.[0]?.image ? (
                                                            <img
                                                                src={secureUrl(newsItem.images[0].image)}
                                                                className="Main-Card_2"
                                                                loading="lazy"
                                                                style={{
                                                                    objectFit: "contain",
                                                                    borderRadius: '22px'
                                                                }}
                                                                alt={newsItem.title || ""}
                                                            />
                                                        ) : (
                                                            <div
                                                                className="Main-Card_2 d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    backgroundColor: "#f0f0f0",
                                                                    borderRadius: '22px',
                                                                    minHeight: "120px",
                                                                    color: "#999",
                                                                }}
                                                            >
                                                                {newsItem.isLoading ? "⏳" : "No Image"}
                                                            </div>
                                                        )}

                                                        <div className="card-body1 d-flex flex-column" style={{ padding: "8px" }}>
                                                            {!newsItem.isLoading && newsItem.published_at && (
                                                                <p className="text-start text-muted mb-1" style={{ fontSize: 12 }}>
                                                                    <img src={calendar} className="claendar_Icon" height={16} width={16} alt="calender" />
                                                                    {new Date(newsItem.published_at).toLocaleDateString("en-GB", {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric"
                                                                    })}
                                                                </p>
                                                            )}

                                                            <h2 className="h6" style={{ fontSize: 14 }}>
                                                                {newsItem.title && newsItem.title.length > 60 ? newsItem.title.slice(0, 20) + "…" : newsItem.title}
                                                            </h2>

                                                            <p className="text-muted small" style={{ fontSize: 12 }}>
                                                                {typeof (newsItem.content || newsItem.description) === "string" ? ((newsItem.content || newsItem.description).length > 40 ? (newsItem.content || newsItem.description).slice(0, 30) + "…" : (newsItem.content || newsItem.description)) : ""}
                                                            </p>

                                                            <div className="mt-auto">
                                                                {!newsItem.isLoading ? (
                                                                    <Link
                                                                        to={`/latest/${newsItem.id}`}
                                                                        className="text-decoration-none w-100"
                                                                        aria-label={`Read full article: ${newsItem.title}`}
                                                                    >
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                            <span className="text-dark fw-semibold">
                                                                                Learn More
                                                                                <span className="visually-hidden"> about {newsItem.title}</span>
                                                                            </span>
                                                                            <FaArrowRightLong className="text-dark" aria-hidden="true" />
                                                                        </div>
                                                                    </Link>
                                                                ) : (
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                        <span className="text-muted" style={{ fontSize: 12 }}>Loading...</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {pair.length === 1 && <div className="col-6 px-1" aria-hidden="true"></div>}
                                        </div>
                                    ));
                                })()
                            ) : (
                                <div className="text-center p-3 text-muted">Loading news...</div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* SHOW DETAILED NEWS when id EXISTS */}
            {
                id && data && (
                    <div className='row ABout_ImG mb-5'>
                        <div className='col-md-9 col-lg-9'>
                            <div className='mb-5'>
                                <img
                                    src={secureUrl(data?.images?.[0]?.image)}
                                    className="img-fluid mb-4"
                                    alt={data?.title || "News article"}
                                    loading='lazy'
                                    style={{
                                        width: "100%",
                                        maxHeight: "600px",
                                        objectFit: "contain",
                                        background: "#f3f3f3",
                                        borderRadius: "20px"
                                    }}
                                />
                            </div>

                            <p className="text-start text-muted mt-2">
                                <img src={calendar} className="m-1 claendar_Icon" height={20} width={20} alt="calender" />
                                {new Date(data?.published_at).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </p>

                            <h1 className="text-start">{data?.title}</h1>

                            <p className="mt-4 text-start text-black" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                                {data?.content}
                            </p>
                        </div>
                        <div className='col-12 col-md-2 col-lg-2'>
                            {Array.isArray(data4?.data) && data4.data.length > 0 ? (
                                data4.data.map((newsItem) => (
                                    <div className="col-12 col-md-12" key={newsItem.id}>
                                        <div className="Main-Card_1 mb-3 shadow-sm">
                                            <img
                                                src={secureUrl(newsItem.images?.[0]?.image)}
                                                className="card-img-top mb-2"
                                                alt={`${newsItem.title}`}
                                                loading='lazy'
                                                style={{
                                                    height: "195px",
                                                    width: "100%",
                                                    objectFit: "contain",
                                                    backgroundColor: "#f3f3f3",
                                                    borderRadius: "20px"
                                                }}
                                            />
                                            <div className="card-body1 d-flex flex-column">
                                                <p className="text-start text-muted mt-1">
                                                    <img src={calendar} className="m-1 claendar_Icon" height={20} width={20} alt="calender" />
                                                    {new Date(newsItem?.published_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                <h2 className="h6 m-1 text-start title-line-1">{newsItem.title}</h2>
                                                <p className="m-1 text-muted text-start title-content-2">{newsItem.content}</p>
                                                <div className="mt-auto">
                                                    <div className="d-flex align-items-center justify-content-between px-3 bg-opacity-10 border border-white border-opacity-25 rounded">
                                                        <Link
                                                            to={`/latest/${newsItem.id}`}
                                                            className="text-decoration-none w-100"
                                                            aria-label={`Read full article: ${newsItem.title}`}
                                                        >
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <span className="text-dark fw-semibold">
                                                                    Learn More
                                                                    <span className="visually-hidden"> about {newsItem.title}</span>
                                                                </span>
                                                                <FaArrowRightLong className="text-dark" aria-hidden="true" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted py-5">No news available</p>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default About_us;