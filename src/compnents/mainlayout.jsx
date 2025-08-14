import { Outlet } from "react-router-dom";
import Header from "./header"
function Mainlayout(){
    return(
        <>
         <Header/>
        <Outlet/>
        </>
       
    );

}
export default Mainlayout