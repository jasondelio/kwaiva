import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import LoggedInUser from './LoggedInUser';


const Authorization = props =>
  LoggedInUser.isLoggedIn() ? props.children : <Redirect to={'/login'} />;

export default Authorization;
