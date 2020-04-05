import { UniversalProjectsActions } from "../../Constants/types";
import { IProjectListResponse } from "../../Api/ProjectAPI/Interfaces/IProjectListResponse";
import { INIT_UNIVERSAL_PROJECTS, ADD_UNIVERSAL_PROJECT, REMOVE_UNIVERSAL_PROJECT } from "../../Constants/actions";

export const UniversalProjects = (state: IProjectListResponse[] = [], action: UniversalProjectsActions) => {
    switch(action.type) {
        case INIT_UNIVERSAL_PROJECTS:
            return action.value;
        case ADD_UNIVERSAL_PROJECT:
            return [...state, action.value];
        case REMOVE_UNIVERSAL_PROJECT:
            return state.filter(project => project.id !== action.value);
        default:
            return state;
    }
}