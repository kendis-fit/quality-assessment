import IAlert from "./IAlert";
import { SHOW_ALERT } from "../../../Constants/actions";

export default interface IShowAlert {
    type: typeof SHOW_ALERT;
    value: IAlert;
}