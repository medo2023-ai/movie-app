import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import MyContext from "../js/context";
function Header(){
    const{watchlist}=useContext(MyContext);
    return(
         <header>
            <div className="container">
                  <h1>movie app</h1>
    <nav>
        <ul>
            <li><div className="watchlist" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div className="list">
                    <FontAwesomeIcon icon={faHeart} className="heart" />
                    <span className="counter">{watchlist.length}</span>
                </div>
                <Link to="/watchlist">watchlist</Link>
            </div>
            </li>
        </ul>
    </nav>
            </div>

   </header>
    )
  

} export default Header;