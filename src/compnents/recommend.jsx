import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyContext from "../js/context";
import { recommendation } from "../js/apis";
import Videocard from "./video-card";
function Recommend({id}){
   const[movies,setmovies]=useState([]);
    useEffect(()=>{
            const fetchData = async () => {
              try {
                const data = await recommendation(id);
                setmovies(data);
              } catch (error) {
                console.error("error in get data", error);
              }
              
            }; 
            fetchData();
      },[id])
 return (
  <section className="recommended">
    <div  className="container">
            <h2>Recommendations</h2>
            <section className="container videos-container">
  {Array.isArray(movies) && movies.length > 0 ? (
    movies.map((movie) => (
      <Videocard key={movie.id} item={movie} />
    ))
  ) : (
    <p style={{color:"black",fontWeight:"bold"}}>No recommendations available.</p>
  )}
</section>

    </div>
  </section>
);

}
export default Recommend