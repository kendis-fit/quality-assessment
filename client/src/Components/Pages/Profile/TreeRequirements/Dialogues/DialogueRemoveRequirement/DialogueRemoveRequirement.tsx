import React from "react";
import { useDispatch } from "react-redux";
import { DialogTitle, Dialog, DialogActions, Button } from "@material-ui/core";

import { ProjectAPI } from "../../../../../../Api/ProjectAPI";
import { IRemoveRequirement } from "../Interfaces/IRemoveRequirement";
import { showAlert } from "../../../../../../Reducers/Alert/AlertActions";

export const DialogueRemoveRequirement = (props: IRemoveRequirement) => {
    const api = new ProjectAPI();
    const dispatch = useDispatch();

    const removeRequirement = async () => {
        try {
            await api.deleteById(props.id);
            props.onRemoveElement();
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
			<DialogTitle>Are you sure you want to remove {props.name}?</DialogTitle>
			<DialogActions>
				<Button onClick={props.handleClose} color="secondary">Close</Button>
				<Button onClick={() => removeRequirement()} color="primary">Remove</Button>
			</DialogActions>
		</Dialog>
	);
}