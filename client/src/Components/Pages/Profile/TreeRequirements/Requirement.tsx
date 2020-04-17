import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";

import { IRequirement } from "./Interfaces/IRequirement";
import { Add, Remove } from "@material-ui/icons";

export const Requirement = (nodes: IRequirement) => (
    <Grid container direction="row">
        <Grid item xs={10}>
            <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
                {Array.isArray(nodes.requirements) ? nodes.requirements.map((node) => <Requirement {...node} addRequirement={nodes.addRequirement} removeRequirement={nodes.removeRequirement} />) : null}
            </TreeItem>
        </Grid>
        <Grid container justify="space-between" item xs={2}>
            <IconButton size="small" onClick={() => nodes.addRequirement(nodes.id)}>
                <Add />
            </IconButton>
            {
                nodes.parentId && <IconButton size="small" onClick={() => nodes.removeRequirement(nodes.id)}>
                    <Remove />
                </IconButton>
            }
        </Grid>
    </Grid>
);