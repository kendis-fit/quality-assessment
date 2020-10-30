import { Color } from "@material-ui/lab";

export default interface IAlert {
    color?: Color;
    message: string;
    open: boolean;
    closeAlert: () => void;
}