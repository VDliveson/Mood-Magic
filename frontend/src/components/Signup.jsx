import React from "react";

import "../css/signup.css";

export default function Signup() {
  return (
    <>
      <div className="signup-box">
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              id="firstname"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="lastName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              aria-describedby="usernameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password1" className="form-label">
              Password
            </label>
            <input
              name="password1"
              type="password"
              className="form-control"
              id="password1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <input
              name="password2"
              type="password"
              className="form-control"
              id="password2"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              DOB
            </label>
            <input name="dob" type="date" className="form-control" id="dob" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
