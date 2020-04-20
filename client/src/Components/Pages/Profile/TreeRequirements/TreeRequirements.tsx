import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TreeView } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { makeStyles, Grid, TextField } from '@material-ui/core';
import { ExpandMore, ChevronRight } from '@material-ui/icons';

import { Requirement } from "./Requirement";
import sizes from '../../../../Constants/sizes';
import { ProjectAPI } from "../../../../Api/ProjectAPI";
import { useDataApi } from "../../../../Hooks/useDataApi";
import { ITreeRequirements } from "./Interfaces/ITreeRequirements";
import { showAlert } from '../../../../Reducers/Alert/AlertActions';
import { IRemoveRequirementMeta } from "./Interfaces/IRemoveRequirementMeta";
import { DialogueAddRequirement, DialogueRemoveRequirement } from "./Dialogues";
import { IProjectResponse } from '../../../../Api/ProjectAPI/Interfaces/IProjectResponse';

const useStyles = makeStyles({
  root: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    flexGrow: 1,
    maxWidth: 400,
    minWidth: 400,
    overflow: "scroll",
    borderRight: "2px solid #3f51b5"
  },
  searchBlock: {
      width: "100%",
      height: 60
  },
  searchInput: {
    margin: "0 20px 0 20px"
  }
});

export const TreeRequirements = (props: ITreeRequirements) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const [parentId, setParentId] = useState("");
    const [removeInfo, setRemoveInfo] = useState<IRemoveRequirementMeta>();
    const [filterProject, setFilterProject] = useState("");
    const api = new ProjectAPI();
    const { data, setData, loading, error } = useDataApi<IProjectResponse>(() => api.findRequirementsById(props.id)); 

    const addRequirement = (requirements: IProjectResponse, requirement: IProjectResponse) => {
        alert(JSON.stringify(requirement));
    }

    const closeAddRequirement = () => {
        setParentId("");
    }

    const closeRemoveRequirement = () => {
        setRemoveInfo(undefined);
    }

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

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                >
                <Grid container justify="center" className={classes.searchBlock}>
                    <TextField 
                        variant="standard"
                        label="find a project..."
                        className={classes.searchInput}
                        fullWidth
                        value={filterProject}
                        onChange={e => setFilterProject(e.target.value)}
                        />
                </Grid>
                <Requirement 
                    {...data}
                    addRequirement={parentId => setParentId(parentId)}
                    removeRequirement={(id, name) => setRemoveInfo({ id, name })}
                    selectRequirement={id => props.selectRequirement(id)}
                    />
            </TreeView>
            {
                parentId !== "" && 
                <DialogueAddRequirement 
                    parentId={parentId} 
                    onCreatedElement={element => addRequirement(data, element)}
                    handleClose={closeAddRequirement} 
                    />
            }
            {
                removeInfo && <DialogueRemoveRequirement {...removeInfo} handleClose={closeRemoveRequirement} />
            }
        </>
    );
}
