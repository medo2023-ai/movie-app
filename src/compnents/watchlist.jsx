import { useContext, useEffect, useState } from "react";
import MyContext from "../js/context";
import Videocard from "./video-card";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Watchlistcard from "./watchlist-card";

function Watchlist(){
    const{watchlist}=useContext(MyContext);
    const[filter,setfilter]=useState([]);
     const [activeFilter, setActiveFilter] = useState("all");
       useEffect(() => {
  if (activeFilter === "movie") {
    setfilter(watchlist.filter((e) => e.media_type === "movie"));
  } else if (activeFilter === "tv") {
    setfilter(watchlist.filter((e) => e.media_type === "tv"));
  } else {
    setfilter(watchlist);
  }
}, [watchlist,activeFilter]);
   
    if(watchlist.length==0) {
        return <div className="noitems">
            <div className="container">
            <FontAwesomeIcon icon={faFaceFrown}  style={{ color: "gray" }} className="empty"/>
            <div className="homepage">
                <Link to="/">homepage</Link>
            </div>
            </div>
        </div>
    }
    const handleMovies = (i) => {
  i.target.classList.add("active");
  setActiveFilter("movie");
};

const handleTvShows = (i) => {
  i.target.classList.add("active");
  setActiveFilter("tv");
};

const handleAll = (i) => {
  i.target.classList.add("active");
  setActiveFilter("all");
};

    return(
        <section className="watchlist">
            <div className="container">
        <div className="choise">
  <button 
    onClick={handleMovies} 
    className={activeFilter === "movie" ? "active" : ""}
  >
    Movies
  </button>
  <button 
    onClick={handleTvShows} 
    className={activeFilter === "tv" ? "active" : ""}
  >
    TV Shows
  </button>
  <button 
    onClick={handleAll} 
    className={activeFilter === "all" ? "active" : ""}
  >
    All
  </button>
</div>

              <div className="watchlist-card">
                  {filter.map(video=><Watchlistcard movie={video}/>)}
              </div>
            </div>
        </section>
    )
}
export default Watchlist;