// News.js
import { useEffect, useState } from "react";

function News() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    fetch("https://ahirsamajorg-bmhwcceqdtggcsc2.centralindia-01.azurewebsites.net/api/v1/history/histories/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNewsData(data[0]); // use first item
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!newsData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{newsData.title}</h2>
      <img
        src={newsData.images}
        alt={newsData.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{newsData.description}</p>
      <p><b>Category:</b> {newsData.categories}</p>
      <p><b>Tags:</b> {newsData.tags}</p>
      <p><b>Created At:</b> {new Date(newsData.created_at).toLocaleString()}</p>
      <p><b>Updated At:</b> {new Date(newsData.updated_at).toLocaleString()}</p>
    </div>
  );
}

export default News;
