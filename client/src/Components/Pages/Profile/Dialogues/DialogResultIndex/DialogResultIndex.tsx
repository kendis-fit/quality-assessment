import React from 'react';
import { Alert } from "@material-ui/lab";
import { CircularProgress, DialogTitle, DialogContent, Dialog, DialogActions, TextField, Button } from "@material-ui/core";

import { ProjectAPI } from '../../../../../Api/ProjectAPI';
import { useDataApi } from '../../../../../Hooks/useDataApi';
import { IDialogResultIndex } from "./Interfaces/IDialogResultIndex";



export const DialogResultIndex = (props: IDialogResultIndex) => {
	const api = new ProjectAPI();
	const { data, loading, error } = useDataApi(() => api.getResultIndex(props.id, props.nameIndex));
	
	return (
		<Dialog maxWidth="sm" open={true} onClose={props.handleClose}>
			<DialogTitle>Result</DialogTitle>
			<DialogContent>
				{
					error && <Alert color="error">{error.reason}</Alert>
				}
				{
					loading && !error ? <CircularProgress size={200} /> :
					<TextField
						id="result"
						margin="dense"
						label={`Result index ${props.nameIndex}`}
						disabled
						fullWidth
						defaultValue={data.result}
					/>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="primary">Close</Button>
			</DialogActions>
		</Dialog>
	);
}