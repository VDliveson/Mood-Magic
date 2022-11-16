import React,{ useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { API_KEY, url, auth_token } from "../App";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  background:#272727;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #000;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const AdultInfo = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
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

let adult_poster =
  "http://www.movienewz.com/img/films/poster-holder.jpg";
const MovieComponent = (props) => {
  // const { Title, Year, imdbID, Type, Poster } = props.movie;
  const { poster_path, adult, release_date, id, title } = props.movie;
  let poster = ""
  if(poster_path){
    poster = "https://image.tmdb.org/t/p/w500/" + poster_path;
  }else{
    poster = "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"
  }
  
  const Type = "movie";

  return (
    <MovieContainer
      onClick={async () => {
        // props.onMovieSelect(imdbID);
        let options = set_options(title);
        let rec = [];
        let response = await Axios(options);
        if (response && response.status === 200) {
          let ids = response.data.recommendations;

          ids.map((id, index) => {
            Axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            )
              .then((response) => {
                rec.push(response.data);
              })
              .catch((err) => {});
          });
        }

        setTimeout(() => {
          props.getRecom(rec);
          props.onMovieSelect(id);
        }, 500);
        // props.getRecom(rec);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 550);
        
        
        // console.log(rec);


        // console.log(props.currRec);
        // console.log(rec);
        
      }}
      className = "movieComponent"
      // style = {boxStyle}
    >
      <AdultInfo>{adult ? "adult" : ""}</AdultInfo>
      <CoverImage
        src={!adult ? poster : `${adult_poster}`}
        // src={poster}
        alt={title}
      />

      <MovieName>{title}</MovieName>

      <InfoColumn>
        <MovieInfo>Year : {get_year(release_date)}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
