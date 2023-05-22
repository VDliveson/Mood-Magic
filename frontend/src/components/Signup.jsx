import React, { useEffect, useState } from "react";
import { Link, to, useNavigate } from "react-router-dom";
import Axios from "axios";
import { url } from "../App";

import "../css/signup.css";

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      username: credentials.username,
      password: credentials.password,
      password2: credentials.password2,
      email: credentials.email,
    };

    if (credentials.firstName !== null) {
      data.first_name = credentials.firstName;
    }

    if (credentials.lastName !== null) {
      data.last_name = credentials.lastName;
    }

    if (credentials.dob !== null) {
      data.dob = credentials.dob;
    }

    let token_data = await Axios({
      method: "post",
      url: url + "register",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      data: data,
    }).catch((error) => {});

    let token_go = await (token_data && token_data.status === 201);

    if (token_go) {
      let access_token = token_data.data.token.access;
      localStorage.setItem("auth_token", access_token);
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }
  };
  return (
    <>
      <div className="signup-container">
        <div className="container">
          <form
            method="post"
            className="sign-form"
            id="sign-form"
            autoComplete="on"
            onSubmit={handleSubmit}
          >
            <h1 className="form-title">Sign Up</h1>

            <label htmlFor="username">
              Username<span className="star-required">*</span>
            </label>
            <input
              onChange={onChange}
              className="signup-input"
              type="text"
              name="username"
              id="username"
              placeholder="Name"
              autoFocus
              required
            />

            <label htmlFor="firstName">First Name</label>
            <input
              onChange={onChange}
              className="signup-input"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={onChange}
              className="signup-input"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />

            <label htmlFor="email">
              Email<span className="star-required">*</span>
            </label>
            <input
              onChange={onChange}
              className="signup-input"
              type="email"
              name="email"
              id="email"
              placeholder="mail@website.com"
              required
            />

            <label htmlFor="password">
              Password<span className="star-required">*</span>
            </label>
            <input
              onChange={onChange}
              className="signup-input"
              type="password"
              name="password"
              id="password"
              placeholder="Min. 8 character"
              required
              minLength={8}
            />

            <label htmlFor="password2">
              Confirm Password<span className="star-required">*</span>
            </label>
            <input
              onChange={onChange}
              className="signup-input"
              type="password"
              name="password2"
              id="password2"
              placeholder="Min. 8 character"
              required
              minLength={8}
            />

            <label htmlFor="dob">DOB</label>
            <input
              onChange={onChange}
              className="signup-input"
              type="date"
              name="dob"
              id="dob"
              placeholder="Enter your Date of Birth"
            />

            <br />

            <input
              onChange={onChange}
              className="signup-input"
              type="checkbox"
              name="terms-agree"
              id="terms-agree"
              required
            />
            <p className="sentence-agree">
              I agree to the{" "}
              <a className="a-tag" href="" required>
                Terms & Conditions
              </a>
            </p>

            <input
              className="signup-input"
              type="submit"
              value="Sign Up"
              id="submit"
            />

            <p className="have-account-line">
              Already have an Account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
