import MyContext from "../js/context"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getdtailtvshows } from "../js/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Card from "./moviedetail-card";
import Recommend from "./recommend";
import Videocard from "./video-card";
function Showsdetail(){
    const{id}=useParams();
    const [movie, setMovie] = useState(null);
    const[loading,setloading]=useState(true);
    useEffect(()=>{
          const fetchData = async () => {
            try {
              const data = await getdtailtvshows(id);
              setMovie(data);
              setloading(false);
            } catch (error) {
              console.error("error in get data", error);
            }
            
          }; 
          fetchData();
    },[id])
     if (loading) {
    return <div className="loading"></div>;
  }
    return(
        <>
        <div className="container">
        <Card movie={movie}/>
        </div>
        <hr></hr>
        <Recommend id={id}/>
        </>

    )
}
export default Showsdetail;