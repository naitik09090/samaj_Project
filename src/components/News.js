import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultNewsList from '../data/newsData.json';

export default function LatestDetails() {
    // All data is loaded directly from JSON files in src/data directory
    const { id } = useParams();                  // GET ID FROM URL
    const [data, setData] = useState(null);

    // Find news item from the list based on URL id parameter (client-side lookup)
    useEffect(() => {
        if (defaultNewsList?.data && Array.isArray(defaultNewsList.data)) {
            const foundNews = defaultNewsList.data.find(item => item.id === id);
            setData(foundNews || null);
        }
    }, [id]);

    if (!data) return <h3>Loading...</h3>;

    return (
        <div></div>
    );
}
