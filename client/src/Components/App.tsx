import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import AlertContainer from "./Alert/AlertContainer";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Registration";

const App = () => {
    return(
        <BrowserRouter>
            <AlertContainer />
            <Switch>
                <Route exact path="/registration" component={Registration} />
                <Route exact path={["/login", "/"]} component={Login} />
                <Route exact path="/universal-projects/:id" render={props => <Profile {...props} isRequirement={false} />} />
                <Route exact path="/requirements/:id" render={props => <Profile {...props} isRequirement={true} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;