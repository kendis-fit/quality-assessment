import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Login from "./Pages/Login";
import Navbar from "./Navbar/Navbar";
import Projects from "./Pages/Projects";
import { Profile } from "./Pages/Profile";
import Registration from "./Pages/Registration";
import AlertContainer from "./Alert/AlertContainer";

export const App = () => {
    return(
        <BrowserRouter>
            <AlertContainer />
            <Route path="/user" component={Navbar} />
            <Switch>
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/user/projects/:id" render={props => <Profile {...props} isRequirement={false} />} />
                <Route exact path="/user/projects" component={Projects} />
                <Route exact path="/user/requirements/:id" />
                <Route exact path="/user/profile" />
                <Route path={["/login", "/"]} component={Login} />
            </Switch>
        </BrowserRouter>
    );
}