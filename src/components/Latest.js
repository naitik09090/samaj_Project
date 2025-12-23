// import img6 from '../images/img_6.jpg'
// import { FaRegCalendarAlt } from 'react-icons/fa';
// import img5 from '../images/img_5.jpg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import calendar from "../images/calendar.png"
import { FaArrowRightLong } from "react-icons/fa6";

const About_us = () => {
    const [data4, setData4] = useState([]);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [featuredId, setFeaturedId] = useState(null);

    const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";


    // ...existing code...
    useEffect(() => {
        fetch(`${URL}/api/v1/news/`)
            .then((res) => res.json())
            .then((json) => {
                console.log("News list:", json);
                setData4(json);
                // set default featured to first item on initial load
                if (!featuredId && json?.data && json.data.length > 0) {
                    setFeaturedId(json.data[0].id);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        // Use id from URL, or default to 1
        const newsId = id || 1;

        fetch(`${URL}/api/v1/news/${newsId}`)
            .then(res => res.json())
            .then(result => {
                console.log("Single news:", result);
                setData(result?.data);
            })
            .catch(err => console.error(err));
    }, [id]);
    // ...existing code...
    // ...existing code...

    // Prepare news list with featured item first
    const newsList = Array.isArray(data4?.data) ? [...data4.data] : [];
    if (featuredId) {
        const idx = newsList.findIndex(n => n.id === featuredId);
        if (idx > 0) {
            const [item] = newsList.splice(idx, 1);
            newsList.unshift(item);
        }
    }

    // if (!data) return <h3>Loading...</h3>;

    // Collect unique category names so we don't print duplicates repeatedly
    // const uniqueCategories = [...new Set(items.map((it) => it.category_name))];

    // helper function to force https
    const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");

    return (
        <div className='container-fluid'>
            <div className='row ABout_ImG mb-5'>
                <div className='col-md-12 col-lg-12 mb-5'>
                    {/* IMAGE */}
                    {/* IMAGE SLIDER (replaces single image) */}
                    <div>
                        {Array.isArray(data?.images) && data.images.length > 0 ? (
                            <div id="detailCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    {data.images.map((img, idx) => (
                                        <button
                                            key={idx.id}
                                            type="button"
                                            data-bs-target="#detailCarousel"
                                            data-bs-slide-to={idx}
                                            className={idx === 0 ? "active" : ""}
                                            aria-current={idx === 0 ? "true" : undefined}
                                            aria-label={`Slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                <div className="carousel-inner" style={{ borderRadius: 20, overflow: "hidden" }}>
                                    {data.images.map((img, idx) => (
                                        <div key={idx.id} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                                            <img
                                                src={secureUrl(img.image)}
                                                className="d-block w-100"
                                                alt={`slide-${idx}`}
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "600px",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#detailCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon"></span>
                                </button>

                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#detailCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon"></span>
                                </button>

                            </div>
                        ) : (
                            <img
                                src={secureUrl(data?.images?.[0]?.image)}
                                className="img-fluid mb-4"
                                alt="news"
                                style={{
                                    width: "100%",
                                    maxHeight: "600px",
                                    objectFit: "contain",
                                    borderRadius: "20px"
                                }}
                            />
                        )}
                    </div>

                    {/* DATE */}
                    <p className="text-start text-muted mt-2">
                        <img src={calendar} className="m-1 claendar_Icon" alt='Date' height={20} width={20} />
                        {new Date(data?.published_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </p>

                    {/* TITLE */}
                    <h1 className="text-start">{data?.title}</h1>


                    {/* CONTENT */}
                    <p className="mt-4 text-start text-black" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                        {data?.content}
                    </p>
                </div>

                {/* <div className='col-12 col-md-4 col-lg-3'>
                        <div>
                            {Array.isArray(data4?.data) &&
                                data4.data.map((data,idx) => (
                                    <div className="col-md-12 mb-4" key={data.id + "-block1"}>
                                        <Link to="#" className="text-decoration-none text-dark">
                                            <div className="p-3">
                                                <h3 className="mt-3 text-center mb-3">{data.category_name}</h3>
                                                <img
                                                    src={secureUrl(data.images[idx]?.image)}
                                                    alt={`${data.name} image`}
                                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                                />
                                                <h5 className="mt-3 text-start">{data.title}</h5>
                                                <p className="text-start">published Date:- {data.published_at}</p>
                                                <p className="text-start">updated Date:- {data.updated_at}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div> */}
                {/* Replace the narrow sidebar block with a full-width grid showing 4 cards per row */}
                <div className='col-12'>
                    <h1 className='text-center mb-4' style={{fontWeight:'500'}}>મોર ન્યૂઝ</h1>
                </div>
                <div className='col-12'>

                    {/* ------------------ DESKTOP VIEW (md and up) ------------------ */}
                    <div className="d-none d-md-block">
                        <div className="row justify-content-center g-3">

                            {Array.isArray(data4?.data) && data4.data.length > 0 ? (
                                data4.data.slice(0, 4).map((item) => (
                                    <div className="col-auto" key={item.id}> {/* auto width for side-by-side */}
                                        <div
                                            className="card shadow-sm rounded-4 p-2"
                                            style={{ width: "220px" }}  // card width
                                        >

                                            <img
                                                src={secureUrl(item.images?.[0]?.image)}
                                                alt="Latest News"
                                                style={{
                                                    height: "140px",
                                                    width: "100%",
                                                    objectFit: "contain",
                                                    borderRadius: "15px"
                                                }}
                                                className="mb-2"
                                            />

                                            <div className="card-body d-flex flex-column">
                                                <p className="text-start text-muted mt-1 d-flex align-items-center">
                                                    <img
                                                        src={calendar}
                                                        alt="calendar"
                                                        className="me-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    {new Date(item?.published_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                <h6 className="m-1 text-start title-line-1">{item.title}</h6>
                                                <p className="m-1 text-muted text-start title-content-2">{item.content}</p>

                                                <div className="mt-auto">
                                                    <Link
                                                        to={`/latest/${item.id}`}
                                                        className="text-decoration-none w-100"
                                                        aria-label={`Read article: ${item.title}`}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-between px-3 py-2">
                                                            <span className="text-dark fw-semibold">
                                                                Learn More
                                                                <span className="visually-hidden"> about {item.title}</span>
                                                            </span>
                                                            <FaArrowRightLong className="text-dark" aria-hidden="true" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <p className="text-center text-muted py-5">Loading news...</p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* ------------------ MOBILE VIEW (xs–sm) ------------------ */}
                    <div className="d-block d-md-none">
                        <div className='row g-3'>
                            {Array.isArray(data4?.data) && data4.data.length > 0 ? (
                                data4.data.map((item) => (
                                    <div className="col-6" key={item.id}>
                                        <div className="Main-Card_1 p-1 h-100 d-flex flex-column">
                                            <img
                                                src={secureUrl(item.images?.[0]?.image)}
                                                className="Main-Card_2 mb-2"
                                                // alt={`${item.name} image`}
                                                alt='Mobile View Latest News'
                                                style={{
                                                    objectFit: "contain",
                                                    backgroundColor: "#067C71",
                                                    borderRadius: "22px",
                                                    width: "100%",
                                                    height: 110,       // smaller fixed height on mobile
                                                }}
                                            />
                                            <div className="card-body1 d-flex flex-column" style={{ padding: "8px" }}>
                                                <p className="text-start text-muted mb-1" style={{ fontSize: 12 }}>
                                                    <img src={calendar} className="claendar_Icon" height={16} width={16} alt="calendar" />
                                                    {new Date(item?.published_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                <h6 className="text-start title-line-1" style={{ fontSize: 14 }}>
                                                    {item.title.length > 60 ? item.title.slice(0, 60) + "…" : item.title}
                                                </h6>

                                                <p className="text-muted text-start small" style={{ fontSize: 12 }}>
                                                    {typeof item.content === "string" ? (item.content.length > 40 ? item.content.slice(0, 30) + "…" : item.content) : ""}
                                                </p>

                                                <div className="mt-auto">
                                                    <hr />
                                                    <div className="mt-auto">
                                                        <Link
                                                            to={`/latest/${item.id}`}
                                                            className="text-decoration-none w-100"
                                                            aria-label={`Read article: ${item.title}`}
                                                        >
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <span className="text-dark fw-semibold">
                                                                    Learn More
                                                                    <span className="visually-hidden"> about {item.title}</span>
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
                                <div className="col-12">
                                    <p className="text-center text-muted py-4">Loading news...</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default About_us;
