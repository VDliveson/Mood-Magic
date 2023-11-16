import { useState,useEffect } from "react";
import MovieContext from "./movieContext";
import { API_KEY,url } from "../../App";
import Axios from "axios";

/* eslint-disable react-hooks/exhaustive-deps */


const MovieProvider = (props) => {
    const [movieList, updateMovieList] = useState([]);
    const [selectedMovie, onMovieSelect] = useState();
    const [title, setTitle] = useState("Trending Movies");
    const [progress, setProgress] = useState(0);
    const [searchQuery, updateSearchQuery] = useState("");
    const [recommended, getRecommendations] = useState([]);
    const [userData,fetchUserData] = useState({});
    const fetchData = async (searchString) => {
      setProgress(progress + 20);
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false&query=${searchString}`
      );
      updateMovieList(response.data.results);
      setProgress(100);
    };

    let auth_token = localStorage.getItem('auth_token');
  
    const getUserData = async (e) =>{
      let options = {
        method: "get",
        url: url + "user",
        headers: {
          Authorization: "Bearer " + auth_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
  
      let response = await Axios(options).catch((err) =>{
        console.error(err);
      });
  
      let responseOK = (response && response.status === 200);
  
      if (responseOK) {
        console.log(response)
        fetchUserData(response.data);
      }
    }

    const getTrending = async (e) => {
      onMovieSelect("");
      setProgress(20);
      setTitle("Trending");
      const trendingMovies = await Axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );
      setProgress(60);
      updateMovieList(trendingMovies.data.results);
      setProgress(100);
    };

    useEffect(() => {
      getTrending();
      getUserData();
    }, [])
    
    return (
      <MovieContext.Provider
        value={{
          movieList,
          updateMovieList,
          selectedMovie,
          onMovieSelect,
          title,
          setTitle,
          progress,
          setProgress,
          searchQuery,
          updateSearchQuery,
          getTrending,
          recommended,
          getRecommendations,
          fetchData,
          userData
        }}
      >
        {props.children}
      </MovieContext.Provider>
    );
  };
  
export default MovieProvider;