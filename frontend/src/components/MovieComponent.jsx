import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import styled from "styled-components";
import { API_KEY, url } from "../App";
import MovieContext from "../context/movie/movieContext";

let auth_token = localStorage.getItem("auth_token");

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #272727;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #000;
  cursor: pointer;
`;

function get_year(date) {
  let year = new Date(date).getFullYear();
  return year;
}

function set_options(title) {
  let options = {
    method: "post",
    url: url + "recommend",
    headers: {
      Authorization: "Bearer " + `${auth_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      movie: `${title}`,
    },
  };

  return options;
}

let adult_poster = "https://loeildelaphotographie.com/wp-content/uploads/2017/09/I-WANT-YOU.jpeg";
const MovieComponent = (props) => {
  // const { Title, Year, imdbID, Type, Poster } = props.movie;
  const { poster_path, adult, release_date, id, title } = props.movie;
  let poster = "";
  if (poster_path) {
    poster = "https://image.tmdb.org/t/p/w500/" + poster_path;
  } else {
    poster =
      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
  }

  const Type = "movie";

  const onClick = async () => {
    let options = set_options(title);
    let rec = [];
    setProgress(20);
    getRecommendations([])
    let response = await Axios(options);
    if (response && response.status === 200) {
      let ids = response.data.recommendations;
      setProgress(40);
      ids.map((id, index) => {
        Axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )
          .then((response) => {
            rec.push(response.data);
            setProgress(60);
          })
          .catch((err) => {});
      });
    }

    setTimeout(() => {
      getRecommendations(rec);
      setProgress(100);
      onMovieSelect(id);
    }, 500);
    // props.getRecom(rec);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 550);
  }


  const context = useContext(MovieContext);
  
  const {
    movieList,
    updateMovieList,
    selectedMovie,
    onMovieSelect,
    setTitle,
    recommended,
    getRecommendations,
    setProgress,
  } = context;

  return (
    <MovieContainer
      onClick={onClick}
      className="movieComponent"
      // style = {boxStyle}
    >
      <span className="adultInfo">{adult ? "adult" : ""}</span>
      <img className="coverImage"
        src={!adult ? poster : `${adult_poster}`}
        // src={poster}
        alt={title}
      />

      <span className="movieName">{title}</span>

      <div className="infoColumn">
        <span className="movieInfo">Year : {get_year(release_date)}</span>
        <span className="movieInfo">{Type}</span>
      </div>
    </MovieContainer>
  );
};
export default MovieComponent;
