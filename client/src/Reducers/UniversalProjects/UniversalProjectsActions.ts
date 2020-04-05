import { INIT_UNIVERSAL_PROJECTS, ADD_UNIVERSAL_PROJECT, REMOVE_UNIVERSAL_PROJECT } from "../../Constants/actions";
import { IProjectListResponse } from "../../Api/ProjectAPI/Interfaces/IProjectListResponse";

import { IAddUniversalProject } from "./Interfaces/IAddUniversalProject";
import { IInitUniversalProjects } from "./Interfaces/IInitUniversalProjects";
import { IRemoveUniversalProject } from "./Interfaces/IRemoveUniversalProject";

export const initUniversalProjects = (projects: IProjectListResponse[]): IInitUniversalProjects => ({
    type: INIT_UNIVERSAL_PROJECTS,
    value: projects
});

export const addUniversalProject = (project: IProjectListResponse): IAddUniversalProject => ({
    type: ADD_UNIVERSAL_PROJECT,
    value: project
});

export const removeUniversalProject = (id: string): IRemoveUniversalProject => ({
    type: REMOVE_UNIVERSAL_PROJECT,
    value: id
});