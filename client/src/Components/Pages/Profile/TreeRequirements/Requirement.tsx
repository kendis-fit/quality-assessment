import React from "react";
import { TreeItem } from "@material-ui/lab";
import { Add, DeleteForever, Remove } from "@material-ui/icons";
import { makeStyles, IconButton } from "@material-ui/core";

import { IRequirement } from "./Interfaces/IRequirement";

const useStyles = makeStyles({
    label: {
        display: "flex",
        justifyContent: "space-between"
    },
    project: {
        display: "flex",
        alignItems: "center",
        height: "50px",
        maxWidth: "70%",
        minWidth: "70%",
        overflowX: "auto"
    }
});

const RenderLabel = (item: IRequirement) => {
    const classes = useStyles();
    
    return <span
        className={classes.label}
        onClick={event => {
            event.stopPropagation();
            event.preventDefault();
        }}
    >
        <div className={classes.project} onClick={() => item.selectRequirement(item.id)}>
            {item.name}
        </div>
        <div>
            <IconButton onClick={() => item.addRequirement(item.id, item.name)}>
                <Add />
            </IconButton>
            <IconButton onClick={() => item.removeRequirement(item.id, item.name)}>
                <DeleteForever />
            </IconButton>
        </div>
    </span>
};

export const Requirement = (nodes: IRequirement) => (
    <TreeItem nodeId={nodes.id} label={<RenderLabel {...nodes} />} endIcon={<Remove />}>
        {Array.isArray(nodes.requirements) ? nodes.requirements.map((node, index) => <Requirement {...node} key={index} addRequirement={nodes.addRequirement} removeRequirement={nodes.removeRequirement} selectRequirement={nodes.selectRequirement} />) : null}
    </TreeItem>
);