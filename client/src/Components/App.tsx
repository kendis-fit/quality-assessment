import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Login from "./Pages/Login";
import Navbar from "./Navbar/Navbar";
import Profile from "./Pages/Profile";
import Projects from "./Pages/Projects";
import Registration from "./Pages/Registration";
import AlertContainer from "./Alert/AlertContainer";

const App = () => {
    return(
        <BrowserRouter>
            <AlertContainer />
            <Switch>
                <Route exact path="/registration" component={Registration} />
                <Route exact path={["/login", "/"]} component={Login} />
                <Route path="/user" component={Navbar} />
            </Switch>
            <Switch>
                <Route exact path="/user/universal-projects/:id" render={props => <Profile {...props} isRequirement={false} />} />
                <Route exact path="/user/projects" component={Projects} />
                <Route exact path="/user/requirements/:id" />
                <Route exact path="/user/profile" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;