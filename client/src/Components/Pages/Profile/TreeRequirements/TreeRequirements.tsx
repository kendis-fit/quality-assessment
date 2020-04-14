import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TreeView } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { ExpandMore, ChevronRight } from '@material-ui/icons';

import { Requirement } from "./Requirement";
import sizes from '../../../../Constants/sizes';
import { IProfile } from '../Interfaces/IProfile';
import { ProjectAPI } from "../../../../Api/ProjectAPI";
import { useDataApi } from "../../../../Hooks/useDataApi";
import { showAlert } from '../../../../Reducers/Alert/AlertActions';

const useStyles = makeStyles({
  root: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    flexGrow: 1,
    maxWidth: 400,
    overflow: "scroll",
    borderRight: "2px solid #3f51b5"
  },
});

export const TreeRequirements = (props: IProfile) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isRedirect, setIsRedirect] = useState(false);
    const api = new ProjectAPI();
    const { data, loading, error } = useDataApi(() => api.findRequirementsById(props.id)); 

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
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
            >
            {Requirement(data)}
        </TreeView>
    );
}
