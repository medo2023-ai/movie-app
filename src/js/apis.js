const key="c0b7f3fa09aca04843f214ed43eb8e45";
const api_link="https://api.themoviedb.org/3/trending/movie/day";
const api_link2="https://api.themoviedb.org/3/search/movie";
const api_detail="https://api.themoviedb.org/3/movie";
const api_tvshows="https://api.themoviedb.org/3/tv/popular";
const api_tvshowslist="https://api.themoviedb.org/3/tv/"
export const getvideos= async(currentpage)=>{
    const res= await fetch(`${api_link}?api_key=${key}&page=${currentpage}`);
    const data = await res.json()
    return data;
}
export const searchedvideo=async(query)=>{
    const res= await fetch(
        `${api_link2}?api_key=c0b7f3fa09aca04843f214ed43eb8e45&query=${query}`
      )
      const data = await res.json();
       return data;
}
export const getdtailvideo = async (id) => {
  const res = await fetch(`${api_detail}/${id}?api_key=${key}`);
  const data = await res.json();
  return data;
};
export const recommendation=async(id)=>{
  const res= await fetch(`${api_detail}/${id}/recommendations?api_key=${key}`);
  const data= await res.json();
   return data.results;
  
}
export const getTvShows=async(page)=>{
  const res = await fetch(`${api_tvshows}?api_key=${key}&page=${page}`);
  const data =await res.json();
  return data;
  
}
export const getdtailtvshows = async (id) => {
  const res = await fetch(`${api_tvshowslist}${id}?api_key=${key}`);
  const data = await res.json();
  return data;
};

