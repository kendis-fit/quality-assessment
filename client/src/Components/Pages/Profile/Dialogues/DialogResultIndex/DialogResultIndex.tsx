import React from 'react';
import { Alert } from "@material-ui/lab";
import { CircularProgress, DialogTitle, DialogContent, Dialog, DialogActions, TextField, Button } from "@material-ui/core";

import { ProjectAPI } from '../../../../../Api/ProjectAPI';
import { IDialog } from "../Interfaces/IDialog";
import { useDataApi } from '../../../../../Hooks/useDataApi';

export const DialogResultIndex = (props: IDialog) => {
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
					loading && <CircularProgress size={200} />
				}
				{
					!loading && !error && data && <TextField
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
				<Button onClick={props.handleClose} color="secondary">Close</Button>
			</DialogActions>
		</Dialog>
	);
}