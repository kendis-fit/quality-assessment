import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Login from "./Pages/Login";
import Navbar from "./Navbar/Navbar";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Registration";
import AlertContainer from "./Alert/AlertContainer";

const App = () => {
    return(
        <BrowserRouter>
            <AlertContainer />
            <Switch>
                <Route exact path="/registration" component={Registration} />
                <Route exact path={["/login", "/"]} component={Login} />
                <Navbar />
                <Route exact path="/universal-projects/:id" render={props => <Profile {...props} isRequirement={false} />} />
                <Route exact path="/requirements/:id" />
                <Route exact path="/projects" />
                <Route exact path="/profile" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;