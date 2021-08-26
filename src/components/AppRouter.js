import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';
import PostBox from 'routes/PostBox';

const AppRouter = ({refreshUser, isLoggedIn, userObj}) =>{
    return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj}/>}
      <Switch>
        <Route exact path="/">{isLoggedIn ? <Home userObj={userObj}/>:<Auth/>}</Route>
        <Route exact path="/profile">{isLoggedIn ? <Profile refreshUser={refreshUser} userObj={userObj}/>:<Auth/>}</Route>
        <Route exact path="/:id">{isLoggedIn ? <PostBox userObj={userObj}/>:<Auth/>}</Route>
      </Switch>
    </Router>
    );
}

export default AppRouter;