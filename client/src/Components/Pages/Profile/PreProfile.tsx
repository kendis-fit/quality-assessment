import React from "react";
import { Grid } from "@material-ui/core";

import { Profile } from "./Profile";
import { IProfile } from "./Interfaces/IProfile";
import { TreeRequirements } from "./TreeRequirements/TreeRequirements";

export const PreProfile = (props: IProfile) => {
    return(
        <Grid container direction="row">
            <TreeRequirements id={props.id} />
            <Profile id={props.id} />
        </Grid>
    );
}