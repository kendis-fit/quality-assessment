import React from "react";
import { useDispatch } from "react-redux";

import { useMultiplyDataApi } from "../../../Hooks/useMultiplyDataApi";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { UniversalProjectAPI } from "../../../Api/UniversalProjectAPI";
import { IProjectListResponse } from "../../../Api/ProjectAPI/Interfaces/IProjectListResponse";
import { Redirect } from "react-router-dom";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { Grid } from "@material-ui/core";
import DefaultTable from "../../DefaultTable";

const rowHeaders = [
    {
        id: "id",
        label: "id",
        hide: true
    },
    {
        id: "name",
        label: "Name"
    },
    {
        id: "createdAt",
        label: "Created at"
    }
]

const Projects = () => {
    const dispatch = useDispatch();
    const token = localStorage["token"];
    const projectApi = new ProjectAPI(token);
    const universalProjectAPI = new UniversalProjectAPI(token);
    const fetchMethods = [projectApi.findAll(), universalProjectAPI.findAll()];
    const { data, setData, loading, error } = useMultiplyDataApi<IProjectListResponse[]>(fetchMethods);

    if (error) {
        dispatch(showAlert({
            open: true,
            color: "error",
            message: error.reason
        }));
        if (error.redirectToLogin) {
            return <Redirect to="/login" />
        }
    }
    if (loading) {
        return <div>Loading...</div>
    }

    console.log(data);

    const [projects, universalProjects] = data;

    return(
        <Grid>
            <DefaultTable 
                data={projects}
                isPagination={false}
                columnTitles={rowHeaders}
            />
            <DefaultTable 
                data={universalProjects}
                isPagination={false}
                columnTitles={rowHeaders}
            />
        </Grid>
    );
}

export default Projects;