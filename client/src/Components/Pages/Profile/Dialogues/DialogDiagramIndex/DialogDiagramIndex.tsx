import { Chart } from "chart.js";
import { Alert } from "@material-ui/lab";
import React, { useRef, useEffect, useState } from "react";
import { DialogTitle, DialogContent, Dialog, DialogActions, Button, CircularProgress, TextField, Grid, styled } from "@material-ui/core";

import { IDialog } from "../Interfaces/IDialog";
import { ProjectAPI } from '../../../../../Api/ProjectAPI';
import { useDataApi } from '../../../../../Hooks/useDataApi';

const TextCorrespond = styled(TextField)({
	margin: "10px",
	width: "250px"
});

export const DialogDiagramIndex = (props: IDialog) => {
	const api = new ProjectAPI();
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [maxNoCorrespondsRange, setMaxNoCorrespondsRange] = useState<string>("");
    const [maxPartiallyCorrespondsRange, setMaxPartiallyCorrespondsRange] = useState<string>("");
    const [maxCorrespondsRange, setMaxCorrespondsRange] = useState<string>("");
    const { data, loading, error } = useDataApi(() => api.getDiagram(props.id, props.nameIndex));
    
    useEffect(() => {
        if (data && chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {

				if (data.length === 2) {
					data.push({
						nameIndex: "Empty",
						value: 0
					});
				}

                new Chart(ctx, {
                    type: 'radar',
                    data: {
                      labels: data.map(index => index.nameIndex),
                      datasets: [
                        {
							label: `Diagram ${props.nameIndex}`,
							fill: true,
							backgroundColor: "rgba(179,181,198,0.2)",
							borderColor: "#3f51b5",
							pointBorderColor: "#fff",
							pointBackgroundColor: "#3f51b5",
							data: data.map(index => index.value)
						},
						{
							label: "Max corresponds range",
							fill: true,
							backgroundColor: "rgba(179,181,198,0.2)",
							borderColor: "#5cba87",
							pointBorderColor: "#fff",
							pointBackgroundColor: "#5cba87",
							data: data.map(() => Number.parseFloat(maxCorrespondsRange))
						},
						{
							label: "Max partially corresponds range",
							fill: true,
							backgroundColor: "rgba(179,181,198,0.2)",
							borderColor: "#e5d192",
							pointBorderColor: "#fff",
							pointBackgroundColor: "#e5d192",
							data: data.map(() => Number.parseFloat(maxPartiallyCorrespondsRange))
						},
						{
							label: "Max no corresponds range",
							fill: true,
							backgroundColor: "rgba(179,181,198,0.2)",
							borderColor: "#e55c5c",
							pointBorderColor: "#fff",
							pointBackgroundColor: "#e55c5c",
							data: data.map(() => Number.parseFloat(maxNoCorrespondsRange))
						}
                      ]
                    },
                    options: {
                      title: {  
                        display: false,
                        text: 'Distribution in % of world population'
                      }
                    }
                });
            }
        }

    }, [data, chartRef, props, maxCorrespondsRange, maxPartiallyCorrespondsRange, maxNoCorrespondsRange]);

	return (
		<Dialog open={true} onClose={props.handleClose} fullScreen={true}>
			<DialogTitle>Diagram {props.nameIndex}</DialogTitle>
			<DialogContent>
                {
					error && <Alert color="error">{error.reason}</Alert>
				}
				{
					loading && <CircularProgress size={200} />
				}
				<div style={{ display: error ? "none" : "" }}>
					<Grid container direction="row" justify="space-around">
						<TextCorrespond
							value={maxCorrespondsRange}
							onChange={(e) => setMaxCorrespondsRange(e.target.value)}
							label="Max corresponds range"
							/>
						<TextCorrespond
							value={maxPartiallyCorrespondsRange}
							onChange={(e) => setMaxPartiallyCorrespondsRange(e.target.value)}
							label="Max partially corresponds range"
							/>
						<TextCorrespond
							value={maxNoCorrespondsRange}
							onChange={(e) => setMaxNoCorrespondsRange(e.target.value)}
							label="Max no corresponds range"
							/>
					</Grid>
                	<canvas ref={chartRef}></canvas>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="secondary">Close</Button>
			</DialogActions>
		</Dialog>
	);
}