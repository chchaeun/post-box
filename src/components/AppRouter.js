import React, {useState} from 'react';
import { HashRouter as Router, Route, Switch  } from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';


const AppRouter = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <Router>
<Switch>
    <Route exact path="/">{isLoggedIn? <Home/>:<Auth/>}</Route>
</Switch>
        </Router>
    );
}

export default AppRouter;