import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Profile from "./Profile/Profile";

const App = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/registration" />
                <Route path="/login" />
                <Route path="/universal-projects/:id" render={props => <Profile {...props} isRequirement={false} />} />
                <Route path="/requirements/:id" render={props => <Profile {...props} isRequirement={false} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;