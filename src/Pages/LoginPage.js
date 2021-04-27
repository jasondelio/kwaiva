import React, { useState } from 'react'
import "./LoginPage.css"

function handleVerification(username, password) {
  var bcrypt = require('bcryptjs');
  const saltRounds = 10;
  const tempPassword = 'passwordTempTempTafa';
  var hash = bcrypt.hashSync(tempPassword, saltRounds);
  var isValid = bcrypt.compareSync(password, hash);
  if (isValid && username == "admin") {
    window.location.pathname = "/songs"
  }
  else {
    window.location.pathname = "/login"
  }
}


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlerKeyPressed = (event) =>
  {
    if(event.key == 'Enter')
    {
      handleVerification(username, password);
    }
  };

  const handlerClicked = () =>
  {
    handleVerification(username, password);
  }
  return (
    <div className="LoginPage">
      <div className="img_con">
        <img src="/Assets/kwaiva_logo_box.png" alt="" />
      </div>
      <div className="container">
        <h1>ADMIN LOGIN</h1>
        <input className="inputbox" placeholder="USERNAME OR EMAIL" onChange={(e) => setUsername(e.target.value)} onKeyPress={handlerKeyPressed} />
        <input type="password" className="inputbox" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} onKeyPress={handlerKeyPressed} />
        <a className="login" onClick={handlerClicked}>LOGIN</a>
      </div>
    </div>
  );
}

export default LoginPage;
