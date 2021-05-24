import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import "./LoginPage.css";
import LoggedInUser from "./LoggedInUser.js";
import Axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const click = async () => {
    try {
      await LoggedInUser.login(username, password);

      history.push({ pathname: 'songs' });
    } catch (e) {

    }
  };


  const handleVerification = (username, password) => {
    // var bcrypt = require('bcryptjs');
    // const saltRounds = 10;
    // var hash = bcrypt.hashSync(password, saltRounds);

    // console.log(hash);
    Axios({
      method: "GET",
      url: "http://localhost:3001/login/verify",
      params: { userName: username, password: password },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      //handle success
      var isValid = response.data;
      if (isValid == "Yes") {
        click();
      }
      else {
        alert("The username or password is incorrect.");
      }
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  };

  const handlerKeyPressed = (event) => {
    if (event.key == 'Enter' && username.length >= 1 && password.length >= 1) {
      handleVerification(username, password);
    }
  };

  const handlerClicked = () => {
    handleVerification(username, password);
  }

  return (
    <div className="LoginPage">
      <div className="img_con">
        <img src="/Assets/kwaiva_logo_box.png" alt="" />
      </div>
      <div className="container">
        <h1>ADMIN LOGIN</h1>
        <input className="inputbox" placeholder="USERNAME" onChange={(e) => setUsername(e.target.value)} onKeyPress={(e) => handlerKeyPressed(e)} />
        <input type="password" className="inputbox" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => handlerKeyPressed(e)} />
        <a className="login" onClick={() => handlerClicked()}>LOGIN</a>
      </div>
    </div>
  );
}

export default LoginPage;
