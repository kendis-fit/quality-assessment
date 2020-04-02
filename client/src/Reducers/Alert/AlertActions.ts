import IAlert from "./Interfaces/IAlert";
import IShowAlert from "./Interfaces/IShowAlert";
import ICloseAlert from "./Interfaces/ICloseAlert";
import { SHOW_ALERT, CLOSE_ALERT } from "../../Constants/actions";

export const showAlert = (alert: IAlert): IShowAlert => ({
    type: SHOW_ALERT,
    value: alert
});


export const closeAlert = (): ICloseAlert => ({
    type: CLOSE_ALERT
});