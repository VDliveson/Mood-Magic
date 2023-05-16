/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState ,useContext} from "react";

import MovieContext from "../context/movie/movieContext";
import Axios from "axios";
import { API_KEY,url } from "../App";
import styled from "styled-components";


let auth_token = localStorage.getItem("auth_token");

const MovieInfoContainer = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
  height: fit-content;
  padding: 8px;
  border-radius: 40%;
  cursor: pointer;
  opacity: 0.8;
`;

function get_year(date) {
  let year = new Date(date).getFullYear();
  return year;
}

function list_genre(genre_list) {
  let ans = "";
  for (let i = 0; i < genre_list.length; i++) {
    if (i === genre_list.length - 1) {
      ans += genre_list[i].name;
    } else {
      ans += genre_list[i].name + ",";
    }
  }

  return ans;
}

function get_top_actors(cast) {
  let ans = "";
  if (cast.length<5){
    return ans;
  }
  for (let i = 0; i < 5; i++) {
    if (i === 4) {
      ans += cast[i].name;
    } else {
      ans += cast[i].name + ",";
    }
  }
  return ans;
}




const MovieInfoComponent = (props) => {
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

  const [movieInfo, setMovieInfo] = useState();
  const [movieCredits, setMovieCredits] = useState();
  // const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}`
    )
      .then((response) => setMovieInfo(response.data))
      .catch((err) => console.log(err));

    Axios.get(
      `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?api_key=${API_KEY}`
    )
      .then((response) => setMovieCredits(response.data))
      .catch((err) => console.log(err));
  }, [selectedMovie]);

  useEffect(() => {
    let options = {
      method: "post",
      url: url + "recommend",
      headers: {
        Authorization: "Bearer " + auth_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        movie: movieInfo?.title,
      },
    };

    if(movieInfo?.title){
      Axios(options).then((response) =>{
        let ids = response.data.recommendations;
        let rec = [];
        ids.map((id, index) => {
          Axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
          )
            .then((response) => {
              rec.push(response.data);
            })
            .catch((err) => console.log("cant find resource"));
        });
        getRecommendations(rec)
        console.log(rec)
      });
    }
  }, [movieInfo]);

  return (
    <MovieInfoContainer>
      {movieInfo && movieCredits ? (
        <>
          {/* <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} /> */}
          <CoverImage
            src={"https://image.tmdb.org/t/p/w500/" + movieInfo?.poster_path}
            alt={movieInfo?.title}
          />

          <InfoColumn>
            <MovieName>
              {"movie"}: <span>{movieInfo.title?movieInfo.title:NaN}</span>
              {/* {movieInfo?.Type}: <span>{movieInfo?.title}</span> */}
            </MovieName>
            {/* <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo> */}
            <MovieInfo>
              Year: <span>{movieInfo.release_date?get_year(movieInfo.release_date):NaN}</span>
              {/* Year: <span>{movieInfo?.Year}</span> */}
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.original_language?movieInfo.original_language:NaN}</span>
              {/* Language: <span>{movieInfo?.Language}</span> */}
            </MovieInfo>
            {/* <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo> */}
            <MovieInfo>
              Rated: <span>{movieInfo?.popularity?movieInfo?.popularity:NaN}</span>
            </MovieInfo>
            {/* <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo> */}
            {/* <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo> */}

            <MovieInfo>
              Runtime: <span>{movieInfo?.runtime?movieInfo?.runtime:NaN} min</span>
            </MovieInfo>
            {/* <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo> */}
            <MovieInfo>
              Genre: <span>{movieInfo?.genres?list_genre(movieInfo?.genres):NaN}</span>
            </MovieInfo>
            {/* <MovieInfo>
              Director: <span>{director}</span>
            </MovieInfo> */}
            <MovieInfo>
              Director:{" "}
              <span>
                {
                  movieCredits?
                  movieCredits?.crew.filter(({ job }) => job === "Director")[0]
                    .id:NaN
                }
              </span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieCredits?.cast?get_top_actors(movieCredits?.cast):NaN}</span>
            </MovieInfo>

            {/* <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo> */}
            <MovieInfo>
              Plot: <span>{movieInfo?.overview?movieInfo?.overview:NaN}</span>
            </MovieInfo>
            {/* <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo> */}
          </InfoColumn>
          <Close
            onClick={() => {
              onMovieSelect();
              getRecommendations([])
            }}
          >
            X
          </Close>
        </>
      ) : (
        "Loading..."
      )}
    </MovieInfoContainer>
  );
};
export default MovieInfoComponent;
