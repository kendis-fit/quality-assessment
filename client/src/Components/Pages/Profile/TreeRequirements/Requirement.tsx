import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";

import { IRequirement } from "./Interfaces/IRequirement";
import { Add, Remove, Visibility } from "@material-ui/icons";

export const Requirement = (nodes: IRequirement) => (
    <Grid container direction="row">
        <Grid item xs={10}>
            <TreeItem nodeId={nodes.id} label={nodes.name}>
                {Array.isArray(nodes.requirements) ? nodes.requirements.map((node, index) => <Requirement key={index} {...node} addRequirement={nodes.addRequirement} removeRequirement={nodes.removeRequirement} selectRequirement={nodes.selectRequirement} />) : null}
            </TreeItem>
        </Grid>
        <Grid container justify="space-between" item xs={2}>
            <IconButton size="small" onClick={() => nodes.selectRequirement(nodes.id)}>
                <Visibility />
            </IconButton>
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