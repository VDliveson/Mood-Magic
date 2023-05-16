import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";
import jwt_decode from "jwt-decode";

import MovieComponent from "./components/MovieComponent";
import ChatBotComponent from "./components/ChatBot";
import MovieBox from "./components/MovieBox";
import TopLoader from "./components/TopLoader";
// import MovieContext from "./context/movie/movieContext";
// import Navbar from "./components/Navbar";
import Header from "./components/Header";
// import LoadingBar from "react-top-loading-bar";

import MovieProvider from "./context/movie/movieState";

import "./App.css";

import {
  Container,
  MovieListContainer,
  RecommendedMovieListContainer,
  Placeholder,
  ComponentTitle,
} from "./helper/css-constants.js";

// export const API_KEY = "47a4d46d";
export const API_KEY = "3112db6508f38d836229cb436cfd8e12";
export const url = "http://127.0.0.1:8000/";

function App() {
  // const [Trending, ShowTrending] = useState(false);

  // const [movieList, updateMovieList] = useState([]);
  // const [selectedMovie, onMovieSelect] = useState();
  // const [title, setTitle] = useState(["Trending Movies"]);
  // const [progress, setProgress] = useState(0);
  // const [searchQuery, updateSearchQuery] = useState("");

  // const [recommended, getRecommendations] = useState([]);

  // const [selectedMovieTitle, onRecomSelected] = useState();

  // const [recMovie, setRMovie] = useState([]);

  // const context = useContext(MovieContext)
  // const {movieList, updateMovieList,selectedMovie,
  //   onMovieSelect,title,setTitle,progress,setProgress} = context;

  // const onTextChange = (e) => {
  //   onMovieSelect("");
  //   updateMovieList([]);
  //   getRecommendations([]);
  //   clearTimeout(timeoutId);
  //   updateSearchQuery(e.target.value);
  //   if (e.target.value === "") {
  //     getTrending();
  //     updateMovieList([]);
  //   } else {
  //     const timeout = setTimeout(() => fetchData(e.target.value), 500);
  //     updateTimeoutId(timeout);
  //   }
  // };

  async function get_auth_token() {
    let token_data = await Axios({
      method: "post",
      url: url + "login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: "dv",
        password: "vd12345678",
      },
    });

    let token_go = await (token_data && token_data.status === 200);
    let access_token = null;

    if (token_go) {
      access_token = token_data.data["access"];
      localStorage.setItem("auth_token", access_token);
    }
  }

  // let auth_token = localStorage.getItem("auth_token");

  useEffect(() => {
    get_auth_token();
    // getTrending();
  }, []);

  return (
    <MovieProvider>
      <Container>
        <TopLoader></TopLoader>
        <div>
          {/* <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          /> */}
        </div>

        {/* <Header value={searchQuery} onChange={onTextChange}></Header> */}
        <Header></Header>
        <MovieBox></MovieBox>
        {/* {selectedMovie && (
          <MovieInfoComponent
            selectedMovie={selectedMovie}
            onMovieSelect={onMovieSelect}
            getRecom={getRecommendations}
          />
        )} */}

        {/* {recommended && recommended.length && (
        <>
          <h2 className="componentTitle">Movies recommended for you :</h2>
          <RecommendedMovieListContainer>
            {recommended.map((movie, index) => (
              <>
                <MovieComponent
                  key={index}
                  movie={movie}
                  // setProgress={setProgress}
                  // onMovieSelect={onMovieSelect}
                  // getRecom={getRecommendations}
                />
              </>
            ))}
          </RecommendedMovieListContainer>
        </>
      )} */}

        {/* {movieList.length > 0 && <ComponentTitle>{title}</ComponentTitle>}
        <MovieListContainer>
          {movieList.length ? (
            movieList.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
                setProgress={setProgress}
                getRecom={getRecommendations}
              />
            ))
          ) : (
            <Placeholder src="./movie-icon.svg" />
          )}
        </MovieListContainer> */}
        <ChatBotComponent />
      </Container>
    </MovieProvider>
  );
}

export default App;
