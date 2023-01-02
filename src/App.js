import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import ChatBotComponent from "./components/ChatBot";
import "./App.css";

// export const API_KEY = "47a4d46d";
export const API_KEY = "3112db6508f38d836229cb436cfd8e12";
export const url = "http://127.0.0.1:8000/";
export let auth_token = 
`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4NzYxNjI0LCJpYXQiOjE2Njg2NzUyMjQsImp0aSI6ImFmMjI3MmVmZDQxMDRlOTE4NzdmOTQ2YmMyYWMxZjFlIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJkdiJ9.fK4yqp1Q-Hse251gum6SMU8Gv1mHi5mgHvHsC-UaMzE`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  position: fixed;
  z-index: 3;
  width: 100vw;
  font-size: 25px;
  font-weight: bold;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-right: 20px;
  width: 30%;
  background-color: white;
`;

const TrendingButton = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  width: 100%;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  background: #141414;
  gap: 25px;
  margin-top: 100px;
  justify-content: space-evenly; ;
`;

const RecommendedMovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  background: #141414;
  gap: 25px;
  justify-content: space-evenly; ;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const ComponentTitle = styled.h2`
  color: white;
  padding-left: 20px;
  margin-bottom: 5px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [Trending, ShowTrending] = useState(false);
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [recommended, getRecommendations] = useState([]);
  // const [recMovie, setRMovie] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();

  // const [selectedMovieTitle, onRecomSelected] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false&query=${searchString}`
      // `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    // updateMovieList(response.data.Search);
    updateMovieList(response.data.results);
  };

  const onTextChange = (e) => {
    onMovieSelect("");

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
        password: "abcd",
      },
    });

    let token_go = await (token_data && token_data.status === 200);
    let access_token = null;

    if (token_go) {
      access_token = token_data.data["access"];
      auth_token = access_token;
    }
  }

  const getTrending = async (e) => {
    onMovieSelect("");
    const trendingMovies = await Axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    updateMovieList(trendingMovies.data.results);
  };

  useEffect(() => {
    get_auth_token();
    getTrending();
  }, []);
  // useEffect(() => {
  //   console.log(recommended)
  // }, [recommended])

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="./movie-icon.svg" />
          Movie App
        </AppName>
        {/* <TrendingButton
        onClick = {getTrending}>
          Trending
        </TrendingButton> */}
        <SearchBox>
          <SearchIcon src="./search-icon.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>

      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
          getRecom={getRecommendations}
        />
        // </MovieInfoComponent>
      )}

      {recommended?.length && (
        <>
          <ComponentTitle>Movies recommended for you :</ComponentTitle>
          <RecommendedMovieListContainer>
            {recommended.map((movie, index) => (
              <>
                <MovieComponent
                  key={index}
                  movie={movie}
                  onMovieSelect={onMovieSelect}
                  getRecom={getRecommendations}
                  currRec={recommended}
                />
              </>
            ))}
          </RecommendedMovieListContainer>
          <ComponentTitle>Search Results :</ComponentTitle>
        </>
      )}

      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
              getRecom={getRecommendations}
            />
          ))
        ) : (
          <Placeholder src="./movie-icon.svg" />
        )}
      </MovieListContainer>

      <ChatBotComponent sentiment_recom={updateMovieList} />
    </Container>
  );
}

export default App;
