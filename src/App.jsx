import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "./compnents/mainlayout";
import Videos from "./compnents/videos";
import './App.css'
import { Navigate } from "react-router-dom";
import { useReducer } from "react";
import MyContext from "./js/context";
import Searched from "./compnents/searched";
import Moviedetail from "./compnents/moviedetail";
import Watchlist from "./compnents/watchlist";
import Tvshows from "./compnents/tvshows";
import Showsdetail from "./compnents/tvshowsdetail";
import { useState } from "react";
function App() {
   const reducer=(state,action)=>{
      switch(action.type){
        case "add":
         if (state.find((movie) => movie.id === action.payload.id)) return state;
      return [...state, action.payload];
         case "remove":
          return state.filter((movie)=>movie.id!==action.payload);
      }
    }
    const [watchlist, dispatch] = useReducer(reducer, []);
      const [rating, setRating] = useState([]);
const router = createBrowserRouter([
  {
    path: "",
    element: <Mainlayout />,
    children: [
      { index: true, element: <Navigate to="movies/?page=1" replace /> },
      { path: "movies/", element: <Videos /> },
      {path:"videos/",element:<Searched/>},
      {path:"details/:id",element:<Moviedetail/>},
      {path:"showsdetail/:id",element:<Showsdetail/>},
      {path:"watchlist/",element:<Watchlist/>},
      {path:"tvshows",element:<Tvshows/>}
    ]
  }
]);
 return(
  <MyContext.Provider value={{watchlist,dispatch,rating,setRating}}>
    <RouterProvider router={router}>
   </RouterProvider>
  </MyContext.Provider>
   
 );

}

export default App
