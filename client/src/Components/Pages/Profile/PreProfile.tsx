import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { Profile } from "./Profile";
import { IProfile } from "./Interfaces/IProfile";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { useDataApi } from "../../../Hooks/useDataApi";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { TreeRequirements } from "./TreeRequirements/TreeRequirements";

export const PreProfile = (props: IProfile) => {
    const api = new ProjectAPI();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const { data, error, loading } = useDataApi(() => api.checkProject(props.id));

    if (isRedirect) return <Redirect to="/login" />
    
    if (error) {
        dispatch(showAlert({
            open: true,
            color: "error",
            message: error.reason
        }));
        if (error.redirectToLogin) {
            setIsRedirect(true);
        }
    }

    if (loading) return <div>Loading...</div>

    return(
        <>
            {
                data.isMultiple ? <Grid container direction="row" >
                    <TreeRequirements id={props.id} />
                    <Profile id={props.id} />
                </Grid> : <Profile id={props.id} />
            }
        </>
    );
}