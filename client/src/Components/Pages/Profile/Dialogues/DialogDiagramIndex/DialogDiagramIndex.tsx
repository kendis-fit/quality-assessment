import { Chart } from "chart.js";
import { Alert } from "@material-ui/lab";
import React, { useRef, useEffect } from "react";
import { DialogTitle, DialogContent, Dialog, DialogActions, Button, CircularProgress } from "@material-ui/core";

import { ProjectAPI } from '../../../../../Api/ProjectAPI';
import { IDialog } from "../Interfaces/IDialog";
import { useDataApi } from '../../../../../Hooks/useDataApi';

export const DialogDiagramIndex = (props: IDialog) => {
	const api = new ProjectAPI();
    const chartRef = useRef<HTMLCanvasElement>(null);
    const { data, loading, error } = useDataApi(() => api.getDiagram(props.id, props.nameIndex));
    
    useEffect(() => {
        if (data && chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            
            if (ctx) {

                new Chart(ctx, {
                    type: 'radar',
                    data: {
                      labels: data.map(index => index.nameIndex),
                      datasets: [
                        {
                          label: "1950",
                          fill: true,
                          backgroundColor: "rgba(179,181,198,0.2)",
                          borderColor: "rgba(179,181,198,1)",
                          pointBorderColor: "#fff",
                          pointBackgroundColor: "rgba(179,181,198,1)",
                          data: data.map(index => index.value)
                        }
                      ]
                    },
                    options: {
                      title: {
                        display: true,
                        text: 'Distribution in % of world population'
                      }
                    }
                });
            }
        }

    }, [data]);

	return (
		<Dialog open={true} onClose={props.handleClose}>
			<DialogTitle>Diagram {props.nameIndex}</DialogTitle>
			<DialogContent>
                {
					error && <Alert color="error">{error.reason}</Alert>
				}
				{
					loading && <CircularProgress size={200} />
				}
                {
                    !loading && !error && data && <canvas width="800" height="600" ref={chartRef}></canvas>
                }
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="secondary">Close</Button>
			</DialogActions>
		</Dialog>
	);
}