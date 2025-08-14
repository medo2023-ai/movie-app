import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import MyContext from "../js/context";
import Videocard from "./video-card";
import { getTvShows } from "../js/apis";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Tvshows() {
   const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
   const currentpage = Number(searchParams.get("page")) || 1;
  const [videos, setVideos] = useState([]);
  const [totalpages, settotalpages] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchitem, setsearch] = useState("");
  const [_searchParams, _setSearchParams] = useSearchParams();

  function changePage(newPage) {
    if (newPage < 1 || newPage > totalpages) return;
    searchParams.set("page",newPage);
    setSearchParams(searchParams)
  }

  const getPreviousPages = () => {
    const pages = [];
    for (let i = currentpage - 1; i > 0; i--) {
      pages.unshift(
        <Pagination.Item key={i} onClick={() => changePage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  const getNextPages = () => {
    let count = 1;
    const pages = [];
    for (let i = currentpage + 1; count <= 5; i++) {
      pages.push(
        <Pagination.Item key={i} onClick={() => changePage(i)}>
          {i}
        </Pagination.Item>
      );
      count++;
    }
    return pages;
  };

  function handlechange(e) {
    setsearch(e.target.value);
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
      const data = await getTvShows(currentpage);
      settotalpages(data.total_pages);
      setVideos(data.results);
    } catch (error) {
      console.error("error in get data", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [currentpage]);
if(loading) return <div className="loading"></div>
  return (
    <>
      <section className="body">
        <div className="container">
          <h3>welcome to our movie app</h3>
          <p>millions of movies, tv shows, people to discover. explore now.</p>
          <div className="search">
            <input
              type="text"
              placeholder="search and explore"
              onChange={handlechange} onKeyDown={enter}
            />
            <button type="submit" onClick={handlesearch}>
              search
            </button>
          </div>
            <div className="choise">
           <Link to="/movies">movies</Link>
           <Link to="/tvshows" className="active">tvshows</Link>
          </div>
        </div>
      </section>

      <section className="videos">
        <div className="container">
          <h3 style={{ marginBottom: "15px" }}>Popular TV Shows</h3>

          <div className="videos-container">
            {videos.map((e)=><Videocard item={e}/>)}
            </div>

          <div className="pain pagination">
            <Pagination>
              <Pagination.Prev
                onClick={() => {
                  if (currentpage > 1) changePage(currentpage - 1);
                }}
              />
              {getPreviousPages()}
              <Pagination.Item active>{currentpage}</Pagination.Item>
              {getNextPages()}
              <Pagination.Ellipsis />
              <Pagination.Item onClick={() => changePage(totalpages)}>
                {totalpages}
              </Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  if (currentpage < totalpages) changePage(currentpage + 1);
                }}
              />
            </Pagination>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tvshows;
