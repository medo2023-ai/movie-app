import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Videocard from "./video-card";
import { searchedvideo } from "../js/apis";

function Searched() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("movie");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchitem, setSearchItem] = useState("");
  const navigate = useNavigate();

  function handlechange(e) {
    setSearchItem(e.target.value);
  }

  function handlesearch() {
    if (searchitem.trim() !== "") {
      navigate(`/videos/?movie=${searchitem}`);
    }
  }
  function enter(e){
    if(e.key==="Enter"){
      handlesearch()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchedvideo(query);
        setVideos(data.results || []);
      } catch (error) {
        console.error("error in get data", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setVideos([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) return <div className="loading"></div>;

  return (
    <>
      <section className="body">
        <div className="container">
          <div className="search">
            <input
              type="text"
              placeholder="Search and explore"
              onChange={handlechange} onKeyDown={enter}
              value={searchitem}
            />
            <button type="submit" onClick={handlesearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="videos">
        <div className="container">
          <h3>Results for: {query}</h3>
          <div className="videos-container">
            {videos.length === 0 ? (
              <p>No results found.</p>
            ) : (
              videos.map((e) => <Videocard key={e.id} item={e} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Searched;
