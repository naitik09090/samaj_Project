import img6 from '../images/img_6.jpg'
import { FaRegCalendarAlt } from 'react-icons/fa';
import img5 from '../images/img_5.jpg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const About_us = () => {
    const [data4, setData4] = useState([]);

    useEffect(() => {
        fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/news/?id=1")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setData4(json);
            })
            .catch((err) => console.error(err));
    }, []);

    // helper function to force https
    const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");

    return (
        <div className='container-fluid'>
            <div className='container-fluid'>
                <div className='row ABout_ImG mb-5'>
                    <div className='col-12 col-sm-6 col-md-8 col-lg-8'>
                        {Array.isArray(data4?.data) &&
                            data4.data.map((data) => (
                                <img
                                    key={data.id + "-main"}
                                    className="img_121 mb-5"
                                    src={secureUrl(data.image)}
                                    alt={`${data.name} image Responsive`}
                                />
                            ))
                        }

                        {Array.isArray(data4?.data) &&
                            data4.data.map((data) => (
                                <h2 key={data.id + "-cat"} className="mt-3 text-start mb-3">{data.category_name}</h2>
                            ))
                        }

                        <p className='text-start'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>
                        <p className='text-start'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>
                        <p className='text-start'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>

                        <h1 className='text-start'>
                            Licensed & Regulated Exchange
                        </h1>
                        <p className='text-start'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>
                        <p className='text-start'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        </p>
                    </div>

                    <div className='col-12 col-md-4 col-lg-1'>
                        <div className="vertical-line"></div>
                    </div>

                    <div className='col-12 col-md-4 col-lg-3'>
                        <div>
                            {Array.isArray(data4?.data) &&
                                data4.data.map((data) => (
                                    <div className="col-md-12 mb-4" key={data.id + "-block1"}>
                                        <Link to="#" className="text-decoration-none text-dark">
                                            <div className="p-3">
                                                <h1 className="mt-3 text-start mb-5">{data.category_name}</h1>
                                                <img
                                                    src={secureUrl(data.image)}
                                                    alt={`${data.name} image`}
                                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                                />
                                                <h1 className="mt-3 text-start">{data.title}</h1>
                                                <p className="mt-3 text-start">{data.content}</p>
                                                <p className="mt-3 text-start">{data.published_at}</p>
                                                <p className="mt-3 text-start">{data.is_active}</p>
                                                <p className="mt-3 text-start mb-3">{data.created_at}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }

                            {Array.isArray(data4?.data) &&
                                data4.data.map((data) => (
                                    <div className="col-md-12 mb-4" key={data.id + "-block2"}>
                                        <Link to="#" className="text-decoration-none text-dark">
                                            <div className="p-3">
                                                <img
                                                    src={secureUrl(data.image)}
                                                    alt={`${data.name} image`}
                                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                                />
                                                <h1 className="mt-3 text-start">{data.title}</h1>
                                                <p className="mt-3 text-start">{data.content}</p>
                                                <p className="mt-3 text-start">{data.published_at}</p>
                                                <p className="mt-3 text-start">{data.is_active}</p>
                                                <p className="mt-3 text-start mb-3">{data.created_at}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About_us;
