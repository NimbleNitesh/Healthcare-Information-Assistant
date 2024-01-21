// Login.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
// import login_background from "../assets/login_background.jpg";

const LoginForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    // Add login logic here
    console.log("Logging in...", email, password);
    try {
      axios
        .post("http://localhost:3000/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            localStorage.setItem("id", res.data.id);
            navigate("/Homepage");
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fullContainer">
      <div className="generalInfo">
        <h1>Healthcare</h1>
      </div>
      <div className="loginBox">
        <LoginForm className="login">
          <h2 className="heading">Login</h2>
          {/* Add your image here */}
          <div className="loginWindow">
            <div className="loginData">
              <input
                type="email"
                placeholder="Email"
                className="inputbox"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="inputbox"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="loginButton" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="otherButtonContainer">
            <button
              className="otherButton"
              onClick={(e) => {
                navigate("/Signup");
              }}
            >
              Signup
            </button>
            <button
              className="otherButton"
              onClick={(e) => {
                navigate("/Forgot");
              }}
            >
              Forgot Password
            </button>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
