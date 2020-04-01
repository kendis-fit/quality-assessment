import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Login from "./Login";
import Profile from "./Profile";
import Registration from "./Registration";

const App = () => {
    return(
        <BrowserRouter>
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