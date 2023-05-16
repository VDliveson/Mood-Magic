import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ChatBotComponent from "./components/ChatBot";
import MovieBox from "./components/MovieBox";
import TopLoader from "./components/TopLoader";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";

import MovieProvider from "./context/movie/movieState";

import "./App.css";

import {
  Container,
  MovieListContainer,
  RecommendedMovieListContainer,
  Placeholder,
  ComponentTitle,
} from "./helper/css-constants.js";

export const API_KEY = "3112db6508f38d836229cb436cfd8e12";
export const url = "http://127.0.0.1:8000/";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <TopLoader></TopLoader>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>} />
        </Routes>
        
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
