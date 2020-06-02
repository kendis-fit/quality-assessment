import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { Profile } from "./Profile";
import { IProfile } from "./Interfaces/IProfile";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { useDataApi } from "../../../Hooks/useDataApi";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { TreeRequirements } from "./TreeRequirements/TreeRequirements";

enum View {
    ALL = 0,
    REQUIREMENTS = 1,
    PROFILE = 2,
}

export const PreProfile = (props: IProfile) => {
    const api = new ProjectAPI();
    const dispatch = useDispatch();
    const [projectId, setProjectId] = useState(props.id);
    const [view, setView] = useState(View.ALL);
    const [isRedirect, setIsRedirect] = useState(false);
    const { data, error, loading } = useDataApi(() => api.checkProject(props.id));

    useEffect(() => {

        function resizeView() {
            setView(view => calculateView(view !== View.ALL ? view : View.REQUIREMENTS));
        }

        resizeView();
        window.addEventListener("resize", resizeView);

        return () => window.removeEventListener("resize", resizeView);
    }, []);

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

    const calculateView = (view: View) => {
        if (window.document.body.clientWidth <= 650) {
            return view;
        }
        return View.ALL;
    }

    if (loading) return <div>Loading...</div>

    return(
        <>
            {
                data.isMultiple ? <Grid container direction="row" wrap="nowrap">
                    <Grid style={{ display: (view === View.ALL || view === View.REQUIREMENTS) ? "block" : "none" }}>
                        <TreeRequirements id={props.id} selectRequirement={id => { 
                            setProjectId(id);
                            setView(calculateView(View.PROFILE));
                        }} />
                    </Grid>
                    <Grid style={{ display: (view === View.ALL || view === View.PROFILE) ? "block" : "none" }}>
                        <Profile id={projectId} handleBack={() => setView(calculateView(View.REQUIREMENTS))} />
                    </Grid>
                </Grid> : <Profile id={projectId} />
            }
        </>
    );
}