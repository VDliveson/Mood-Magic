import React, { useEffect, useState } from "react";
import "../css/login.css";
import { Link, to, useNavigate } from "react-router-dom";
import Axios from "axios";
import { url } from "../App";
import Alert from "./Alert";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [alerton,setAlert] = useState(false);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token_data = await Axios({
      method: "post",
      url: url + "login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: credentials.username,
        password: credentials.password,
      },
    }).catch((error) => {});

    let token_go = await (token_data && token_data.status === 200);

    if (token_go) {
      let access_token = token_data.data["access"];
      localStorage.setItem("auth_token", access_token);
      navigate("/");
    } else {
      setAlert(true);
      console.log("Invalid credentials");
    }
  };

  return (
    <>
    {alerton && <Alert title="Error" description="Invalid credentials"></Alert>}
    <div className="loginContainer">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="loginInput"
            type="username"
            name="username"
            placeholder="username"
            required="required"
            value={credentials.username}
            onChange={onChange}
          />
          <input
            className="loginInput"
            type="password"
            name="password"
            placeholder="Password"
            required="required"
            value={credentials.password}
            onChange={onChange}
          />
          <button
            type="submit"
            className="login-btn login-btn-primary login-btn-block login-btn-large"
          >
            Let me in.
          </button>

          <Link
            
            className="signup-btn login-btn-block login-btn-large"
            to="/signup"
          >
            New User ? Signup now
          </Link>
        </form>
      </div>
    </div>
    </>
  );
}
