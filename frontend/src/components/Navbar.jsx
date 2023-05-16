import React, { useContext, useState } from "react";
import { API_KEY } from "../App";
import MovieContext from "../context/movie/movieContext";
import { Link, to,useNavigate } from "react-router-dom";

const NavBar = (props) => {
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
    fetchData,
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
      setTitle(`Search results for ${e.target.value}`);
      updateTimeoutId(timeout);
    }
  };

  const logout = async ()=>{
    localStorage.removeItem("auth_token");
    navigate("/login");
  }
  
  const navigate = useNavigate();




  return (
    <nav className="navbar navbar-expand-lg bg-black" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="../movie-icon.svg" alt="" width="30" height="24" />
          MoodMagic
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link"  href = "" onClick={logout}>
                Logout
              </a>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li> */}
          </ul>
          <ul className="navbar-nav ms-auto">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"
              style={{background:"white"}}>
                <img className= "searchIcon" src="./search-icon.png" />
              </span>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Movie"
                aria-label="Search"
                onChange={onTextChange}
                style={{background:"white",color:"black"}}
              />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
