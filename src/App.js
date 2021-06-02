import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import SongsPage from './Pages/SongsPage';
import UsersPage from './Pages/UsersPage';
import Authorization from './Pages/Authorization';
import LoggedInUser from './Pages/LoggedInUser';
import NotFoundPage from './Pages/NotFoundPage';
import RequestPage from './Pages/RequestPage';

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => LoggedInUser.isLoggedIn() === false
          ? <Component {...props} />
          : <Redirect from="/login" to="/songs" />}
      />
    )
  };
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path='/login' component={LoginPage} />
        <Authorization>
          <Switch>
            <Route path="/songs" component={SongsPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/request" component={RequestPage} />
            <Route path="/" component={SongsPage} exact />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Authorization>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
