import React from 'react'
import "./LoginPage.css"

function LoginPage(params) {
  return (
    <div className="LoginPage">
      <div className="img_con">
        <img src="/Assets/kwaiva_logo_box.png" alt="" />
      </div>
      <div className="container">
        <h1>ADMIN LOGIN</h1>
        <input className="inputbox" placeholder = "USERNAME OR EMAIL" />
        <input type="password" className="inputbox" placeholder = "PASSWORD" />
        <a className="login" onClick={() => { window.location.pathname = "/songs" }}>LOGIN</a>
      </div>
    </div>
  );
}

export default LoginPage;
