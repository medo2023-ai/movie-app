import MyContext from "../js/context"
import { _useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

function Card({movie}){
  const {watchlist,dispatch,rating, setRating } = useContext(MyContext);
   const isInWatchlist = watchlist.some((e) => e.id === movie.id);
    const click = (e) => {
    if (isInWatchlist) {
      e.target.style.color = "darkgray";
      dispatch({ type: "remove" ,payload:movie.id});
    } else {
      e.target.style.color = "yellow";
      dispatch({ type: "add" ,payload:movie});
    }
  };
    const handleStarClick = (index) => {
  const updated = rating.filter((r) => r.id !== movie.id);
  setRating([...updated, { id: movie.id, index }]);
};
  const stars = () => {
  let starArray = [];
  const currentRating = rating.find((r) => r.id === movie.id)?.index || 0;
  for (let i = 1; i <= 5; i++) {
    starArray.push(
      <FontAwesomeIcon
        key={i}
        icon={solidStar}
        className="star"
        onClick={() => handleStarClick(i)}
        style={{
          color: i <= currentRating ? "yellow" : "#6e6e6e",
          cursor: "pointer",
          marginRight: "5px"
        }}
      />
    );
  }
  return starArray;
};
  return(
    <>
        <div className="detail-card">
                <div className="img">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} />
                </div>
                <div className="details">
                    <div className="detail">
                        <div>
                             <h3>{movie.original_title}</h3>
                     <div className="date" style={{marginLeft:"10px"}}>
                    <p>{movie.release_date}</p>
                        </div>
                    </div>
                      <FontAwesomeIcon
                          icon={faHeart}
                          className="heart-icon"
                          onClick={click}
                            style={{ color: isInWatchlist ? "yellow" : "darkgray" }}
                          
                        />
                </div>
               
                <div className="rates">
                    <div className="stars">
                    {stars()}
                    </div>
                    <div className="vote-count">
                        <p  style={{fontWeight:"bold"}}>{movie.vote_count}</p>
                    </div>
                </div>
                <div className="overview">
                    <p>{movie.overview}</p>
                </div>
                <div className="genres">
                    {movie.genres.map((e)=>{
                       return <p>{e.name?e.name:"undefined"}</p>
                    })}
                </div>
                <div className="additional-info">
                     <div className="duration">
                    <p>Duration:</p>
                    <p>{movie.runtime} Min.</p>
                </div>
                <div className="language">
                    <p>languages:</p>
                    <p>{movie.spoken_languages[0].name||"unknown"}</p>
                </div>
                </div>
                 <div className="studio">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.production_companies[0].logo_path}`}/>
                </div>
                <div className="website">
                    <Link to="/">Home</Link>
                </div>
                </div>
            </div></>
  )
}
export default Card;