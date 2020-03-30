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
                <Route path="/profile/:id" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;