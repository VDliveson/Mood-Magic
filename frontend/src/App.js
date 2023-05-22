import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import TopLoader from "./components/TopLoader";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";

import MovieProvider from "./context/movie/movieState";

import "./App.css";


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
