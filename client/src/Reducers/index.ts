import { combineReducers } from "redux";

import { Alert } from "./Alert";
import { IRootState } from "./Interfaces/IRootState";

export const reducer = combineReducers<IRootState>({
    Alert,
});