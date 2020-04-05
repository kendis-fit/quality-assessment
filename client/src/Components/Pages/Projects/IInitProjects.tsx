import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { ProjectAPI } from "../../../Api/ProjectAPI";
import { ServerError } from "../../../Api/Errors/ServerError";
import { showAlert } from "../../../Reducers/Alert/AlertActions";
import { UniversalProjectAPI } from "../../../Api/UniversalProjectAPI";
import { initUniversalProjects } from "../../../Reducers/UniversalProjects/UniversalProjectsActions";

export const IInitProjects = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        const token = sessionStorage["token"];
        const projectApi = new ProjectAPI(token);
        const universalProjectAPI = new UniversalProjectAPI(token);

        Promise.all([projectApi.findAll(), universalProjectAPI.findAll()])
            .then((values) => {
                const [projects, universalProjects] = values;
                dispatch(initUniversalProjects(universalProjects));
                setLoading(false);
            })
            .catch((error) => {
                if (error instanceof ServerError) {
                    setIsRedirect(true);
                    dispatch(showAlert({
                        open: true,
                        message: error.reason,
                        color: "error"
                    }));
                }
            });
    });

    if (isRedirect) {
        return <Redirect to="/login" />
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>Test2</div>
}