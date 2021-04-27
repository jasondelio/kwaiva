import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import SongsPage from './Pages/SongsPage';
import UsersPage from './Pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/songs" component={SongsPage} />
      <Route path="/users" component={UsersPage} />
    </BrowserRouter>
    // <React.Fragment>
    //   <Sidebar />
    //   <Topbar />
    //   <LoginPage />
    // </React.Fragment>
  );
}

export default App;
