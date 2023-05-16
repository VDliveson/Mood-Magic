import React, { useState, useEffect, useContext } from "react";
import MovieContext from "../context/movie/movieContext";

import MovieInfoComponent from "./MovieInfoComponent";
import MovieComponent from "./MovieComponent";
import Axios from "axios";

import {
  MovieListContainer,
  RecommendedMovieListContainer,
  Placeholder,
  ComponentTitle,
} from "../helper/css-constants.js";

import { API_KEY, url } from "../App.js";

export default function MovieBox() {
  let auth_token = localStorage.getItem("auth_token");
  const context = useContext(MovieContext);
  const {
    movieList,
    updateMovieList,
    selectedMovie,
    onMovieSelect,
    title,
    setTitle,
    setProgress,
    searchQuery,
    updateSearchQuery,
    getTrending,
    recommended,
    getRecommendations
  } = context;

  // const getTrending = async (e) => {
  //   onMovieSelect("");
  //   setProgress(20);
  //   const trendingMovies = await Axios.get(
  //     `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  //   );
  //   setProgress(60);
  //   updateMovieList(trendingMovies.data.results);
  //   setProgress(100);
  // };

  // useEffect(() => {
  //   getTrending();
  // }, []);

  return (
    <>
      {selectedMovie && (
        <MovieInfoComponent
        />
      )}

      {recommended && recommended.length && (
        <>
          <h2 className="componentTitle">Movies recommended for you :</h2>
          <RecommendedMovieListContainer>
            {recommended.map((movie, index) => (
              <>
                <MovieComponent
                  key={index}
                  movie={movie}
                />
              </>
            ))}
          </RecommendedMovieListContainer>
        </>
      )}

      {movieList.length > 0 && <ComponentTitle>{title}</ComponentTitle>}

      <MovieListContainer>
        {movieList.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
            />
          ))
        ) : (
          <Placeholder src="./movie-icon.svg" />
        )}
      </MovieListContainer>
    </>
  );
}
