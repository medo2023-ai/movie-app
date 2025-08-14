
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import MyContext from "../js/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Videocard({item}){
   const navigate=useNavigate();
  const {watchlist,dispatch } = useContext(MyContext);
  const percentage = Math.min((item.vote_average || 0) * 10, 100);
   const isInWatchlist = watchlist.some((e) => e.id === item.id);
    const click = (e) => {
       const itemWithType = {
      ...item,
      media_type: item.media_type || (item.title ? "movie" : "tv"),
    };
    if (isInWatchlist) {
      e.target.style.color = "darkgray";
      dispatch({ type: "remove" ,payload:item.id});
    } else {
      e.target.style.color = "yellow";
      dispatch({ type: "add" ,payload:itemWithType});
    }
  };
function handleclick() {
  const type = item.media_type || (item.title ? "movie" : "tv");
  navigate(type === "movie" ? `/details/${item.id}` : `/showsdetail/${item.id}`);
}
const getPathColor = () => {
  if (percentage >= 70) return "#21d07a";     
  if (percentage >= 40) return "#d2d531"; 
  return "#db2360";                         
};
   return(
     <>
    <div className="video-card" key={item.id}>
                    <div className="image">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={item.title}
                        onClick={handleclick}
                      />
                      <div className="rate">
                        
<CircularProgressbar
  value={percentage}
  text={percentage > 0 ? `${percentage.toFixed(0)}%` : "N/A"}
  background
  styles={buildStyles({
    pathColor: getPathColor(),      
    trailColor: "transparent", 
    textColor: "#fff",
    textSize: "24px",
    backgroundColor:"black", 
  })} className="rate-cricle"
/>
                        
                      </div>
                    </div>
                    <div className="info">
                      <h4>{item.title||item.name}</h4>
                      <div className="date">
                        <p>{item.release_date||item.first_air_date}</p>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="heart-icon"
                          onClick={click}
                          style={{ color: isInWatchlist ? "yellow" : "darkgray" }}
                        />
                      </div>
                    </div>
                  </div>
              </>
   );
}
export default Videocard