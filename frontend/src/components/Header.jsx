import React ,{useContext,useState} from 'react'
import { API_KEY } from '../App';
import MovieContext from '../context/movie/movieContext';
import { Link,to } from 'react-router-dom';

export default function Header(props) {

  const context = useContext(MovieContext);
  const {
    movieList,
    updateMovieList,
    selectedMovie,
    onMovieSelect,
    title,
    setTitle,
    recommended,
    getRecommendations,
    searchQuery, 
    updateSearchQuery,
    getTrending,
    progress,
    setProgress,
    fetchData
  } = context;

  const [timeoutId, updateTimeoutId] = useState();

  const onTextChange = (e) => {
    onMovieSelect("");
    updateMovieList([]);
    getRecommendations([]);
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    if (e.target.value === "") {
      getTrending();
      updateMovieList([]);
    } else {
      const timeout = setTimeout(() => fetchData(e.target.value), 500);
      updateTimeoutId(timeout);
    }
  };

  return (
    <div className="header">
        <div className="appName">
          <Link to="/">
          <img className="movieImage" src="./movie-icon.svg" />          
          </Link>
          MoodMagic
        </div>
        
        {/* <TrendingButton
        onClick = {getTrending}>
          Trending
        </TrendingButton> */}
        <div className="searchBox">
          <img className= "searchIcon" src="./search-icon.png" />
          <input className="searchInput"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
    </div>
  )
}
