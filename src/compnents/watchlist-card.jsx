import MyContext from "../js/context";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Watchlistcard({ movie }) {
  const { watchlist, dispatch } = useContext(MyContext);
  const {rating, setRating} = useContext(MyContext);
  const isInWatchlist = watchlist.some((e) => e.id === movie.id);
  const nav= useNavigate()
  const click = () => {
    if (isInWatchlist) {
      dispatch({ type: "remove", payload: movie.id });
    } else {
      dispatch({ type: "add", payload: movie });
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
function handleclick() {
  const type = movie.media_type || (movie.title ? "movie" : "tv");
  nav(type === "movie" ? `/details/${movie.id}` : `/showsdetail/${movie.id}`);
}


  return (
        <div className="card-flex">
               <div className="img">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.original_title}
          onClick={handleclick}
          style={{cursor:"pointer"}}
        />
      </div>
          <div className="details">
        <div className="detail">
          <div>
            <h3>{movie.name||movie.title}</h3>
            <div className="date" style={{ marginLeft: "10px" }}>
              <p>{movie.first_air_date||movie.release_date}</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faHeart}
            className="heart-icon"
            onClick={click}
            style={{
              color: isInWatchlist ? "yellow" : "darkgray",
              cursor: "pointer",
            }}
          />
        </div>

        <div className="rates">
          <div className="stars">{stars()}</div>
          <div className="vote-count">
            <p style={{ fontWeight: "bold" }}>{movie.vote_count} </p>
          </div>
        </div>

        <div className="overview">
          <p>{movie.overview}</p>
        </div>
      </div>
        </div>
  
  );
}

export default Watchlistcard;
