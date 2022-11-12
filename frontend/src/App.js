import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

// export const API_KEY = "47a4d46d";
export const API_KEY = "3112db6508f38d836229cb436cfd8e12";
export const url = "http://127.0.0.1:8000/";
export const auth_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4MjUzMTA3LCJpYXQiOjE2NjgxNjY3MDcsImp0aSI6IjE1OGI1ODhlMDhiMDQ5OTY4YWM1N2UxYzQ5NjNkOTAyIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJkdiJ9.cj2XxHKR3F0KA8Yu6j5YVhthGWQhbJXSKKXoN-8Mjlg";
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

  const sentiment_recommend = async () => {
    let options = {
      method: "get",
      url: url + "sentiment_recommend",
      headers: {
        Authorization: "Bearer " + `${auth_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await Axios(options);

    if (response && response.status === 200) {
      let genrenames = response.genre;
      const res1 = await Axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&with_genres=${genrenames}`
      );

      console.log(res1);
      updateMovieList(res1.data.results);
    }
  };

  // sentiment_recommend()

  const onTextChange = (e) => {
    onMovieSelect("");
    
    getRecommendations([]);
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    if(e.target.value ===""){
      updateMovieList([])
    }else{
      const timeout = setTimeout(() => fetchData(e.target.value), 500);
      updateTimeoutId(timeout);
    }
    
  };

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
    </Container>
  );
}

export default App;
