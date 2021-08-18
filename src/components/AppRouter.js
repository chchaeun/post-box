import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({isLoggedIn, userObj}) =>{
    return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Switch>
        <Route exact path="/">{isLoggedIn ? <Home userObj={userObj}/>:<Auth/>}</Route>
        <Route exact path="/profile">{isLoggedIn ? <Profile/>:<Auth/>}</Route>
      </Switch>
    </Router>
    );
}

export default AppRouter;