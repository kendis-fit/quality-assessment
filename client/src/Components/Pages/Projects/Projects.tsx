import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { PostAdd } from "@material-ui/icons";
import { Grid, styled, Typography, IconButton } from "@material-ui/core";

import DefaultTable from "../../DefaultTable";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { useDataApi } from "../../../Hooks/useDataApi";
import ISelectable from "../../DefaultTable/Interfaces/ISelectable";
import { ProjectAPI } from "../../../Api/ProjectAPI";
import { ICreateProject } from "./Interfaces/ICreateProject";
import { ServerError } from "../../../Api/Errors/ServerError";
import { DialogCreateProject } from "./DialogCreateProject";

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
    },
    {
        id: "typeProfile",
        label: "Type profile"
    }
]

const Projects = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState("");
    const api = new ProjectAPI();
    const { data, setData, loading, error } = useDataApi(() => api.findAll());

    const selectable: ISelectable = {
        Fields: ["id"],
        OnSelect: (data: any) => {
            setSelectedProfile(data.id);
        }
    }

    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const showError = (error: ServerError) => {
        dispatch(showAlert({
            open: true,
            color: "error",
            message: error.reason
        }));
        if (error.redirectToLogin) {
            setIsRedirect(true);
        }
    }

    const createProject = async ({ name, typeProfile }: ICreateProject) => {
        try {
            const response = await api.create(name, typeProfile);
            setData([...data, response]);
        } catch (error) {
            showError(error);
        } finally {
            handleClose();
        }
    }
    
    if (error) {
        showError(error);
    }
    
    if (isRedirect) {
        return <Redirect to="/login" />
    }

    if (selectedProfile) {
        return <Redirect to={`/user/projects/${selectedProfile}`} />
    }
    
    if (loading) {
        return <div>Loading...</div>
    }

    return(
        <>
            <ProjectsBlock container direction="row" justify="center">
                <ProjectBlock>
                    <ProjectTitleBlock container direction="row" alignContent="center" justify="space-between">
                        <ProjectTitle>
                            <Typography>Projects</Typography>
                        </ProjectTitle>
                        <AddProject onClick={handleOpen}>
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
            <DialogCreateProject open={openModal} createProject={createProject} handleClose={handleClose} />
        </>
    );
}

export default Projects;