import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";

import { API_KEY, url } from "../App";

import ChatBotComponent from "./ChatBot";
import MovieBox from "./MovieBox";
import TopLoader from "./TopLoader";
import Header from "./Header";
import NavBar from "./Navbar";

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

export default function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <MovieBox></MovieBox>
      <ChatBotComponent />
    </>
  );
}
