import styled from "styled-components";

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
  margin-top: 10px;
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




export {Container,TrendingButton,MovieListContainer,RecommendedMovieListContainer,Placeholder,ComponentTitle}