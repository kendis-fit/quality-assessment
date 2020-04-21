import React from "react";
import { TreeItem } from "@material-ui/lab";
import { Remove } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

import { IRequirement } from "./Interfaces/IRequirement";

const useStyles = makeStyles({
    label: {
        border: "2px solid #3f51b5",
        background: "#3f51b5",
        borderRadius: "2px",
        color: "white"
    }
});

const RenderLabel = (item: IRequirement) => {
    const classes = useStyles();
    
    return <span
        className={classes.label}
        onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            item.selectRequirement(item.id, item.name, event.currentTarget);
        }}
    >
      {item.name}
    </span>
};

export const Requirement = (nodes: IRequirement) => (
    <TreeItem nodeId={nodes.id} label={<RenderLabel {...nodes} />} endIcon={<Remove />}>
        {Array.isArray(nodes.requirements) ? nodes.requirements.map((node, index) => <Requirement key={index} {...node} selectRequirement={nodes.selectRequirement} />) : null}
    </TreeItem>
);