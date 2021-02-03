import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import firebaseDb from "../../firebase";
import { useDispatch } from "react-redux";
import { setuserDetails } from "../user/userSlice";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  const history = useHistory();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const validate = () => {
    let isError = false;
    setEmailError("");
    setPassError("");
    if (details.email === "") {
      isError = true;
      setEmailError("Email cann't be empty.");
    } else if (details.email.indexOf("@") === -1) {
      isError = true;
      setEmailError("Requires valid email");
    }
    if (details.password.length <= 6) {
      isError = true;
      setPassError("Password must be minimum 6 charectors");
    }
    return isError;
  };

  const handlechange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    let err = validate();
    if (!err) {
      firebaseDb
        .child("contacts")
        .orderByChild("email")
        .equalTo(details.email)
        .once(
          "value",
          (snap) => {
            if (snap.val() === (null && undefined)) {
              alert("Plaese Check email id");
              setDetails({
                email: "",
                password: "",
              });
              setEmailError("");
              setPassError("");
            } else {
              let temp = Object.values(snap.val());
              let user_data = "";
              temp.forEach((temp_userData) => {
                if (temp_userData.password === details.password) {
                  return (user_data = temp_userData);
                }
              });
              if (user_data !== "") {
                dispatch(setuserDetails(user_data));
                history.push({
                  pathname: "/dashboard",
                  // data: user_data,
                });
              } else {
                alert("Plaese Check Password");
                setDetails({
                  email: details.email,
                  password: "",
                });
                setEmailError("");
                setPassError("");
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__left">
          <div className="left_image">
            <img
              src="https://amfbdemo.web.app/assets/images/loginimage.png"
              alt="logo"
            />
          </div>
          <h3>Lorem Ipsum is simply dummy text</h3>
          <h6>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </h6>
        </div>
        <div className="home__right">
          <div className="login_container">
            <div>
              <span>
                <h3>Welcome back</h3>
              </span>
              <span>Sign In to your Account</span>
            </div>
            <TextField
              id="outlined-basic"
              autoComplete="off"
              className="input__box 0"
              label="email"
              name="email"
              variant="outlined"
              value={details.email}
              onChange={handlechange}
              error={Boolean(emailError)}
              helperText={emailError}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              className="input__box 1"
              variant="outlined"
              value={details.password}
              onChange={handlechange}
              error={Boolean(passError)}
              helperText={passError}
              required
            />
            <Button
              variant="contained"
              color="primary"
              className="login__button"
              onClick={handleLogin}
            >
              Log in
            </Button>
            <Link to="/signup">
              <p>Don't have account?Signup</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="home__footer">
        <p>
          Copyright © 2020 - <a href="*">Demo</a>. All Right Reserved
        </p>
      </div>
    </div>
  );
}

export default Home;
