import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, styled, Typography, IconButton } from "@material-ui/core";

import DefaultTable from "../../DefaultTable";
import { useMultiplyDataApi } from "../../../Hooks/useMultiplyDataApi";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { UniversalProjectAPI } from "../../../Api/UniversalProjectAPI";
import { IProjectListResponse } from "../../../Api/ProjectAPI/Interfaces/IProjectListResponse";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { PostAdd } from "@material-ui/icons";
import { useDataApi } from "../../../Hooks/useDataApi";
import ISelectable from "../../DefaultTable/Interfaces/ISelectable";
import { IProject } from "./Interfaces/IProject";

const ProjectsBlock = styled(Grid)({
    padding: "20px",
});

const ProjectBlock = styled(Grid)({
    border: "3px solid #3f51b5",
    width: "100%",
    height: "800px"
});

const ProjectTitleBlock = styled(Grid)({
    width: "100%",
    height: "50px",
    background: "#3f51b5",
    color: "white"
});

const ProjectTitle = styled(Grid)({
    padding: "10px"
});

const AddProject = styled(IconButton)({
    marginLeft: "25px",
    color: "white"
});

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

const Projects = (props: IProject) => {
    const dispatch = useDispatch();
    const { data, setData, loading, error } = useDataApi(props.fetchMethod);

    const selectable: ISelectable = {
        Fields: ["id"],
        OnSelect: (data: any) => {
            alert(data.id);
        }
    }

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


    return(
        <ProjectsBlock container direction="row" justify="center">
            <ProjectBlock>
                <ProjectTitleBlock container direction="row" alignContent="center" justify="space-between">
                    <ProjectTitle>
                        <Typography>Projects</Typography>
                    </ProjectTitle>
                    <AddProject>
                        <PostAdd />
                    </AddProject>
                </ProjectTitleBlock>
                <DefaultTable 
                    data={data}
                    isPagination={false}
                    columnTitles={rowHeaders}
                    selectable={selectable}
                    />
            </ProjectBlock>
        </ProjectsBlock>
    );
}

export default Projects;