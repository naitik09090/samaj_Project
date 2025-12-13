import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LatestDetails() {
    const { id } = useParams();                  // GET ID FROM URL
    const [data, setData] = useState(null);

    const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";           // 🔥 Replace with your BASE URL

    useEffect(() => {
        fetch(`${URL}/api/v1/news/${id}`)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setData(result?.data);                 // Most APIs use { data: {...} }
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!data) return <h3>Loading...</h3>;

    return (
        <div></div>
    );
}
