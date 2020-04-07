import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, styled, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";

import DefaultTable from "../../DefaultTable";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { PostAdd } from "@material-ui/icons";
import { useDataApi } from "../../../Hooks/useDataApi";
import ISelectable from "../../DefaultTable/Interfaces/ISelectable";
import { ProjectAPI } from "../../../Api/ProjectAPI";

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

const Projects = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const api = new ProjectAPI();
    const { data, setData, loading, error } = useDataApi(() => api.findAll());

    const selectable: ISelectable = {
        Fields: ["id"],
        OnSelect: (data: any) => {
            alert(data.id);
        }
    }

    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const createProject = async () => {
        const response = await api.create("test", "PROFILE");
        setData([...data, response]);
    }

    if (error) {
        dispatch(showAlert({
            open: true,
            color: "error",
            message: error.reason
        }));
        console.log(error.redirectToLogin);
        if (error.redirectToLogin) {
            return <Redirect to="/login" />
        }
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
        <div>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>Create project</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    label="Name"
                    margin="dense"
                    type="email"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    );
}

export default Projects;