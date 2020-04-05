import { combineReducers } from "redux";

import { Alert } from "./Alert";
import IRootState from "./Interfaces/IRootState";
import { UniversalProjects } from "./UniversalProjects";

export const reducer = combineReducers<IRootState>({
    Alert,
    UniversalProjects
});