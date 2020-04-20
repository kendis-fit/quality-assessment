import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DialogTitle, DialogContent, Dialog, DialogActions, TextField, Button } from "@material-ui/core";

import { ProjectAPI } from "../../../../../../Api/ProjectAPI";
import { IAddRequirement } from "../Interfaces/IAddRequirement";
import { showAlert } from "../../../../../../Reducers/Alert/AlertActions";

export const DialogueAddRequirement = (props: IAddRequirement) => {
    const api = new ProjectAPI();
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const createRequirement = async () => {
        try {
            const { id } = await api.createRequirement(props.parentId, name);
            props.onCreatedElement({ id, parentId: props.parentId, name, requirements: [] });
        } catch(error) {
            dispatch(showAlert({
                open: true,
                message: error.reason,
                color: "error"
            }));
        } finally {
            props.handleClose();
        }
    }

	return (
		<Dialog maxWidth="sm" open={true} onClose={props.handleClose}>
			<DialogTitle>Create requirement</DialogTitle>
			<DialogContent>
				{
					<TextField
                        margin="dense"
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
						/>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="secondary">Close</Button>
				<Button onClick={() => createRequirement()} color="primary">Create</Button>
			</DialogActions>
		</Dialog>
	);
}