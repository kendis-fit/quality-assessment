import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert as AlertComponent } from "@material-ui/lab";

import IAlert from "./Interfaces/IAlert";

const Alert = ({ color, message, open, closeAlert }: IAlert) => {

    return(
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={4000}
            onClose={closeAlert}
            >
            <AlertComponent severity={color}>{message}</AlertComponent>
        </Snackbar>
    );
}

export default Alert;