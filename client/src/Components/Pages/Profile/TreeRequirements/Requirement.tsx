import React from "react";
import { TreeItem } from "@material-ui/lab";

import { IProjectResponse } from "../../../../Api/ProjectAPI/Interfaces/IProjectResponse";

export const Requirement = (nodes: IProjectResponse) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => Requirement(node)) : null}
    </TreeItem>
);