import React from "react";
import { DialogTitle, Dialog, DialogActions, Button, DialogContentText, Grid, Typography } from "@material-ui/core";

import { IDialogInformationIndex } from "./Interfaces/IDialogInformationIndex";

export const DialogInformationIndex = (props: IDialogInformationIndex) => (
    <Dialog open={true} onClose={props.handleClose}>
        <DialogTitle>Information</DialogTitle>
        <DialogContentText style={{ padding: "10px" }}>
            <Grid>
                <Grid container direction="column">
                    <Typography>{props.index.name} - {props.index.description}</Typography>
                </Grid>
                {
                    props.index.coefficients.map((coefficient, index) => coefficient.metric && <>
                            <Grid key={index} container direction="column">
                                <Typography>{coefficient.metric.name} - {coefficient.metric.description}</Typography>
                            </Grid>
                            {
                                coefficient.metric.primitive?.primitives.map((primitive, index) => <Grid key={index} container direction="column">
                                    <Typography>{primitive.name} - {primitive.description}</Typography>
                                </Grid>)
                            }
                        </>
                    )
                }
            </Grid>
        </DialogContentText>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">Close</Button>
        </DialogActions>
    </Dialog>
);