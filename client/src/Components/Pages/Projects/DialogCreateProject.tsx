import React from "react";
import { Formik, Form } from "formik";
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, Select, InputLabel, MenuItem, DialogActions, Button } from "@material-ui/core";

import { ICreateProject } from "./Interfaces/ICreateProject";
import { IDialogCreateProject } from "./Interfaces/IDialogCreateProject";

const initialValues: ICreateProject = {
    name: "",
    typeProfile: "BASE_PROFILE"
}

export const DialogCreateProject = (props: IDialogCreateProject) => (
    <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Create project</DialogTitle>
        <Formik
            initialValues={initialValues}
            onSubmit={(value) => props.createProject(value)}
            >
            {
                ({ values, handleChange }) => (
                    <Form>
                        <DialogContent>
                            <TextField
                                autoFocus
                                value={values.name}
                                onChange={handleChange}
                                name="name"
                                label="Name"
                                margin="dense"
                                fullWidth
                                />
                            <FormControl fullWidth>
                                <InputLabel>Type profile</InputLabel>
                                <Select
                                    name="typeProfile"
                                    value={values.typeProfile}
                                    onChange={handleChange}
                                    fullWidth
                                    >
                                    <MenuItem value="BASE_PROFILE">Software requirements profile assessment</MenuItem>
                                    <MenuItem value="UX_PROFILE">Human-computer interaction usability integrative quality</MenuItem>
                                    <MenuItem value="VERBAL_PROFILE">Human-computer interaction usability verbal quality assessment</MenuItem>
                                    <MenuItem value="UI_PROFILE">Human-computer interaction usability quality assessment</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.handleClose} color="primary">Cancel</Button>
                            <Button type="submit" color="primary">Create</Button>
                        </DialogActions>
                    </Form>
                    )
                }
        </Formik>
    </Dialog>
);