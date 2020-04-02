import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert as AlertComponent } from "@material-ui/lab";

import IAlert from "./Interfaces/IAlert";

const Alert = ({ color = "success", message }: IAlert) => {
    return(
        <Snackbar
            open={true}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={5000}
            >
            <AlertComponent severity={color}>{message}</AlertComponent>
        </Snackbar>
    );
}

export default Alert;