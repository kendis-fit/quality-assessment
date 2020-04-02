import IAlert from "./Interfaces/IAlert";
import IShowAlert from "./Interfaces/IShowAlert";
import { AlertActions } from "../../Constants/types";
import { SHOW_ALERT, CLOSE_ALERT } from "../../Constants/actions";

const initialState: IAlert = {
    open: false,
    message: ""
}

const Alert = (state = initialState, action: AlertActions) => {
    switch(action.type) {
        case SHOW_ALERT:
            return (action as IShowAlert).value;
        case CLOSE_ALERT:
            return { ...alert, message: "", open: false };
        default:
            return state;
    }
}

export default Alert;