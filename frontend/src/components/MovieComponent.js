import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
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
  color: black;
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

function get_year(date){
  let year = (new Date(date)).getFullYear()
  return year; 
}
const MovieComponent = (props) => {
  // const { Title, Year, imdbID, Type, Poster } = props.movie;
  const {
    poster_path,
    adult,
    release_date,
    id,
    title,

  } = props.movie;
  const poster = "https://image.tmdb.org/t/p/w500/" + poster_path
  const Type = "movie"
  return (
    <MovieContainer
      onClick={() => {
        // props.onMovieSelect(imdbID);
        props.onMovieSelect(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <AdultInfo>{adult ? 'adult' : ''}</AdultInfo>
      {/* <CoverImage src={Poster} alt={Title} /> */}
      <CoverImage
        src={!adult ? poster : ''}
        // src={poster}
        alt={title}
        
      />

      {/* <MovieName>{Title}</MovieName> */}
      <MovieName>{title}</MovieName>
      {/* <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn> */}
      <InfoColumn>
        <MovieInfo>Year : {get_year(release_date)}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
        
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
