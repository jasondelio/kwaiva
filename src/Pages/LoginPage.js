import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import "./LoginPage.css";
import LoggedInUser from "./LoggedInUser.js";

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
    var bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const tempPassword = 'passwordTempTempTafa';
    var hash = bcrypt.hashSync(tempPassword, saltRounds);
    var isValid = bcrypt.compareSync(password, hash);
    if (isValid && username == "admin") {
      click();
    }
    else {
      window.location.pathname = "/login"
    }
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
        <input className="inputbox" placeholder="USERNAME OR EMAIL" onChange={(e) => setUsername(e.target.value)} onKeyPress={(e) => handlerKeyPressed(e)} />
        <input type="password" className="inputbox" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => handlerKeyPressed(e)} />
        <a className="login" onClick={() => handlerClicked()}>LOGIN</a>
      </div>
    </div>
  );
}

export default LoginPage;
