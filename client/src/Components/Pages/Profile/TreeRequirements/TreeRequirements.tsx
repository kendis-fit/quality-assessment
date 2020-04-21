import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TreeView } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { makeStyles, Grid, TextField, Popover, List, ListItem } from '@material-ui/core';
import { ExpandMore, ChevronRight } from '@material-ui/icons';

import { Requirement } from "./Requirement";
import sizes from '../../../../Constants/sizes';
import { ProjectAPI } from "../../../../Api/ProjectAPI";
import { useDataApi } from "../../../../Hooks/useDataApi";
import { ITreeRequirements } from "./Interfaces/ITreeRequirements";
import { showAlert } from '../../../../Reducers/Alert/AlertActions';
import { IRequirementActions } from "./Interfaces/IRequirementActions";
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
  },
  menuItem: {
    cursor: "pointer",
    "&:hover": {
        color: "white",
        background: "#3f51b5"
    }
  }
});

export const TreeRequirements = (props: ITreeRequirements) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const [showAddRequirement, setShowAddRequirement] = useState(false);
    const [showRemoveRequirement, setShowRemoveRequirement] = useState(false);
    const [requirement, setRequirement] = useState<IRequirementActions>();
    const [filterProject, setFilterProject] = useState("");
    const api = new ProjectAPI();
    const { data, setData, loading, error } = useDataApi<IProjectResponse>(() => api.findRequirementsById(props.id)); 

    const addRequirementR = (data: IProjectResponse, requirement: IProjectResponse) => {
        for (const element of data.requirements) {
            if (element.id === requirement.parentId) {
                element.requirements.push(requirement);
                break;
            }
            if (element.requirements) {
                addRequirementR(element, requirement);
            }
        }
    }

    const addRequirement = (element: IProjectResponse) => {
        if (data.id === element.parentId) {
            data.requirements.push(element);
        } else {
            addRequirementR(data, element);
        }
        setData(data);
        dispatch(showAlert({
            open: true,
            message: `Requirement ${element.name} was created`,
            color: "success"
        }));
    }

    const removeRequirement = (dataset: IProjectResponse, info: IRequirementActions) => {
        const lengthRequirements = dataset.requirements.length;
        const requirements = dataset.requirements.filter(element => element.id !== info.id);
        if (lengthRequirements !== requirements.length) {
            dataset.requirements = requirements;
            setData(data);
            dispatch(showAlert({
                open: true,
                message: `Requirement ${info.name} was removed`,
                color: "success"
            }));
        } else {
            for (const element of dataset.requirements) {
                if (element.requirements.length > 0) {
                    removeRequirement(element, info);
                }
            }
        }
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
                {/* <Grid container justify="center" className={classes.searchBlock}>
                    <TextField 
                        variant="standard"
                        label="find a project..."
                        className={classes.searchInput}
                        fullWidth
                        value={filterProject}
                        onChange={e => setFilterProject(e.target.value)}
                        />
                </Grid> */}
                <Requirement 
                    {...data}
                    selectRequirement={(id, name, element) => setRequirement({ id, name, element }) }
                    />
            </TreeView>
            {
                requirement && 
                <Popover
                    open={true}
                    onClose={() => setRequirement(undefined)}
                    anchorEl={requirement.element}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    >
                    <List>
                        <ListItem className={classes.menuItem} onClick={() => props.selectRequirement(requirement.id)}>Show</ListItem>
                        <ListItem className={classes.menuItem} onClick={() => setShowAddRequirement(true)}>Add</ListItem>
                        <ListItem className={classes.menuItem} onClick={() => setShowRemoveRequirement(true)}>Remove</ListItem>
                    </List>
              </Popover>
            }
            {
                showAddRequirement && requirement &&
                <DialogueAddRequirement 
                    parentId={requirement.id} 
                    onCreatedElement={element => addRequirement(element)}
                    handleClose={() => setShowAddRequirement(false)} 
                    />
            }
            {
                showRemoveRequirement && requirement &&
                <DialogueRemoveRequirement
                    {...requirement}
                    onRemoveElement={() => removeRequirement(data, requirement)}
                    handleClose={() => setShowRemoveRequirement(false)} 
                    />
            }
        </>
    );
}
